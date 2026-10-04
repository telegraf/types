"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");
const spec = require("./bot-api-10.3.json");

const root = path.resolve(__dirname, "..");
const program = ts.createProgram([path.join(root, "index.ts")], {
	strict: true,
	module: ts.ModuleKind.Node16,
	moduleResolution: ts.ModuleResolutionKind.Node16,
});
const checker = program.getTypeChecker();
const source = program.getSourceFile(path.join(root, "bot-api.ts"));
const symbols = new Map();

function collect(symbol, prefix = "") {
	symbols.set(prefix + symbol.name, symbol);
	if (symbol.flags & ts.SymbolFlags.Namespace) {
		for (const child of checker.getExportsOfModule(symbol)) {
			collect(child, prefix + symbol.name);
		}
	}
}

for (const name of ["bot-api.ts", "api.ts"]) {
	const module = checker.getSymbolAtLocation(program.getSourceFile(path.join(root, name)));
	for (const symbol of checker.getExportsOfModule(module)) collect(symbol);
}

function variants(type) {
	return type.isUnion() ? type.types.flatMap(variants) : [type];
}

function properties(types) {
	const members = types.flatMap(variants);
	const result = new Map();
	for (const member of members) {
		for (const property of checker.getPropertiesOfType(member)) {
			const type = checker.getTypeOfSymbolAtLocation(property, source);
			if (type.flags & ts.TypeFlags.Never) continue;
			const previous = result.get(property.name);
			result.set(property.name, {
				optional:
					!!(property.flags & ts.SymbolFlags.Optional) ||
					!!previous?.optional ||
					members.some(m => !checker.getPropertyOfType(m, property.name)),
				types: [...(previous?.types || []), type],
			});
		}
	}
	return result;
}

function checkPrimitive(expected, actual, label) {
	const flags = {
		Integer: ts.TypeFlags.NumberLike,
		Float: ts.TypeFlags.NumberLike,
		String: ts.TypeFlags.StringLike,
		Boolean: ts.TypeFlags.BooleanLike,
		True: ts.TypeFlags.BooleanLiteral,
	}[expected];
	if (!flags) return;
	for (const type of actual.types.flatMap(variants)) {
		if (type.flags & ts.TypeFlags.Undefined) continue;
		// Consumers upload F values; the runtime serializes them as attach:// strings.
		if (expected === "String" && type.flags & ts.TypeFlags.TypeParameter && type.symbol?.name === "F") continue;
		assert.ok(type.flags & flags, `${label}: expected ${expected}, got ${checker.typeToString(type)}`);
		if (expected === "True") assert.equal(type.intrinsicName, "true", label);
	}
}

test("all official Bot API 10.3 objects expose their documented fields", () => {
	const errors = [];
	for (const [name, expected] of Object.entries(spec.types)) {
		// InputFile is supplied by consumers as F, not a fixed Telegram object.
		if (name === "InputFile") continue;
		const symbol =
			symbols.get(name) || [...symbols.entries()].find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1];
		assert.ok(symbol, `Missing official type: ${name}`);
		const actual = properties([checker.getDeclaredTypeOfSymbol(symbol)]);
		for (const field of expected) {
			try {
				assert.ok(actual.has(field.name), `${name}.${field.name} is missing`);
				checkPrimitive(field.type, actual.get(field.name), `${name}.${field.name}`);
			} catch (error) {
				errors.push(error.message);
			}
		}
	}
	assert.deepEqual(errors, []);
});

test("all 185 official methods preserve their parameter contracts", () => {
	const api = checker.getDeclaredTypeOfSymbol(symbols.get("ApiMethods"));
	const methods = checker.getPropertiesOfType(api);
	assert.deepEqual(methods.map(m => m.name).sort(), Object.keys(spec.methods).sort());
	for (const method of methods) {
		const type = checker.getTypeOfSymbolAtLocation(method, source);
		const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
		const actual = properties(
			signatures.flatMap(signature => {
				const parameter = signature.parameters[0];
				return parameter ? [checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(parameter, source))] : [];
			}),
		);
		const expected = spec.methods[method.name];
		assert.deepEqual([...actual.keys()].sort(), expected.map(f => f.name).sort(), method.name);
		for (const field of expected) {
			const label = `${method.name}.${field.name}`;
			assert.equal(actual.get(field.name).optional, field.optional, label);
			checkPrimitive(field.type, actual.get(field.name), label);
		}
	}
});
