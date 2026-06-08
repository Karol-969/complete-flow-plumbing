import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut, Users, MessageSquare, BarChart3, Settings,
  Plus, Trash2, CheckCircle, Clock, Phone, Mail, MapPin,
  Wrench, AlertCircle, ExternalLink, Copy, RefreshCw, Droplets,
  Tag, Globe, ShieldCheck
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface StoredQuote {
  id: string; name: string; phone: string; email?: string;
  suburb: string; serviceType: string; urgency: string; message?: string;
  createdAt: string; read: boolean;
}
interface StoredContact {
  id: string; name: string; phone: string; email: string;
  message: string; createdAt: string; read: boolean;
}
interface TrackingCode {
  id: string; name: string;
  type: "ga4" | "gtm" | "google-ads" | "facebook-pixel" | "custom";
  value: string; enabled: boolean;
}

const TYPE_LABELS: Record<TrackingCode["type"], string> = {
  ga4: "Google Analytics 4",
  gtm: "Google Tag Manager",
  "google-ads": "Google Ads",
  "facebook-pixel": "Facebook Pixel",
  custom: "Custom Script",
};
const TYPE_COLORS: Record<TrackingCode["type"], string> = {
  ga4: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  gtm: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "google-ads": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "facebook-pixel": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  custom: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const URGENCY_COLOR: Record<string, string> = {
  emergency: "bg-red-100 text-red-700",
  "same-day": "bg-orange-100 text-orange-700",
  "this-week": "bg-yellow-100 text-yellow-700",
  "flexible": "bg-green-100 text-green-700",
};

function formatDate(d: string) {
  return new Date(d).toLocaleString("en-AU", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const qc = useQueryClient();
  const [newCode, setNewCode] = useState<Partial<TrackingCode>>({ type: "ga4", enabled: true });
  const [savingTracking, setSavingTracking] = useState(false);
  const [trackingMsg, setTrackingMsg] = useState("");

  // Auth check
  const { data: me, isLoading: authLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/me"],
  });

  useEffect(() => {
    if (!authLoading && me && !me.isAdmin) navigate("/admin");
  }, [me, authLoading, navigate]);

  const { data: quotes = [], refetch: refetchQuotes } = useQuery<StoredQuote[]>({
    queryKey: ["/api/admin/quotes"],
    enabled: !!me?.isAdmin,
  });
  const { data: contacts = [], refetch: refetchContacts } = useQuery<StoredContact[]>({
    queryKey: ["/api/admin/contacts"],
    enabled: !!me?.isAdmin,
  });
  const { data: trackingCodes = [], refetch: refetchTracking } = useQuery<TrackingCode[]>({
    queryKey: ["/api/admin/tracking"],
    enabled: !!me?.isAdmin,
  });

  const markQuoteRead = useMutation({
    mutationFn: (id: string) => apiRequest("PATCH", `/api/admin/quotes/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/quotes"] }),
  });
  const markContactRead = useMutation({
    mutationFn: (id: string) => apiRequest("PATCH", `/api/admin/contacts/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/contacts"] }),
  });

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    navigate("/admin");
  };

  const saveTracking = async (codes: TrackingCode[]) => {
    setSavingTracking(true);
    setTrackingMsg("");
    try {
      await fetch("/api/admin/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(codes),
      });
      await qc.invalidateQueries({ queryKey: ["/api/admin/tracking"] });
      await qc.invalidateQueries({ queryKey: ["/api/tracking"] });
      setTrackingMsg("Saved and live on site!");
    } catch {
      setTrackingMsg("Error saving. Please try again.");
    } finally {
      setSavingTracking(false);
      setTimeout(() => setTrackingMsg(""), 3000);
    }
  };

  const addCode = () => {
    if (!newCode.name || !newCode.value || !newCode.type) return;
    const updated = [
      ...trackingCodes,
      { id: crypto.randomUUID(), name: newCode.name, type: newCode.type as TrackingCode["type"], value: newCode.value, enabled: newCode.enabled ?? true },
    ];
    saveTracking(updated);
    setNewCode({ type: "ga4", enabled: true });
  };

  const toggleCode = (id: string) => {
    const updated = trackingCodes.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c);
    saveTracking(updated);
  };

  const deleteCode = (id: string) => {
    saveTracking(trackingCodes.filter(c => c.id !== id));
  };

  const unreadQuotes = quotes.filter(q => !q.read).length;
  const unreadContacts = contacts.filter(c => !c.read).length;
  const activeTracking = trackingCodes.filter(c => c.enabled).length;

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-1.5">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none">Complete Flow Plumbing</p>
              <p className="text-sm font-semibold text-foreground leading-none mt-0.5">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> View Site
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: quotes.length, sub: `${unreadQuotes} unread`, icon: Users, color: "text-primary" },
            { label: "Messages", value: contacts.length, sub: `${unreadContacts} unread`, icon: MessageSquare, color: "text-green-600" },
            { label: "Active Tracking", value: activeTracking, sub: `${trackingCodes.length} total`, icon: BarChart3, color: "text-orange-500" },
            { label: "Site Status", value: "Live", sub: "completeflowplumbing.com.au", icon: ShieldCheck, color: "text-emerald-600" },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <Card key={label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="leads">
          <TabsList className="mb-6 h-11">
            <TabsTrigger value="leads" className="gap-2" data-testid="tab-leads">
              <Users className="h-4 w-4" />
              Leads
              {unreadQuotes > 0 && <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0 h-5">{unreadQuotes}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2" data-testid="tab-contacts">
              <MessageSquare className="h-4 w-4" />
              Messages
              {unreadContacts > 0 && <Badge className="bg-green-600 text-white text-xs px-1.5 py-0 h-5">{unreadContacts}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="tracking" className="gap-2" data-testid="tab-tracking">
              <BarChart3 className="h-4 w-4" />
              Tracking Codes
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2" data-testid="tab-seo">
              <Settings className="h-4 w-4" />
              SEO Tools
            </TabsTrigger>
          </TabsList>

          {/* ── LEADS ── */}
          <TabsContent value="leads">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Quote Requests</h2>
              <Button variant="outline" size="sm" onClick={() => refetchQuotes()}>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
              </Button>
            </div>
            {quotes.length === 0 ? (
              <Card className="p-12 text-center text-muted-foreground">No quote requests yet.</Card>
            ) : (
              <div className="space-y-3">
                {quotes.map((q) => (
                  <Card key={q.id} className={`p-4 transition-colors ${!q.read ? "border-primary/40 bg-primary/5" : ""}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {!q.read && <span className="w-2 h-2 rounded-full bg-primary inline-block" />}
                          <span className="font-semibold text-foreground">{q.name}</span>
                          <Badge className={`text-xs ${URGENCY_COLOR[q.urgency] || "bg-muted text-muted-foreground"}`}>
                            {q.urgency}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{q.serviceType}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /><a href={`tel:${q.phone}`} className="hover:text-primary">{q.phone}</a></span>
                          {q.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /><a href={`mailto:${q.email}`} className="hover:text-primary">{q.email}</a></span>}
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{q.suburb}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDate(q.createdAt)}</span>
                        </div>
                        {q.message && <p className="mt-2 text-sm text-muted-foreground italic border-l-2 border-border pl-3">"{q.message}"</p>}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${q.phone}`}><Phone className="h-3.5 w-3.5" /></a>
                        </Button>
                        {!q.read && (
                          <Button size="sm" variant="outline" onClick={() => markQuoteRead.mutate(q.id)}>
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── CONTACTS ── */}
          <TabsContent value="contacts">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Contact Messages</h2>
              <Button variant="outline" size="sm" onClick={() => refetchContacts()}>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
              </Button>
            </div>
            {contacts.length === 0 ? (
              <Card className="p-12 text-center text-muted-foreground">No contact messages yet.</Card>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <Card key={c.id} className={`p-4 ${!c.read ? "border-green-500/40 bg-green-500/5" : ""}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {!c.read && <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />}
                          <span className="font-semibold text-foreground">{c.name}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /><a href={`tel:${c.phone}`} className="hover:text-primary">{c.phone}</a></span>
                          <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /><a href={`mailto:${c.email}`} className="hover:text-primary">{c.email}</a></span>
                        </div>
                        <p className="text-sm text-muted-foreground italic border-l-2 border-border pl-3">"{c.message}"</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${c.email}`}><Mail className="h-3.5 w-3.5" /></a>
                        </Button>
                        {!c.read && (
                          <Button size="sm" variant="outline" onClick={() => markContactRead.mutate(c.id)}>
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── TRACKING CODES ── */}
          <TabsContent value="tracking">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add new */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Add Tracking Code</h2>
                <Card className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>Platform</Label>
                      <Select value={newCode.type} onValueChange={(v) => setNewCode(p => ({ ...p, type: v as TrackingCode["type"] }))}>
                        <SelectTrigger className="mt-1.5" data-testid="tracking-type-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ga4">Google Analytics 4 (GA4)</SelectItem>
                          <SelectItem value="gtm">Google Tag Manager (GTM)</SelectItem>
                          <SelectItem value="google-ads">Google Ads Conversion</SelectItem>
                          <SelectItem value="facebook-pixel">Facebook Pixel</SelectItem>
                          <SelectItem value="custom">Custom Script</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>Label / Name</Label>
                      <Input
                        className="mt-1.5"
                        placeholder="e.g. GA4 Main, Google Ads Leads"
                        value={newCode.name || ""}
                        onChange={(e) => setNewCode(p => ({ ...p, name: e.target.value }))}
                        data-testid="tracking-name-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>
                        {newCode.type === "custom" ? "Script / HTML" : "Tracking ID / Measurement ID"}
                      </Label>
                      {newCode.type === "custom" ? (
                        <Textarea
                          className="mt-1.5 font-mono text-xs"
                          placeholder="Paste your full <script> tag or raw JS here"
                          rows={5}
                          value={newCode.value || ""}
                          onChange={(e) => setNewCode(p => ({ ...p, value: e.target.value }))}
                          data-testid="tracking-value-textarea"
                        />
                      ) : (
                        <Input
                          className="mt-1.5 font-mono"
                          placeholder={
                            newCode.type === "ga4" ? "G-XXXXXXXXXX" :
                            newCode.type === "gtm" ? "GTM-XXXXXXX" :
                            newCode.type === "google-ads" ? "AW-XXXXXXXXX" :
                            "000000000000000"
                          }
                          value={newCode.value || ""}
                          onChange={(e) => setNewCode(p => ({ ...p, value: e.target.value }))}
                          data-testid="tracking-value-input"
                        />
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={addCode}
                    disabled={!newCode.name || !newCode.value || savingTracking}
                    data-testid="add-tracking-button"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add & Activate
                  </Button>
                  {trackingMsg && (
                    <p className="text-sm text-center text-green-600 font-medium">{trackingMsg}</p>
                  )}

                  {/* Help */}
                  <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground space-y-1.5">
                    <p className="font-semibold text-foreground">Where to find your ID:</p>
                    <p><span className="font-medium">GA4</span> — Google Analytics → Admin → Data Streams → Measurement ID (G-XXXXXXX)</p>
                    <p><span className="font-medium">GTM</span> — tagmanager.google.com → Container ID (GTM-XXXXXXX)</p>
                    <p><span className="font-medium">Google Ads</span> — Tools → Conversions → Conversion ID (AW-XXXXXXXXX)</p>
                    <p><span className="font-medium">Facebook Pixel</span> — Events Manager → Pixel ID (16-digit number)</p>
                  </div>
                </Card>
              </div>

              {/* Active codes */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Active Tracking Codes</h2>
                {trackingCodes.length === 0 ? (
                  <Card className="p-8 text-center text-muted-foreground text-sm">
                    No tracking codes yet. Add your first one →
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {trackingCodes.map((code) => (
                      <Card key={code.id} className={`p-4 ${!code.enabled ? "opacity-50" : ""}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[code.type]}`}>
                                {TYPE_LABELS[code.type]}
                              </span>
                            </div>
                            <p className="font-medium text-foreground text-sm truncate">{code.name}</p>
                            <p className="text-xs text-muted-foreground font-mono truncate">{code.value.slice(0, 50)}{code.value.length > 50 ? "…" : ""}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Switch
                              checked={code.enabled}
                              onCheckedChange={() => toggleCode(code.id)}
                              data-testid={`toggle-tracking-${code.id}`}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => deleteCode(code.id)}
                              data-testid={`delete-tracking-${code.id}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ── SEO TOOLS ── */}
          <TabsContent value="seo">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Quick links */}
              <div>
                <h2 className="text-lg font-semibold mb-4">SEO Quick Links</h2>
                <div className="space-y-3">
                  {[
                    { label: "Google Search Console", url: "https://search.google.com/search-console", desc: "Monitor rankings, indexing and search performance" },
                    { label: "Google Analytics", url: "https://analytics.google.com", desc: "Traffic, conversions and user behaviour" },
                    { label: "Google Ads", url: "https://ads.google.com", desc: "Manage your PPC campaigns and conversion tracking" },
                    { label: "Google Business Profile", url: "https://business.google.com", desc: "Manage reviews and local listings" },
                    { label: "PageSpeed Insights", url: `https://pagespeed.web.dev/report?url=${encodeURIComponent("https://completeflowplumbing.com.au")}`, desc: "Core Web Vitals and speed score" },
                    { label: "Mobile-Friendly Test", url: `https://search.google.com/test/mobile-friendly?url=${encodeURIComponent("https://completeflowplumbing.com.au")}`, desc: "Check mobile usability" },
                    { label: "Rich Results Test", url: `https://search.google.com/test/rich-results?url=${encodeURIComponent("https://completeflowplumbing.com.au")}`, desc: "Verify structured data / schema markup" },
                    { label: "hipages Business Listing", url: "https://hipages.com.au", desc: "Update business profile for local SEO" },
                  ].map(({ label, url, desc }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Site files & snippets */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Site Files</h2>
                  <div className="space-y-2">
                    {[
                      { label: "Sitemap XML", url: "/sitemap.xml" },
                      { label: "Robots.txt", url: "/robots.txt" },
                    ].map(({ label, url }) => (
                      <div key={label} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <span className="text-sm font-medium text-foreground">{label}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <a href={url} target="_blank"><ExternalLink className="h-3.5 w-3.5" /></a>
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(`https://completeflowplumbing.com.au${url}`)}>
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">SEO Checklist</h2>
                  <Card className="p-4">
                    {[
                      { label: "Google Business Profile created", done: false },
                      { label: "Google Search Console verified", done: false },
                      { label: "GA4 tracking code active", done: trackingCodes.some(c => c.type === "ga4" && c.enabled) },
                      { label: "Google Ads conversion tracking active", done: trackingCodes.some(c => c.type === "google-ads" && c.enabled) },
                      { label: "Sitemap submitted to Search Console", done: false },
                      { label: "hipages / Yellow Pages listing", done: false },
                      { label: "Real Google reviews collected", done: false },
                    ].map(({ label, done }) => (
                      <div key={label} className={`flex items-center gap-2 py-2 border-b border-border last:border-0 text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>
                        {done
                          ? <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          : <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                        }
                        {label}
                      </div>
                    ))}
                  </Card>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Business Info</h2>
                  <Card className="p-4 space-y-2 text-sm">
                    {[
                      { label: "Phone", value: "0468 723 029" },
                      { label: "Email", value: "completeflowplumbing@gmail.com" },
                      { label: "ABN", value: "45 685 684 020" },
                      { label: "Licence", value: "395338C (NSW Fair Trading)" },
                      { label: "Domain", value: "completeflowplumbing.com.au" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-1 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{value}</span>
                          <button onClick={() => navigator.clipboard.writeText(value)} className="text-muted-foreground hover:text-primary">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
