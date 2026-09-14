// The house: every product that ships a site on this shell, with the
// accent it uses and where it lives. The footer's "the house" row and
// the playground's theme switcher read this; a product's own site passes
// its `id` to <Site> so the ring can leave it out.
export type Product = {
  id: string;
  name: string;
  /** One line, the way the README says it. */
  line: string;
  url: string;
  /** src/theme/<accent>.css */
  accent: string;
  /** Sign-in / console URL when the product has one. */
  console?: string;
};

export const house: Product[] = [
  { id: "latchkey", name: "Latchkey", line: "Passwordless identity for every product on the ring.", url: "https://latchkey.id", accent: "latchkey", console: "https://console.latchkey.id" },
  { id: "tripline", name: "Tripline", line: "Errors and performance, Sentry-compatible, in-house.", url: "https://tripline.id", accent: "tripline", console: "https://app.tripline.id" },
  { id: "runsheet", name: "Runsheet", line: "Infrastructure tooling for teams that ship on GitHub.", url: "https://runsheet.dev", accent: "runsheet", console: "https://console.runsheet.dev" },
  { id: "wardroom", name: "Wardroom", line: "The team hub: every tool's feed in one place.", url: "https://wardroom.id", accent: "wardroom", console: "https://app.wardroom.id" },
  { id: "purser", name: "Purser", line: "Support, contacts and leads for your products.", url: "https://purser.id", accent: "purser", console: "https://app.purser.id" },
  { id: "foghorn", name: "Foghorn", line: "Campaigns, email and attribution, loud and clear.", url: "https://foghorn.id", accent: "foghorn", console: "https://app.foghorn.id" },
  { id: "grapevine", name: "Grapevine", line: "Local hiring for hospitality and retail.", url: "https://gvn.au", accent: "grapevine", console: "https://app.gvn.au" },
  { id: "inflow", name: "inflow", line: "Filing and payments infrastructure for US businesses.", url: "https://myinflow.com", accent: "inflow" },
  { id: "payntally", name: "Pay N Tally", line: "Contractor payments with the 1099s done.", url: "https://www.payntally.com", accent: "payntally" },
  { id: "ten99", name: "1099-W9", line: "1099 filing, W-9 collection, TIN matching.", url: "https://1099-w9.com", accent: "ten99" },
  { id: "optrader", name: "optrader", line: "The marketplace for card traders.", url: "https://optrader.com.au", accent: "optrader" },
  { id: "thirtysixzero", name: "thirtysixzero", line: "Configuration items, connected to the tools that run your business.", url: "https://thirtysixzero.io", accent: "thirtysixzero" },
  { id: "projectmesh", name: "Project Mesh", line: "Specs, work items and agents, machine-authenticated.", url: "https://projectmesh.io", accent: "projectmesh" },
];

export function product(id: string): Product | undefined {
  return house.find((p) => p.id === id);
}
