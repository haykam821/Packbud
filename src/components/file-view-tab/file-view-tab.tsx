import classNames from "classnames";

import { Tab } from "../../utils/tab.js";
import styles from "./file-view-tab.module.css";

interface FileViewTabProps {
	active: boolean;
	setActiveTab: (tab: Tab) => void;
	tab: Tab;
}

export function FileViewTab({ active, setActiveTab, tab }: FileViewTabProps) {
	return <li>
		<button className={classNames(styles.button, active && styles.active)} onClick={() => setActiveTab(tab)}>
			{tab.name}
		</button>
	</li>;
}
