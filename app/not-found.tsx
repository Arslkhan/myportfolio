export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <p className="text-[10px] tracking-[4px] text-accent-purple uppercase font-semibold mb-4">
        404
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Page not found.
      </h1>
      <p className="text-sm text-white/40 mb-8 max-w-xs">
        This page doesn&apos;t exist. Maybe it never did.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Back to home
      </a>
    </main>
  )
}
