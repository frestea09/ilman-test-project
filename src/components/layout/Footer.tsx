export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-card">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Ilman Teguh Prasetya. All rights reserved.</p>
        <p className="mt-1">Portfolio Pro - Built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
