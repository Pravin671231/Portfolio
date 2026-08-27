export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-text-muted md:flex-row">
        <span className="font-mono">PRAVIN K</span>
        <div className="flex items-center gap-6">
          <a href="#" className="transition-colors hover:text-text">
            GitHub
          </a>
          <a href="#" className="transition-colors hover:text-text">
            LinkedIn
          </a>
          <a href="mailto:pravinkumar671231@gmail.com" className="transition-colors hover:text-text">
            Email
          </a>
        </div>
        <span>© 2026 Pravin</span>
      </div>
    </footer>
  );
}
