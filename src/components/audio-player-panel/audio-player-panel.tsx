import { use, useEffect, useState } from "react";

import { FileData } from "../../utils/file.js";
import { useObjectUrl } from "../../utils/use-object-url.js";
import styles from "./audio-player-panel.module.css";
import Worker from "./worker.js?worker";

interface AudioPlayerPanelProps {
	file: FileData;
}

export function AudioPlayerPanel({ file }: AudioPlayerPanelProps) {
	const data = use(file.data);

	const [output, setOutput] = useState<ArrayBuffer | null>(null);
	const [messages, setMessages] = useState<readonly string[]>([]);

	useEffect(() => {
		const worker = new Worker();

		/* eslint-disable unicorn/require-post-message-target-origin */
		worker.postMessage({
			data,
			name: file.name,
		});
		/* eslint-enable unicorn/require-post-message-target-origin */

		worker.addEventListener("message", event => {
			setOutput(event.data.data as ArrayBuffer);
			setMessages(event.data.messages as string[]);

			worker.terminate();
		});

		return () => {
			worker.terminate();
		};
	}, [data]);

	const url = useObjectUrl(output);

	return <div className={styles.main}>
		<div className={styles.primary}>
			{url === null ? <span>
				Loading audio...
			</span> : <audio controls src={url} />}
			{messages.length > 0 ? <div className={styles.messages}>
				{messages.map((message, index) => {
					return <div key={index}>
						{message}
					</div>;
				})}
			</div> : null}
		</div>
		<div className={styles.attribution}>
			Uses the <a href="https://vgmstream.org/">vgmstream</a> library
		</div>
	</div>;
}
