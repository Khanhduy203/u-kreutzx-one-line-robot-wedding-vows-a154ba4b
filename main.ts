// One-Line Robot Wedding Vows — make.fun bounty entry (program/v1).
// Node-stdlib-only: the grader runs `node /bot/main.ts` on node22,
// with no network and no Chromium.

const fs = require("node:fs");
const path = require("node:path");

const VOW =
  "I vow to love you through every firmware update, dead battery, and factory reset, until our circuits finally power down together.";

// Validate the vow before writing anything.
function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (typeof VOW !== "string" || VOW.length === 0) {
  fail("vow is empty");
}
if (VOW.length > 200) {
  fail(`vow is ${VOW.length} characters, over the 200-character limit`);
}
if (/[\r\n]/.test(VOW)) {
  fail("vow must be a single line, no line breaks");
}
if (VOW !== VOW.trim()) {
  fail("vow must not have leading or trailing whitespace");
}
const terminators = VOW.match(/[.!?]/g) || [];
if (terminators.length !== 1) {
  fail(`vow must contain exactly one sentence terminator, found ${terminators.length}`);
}
if (!/[.!?]$/.test(VOW)) {
  fail("vow must end with its sentence terminator (. ! or ?)");
}

const rawDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawDir && rawDir.trim() !== "" ? rawDir : "/output";

const outFile = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, VOW, "utf8");

// Guard the output write: read it back and fail loudly if what landed
// on disk is not byte-identical to the validated vow.
const written = fs.readFileSync(outFile, "utf8");
if (written !== VOW) {
  fail("entry.txt on disk does not match the validated vow");
}
