import { ChangeEventHandler, ReactNode, useCallback, useRef, useState, ViewTransition } from "react";

import { FileData } from "../../utils/file.js";
import { Button } from "../button/button.js";
import { FileTree } from "../file-tree/file-tree.js";
import { FileView } from "../file-view/file-view.js";
import { PerformanceTracker } from "../performance-tracker/performance-tracker.js";
import styles from "./app.module.css";

export function App(): ReactNode {
	const [files, setFiles] = useState<readonly FileData[]>([]);
	const [activeFile, setActiveFile] = useState<FileData | null>(null);

	const onImportFiles = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		if (event.target.files !== null) {
			const newFiles = [
				...files,
				...[...event.target.files].map(file => {
					return {
						data: file.arrayBuffer(),
						name: file.name,
					};
				}),
			];

			setFiles(newFiles);

			const latestFile = newFiles.at(-1);

			if (latestFile) {
				setActiveFile(latestFile);
			}
		}
	}, [files]);

	const importFilesInputRef = useRef<HTMLInputElement | null>(null);

	return <div className={styles.main}>
		<div className={styles.sidebar}>
			<div className={styles.sidebarGroup}>
				<h1 className={styles.title}>Packbud</h1>
				<Button className={styles.importFilesButton} onClick={() => importFilesInputRef.current?.click()}>
					Import File(s)
				</Button>
				<input ref={importFilesInputRef} className={styles.importFilesInput} multiple onChange={onImportFiles} type="file" />
			</div>

			<div className={styles.fileTreeWrapper}>
				<FileTree activeFile={activeFile} files={files} setActiveFile={setActiveFile} />
			</div>
			<div className={styles.sidebarGroup}>
				<PerformanceTracker />
			</div>
		</div>
		<ViewTransition>
			<div className={styles.viewWrapper}>
				{activeFile === null ? <span>
					Select a file to continue
				</span> : <FileView file={activeFile} />}
			</div>
		</ViewTransition>
	</div>;
}
