// The six console products' accents are the shell's, verbatim: copy them
// across so the site and the console can never drift. The other products
// have no console (yet) and own their accent here.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const shell = resolve(process.env.SHELL_SRC ?? "../shell");
const apps = ["latchkey", "tripline", "runsheet", "wardroom", "purser", "foghorn"];
for (const app of apps) {
  const from = resolve(shell, "src/theme", `${app}.css`);
  if (!existsSync(from)) {
    console.error(`missing ${from} — set SHELL_SRC to a latchkeyid/shell checkout`);
    process.exit(1);
  }
  // The shell's accent file also maps sidebar tokens the site does not
  // have; keep only the lines the site's contract knows.
  const keep = /^\s*(--primary|--primary-foreground|--accent-2|--accent-soft|--ring|:root|\.dark|\}|\/\*|$)/;
  const out = readFileSync(from, "utf8")
    .split("\n")
    .filter((l) => keep.test(l))
    .join("\n")
    .replace(/^\/\*.*\*\/\n/, `/* ${app} accent — the console shell's, verbatim (npm run sync-accents). */\n`);
  writeFileSync(resolve("src/theme", `${app}.css`), out.trimEnd() + "\n");
  console.log(`synced ${app}.css`);
}
for (const f of ["Geist-Variable.woff2", "GeistMono-Variable.woff2"]) {
  copyFileSync(resolve(shell, "src/theme/fonts", f), resolve("src/theme/fonts", f));
}
