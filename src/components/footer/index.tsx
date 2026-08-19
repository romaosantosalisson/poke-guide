import "./footer.css";

export function Footer() {
  return (
    <footer className="app-footer">
      <p className="footer-content">
        &copy; {new Date().getFullYear()} <strong>Poke Guide</strong> — built with ❤️ and ☕ by{" "}
        <strong className="footer-author">Álisson</strong>
      </p>
    </footer>
  );
}
