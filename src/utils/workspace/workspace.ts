import { FileData } from "./file.js";

/**
 * A representation of imported {@linkplain FileData files} that is external to React state.
 */
export interface Workspace {
	/**
	 * Adds a file to this workspace.
	 * @param file the file to add
	 */
	add(file: FileData): Promise<void>;

	/**
	 * Converts this workspace to an array of files that can be represented in React state.
	 */
	toState(): Promise<readonly FileData[]>;
}
