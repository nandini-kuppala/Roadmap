import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-text-primary">PlacementPro</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-accent hover:bg-accent-dark text-background rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium">60-Day Structured Program</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary leading-tight mb-6">
            Crack Your{' '}
            <span className="gradient-text">Dream Job</span>
            <br />
            in 60 Days
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            A structured, gamified 60-day SDE interview preparation platform. Daily DSA problems,
            theory topics, and interview questions — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-accent to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-accent/20 hover:scale-105 transition-all"
            >
              Start Your Journey →
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-surface border border-border text-text-primary rounded-xl font-semibold text-lg hover:border-accent/40 transition-all"
            >
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'DSA Problems', value: '100+' },
              { label: 'Theory Topics', value: '60+' },
              { label: 'Day Program', value: '60' },
              { label: 'Companies Targeted', value: '50+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Everything You Need to Get Placed</h2>
            <p className="text-text-secondary">A complete system built for serious placement seekers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📅',
                title: "Daily Structured Plan",
                desc: "Each of the 60 days has a clear theory topic, 2 DSA problems, and interview questions. No guessing what to study.",
              },
              {
                icon: '🧩',
                title: '100 Curated DSA Problems',
                desc: 'Hand-picked NeetCode-style problems organized by pattern — Arrays, Trees, DP, Graphs, and more.',
              },
              {
                icon: '🎮',
                title: 'Gamified Progress',
                desc: 'Earn XP, maintain streaks, level up, and watch your progress ring fill day by day.',
              },
              {
                icon: '🔒',
                title: 'Day Unlock System',
                desc: 'Days unlock sequentially — complete all 3 tasks (theory + DSA + interview Qs) to advance.',
              },
              {
                icon: '📊',
                title: 'Progress Calendar',
                desc: '60-day visual calendar showing completed (green), available, and locked days at a glance.',
              },
              {
                icon: '💬',
                title: 'Direct Mentor Chat',
                desc: 'Chat directly with your placement coach. Get doubts resolved, motivation, and guidance.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-all card-hover"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Overview */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-3">The 60-Day Roadmap</h2>
            <p className="text-text-secondary">Strategically designed phases for maximum interview readiness</p>
          </div>

          <div className="space-y-4">
            {[
              {
                phase: 'Phase 1',
                days: 'Days 1–30',
                color: 'from-accent to-blue-500',
                topics: ['OOPs & Design Patterns', 'DBMS & SQL', 'Operating Systems', 'Computer Networks', 'Dev Stack (React, Node, MongoDB)', 'System Design Basics'],
                dsa: 'Arrays, Two Pointers, Sliding Window, Stack, Linked List, Binary Search',
              },
              {
                phase: 'Phase 2A',
                days: 'Days 31–33',
                color: 'from-purple-500 to-pink-500',
                topics: ['Self Introduction (STAR method)', 'Behavioural Interview Prep', 'LinkedIn & Resume Polish', 'Job Application Strategy'],
                dsa: 'Rest & consolidation',
              },
              {
                phase: 'Phase 2B',
                days: 'Days 34–60',
                color: 'from-orange-500 to-red-500',
                topics: ['Advanced DSA Deep Dive', 'Mock Interviews', 'System Design Mocks', 'Company-specific Problems'],
                dsa: 'Trees, Tries, Backtracking, Graphs, DP, Greedy, Bit Manipulation',
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                className="bg-surface border border-border rounded-2xl p-6 overflow-hidden relative"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${phase.color}`}
                />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white`}>
                      {phase.phase}
                    </span>
                    <span className="text-text-muted text-sm">{phase.days}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Theory</p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.topics.map((t) => (
                          <span key={t} className="text-xs bg-surface-2 text-text-secondary rounded-full px-2.5 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">DSA</p>
                      <p className="text-sm text-text-secondary">{phase.dsa}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-text-primary mb-4">
            Ready to Start?
          </h2>
          <p className="text-text-secondary mb-8 text-lg">
            Join the batch and start your structured 60-day journey today.
            <br />
            The best time to start is now.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-accent to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-accent/30 hover:scale-105 transition-all"
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-text-muted text-sm mt-4">
            &ldquo;The best time to plant a tree was 3 years ago. The second best time is now.&rdquo;
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center text-text-muted text-sm">
        <p>© 2026 PlacementPro. Built for placement warriors.</p>
      </footer>
    </div>
  );
}
