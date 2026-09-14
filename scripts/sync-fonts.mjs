// Geist comes from the shell (which vendors it from the geist npm
// package); Instrument Serif from @fontsource/instrument-serif.
import { copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const shell = resolve(process.env.SHELL_SRC ?? "../shell");
for (const f of ["Geist-Variable.woff2", "GeistMono-Variable.woff2"]) {
  copyFileSync(resolve(shell, "src/theme/fonts", f), resolve("src/theme/fonts", f));
}
const require = createRequire(import.meta.url);
const pkg = resolve(require.resolve("@fontsource/instrument-serif/package.json"), "..");
copyFileSync(resolve(pkg, "files/instrument-serif-latin-400-normal.woff2"), resolve("src/theme/fonts/InstrumentSerif-Regular.woff2"));
copyFileSync(resolve(pkg, "files/instrument-serif-latin-400-italic.woff2"), resolve("src/theme/fonts/InstrumentSerif-Italic.woff2"));
console.log("fonts synced");
