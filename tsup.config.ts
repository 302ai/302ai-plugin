import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: false,
	clean: true,
	treeshake: true,
	splitting: false,
	outDir: "dist",
	external: ["@302ai/studio-plugin-sdk", "ai"],
	noExternal: [],
});
