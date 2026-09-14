// The site's own facts: which product it is, its nav, its footer. Every
// page imports this so the frame is defined once.
export const site = {
  product: "latchkey",
  links: [
    { label: "Product", href: "/#product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs/quickstart" },
    { label: "Changelog", href: "/changelog" },
  ],
  secondary: { label: "Sign in", href: "https://console.latchkey.id" },
  columns: [
    { title: "Product", links: [{ label: "Features", href: "/#product" }, { label: "Pricing", href: "/pricing" }, { label: "Changelog", href: "/changelog" }] },
    { title: "Developers", links: [{ label: "Quickstart", href: "/docs/quickstart" }, { label: "Auth hooks", href: "/docs/auth-hooks" }, { label: "Discovery", href: "https://auth.latchkey.id/.well-known/openid-configuration" }] },
    { title: "Company", links: [{ label: "GitHub", href: "https://github.com/latchkeyid" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
  ],
};
