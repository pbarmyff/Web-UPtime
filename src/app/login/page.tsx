"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, ShieldAlert, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-background text-white selection:bg-brand-accent/30 font-sans">
      {/* Left side - Decorative/Marketing */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-brand-surface via-brand-background to-brand-surface/50 border-r border-white/5 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl mix-blend-screen opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-brand-accent/5 to-transparent"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Activity className="h-8 w-8 text-brand-accent" />
            <span className="text-2xl font-bold tracking-tight">UptimeMonitor</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-lg"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 text-balance">
              Welcome back to your command center.
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Log in to manage your monitors, check incident reports, and ensure your infrastructure is running smoothly.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-6 mt-12">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent mt-1">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-white">Real-time alerts</h3>
              <p className="text-sm text-brand-muted">Get notified instantly when things go down.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent mt-1">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-white">Incident tracking</h3>
              <p className="text-sm text-brand-muted">Keep your team and users informed automatically.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-24 relative flex-1 min-h-screen lg:min-h-0">
        <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
            <Activity className="h-6 w-6 text-brand-accent" />
            <span className="text-xl font-bold tracking-tight">UptimeMonitor</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Sign in</h2>
            <p className="mt-2 text-sm text-brand-muted">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm flex items-start gap-3"
              >
                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full bg-brand-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors sm:text-sm"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <Link href="#" className="text-xs text-brand-muted hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full bg-brand-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none transition-colors sm:text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center items-center gap-2 rounded-lg bg-brand-accent px-4 py-3 text-sm font-semibold text-brand-background hover:bg-brand-accent/90 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-background transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-brand-muted mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-white hover:text-brand-accent transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
