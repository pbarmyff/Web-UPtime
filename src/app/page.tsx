"use client";

import { Activity, ShieldCheck, BellRing, BarChart3, Link as LinkIcon, Zap, Database } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Spotlight } from "@/components/aceternity/spotlight";
import { WavyBackground } from "@/components/aceternity/wavy-background";
import { Meteors } from "@/components/aceternity/meteors";
import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";

export default function Home() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };

  const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-background text-brand-text font-sans selection:bg-brand-accent selection:text-brand-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-brand-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center group cursor-pointer">
                <div className="relative">
                    <Activity className="h-7 w-7 text-brand-accent transition-transform duration-500 group-hover:rotate-180" />
                    <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
                <span className="ml-3 text-2xl font-bold font-display tracking-tight text-white">UptimeMonitor</span>
            </div>
            <div className="flex space-x-6 items-center">
                <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">Log In</Link>
                <HoverBorderGradient containerClassName="rounded-full" className="bg-brand-background">
                    <Link href="/signup" className="text-sm font-semibold text-white px-4 py-2">
                        Get Started
                    </Link>
                </HoverBorderGradient>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden isolate">
        <BackgroundBeams className="opacity-30" />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 relative">

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUpVariant} className="mb-6 inline-flex items-center space-x-2 bg-brand-surface/50 border border-brand-accent/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-xs font-medium text-brand-accent uppercase tracking-wider">v2.0 is live</span>
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-[clamp(3rem,6vw,5.5rem)] font-display font-extrabold text-white leading-[1.05] tracking-tight mb-8">
              Zero downtime. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#00d2ff]">Infinite visibility.</span>
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-brand-muted mb-10 leading-relaxed font-light max-w-xl">
              The modern standard for infrastructure monitoring. Ping endpoints, track SSL, and alert your team before users even notice.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4">
               <HoverBorderGradient containerClassName="rounded-full" className="bg-brand-surface">
                   <Link href="/signup" className="flex items-center justify-center text-lg font-semibold text-white px-8 py-3">
                        Start Monitoring Free
                        <Activity className="ml-2 h-5 w-5" />
                   </Link>
               </HoverBorderGradient>
               <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-medium border-brand-muted/30 text-brand-text hover:bg-brand-surface hover:text-white transition-all">
                  <Link href="#features">
                      Explore Features
                  </Link>
               </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={scaleInVariant}
            className="relative lg:ml-auto w-full max-w-[600px] hidden md:block"
          >
            <div className="absolute inset-0 bg-brand-accent/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-brand-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
                <Meteors number={10} className="opacity-30" />
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                    </div>
                    <div className="text-xs font-mono text-brand-muted">api.production.internal</div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-brand-background/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                <Activity className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Main API Endpoint</div>
                                <div className="text-xs text-brand-muted font-mono">https://api.example.com</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-green-400 font-medium">UP</div>
                            <div className="text-xs text-brand-muted">45ms ping</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-brand-background/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <Zap className="h-5 w-5 text-red-400" />
                            </div>
                            <div>
                                <div className="text-white font-medium">Payment Gateway</div>
                                <div className="text-xs text-brand-muted font-mono">https://pay.example.com</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-red-400 font-medium animate-pulse">DOWN</div>
                            <div className="text-xs text-brand-muted">Timeout</div>
                        </div>
                    </div>

                    <div className="bg-brand-background/50 border border-white/5 rounded-xl p-4 h-32 flex items-end justify-between px-6 relative overflow-hidden">
                        {[40, 60, 30, 80, 40, 90, 50, 30, 20, 100, 40, 70].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: 0.5 + (i * 0.05), ease: "easeOut" as any }}
                              className="w-full mx-1 bg-brand-accent/80 hover:bg-white rounded-t-sm relative z-10"
                            ></motion.div>
                        ))}
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative z-10 bg-brand-surface">
        <WavyBackground className="max-w-4xl mx-auto pb-40" containerClassName="absolute inset-0 h-full opacity-10 pointer-events-none" colors={["#4FFFB0", "#00d2ff", "#5A6A8A"]} waveOpacity={0.3} backgroundFill="#0F1A35" />
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-24 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-brand-muted/20 pb-8"
          >
            <div>
              <span className="text-brand-accent font-mono text-xl mb-4 block">01 / Features</span>
              <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-display font-bold text-white leading-tight text-balance">
                Built for <br className="hidden md:block" />resilience.
              </h2>
            </div>
            <p className="mt-6 md:mt-0 max-w-sm text-brand-muted text-lg md:text-right">
              A comprehensive suite of monitoring tools designed to keep your infrastructure reliable and transparent.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Feature 1 */}
            <motion.div variants={scaleInVariant} className="md:col-span-8 bg-brand-background/80 backdrop-blur-sm p-10 lg:p-14 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-brand-accent/50 transition-colors">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-brand-surface border border-white/10 text-brand-accent rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-brand-accent/20">
                      <Activity size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Multi-Protocol Checks</h3>
                  <p className="text-brand-muted text-xl leading-relaxed max-w-xl">
                      Monitor via HTTP/HTTPS, custom headers, payload bodies, Ping, and Heartbeat (Cron) endpoints. Supports keyword validation and custom expected status codes.
                  </p>
                </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={scaleInVariant} className="md:col-span-4 bg-brand-background/80 backdrop-blur-sm p-10 lg:p-14 rounded-3xl border border-white/5 relative group hover:border-brand-accent/50 transition-colors">
                <div className="w-14 h-14 bg-brand-surface border border-white/10 text-white rounded-2xl flex items-center justify-center mb-8">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">SSL Security</h3>
                <p className="text-brand-muted text-lg leading-relaxed">
                    Automatically checks HTTPS connections for valid SSL certificates and tracks expiry.
                </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={scaleInVariant} className="md:col-span-4 bg-brand-background/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-brand-surface border border-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                    <BellRing size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">Smart Alerting</h3>
                <p className="text-brand-muted leading-relaxed">
                    Advanced retry logic ensures no false-positives. Dispatch webhook or email alerts instantly.
                </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={scaleInVariant} className="md:col-span-4 bg-brand-background/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-brand-surface border border-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                    <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">Incident Timeline</h3>
                <p className="text-brand-muted leading-relaxed">
                    Automatically logs downtime events, tracking latency. Export historical metrics via CSV.
                </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={scaleInVariant} className="md:col-span-4 bg-brand-background/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-brand-surface border border-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                    <LinkIcon size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">Status Pages</h3>
                <p className="text-brand-muted leading-relaxed">
                    Generate customizable status pages to transparently communicate system health.
                </p>
            </motion.div>

             {/* Feature 6 */}
             <motion.div variants={scaleInVariant} className="md:col-span-6 bg-brand-background/80 backdrop-blur-sm p-10 lg:p-14 rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-14 h-14 bg-brand-surface border border-white/10 text-[#00d2ff] rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-[#00d2ff]/20">
                    <Zap size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Maintenance Windows</h3>
                <p className="text-brand-muted text-lg leading-relaxed">
                    Schedule upcoming maintenance windows to temporarily suppress downtime alerts and pause pinging.
                </p>
            </motion.div>

            {/* Feature 7 */}
            <motion.div variants={scaleInVariant} className="md:col-span-6 bg-brand-background/80 backdrop-blur-sm p-10 lg:p-14 rounded-3xl border border-white/5 hover:border-brand-accent/50 transition-colors">
                <div className="w-14 h-14 bg-brand-surface border border-white/10 text-brand-accent rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-brand-accent/20">
                    <Database size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Admin Panel & RBAC</h3>
                <p className="text-brand-muted text-lg leading-relaxed">
                    Secure role-based access limits administrative powers. Manage users, toggle monitors, and view complete audit logs.
                </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-background text-brand-muted py-16 border-t border-white/5 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
                <Activity className="h-6 w-6 text-brand-accent" />
                <span className="ml-2 text-xl font-bold font-display tracking-tight text-white">UptimeMonitor</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium">
                <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
