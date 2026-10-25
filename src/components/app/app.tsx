import { ChangeEventHandler, ReactNode, useCallback, useEffect, useRef, useState, ViewTransition } from "react";

import { FileData } from "../../utils/workspace/file.js";
import { MemoryWorkspace } from "../../utils/workspace/memory-workspace.js";
import { PersistentWorkspace } from "../../utils/workspace/persistent-workspace.js";
import { Workspace } from "../../utils/workspace/workspace.js";
import { Button } from "../button/button.js";
import { FileTree } from "../file-tree/file-tree.js";
import { FileView } from "../file-view/file-view.js";
import { PerformanceTracker } from "../performance-tracker/performance-tracker.js";
import styles from "./app.module.css";

export function App(): ReactNode {
	const workspace = useRef<Workspace | null>(null);

	const [files, setFiles] = useState<readonly FileData[]>([]);
	const [activeFile, setActiveFile] = useState<FileData | null>(null);

	useEffect(() => {
		let active = true;

		const initialize = async () => {
			try {
				workspace.current = new PersistentWorkspace();

				const newFiles = await workspace.current.toState();

				if (active) {
					setFiles(newFiles);
				}
			} catch {
				workspace.current = new MemoryWorkspace();

				const newFiles = await workspace.current.toState();

				if (active) {
					setFiles(newFiles);
				}
			}
		};

		initialize();

		return () => {
			active = false;
		};
	}, []);

	const onImportFiles = useCallback<ChangeEventHandler<HTMLInputElement>>(async event => {
		if (event.target.files !== null && workspace.current !== null) {
			const addedFiles = [...event.target.files];
			const latestName = addedFiles.at(-1)?.name;

			for (const file of addedFiles) {
				await workspace.current.add({
					data: file.arrayBuffer(),
					name: file.name,
				});
			}

			const newFiles = await workspace.current.toState();
			setFiles(newFiles);

			if (latestName !== undefined) {
				const latestFile = newFiles.findLast(file => {
					return file.name === latestName;
				});

				if (latestFile !== undefined) {
					setActiveFile(latestFile);
				}
			}
		}
	}, []);

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
