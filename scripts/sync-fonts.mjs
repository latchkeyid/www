// Geist comes from the shell (which vendors it from the geist npm
// package); Instrument Sans from @fontsource-variable/instrument-sans.
import { copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const shell = resolve(process.env.SHELL_SRC ?? "../shell");
for (const f of ["Geist-Variable.woff2", "GeistMono-Variable.woff2"]) {
  copyFileSync(resolve(shell, "src/theme/fonts", f), resolve("src/theme/fonts", f));
}
const require = createRequire(import.meta.url);
const pkg = resolve(require.resolve("@fontsource-variable/instrument-sans/package.json"), "..");
copyFileSync(resolve(pkg, "files/instrument-sans-latin-wght-normal.woff2"), resolve("src/theme/fonts/InstrumentSans-Variable.woff2"));
copyFileSync(resolve(pkg, "files/instrument-sans-latin-wght-italic.woff2"), resolve("src/theme/fonts/InstrumentSans-VariableItalic.woff2"));
console.log("fonts synced");
