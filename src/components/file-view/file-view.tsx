import { Suspense, useState } from "react";

import { FileData } from "../../utils/file.js";
import { Tab, TABS } from "../../utils/tab.js";
import { FileViewTab } from "../file-view-tab/file-view-tab.js";
import styles from "./file-view.module.css";

interface FileViewProps {
	file: FileData;
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
				{activeTab.component(file)}
			</Suspense>}
		</div>
	</div>;
}
