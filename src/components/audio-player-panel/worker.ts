/// <reference types="emscripten" />

declare global {
	var Module: Partial<EmscriptenModule>;
}

declare let callMain: (argv: string[]) => void;

const CLI_WASM_URL = "https://vgmstream.org/web/vgmstream-cli.wasm";
const CLI_JS_URL = "https://vgmstream.org/web/vgmstream-cli.js";

const OUTPUT_PATH = "output.wav";

self.addEventListener("message", async event => {
	const data = event.data.data as ArrayBuffer;
	const name = event.data.name as string;

	const cliWasm = await fetch(CLI_WASM_URL);
	const cliWasmBuffer = await cliWasm.arrayBuffer();

	const cliJs = await fetch(CLI_JS_URL);
	const cliJsText = await cliJs.text();

	const messages: string[] = [];

	self.Module = {
		noInitialRun: true,
		onRuntimeInitialized: () => {
			FS.writeFile(name, new Uint8Array(data));

			try {
				callMain([
					"-o",
					OUTPUT_PATH,
					"-i",
					name,
				]);

				const outputBuffer = FS.readFile(OUTPUT_PATH);

				/* eslint-disable unicorn/require-post-message-target-origin */
				self.postMessage({
					data: outputBuffer.buffer,
					messages,
				});
				/* eslint-enable unicorn/require-post-message-target-origin */
			} catch {
				/* eslint-disable unicorn/require-post-message-target-origin */
				self.postMessage({
					messages,
				});
				/* eslint-enable unicorn/require-post-message-target-origin */
			}
		},
		print: string => {
			messages.push(string);
		},
		printErr: string => {
			messages.push(string);
		},
		wasmBinary: cliWasmBuffer,
	};

	/* eslint-disable-next-line no-eval */
	eval.bind(null)(cliJsText);
});
