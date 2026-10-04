"use strict";

const assert = require("node:assert/strict");
const { copyFileSync, mkdirSync, mkdtempSync, readdirSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join, resolve } = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");

function check(root) {
	const program = ts.createProgram([join(root, "test/contracts.ts")], {
		noEmit: true,
		strict: true,
		skipLibCheck: false,
		allowImportingTsExtensions: true,
		target: ts.ScriptTarget.ES2022,
		module: ts.ModuleKind.NodeNext,
		moduleResolution: ts.ModuleResolutionKind.NodeNext,
	});
	const diagnostics = ts.getPreEmitDiagnostics(program);
	assert.equal(
		diagnostics.length,
		0,
		ts.formatDiagnosticsWithColorAndContext(diagnostics, {
			getCanonicalFileName: name => name,
			getCurrentDirectory: () => root,
			getNewLine: () => "\n",
		}),
	);
}

const source = resolve(__dirname, "..");
test("source types accept and reject the documented Bot API contracts", () => {
	check(source);
});

test("generated declarations enforce the same contracts without source files", t => {
	const root = mkdtempSync(join(tmpdir(), "telegraf-types-"));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	for (const file of readdirSync(source)) {
		if (file.endsWith(".d.ts")) {
			copyFileSync(join(source, file), join(root, file));
		}
	}
	mkdirSync(join(root, "test"));
	copyFileSync(join(__dirname, "contracts.ts"), join(root, "test/contracts.ts"));
	check(root);
});
