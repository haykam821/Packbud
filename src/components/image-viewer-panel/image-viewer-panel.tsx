import { use } from "react";

import { useObjectUrl } from "../../utils/use-object-url.js";
import { FileData } from "../../utils/workspace/file.js";
import styles from "./image-viewer-panel.module.css";

interface ImageViewerPanelProps {
	file: FileData;
}

export function ImageViewerPanel({ file }: ImageViewerPanelProps) {
	const data = use(file.data);
	const url = useObjectUrl(data);

	if (url === null) {
		return <span>
			Loading image...
		</span>;
	}

	return <img className={styles.main} src={url} />;
}
