import { FileData } from "./file.js";
import { Workspace } from "./workspace.js";

export class MemoryWorkspace implements Workspace {
	private readonly files: FileData[] = [];

	add(file: FileData): Promise<void> {
		this.files.push(file);
		return Promise.resolve();
	}

	toState(): Promise<readonly FileData[]> {
		return Promise.resolve(this.files);
	}
}
