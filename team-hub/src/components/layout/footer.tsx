export const Footer = () => (
  <footer className="mx-auto mt-16 max-w-6xl rounded-3xl bg-white/50 px-10 py-8 text-sm text-ink-500 shadow-inner-soft">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1 text-xs uppercase tracking-[0.25em] text-ink-400">
        <span>Team Forge</span>
        <span>Craft better futures together</span>
      </div>
      <div className="flex gap-6">
        <a href="https://vercel.com" className="hover:text-accent-500">
          Powered by Vercel
        </a>
        <a href="https://nextjs.org" className="hover:text-accent-500">
          Built with Next.js 16
        </a>
      </div>
    </div>
  </footer>
);
