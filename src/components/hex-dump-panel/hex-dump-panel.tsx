import classNames from "classnames";
import { use } from "react";
import { List, RowComponentProps } from "react-window";

import { FileData } from "../../utils/workspace/file.js";
import styles from "./hex-dump-panel.module.css";

const decoder = new TextDecoder("ascii");

const LINE_LENGTH = 40;
const LINE_HEIGHT = 16 + 8;

interface HexDumpPanelProps {
	file: FileData;
}

type RowProps = RowComponentProps<{
	array: Uint8Array;
}>;

function Row({ array, index, style }: RowProps) {
	const startIndex = index * LINE_LENGTH;

	const indices = new Array(LINE_LENGTH)
		.fill(null)
		.map((_, relativeIndex) => {
			return startIndex + relativeIndex;
		});

	return <div className={styles.row} style={style}>
		<div className={styles.format}>
			{indices.map(byteIndex => {
				return <span key={byteIndex} className={styles.byte}>
					{ array[byteIndex]?.toString(16).padStart(2, "0") ?? "  "}
				</span>;
			})}
		</div>
		<div className={classNames(styles.format, styles.ascii)}>
			{indices
				.map(byteIndex => {
					const byte = array[byteIndex];
					if (byte === undefined) return " ";

					return byte >= 32 && byte < 127 ? decoder.decode(array.slice(byteIndex, byteIndex + 1)) : ".";
				})
				.join("")}
		</div>
	</div>;
}

export function HexDumpPanel({ file }: HexDumpPanelProps) {
	const data = use(file.data);
	const array = new Uint8Array(data);

	return <List className={styles.main} overscanCount={16} rowComponent={Row} rowCount={Math.ceil(array.length / LINE_LENGTH)} rowHeight={LINE_HEIGHT} rowProps={{
		array,
	}} />;
}
