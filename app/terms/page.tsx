export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Layered background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(120,0,255,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[56px_56px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-32 sm:py-40">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff0066] to-[#7000ff]">
              Service
            </span>
          </h1>
        </div>

        {/* Content card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 sm:p-10 shadow-[0_0_30px_rgba(200,0,255,0.15)] space-y-6">
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            By using 360 Hive by Queens services, you agree to project scope, timelines,
            and delivery terms as communicated in signed proposals.
          </p>
        </div>
      </div>
    </main>
  );
}
