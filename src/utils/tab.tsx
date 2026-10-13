import { ReactNode } from "react";

import { HexDumpPanel } from "../components/hex-dump-panel/hex-dump-panel.js";
import { ImageViewerPanel } from "../components/image-viewer-panel/image-viewer-panel.js";
import { FileData } from "./file.js";

export interface Tab {
	component: (file: FileData) => ReactNode;
	name: string;
}

export const TABS: readonly Tab[] = [{
	component: file => <HexDumpPanel file={file} />,
	name: "Hex Dump",
}, {
	component: file => <ImageViewerPanel file={file} />,
	name: "Image Viewer",
}];
