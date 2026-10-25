import { FileData } from "./file.js";
import { Workspace } from "./workspace.js";

export class PersistentWorkspace implements Workspace {
	async add(file: FileData): Promise<void> {
		const root = await navigator.storage.getDirectory();

		const fileHandle = await root.getFileHandle(file.name, {
			create: true,
		});

		const writable = await fileHandle.createWritable();
		await writable.write(await file.data);
		await writable.close();
	}

	async toState(): Promise<readonly FileData[]> {
		const root = await navigator.storage.getDirectory();
		const files: FileData[] = [];

		for await (const [name, handle] of root.entries()) {
			if (handle.kind === "file") {
				const file = await handle.getFile();

				files.push({
					data: file.arrayBuffer(),
					name: name,
				});
			}
		}

		return files;
	}
}
