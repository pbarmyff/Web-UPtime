"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Activity, ShieldCheck, Zap, BellRing, Link as LinkIcon, BarChart3, Database, Menu, X } from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, (shouldReduceMotion || isMobile) ? 0 : -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, (shouldReduceMotion || isMobile) ? 1 : 0]);
  const blobY = useTransform(scrollY, [0, 800], [0, (shouldReduceMotion || isMobile) ? 0 : 200]);

  // Entrance animations variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 12, stiffness: 100 } },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const headline = "Monitor your infrastructure 24/7.";
  const headlineWords = headline.split(" ");

  return (
    <div className="min-h-screen bg-[#070D1F] text-[#EDF2FF] font-sans selection:bg-[#4FFFB0] selection:text-[#070D1F] overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#070D1F]/80 backdrop-blur-md border-b border-[#5A6A8A]/20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center group">
              <Activity className="h-8 w-8 text-[#4FFFB0] group-hover:scale-110 transition-transform" />
              <span className="ml-3 text-2xl font-bold font-display tracking-tight text-white">UptimeMonitor</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-[#5A6A8A] hover:text-[#4FFFB0] font-medium transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4FFFB0] transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/login" className="text-[#EDF2FF] hover:text-[#4FFFB0] font-medium transition-colors relative group">
                Log in
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4FFFB0] transition-all group-hover:w-full"></span>
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/signup" className="bg-[#4FFFB0] text-[#070D1F] px-6 py-3 rounded-none font-bold text-sm tracking-wide transition-colors hover:bg-white">
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" aria-expanded={isMobileMenuOpen} className="text-[#EDF2FF] hover:text-[#4FFFB0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FFFB0] rounded-sm">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-[100] bg-[#0F1A35] p-6 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-[#4FFFB0]" />
                <span className="ml-3 text-2xl font-bold font-display tracking-tight text-white">UptimeMonitor</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="text-[#EDF2FF] hover:text-[#4FFFB0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FFFB0] rounded-sm">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col space-y-8 text-2xl font-display font-bold">
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4FFFB0]">Features</Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4FFFB0]">Log in</Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-[#4FFFB0]">Get Started Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-16 min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Parallax Blob */}
        <motion.div
            style={{ y: blobY }}
            className="absolute top-1/4 right-[10%] w-[600px] h-[600px] bg-[#4FFFB0]/10 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

          {/* Text Left */}
          <motion.div
            className="lg:col-span-6 text-left"
            style={{ y: heroY }}
          >
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-display font-extrabold text-white leading-[1.05] tracking-tight mb-6 text-balance"
            >
              <div className="text-[#5A6A8A] font-medium text-xl mb-4 tracking-widest uppercase">Never miss a beat</div>
              {headlineWords.map((word, idx) => (
                <motion.span key={idx} variants={wordVariant} className="inline-block mr-[0.3em]">
                  {word === "24/7." ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FFFB0] to-teal-200">
                      {word}
                    </span>
                  ) : word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }}
              style={{ opacity: heroOpacity }}
              className="text-[clamp(1.125rem,2vw,1.5rem)] text-[#8B9CBE] mb-12 max-w-xl leading-relaxed font-light"
            >
              The complete, production-ready full-stack monitoring platform. Track uptime, resolve incidents, manage SSL expiry, and configure smart alerts in one unified deep navy dashboard.
            </motion.h2>

            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/signup" className="flex justify-center items-center bg-[#4FFFB0] text-[#070D1F] px-8 py-4 rounded-none text-lg font-bold hover:bg-white transition-colors w-full sm:w-auto">
                  Start Monitoring Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/login" className="flex justify-center items-center bg-transparent text-white border border-[#5A6A8A]/50 px-8 py-4 rounded-none text-lg font-bold hover:bg-[#0F1A35] transition-colors w-full sm:w-auto">
                  Go to Dashboard
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual Right (Mockup) */}
          <motion.div
            className="lg:col-span-6 relative w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", damping: 20 }}
          >
            <div className="relative bg-[#0F1A35] shadow-2xl border border-[#5A6A8A]/30 overflow-hidden ring-1 ring-white/5 rounded-xl transform lg:rotate-y-[-10deg] lg:rotate-x-[5deg] lg:scale-105 perspective-1000 group hover:rotate-y-[-5deg] transition-transform duration-700 ease-out">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4FFFB0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="bg-[#070D1F] px-4 py-3 flex items-center border-b border-[#5A6A8A]/30 space-x-2 relative z-10">
                    <div className="w-3 h-3 rounded-none bg-[#5A6A8A]"></div>
                    <div className="w-3 h-3 rounded-none bg-[#5A6A8A]"></div>
                    <div className="w-3 h-3 rounded-none bg-[#5A6A8A]"></div>
                    <div className="ml-4 bg-[#0F1A35] px-4 py-1 rounded-none text-xs text-[#5A6A8A] font-mono flex-1 text-center truncate">
                        app.uptimemonitor.com
                    </div>
                </div>

                <div className="flex">
                    <div className="hidden sm:block w-48 bg-[#070D1F] border-r border-[#5A6A8A]/30 p-4 min-h-[400px]">
                        <div className="space-y-3">
                            <div className="h-8 bg-[#4FFFB0]/10 rounded-none flex items-center px-3 border border-[#4FFFB0]/30">
                                <Activity size={16} className="text-[#4FFFB0] mr-2" />
                                <div className="h-2 w-16 bg-[#4FFFB0]/50 rounded-none"></div>
                            </div>
                            <div className="h-8 hover:bg-[#0F1A35] rounded-none flex items-center px-3">
                                <BarChart3 size={16} className="text-[#5A6A8A] mr-2" />
                                <div className="h-2 w-20 bg-[#5A6A8A] rounded-none"></div>
                            </div>
                            <div className="h-8 hover:bg-[#0F1A35] rounded-none flex items-center px-3">
                                <BellRing size={16} className="text-[#5A6A8A] mr-2" />
                                <div className="h-2 w-14 bg-[#5A6A8A] rounded-none"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#0F1A35] p-6 min-h-[400px]">
                        <div className="h-6 w-32 bg-[#5A6A8A]/40 rounded-none mb-6"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-[#070D1F] p-4 rounded-none border border-[#5A6A8A]/30">
                                <div className="h-3 w-16 bg-[#5A6A8A]/50 rounded-none mb-3"></div>
                                <div className="h-8 w-12 bg-[#4FFFB0] rounded-none"></div>
                            </div>
                            <div className="bg-[#070D1F] p-4 rounded-none border border-[#5A6A8A]/30">
                                <div className="h-3 w-16 bg-[#5A6A8A]/50 rounded-none mb-3"></div>
                                <div className="h-8 w-8 bg-red-400 rounded-none"></div>
                            </div>
                            <div className="bg-[#070D1F] p-4 rounded-none border border-[#5A6A8A]/30">
                                <div className="h-3 w-20 bg-[#5A6A8A]/50 rounded-none mb-3"></div>
                                <div className="h-8 w-12 bg-[#EDF2FF] rounded-none"></div>
                            </div>
                        </div>

                        <div className="bg-[#070D1F] border border-[#5A6A8A]/30 rounded-none p-4 h-48 flex items-end justify-between px-8 space-x-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5A6A8A10_1px,transparent_1px),linear-gradient(to_bottom,#5A6A8A10_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                            {[40, 60, 30, 80, 40, 90, 50, 30, 20, 100, 40, 70].map((h, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  transition={{ duration: 1, delay: 0.5 + (i * 0.05), ease: "easeOut" }}
                                  className="w-full bg-[#4FFFB0] hover:bg-white rounded-t-none relative z-10"
                                ></motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-[#0F1A35] border-t border-[#5A6A8A]/20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-24 flex items-end justify-between border-b border-[#5A6A8A]/30 pb-8"
          >
            <div>
              <span className="text-[#4FFFB0] font-mono text-xl mb-4 block">01 / Features</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-bold text-white leading-tight text-balance">
                Everything you need <br className="hidden md:block" />to stay online.
              </h2>
            </div>
            <p className="hidden md:block max-w-sm text-[#5A6A8A] text-lg text-right">
              A comprehensive suite of monitoring tools seamlessly integrated into one robust application.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {/* Feature 1 (7 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-7 bg-[#070D1F] p-10 lg:p-14 border-l-4 border-l-[#4FFFB0] border border-[#5A6A8A]/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#0F1A35] border border-[#5A6A8A]/40 text-[#4FFFB0] rounded-none flex items-center justify-center mb-8">
                      <Activity size={28} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Multi-Protocol Checks</h3>
                  <p className="text-[#5A6A8A] text-lg leading-relaxed max-w-lg">
                      Monitor via HTTP/HTTPS, custom headers, payload bodies, Ping, and Heartbeat (Cron) endpoints. Supports keyword validation and custom expected status codes.
                  </p>
                </div>
            </motion.div>

            {/* Feature 2 (5 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-5 bg-[#070D1F] p-10 lg:p-14 border border-[#5A6A8A]/20 relative group hover:border-[#4FFFB0]/50 transition-colors">
                <div className="w-14 h-14 bg-[#0F1A35] border border-[#5A6A8A]/40 text-white rounded-none flex items-center justify-center mb-8">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">SSL & Security</h3>
                <p className="text-[#5A6A8A] text-lg leading-relaxed">
                    Automatically checks HTTPS connections for valid SSL certificates, tracking expiry dates and displaying critical warnings.
                </p>
            </motion.div>

            {/* Feature 3 (4 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-4 bg-[#070D1F] p-10 border border-[#5A6A8A]/20 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-[#0F1A35] border border-[#5A6A8A]/40 text-white flex items-center justify-center mb-6">
                    <BellRing size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">Smart Alerting & Retries</h3>
                <p className="text-[#5A6A8A] leading-relaxed">
                    Advanced retry logic ensures no false-positives. Dispatch webhook or email alerts instantly.
                </p>
            </motion.div>

            {/* Feature 4 (4 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-4 bg-[#070D1F] p-10 border border-[#5A6A8A]/20 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-[#0F1A35] border border-[#5A6A8A]/40 text-white flex items-center justify-center mb-6">
                    <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">Incident Timeline</h3>
                <p className="text-[#5A6A8A] leading-relaxed">
                    Automatically logs downtime events, tracking latency. Export historical metrics via CSV.
                </p>
            </motion.div>

            {/* Feature 5 (4 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-4 bg-[#070D1F] p-10 border border-[#5A6A8A]/20 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-[#0F1A35] border border-[#5A6A8A]/40 text-white flex items-center justify-center mb-6">
                    <LinkIcon size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">Public Status Pages</h3>
                <p className="text-[#5A6A8A] leading-relaxed">
                    Generate customizable status pages to transparently communicate system health.
                </p>
            </motion.div>

            {/* Feature 6 (6 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-6 bg-[#070D1F] p-10 lg:p-14 border border-[#5A6A8A]/20 hover:border-white/20 transition-colors">
                <div className="w-14 h-14 bg-[#0F1A35] border border-[#5A6A8A]/40 text-[#4FFFB0] flex items-center justify-center mb-8">
                    <Zap size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Maintenance Windows</h3>
                <p className="text-[#5A6A8A] text-lg leading-relaxed">
                    Schedule upcoming maintenance windows to temporarily suppress downtime alerts and pause pinging.
                </p>
            </motion.div>

            {/* Feature 7 (6 cols) */}
            <motion.div variants={scaleInVariant} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="md:col-span-6 bg-[#070D1F] p-10 lg:p-14 border-t-4 border-t-[#EDF2FF] border border-[#5A6A8A]/20">
                <div className="w-14 h-14 bg-[#0F1A35] border border-[#5A6A8A]/40 text-white flex items-center justify-center mb-8">
                    <Database size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Admin Panel & RBAC</h3>
                <p className="text-[#5A6A8A] text-lg leading-relaxed">
                    Secure role-based access limits administrative powers. Manage users, toggle monitors, and view complete audit logs.
                </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070D1F] text-[#5A6A8A] py-16 border-t border-[#5A6A8A]/20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
                <Activity className="h-6 w-6 text-[#4FFFB0]" />
                <span className="ml-2 text-xl font-bold font-display tracking-tight text-white">UptimeMonitor</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium">
                <a href="#" className="hover:text-[#4FFFB0] transition-colors relative group">
                    Privacy Policy
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4FFFB0] transition-all group-hover:w-full"></span>
                </a>
                <a href="#" className="hover:text-[#4FFFB0] transition-colors relative group">
                    Terms of Service
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4FFFB0] transition-all group-hover:w-full"></span>
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
}
