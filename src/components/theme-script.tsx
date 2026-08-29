// Runs before paint so there's no flash of the wrong theme. Mirrors the
// original static site's inline <head> script exactly (same localStorage
// key, same default), just expressed as a Next.js Script component.
const THEME_SCRIPT = `
try {
  var t = localStorage.getItem("ht-theme") || "dark";
  document.documentElement.setAttribute("data-theme", t);
} catch (e) {}
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
