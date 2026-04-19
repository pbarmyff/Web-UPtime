import Link from "next/link";
import { Activity, ShieldCheck, Zap, BellRing, Link as LinkIcon, BarChart3, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">UptimeMonitor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                Log in
              </Link>
              <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-white to-gray-50 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Never miss a beat. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Monitor your infrastructure 24/7.
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The complete, production-ready full-stack monitoring platform built entirely on Next.js. Track uptime, track incidents, manage SSL expiry, and configure smart alerts in one unified dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Start Monitoring Free
            </Link>
            <Link href="/login" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-50 shadow-sm transition-all">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Dashboard Mockup Frame */}
        <div className="mt-20 max-w-5xl mx-auto relative group">
            {/* Decorative background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

            {/* The "Software Image" Frame */}
            <div className="relative bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden text-left ring-1 ring-white/10">
                {/* Browser/Window Header */}
                <div className="bg-gray-800 px-4 py-3 flex items-center border-b border-gray-700 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 bg-gray-700 px-4 py-1 rounded text-xs text-gray-400 font-mono flex-1 text-center truncate">
                        app.uptimemonitor.com/dashboard
                    </div>
                </div>

                {/* Fake Dashboard Content */}
                <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden sm:block w-48 bg-gray-800 border-r border-gray-700 p-4 min-h-[400px]">
                        <div className="space-y-3">
                            <div className="h-8 bg-indigo-500/20 rounded flex items-center px-3 border border-indigo-500/30">
                                <Activity size={16} className="text-indigo-400 mr-2" />
                                <div className="h-2 w-16 bg-indigo-400/50 rounded"></div>
                            </div>
                            <div className="h-8 bg-gray-700 rounded flex items-center px-3">
                                <BarChart3 size={16} className="text-gray-400 mr-2" />
                                <div className="h-2 w-20 bg-gray-500 rounded"></div>
                            </div>
                            <div className="h-8 bg-gray-700 rounded flex items-center px-3">
                                <BellRing size={16} className="text-gray-400 mr-2" />
                                <div className="h-2 w-14 bg-gray-500 rounded"></div>
                            </div>
                        </div>
                    </div>
                    {/* Main Content Area */}
                    <div className="flex-1 bg-gray-900 p-6 min-h-[400px]">
                        <div className="h-6 w-32 bg-gray-700 rounded mb-6"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div className="h-3 w-16 bg-gray-600 rounded mb-3"></div>
                                <div className="h-8 w-12 bg-green-400 rounded"></div>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div className="h-3 w-16 bg-gray-600 rounded mb-3"></div>
                                <div className="h-8 w-8 bg-red-400 rounded"></div>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div className="h-3 w-20 bg-gray-600 rounded mb-3"></div>
                                <div className="h-8 w-12 bg-indigo-400 rounded"></div>
                            </div>
                        </div>

                        {/* Fake Chart Area */}
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 h-48 flex items-end justify-between px-8 space-x-2">
                            {[40, 60, 30, 80, 40, 90, 50, 30, 20, 100, 40, 70].map((h, i) => (
                                <div key={i} className="w-full bg-indigo-500/50 hover:bg-indigo-400 rounded-t" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Everything you need to stay online</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              A comprehensive suite of monitoring tools seamlessly integrated into one full-stack Next.js app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                    <Activity size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Protocol Checks</h3>
                <p className="text-gray-600 leading-relaxed">
                    Monitor via HTTP/HTTPS, custom headers, payload bodies, Ping, and Heartbeat (Cron) endpoints. Supports keyword validation and custom expected status codes.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">SSL & Security Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                    Automatically checks HTTPS connections for valid SSL certificates, tracking expiry dates and displaying critical warnings before certs expire.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                    <BellRing size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Alerting & Retries</h3>
                <p className="text-gray-600 leading-relaxed">
                    Advanced retry logic ensures no false-positives. Instantly dispatch webhook or email alerts to your team the moment a service genuinely goes down.
                </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                    <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Incident Timeline</h3>
                <p className="text-gray-600 leading-relaxed">
                    Automatically logs downtime events, tracking response time latency across historical bounds. Export historical metrics via CSV in one click.
                </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-6">
                    <LinkIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Public Status Pages</h3>
                <p className="text-gray-600 leading-relaxed">
                    Generate beautiful, customizable public status pages to transparently communicate system health and ongoing incidents with your users.
                </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Maintenance Windows</h3>
                <p className="text-gray-600 leading-relaxed">
                    Schedule upcoming maintenance windows to temporarily suppress downtime alerts and pause pinging, preventing unnecessary panic and noise.
                </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow lg:col-start-2">
                <div className="w-12 h-12 bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center mb-6">
                    <Database size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Panel & RBAC</h3>
                <p className="text-gray-600 leading-relaxed">
                    Secure role-based access limits administrative powers. Manage all users, toggle global monitors, and view complete system-wide audit logs.
                </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-xl font-bold tracking-tight">UptimeMonitor</span>
            </div>
            <p className="text-gray-400 mb-6">Built natively on Next.js</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
