import classNames from "classnames";

import { FileData } from "../../utils/workspace/file.js";
import styles from "./file-tree-item.module.css";

interface FileTreeItemProps {
	active: boolean;
	file: FileData;
	setActiveFile: (file: FileData) => void;
}

export function FileTreeItem({ active, file, setActiveFile }: FileTreeItemProps) {
	return <li className={classNames(styles.main, active && styles.active)}>
		<button className={styles.button} onClick={() => setActiveFile(file)}>
			{file.name}
		</button>
	</li>;
}
