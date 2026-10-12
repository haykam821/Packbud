import { ReactNode } from "react";

import { HexDumpPanel } from "../components/hex-dump-panel/hex-dump-panel.js";
import { FileData } from "./file.js";

export interface Tab {
	component: (file: FileData) => ReactNode;
	name: string;
}

export const TABS: readonly Tab[] = [{
	component: file => <HexDumpPanel file={file} />,
	name: "Hex Dump",
}];
