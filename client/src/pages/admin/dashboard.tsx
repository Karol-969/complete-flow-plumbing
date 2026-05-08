import { useState, useEffect, type ReactNode } from "react";
import { useLocation, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import {
  Search,
  Building2,
  Wrench,
  MessageSquare,
  Star,
  HelpCircle,
  LogOut,
  Save,
  Plus,
  Trash2,
  LayoutDashboard,
  CheckCircle,
  BarChart3,
  Globe,
  FileText,
  TrendingUp,
  Activity,
  Target,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import logoImage from "@assets/logo_1766462914112.jpeg";

interface PageSEO { title: string; description: string; keywords: string[] }
interface BusinessInfo {
  name: string; phone: string; email: string; abn: string; licence: string;
  address: string; serviceHours: string; tagline: string; guarantee: string;
  googleReviewLink: string; googleMapsUrl: string; googleMapsSearchUrl: string;
}
interface ServiceItem { id: string; slug: string; title: string; shortDescription: string; icon: string; category: string }
interface Testimonial { id: string; name: string; suburb: string; service: string; rating: number; text: string }
interface FAQ { question: string; answer: string }
interface TrackingConfig {
  googleAnalyticsId: string; googleTagManagerId: string; googleAdsId: string;
  googleAdsConversionLabel: string; facebookPixelId: string; facebookConversionsApi: string;
  hotjarId: string; customHeadScripts: string; customBodyScripts: string;
}
interface CmsData {
  pageSEO: Record<string, PageSEO>; businessInfo: BusinessInfo; services: ServiceItem[];
  testimonials: Testimonial[]; faqs: FAQ[]; tracking: TrackingConfig;
}
interface Submission {
  id: string; name: string; phone: string; email?: string; suburb?: string;
  serviceType?: string; urgency?: string; message?: string; createdAt: string;
}

function SaveButton({ saved, onClick, label = "Save Changes" }: { saved: boolean; onClick: () => void; label?: string }) {
  return (
    <Button onClick={onClick} className="gap-2 h-11 px-6">
      {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
      {saved ? "Saved!" : label}
    </Button>
  );
}

function SectionHeader({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="mb-8 pb-6 border-b border-slate-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ cmsData, submissions }: { cmsData: CmsData; submissions: { quotes: Submission[]; contacts: Submission[] } }) {
  const totalKeywords = Object.values(cmsData.pageSEO).reduce((sum, p) => sum + p.keywords.length, 0);
  const trackingActive = [cmsData.tracking.googleAnalyticsId, cmsData.tracking.googleTagManagerId, cmsData.tracking.googleAdsId, cmsData.tracking.facebookPixelId, cmsData.tracking.hotjarId].filter(Boolean).length;

  const stats = [
    { label: "Services", value: cmsData.services.length, icon: Wrench, color: "from-blue-500 to-blue-600" },
    { label: "Locations", value: "89", icon: Globe, color: "from-emerald-500 to-emerald-600" },
    { label: "SEO Keywords", value: totalKeywords, icon: TrendingUp, color: "from-violet-500 to-violet-600" },
    { label: "Reviews", value: cmsData.testimonials.length, icon: Star, color: "from-amber-500 to-amber-600" },
    { label: "FAQs", value: cmsData.faqs.length, icon: HelpCircle, color: "from-cyan-500 to-cyan-600" },
    { label: "Tracking", value: `${trackingActive}/5`, icon: Target, color: "from-rose-500 to-rose-600" },
    { label: "Quotes", value: submissions.quotes.length, icon: FileText, color: "from-indigo-500 to-indigo-600" },
    { label: "Messages", value: submissions.contacts.length, icon: MessageSquare, color: "from-teal-500 to-teal-600" },
  ];

  const recentSubmissions = [...submissions.quotes, ...submissions.contacts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
        <p className="text-slate-500">Here's an overview of your website content and performance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 bg-white border-slate-200/60 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-slate-200/60">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Recent Submissions
          </h3>
          {recentSubmissions.length === 0 ? (
            <div className="py-10 text-center">
              <MessageSquare className="h-10 w-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No submissions yet.</p>
              <p className="text-slate-300 text-xs mt-1">They'll appear here when visitors fill out forms.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentSubmissions.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{s.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{new Date(s.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 bg-white border-slate-200/60">
          <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Tracking Pixels
          </h3>
          <div className="space-y-1">
            {[
              { label: "Google Analytics 4", value: cmsData.tracking.googleAnalyticsId, icon: "GA" },
              { label: "Google Tag Manager", value: cmsData.tracking.googleTagManagerId, icon: "TM" },
              { label: "Google Ads", value: cmsData.tracking.googleAdsId, icon: "AW" },
              { label: "Facebook Pixel", value: cmsData.tracking.facebookPixelId, icon: "FB" },
              { label: "Hotjar", value: cmsData.tracking.hotjarId, icon: "HJ" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold ${item.value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                </div>
                {item.value ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 gap-1 font-mono text-xs">
                    <CheckCircle className="h-3 w-3" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-400 border-slate-200 text-xs">Not set</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary to-blue-700 text-white border-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Quick Actions</h3>
            <p className="text-white/70 text-sm mt-1">Common tasks for managing your site</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 gap-1.5">
                Google Search Console <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 gap-1.5">
                Google Analytics <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
            <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 gap-1.5">
                Google Business <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TrackingEditor({ data, onSave }: { data: TrackingConfig; onSave: (t: TrackingConfig) => void }) {
  const [form, setForm] = useState<TrackingConfig>(data);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { onSave(form); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const sections: { heading: string; sub: string; fields: { key: keyof TrackingConfig; label: string; placeholder: string; textarea?: boolean }[] }[] = [
    { heading: "Google Analytics", sub: "Track visitors, page views, and user behavior", fields: [
      { key: "googleAnalyticsId", label: "GA4 Measurement ID", placeholder: "G-XXXXXXXXXX" },
    ]},
    { heading: "Google Tag Manager", sub: "Manage all your tags in one place", fields: [
      { key: "googleTagManagerId", label: "GTM Container ID", placeholder: "GTM-XXXXXXX" },
    ]},
    { heading: "Google Ads", sub: "Track conversions from Google Ads campaigns", fields: [
      { key: "googleAdsId", label: "Google Ads ID", placeholder: "AW-XXXXXXXXXX" },
      { key: "googleAdsConversionLabel", label: "Conversion Label", placeholder: "AbCdEfGhIjKlMn" },
    ]},
    { heading: "Facebook / Meta Pixel", sub: "Track conversions from Facebook & Instagram ads", fields: [
      { key: "facebookPixelId", label: "Pixel ID", placeholder: "XXXXXXXXXXXXXXX" },
      { key: "facebookConversionsApi", label: "Conversions API Token (optional)", placeholder: "EAAxxxxxxx..." },
    ]},
    { heading: "Hotjar", sub: "Heatmaps, session recordings, and user feedback", fields: [
      { key: "hotjarId", label: "Hotjar Site ID", placeholder: "XXXXXXX" },
    ]},
    { heading: "Custom Scripts", sub: "Add custom tracking scripts, chat widgets, schema markup, etc.", fields: [
      { key: "customHeadScripts", label: "Scripts for <head>", placeholder: "<!-- Paste <head> scripts here -->", textarea: true },
      { key: "customBodyScripts", label: "Scripts before </body>", placeholder: "<!-- Paste body scripts here -->", textarea: true },
    ]},
  ];

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.heading}>
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900">{section.heading}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{section.sub}</p>
          </div>
          <div className={`grid ${section.fields.length > 1 && !section.fields[0].textarea ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
            {section.fields.map((f) => (
              <div key={f.key}>
                <Label className="text-slate-600">{f.label}</Label>
                {f.textarea ? (
                  <textarea
                    className="flex w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-mono ring-offset-background placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary mt-1.5"
                    rows={4}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                  />
                ) : (
                  <Input
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="font-mono text-sm mt-1.5 h-11"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="pt-4 border-t border-slate-200">
        <SaveButton saved={saved} onClick={handleSave} label="Save Tracking Settings" />
      </div>
    </div>
  );
}

function SEOEditor({ data, onSave }: { data: Record<string, PageSEO>; onSave: (page: string, seo: PageSEO) => void }) {
  const [activePage, setActivePage] = useState("home");
  const [form, setForm] = useState<PageSEO>(data[activePage] || { title: "", description: "", keywords: [] });
  const [keywordInput, setKeywordInput] = useState("");
  const [saved, setSaved] = useState(false);
  const pages = Object.keys(data);

  useEffect(() => {
    setForm(data[activePage] || { title: "", description: "", keywords: [] });
    setSaved(false);
  }, [activePage, data]);

  const handleSave = () => { onSave(activePage, form); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const addKeyword = () => {
    if (keywordInput.trim() && !form.keywords.includes(keywordInput.trim())) {
      setForm({ ...form, keywords: [...form.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  };
  const removeKeyword = (kw: string) => setForm({ ...form, keywords: form.keywords.filter(k => k !== kw) });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {pages.map(page => (
          <Button key={page} variant={activePage === page ? "default" : "outline"} size="sm" onClick={() => setActivePage(page)} className="capitalize">
            {page}
          </Button>
        ))}
      </div>

      <Card className="p-5 bg-slate-50/80 border-slate-200/80">
        <p className="text-[10px] font-semibold text-slate-400 mb-3 uppercase tracking-widest">Search Preview</p>
        <p className="text-[17px] text-blue-800 font-medium leading-snug truncate hover:underline cursor-default">{form.title || "Page Title"}</p>
        <p className="text-[13px] text-emerald-800/80 mt-0.5 truncate">https://completeflowplumbing.com.au/{activePage === "home" ? "" : activePage}</p>
        <p className="text-[13px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{form.description || "Meta description will appear here..."}</p>
      </Card>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label className="text-slate-700">Page Title</Label>
            <span className={`text-xs font-medium ${form.title.length > 60 ? "text-red-500" : form.title.length > 50 ? "text-amber-500" : "text-slate-400"}`}>
              {form.title.length}/60
            </span>
          </div>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="h-11" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label className="text-slate-700">Meta Description</Label>
            <span className={`text-xs font-medium ${form.description.length > 160 ? "text-red-500" : form.description.length > 140 ? "text-amber-500" : "text-slate-400"}`}>
              {form.description.length}/160
            </span>
          </div>
          <textarea
            className="flex w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-slate-700 mb-1.5 block">Keywords ({form.keywords.length})</Label>
          <div className="flex gap-2 mb-3">
            <Input
              value={keywordInput}
              onChange={e => setKeywordInput(e.target.value)}
              placeholder="Type a keyword and press Enter"
              className="h-11"
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addKeyword())}
            />
            <Button type="button" variant="outline" onClick={addKeyword} className="h-11 px-4">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.keywords.map(kw => (
              <Badge key={kw} variant="secondary" className="gap-1.5 pr-1.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 transition-colors">
                {kw}
                <button onClick={() => removeKeyword(kw)} className="hover:text-red-600 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <SaveButton saved={saved} onClick={handleSave} label="Save SEO Settings" />
        </div>
      </div>
    </div>
  );
}

function BusinessEditor({ data, onSave }: { data: BusinessInfo; onSave: (info: BusinessInfo) => void }) {
  const [form, setForm] = useState<BusinessInfo>(data);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { onSave(form); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const groups: { heading: string; fields: { key: keyof BusinessInfo; label: string }[] }[] = [
    { heading: "Contact Details", fields: [
      { key: "name", label: "Business Name" }, { key: "phone", label: "Phone Number" },
      { key: "email", label: "Email" }, { key: "address", label: "Address" }, { key: "serviceHours", label: "Service Hours" },
    ]},
    { heading: "Licencing", fields: [
      { key: "abn", label: "ABN" }, { key: "licence", label: "NSW Licence Number" },
    ]},
    { heading: "Branding", fields: [
      { key: "tagline", label: "Tagline" }, { key: "guarantee", label: "Guarantee Text" },
    ]},
    { heading: "Google Integration", fields: [
      { key: "googleReviewLink", label: "Google Review Link" }, { key: "googleMapsSearchUrl", label: "Google Maps URL" },
    ]},
  ];

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.heading}>
          <h3 className="font-semibold text-slate-900 mb-4">{group.heading}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map(({ key, label }) => (
              <div key={key} className={key === "address" || key === "googleReviewLink" || key === "googleMapsSearchUrl" ? "md:col-span-2" : ""}>
                <Label className="text-slate-600">{label}</Label>
                <Input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="mt-1.5 h-11" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="pt-4 border-t border-slate-200">
        <SaveButton saved={saved} onClick={handleSave} label="Save Business Info" />
      </div>
    </div>
  );
}

function ServicesEditor({ data, onSave, onDelete }: { data: ServiceItem[]; onSave: (s: ServiceItem[]) => void; onDelete: (id: string) => void }) {
  const [services, setServices] = useState<ServiceItem[]>(data);
  const [saved, setSaved] = useState(false);
  const updateField = (id: string, field: keyof ServiceItem, value: string) => setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  const handleSave = () => { onSave(services); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-5">
      {services.map((service, i) => (
        <Card key={service.id} className="p-5 bg-white border-slate-200/80 hover:border-slate-300 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">#{i + 1}</span>
              <Badge variant="secondary" className="capitalize text-xs">{service.category}</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0" onClick={() => onDelete(service.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-600">Title</Label>
              <Input value={service.title} onChange={e => updateField(service.id, "title", e.target.value)} className="mt-1.5 h-11" />
            </div>
            <div>
              <Label className="text-slate-600">URL Slug</Label>
              <Input value={service.slug} onChange={e => updateField(service.id, "slug", e.target.value)} className="mt-1.5 h-11 font-mono text-sm" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-slate-600">Description</Label>
              <Input value={service.shortDescription} onChange={e => updateField(service.id, "shortDescription", e.target.value)} className="mt-1.5 h-11" />
            </div>
            <div>
              <Label className="text-slate-600">Icon</Label>
              <Input value={service.icon} onChange={e => updateField(service.id, "icon", e.target.value)} className="mt-1.5 h-11" />
            </div>
            <div>
              <Label className="text-slate-600">Category</Label>
              <select className="flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm mt-1.5" value={service.category} onChange={e => updateField(service.id, "category", e.target.value)}>
                <option value="emergency">Emergency</option>
                <option value="drainage">Drainage</option>
                <option value="hot-water">Hot Water</option>
                <option value="gas">Gas</option>
                <option value="leak-detection">Leak Detection</option>
              </select>
            </div>
          </div>
        </Card>
      ))}
      <div className="pt-4 border-t border-slate-200">
        <SaveButton saved={saved} onClick={handleSave} label="Save All Services" />
      </div>
    </div>
  );
}

function TestimonialsEditor({ data, onSave, onAdd, onDelete }: { data: Testimonial[]; onSave: (t: Testimonial[]) => void; onAdd: () => void; onDelete: (id: string) => void }) {
  const [items, setItems] = useState<Testimonial[]>(data);
  const [saved, setSaved] = useState(false);
  const updateField = (id: string, field: keyof Testimonial, value: string | number) => setItems(items.map(t => t.id === id ? { ...t, [field]: value } : t));
  const handleSave = () => { onSave(items); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-5">
      <Button variant="outline" onClick={onAdd} className="gap-2 h-11">
        <Plus className="h-4 w-4" /> Add Testimonial
      </Button>
      {items.map(item => (
        <Card key={item.id} className="p-5 bg-white border-slate-200/80">
          <div className="flex justify-between mb-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => updateField(item.id, "rating", n)} className="transition-transform hover:scale-125">
                  <Star className={`h-5 w-5 ${n <= item.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} />
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0" onClick={() => onDelete(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><Label className="text-slate-600">Name</Label><Input value={item.name} onChange={e => updateField(item.id, "name", e.target.value)} className="mt-1.5 h-11" /></div>
            <div><Label className="text-slate-600">Suburb</Label><Input value={item.suburb} onChange={e => updateField(item.id, "suburb", e.target.value)} className="mt-1.5 h-11" /></div>
            <div><Label className="text-slate-600">Service</Label><Input value={item.service} onChange={e => updateField(item.id, "service", e.target.value)} className="mt-1.5 h-11" /></div>
          </div>
          <div>
            <Label className="text-slate-600">Review Text</Label>
            <textarea className="flex w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm mt-1.5" rows={2} value={item.text} onChange={e => updateField(item.id, "text", e.target.value)} />
          </div>
        </Card>
      ))}
      <div className="pt-4 border-t border-slate-200">
        <SaveButton saved={saved} onClick={handleSave} label="Save Testimonials" />
      </div>
    </div>
  );
}

function FAQEditor({ data, onSave }: { data: FAQ[]; onSave: (faqs: FAQ[]) => void }) {
  const [faqs, setFaqs] = useState<FAQ[]>(data);
  const [saved, setSaved] = useState(false);
  const updateField = (i: number, field: keyof FAQ, value: string) => { const u = [...faqs]; u[i] = { ...u[i], [field]: value }; setFaqs(u); };
  const handleSave = () => { onSave(faqs); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-5">
      <Button variant="outline" onClick={() => setFaqs([...faqs, { question: "", answer: "" }])} className="gap-2 h-11">
        <Plus className="h-4 w-4" /> Add FAQ
      </Button>
      {faqs.map((faq, i) => (
        <Card key={i} className="p-5 bg-white border-slate-200/80">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-slate-400 border-slate-200 text-xs">FAQ #{i + 1}</Badge>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div><Label className="text-slate-600">Question</Label><Input value={faq.question} onChange={e => updateField(i, "question", e.target.value)} className="mt-1.5 h-11" /></div>
            <div><Label className="text-slate-600">Answer</Label><textarea className="flex w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm mt-1.5" rows={3} value={faq.answer} onChange={e => updateField(i, "answer", e.target.value)} /></div>
          </div>
        </Card>
      ))}
      <div className="pt-4 border-t border-slate-200">
        <SaveButton saved={saved} onClick={handleSave} label="Save FAQs" />
      </div>
    </div>
  );
}

function SubmissionsViewer({ quotes, contacts }: { quotes: Submission[]; contacts: Submission[] }) {
  const [tab, setTab] = useState<"quotes" | "contacts">("quotes");
  const items = tab === "quotes" ? quotes : contacts;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button variant={tab === "quotes" ? "default" : "outline"} size="sm" onClick={() => setTab("quotes")} className="gap-2">
          <FileText className="h-4 w-4" /> Quote Requests <Badge variant="secondary" className="ml-1">{quotes.length}</Badge>
        </Button>
        <Button variant={tab === "contacts" ? "default" : "outline"} size="sm" onClick={() => setTab("contacts")} className="gap-2">
          <MessageSquare className="h-4 w-4" /> Contact Messages <Badge variant="secondary" className="ml-1">{contacts.length}</Badge>
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center bg-slate-50/50 border-dashed">
          <MessageSquare className="h-12 w-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">No {tab === "quotes" ? "quote requests" : "messages"} yet</p>
          <p className="text-slate-300 text-sm mt-1">Submissions will appear here when visitors fill out the form.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <Card key={item.id} className="p-5 bg-white border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.phone} {item.email && `· ${item.email}`}</p>
                    {item.suburb && <p className="text-sm text-slate-400 mt-0.5">{item.suburb} {item.serviceType && `· ${item.serviceType}`} {item.urgency && `· ${item.urgency}`}</p>}
                    {item.message && <p className="text-sm text-slate-600 mt-3 bg-slate-50 rounded-lg p-3 italic">"{item.message}"</p>}
                  </div>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                  {new Date(item.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

const navItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "tracking", label: "Ad Tracking", icon: Target },
  { id: "seo", label: "Page SEO", icon: Search },
  { id: "business", label: "Business Info", icon: Building2 },
  { id: "services", label: "Services", icon: Wrench },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "submissions", label: "Submissions", icon: MessageSquare },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [cmsData, setCmsData] = useState<CmsData | null>(null);
  const [submissions, setSubmissions] = useState<{ quotes: Submission[]; contacts: Submission[] }>({ quotes: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [cmsRes, subRes] = await Promise.all([
        fetch("/api/admin/cms", { credentials: "include" }),
        fetch("/api/admin/submissions", { credentials: "include" }),
      ]);
      if (cmsRes.status === 401) { setLocation("/admin/login"); return; }
      setCmsData(await cmsRes.json());
      setSubmissions(await subRes.json());
    } catch { setLocation("/admin/login"); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => { await apiRequest("POST", "/api/admin/logout"); setLocation("/admin/login"); };
  const saveSEO = async (page: string, seo: PageSEO) => { await apiRequest("PUT", `/api/admin/seo/${page}`, seo); await loadData(); };
  const saveBusinessInfo = async (info: BusinessInfo) => { await apiRequest("PUT", "/api/admin/business-info", info); await loadData(); };
  const saveServices = async (services: ServiceItem[]) => { for (const s of services) await apiRequest("PUT", `/api/admin/services/${s.id}`, s); await loadData(); };
  const deleteService = async (id: string) => { await apiRequest("DELETE", `/api/admin/services/${id}`); await loadData(); };
  const saveTestimonials = async (t: Testimonial[]) => { for (const x of t) await apiRequest("PUT", `/api/admin/testimonials/${x.id}`, x); await loadData(); };
  const addTestimonial = async () => { await apiRequest("POST", "/api/admin/testimonials", { id: String(Date.now()), name: "New Review", suburb: "", service: "", rating: 5, text: "" }); await loadData(); };
  const deleteTestimonial = async (id: string) => { await apiRequest("DELETE", `/api/admin/testimonials/${id}`); await loadData(); };
  const saveFAQs = async (faqs: FAQ[]) => { await apiRequest("PUT", "/api/admin/faqs", faqs); await loadData(); };
  const saveTracking = async (t: TrackingConfig) => { await apiRequest("PUT", "/api/admin/tracking", t); await loadData(); };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 border-[3px] border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!cmsData) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab cmsData={cmsData} submissions={submissions} />;
      case "tracking": return <><SectionHeader icon={<Target className="h-5 w-5 text-rose-600" />} title="Ad Tracking & Analytics" description="Configure tracking pixels for Google, Facebook, and other platforms." /><TrackingEditor data={cmsData.tracking} onSave={saveTracking} /></>;
      case "seo": return <><SectionHeader icon={<Search className="h-5 w-5 text-primary" />} title="Page SEO Settings" description="Edit meta titles, descriptions, and keywords with live Google preview." /><SEOEditor data={cmsData.pageSEO} onSave={saveSEO} /></>;
      case "business": return <><SectionHeader icon={<Building2 className="h-5 w-5 text-primary" />} title="Business Information" description="Update contact details, licence info, and business details." /><BusinessEditor data={cmsData.businessInfo} onSave={saveBusinessInfo} /></>;
      case "services": return <><SectionHeader icon={<Wrench className="h-5 w-5 text-primary" />} title="Services" description="Edit service titles, descriptions, and categories." /><ServicesEditor data={cmsData.services} onSave={saveServices} onDelete={deleteService} /></>;
      case "testimonials": return <><SectionHeader icon={<Star className="h-5 w-5 text-primary" />} title="Testimonials" description="Manage customer reviews displayed on the website." /><TestimonialsEditor data={cmsData.testimonials} onSave={saveTestimonials} onAdd={addTestimonial} onDelete={deleteTestimonial} /></>;
      case "faqs": return <><SectionHeader icon={<HelpCircle className="h-5 w-5 text-primary" />} title="Frequently Asked Questions" description="Manage FAQs — also generates structured data for Google." /><FAQEditor data={cmsData.faqs} onSave={saveFAQs} /></>;
      case "submissions": return <><SectionHeader icon={<MessageSquare className="h-5 w-5 text-primary" />} title="Form Submissions" description="View quote requests and contact messages from visitors." /><SubmissionsViewer quotes={submissions.quotes} contacts={submissions.contacts} /></>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="h-10 w-10 rounded-xl object-cover shadow-sm" />
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-none">Complete Flow</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">CMS Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
              {item.label}
              {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
              <ExternalLink className="h-[18px] w-[18px]" /> View Website
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="h-[18px] w-[18px]" /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-72 bg-white shadow-2xl flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logoImage} alt="Logo" className="h-10 w-10 rounded-xl object-cover" />
                <h1 className="text-sm font-bold text-slate-900">Complete Flow</h1>
              </div>
              <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" /> {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30">
          <div className="px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100">
                <Menu className="h-5 w-5 text-slate-600" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                <LayoutDashboard className="h-4 w-4" />
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-slate-900 capitalize">{navItems.find(n => n.id === activeTab)?.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Site Live
              </div>
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9">
                  <ExternalLink className="h-3.5 w-3.5" /> View Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-6xl">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
