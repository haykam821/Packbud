import { Suspense, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { Tab, TABS } from "../../utils/tab.js";
import { FileData } from "../../utils/workspace/file.js";
import { DebugOutput } from "../debug-output/debug-output.js";
import { FileViewTab } from "../file-view-tab/file-view-tab.js";
import styles from "./file-view.module.css";

interface FileViewProps {
	file: FileData;
}

function renderFallback({ error }: FallbackProps) {
	const messages: string[] = [];
	messages.push(error + "");

	if (error instanceof Error && error.stack) {
		messages.push(...error.stack.split("\n"));
	}

	return <>
		<span>
			Failed to show panel
		</span>
		<DebugOutput messages={messages} />
	</>;
}

export function FileView({ file }: FileViewProps) {
	const [activeTab, setActiveTab] = useState<Tab | null>(TABS[0] ?? null);

	return <div className={styles.main}>
		<ul className={styles.tabs}>
			{TABS.map(tab => {
				return <FileViewTab key={tab.name} active={tab === activeTab} setActiveTab={setActiveTab} tab={tab} />;
			})}
		</ul>
		<div className={styles.panelWrapper}>
			{activeTab === null ? <span>
				No tab selected
			</span> : <Suspense fallback={<span>
				Loading...
			</span>}>
				<ErrorBoundary fallbackRender={renderFallback} resetKeys={[file, activeTab]}>
					{activeTab.component(file)}
				</ErrorBoundary>
			</Suspense>}
		</div>
	</div>;
}
