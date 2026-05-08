import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Lock, User, ArrowRight, Wrench } from "lucide-react";
import logoImage from "@assets/logo_1766462914112.jpeg";
import heroImage from "@assets/image_1766464585703.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/login", { username, password });
      setLocation("/admin");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 relative items-end p-12"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-primary/30" />
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">Content Management System</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Manage your website content with ease
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Update SEO meta tags, edit service descriptions, manage testimonials,
            and track form submissions — all from one dashboard.
          </p>
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Secure Access</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Encrypted Session</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img
              src={logoImage}
              alt="Complete Flow Plumbing"
              className="h-16 w-16 rounded-xl mx-auto mb-5 object-cover shadow-lg ring-2 ring-primary/20"
            />
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500 mt-2">Sign in to the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10 h-12 bg-white border-slate-200 text-slate-900 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 h-12 bg-white border-slate-200 text-slate-900 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Complete Flow Plumbing &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
