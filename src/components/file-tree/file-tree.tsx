import { FileData } from "../../utils/workspace/file.js";
import { FileTreeItem } from "../file-tree-item/file-tree-item.js";
import styles from "./file-tree.module.css";

interface FileTreeProps {
	activeFile: FileData | null;
	files: readonly FileData[];
	setActiveFile: (file: FileData) => void;
}

export function FileTree({ activeFile, files, setActiveFile }: FileTreeProps) {
	return <ul className={styles.main}>
		{files
			.toSorted((a, b) => {
				return a.name.localeCompare(b.name);
			})
			.map((file, index) => {
				return <FileTreeItem key={index} active={file === activeFile} file={file} setActiveFile={setActiveFile} />;
			})}
	</ul>;
}
