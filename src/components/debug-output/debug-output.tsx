import styles from "./debug-output.module.css";

interface DebugOutputProps {
	messages: readonly string[];
}

export function DebugOutput({ messages }: DebugOutputProps) {
	if (messages.length <= 0) {
		return null;
	}

	return <div className={styles.main}>
		{messages.map((message, index) => {
			return <div key={index}>
				{message}
			</div>;
		})}
	</div>;
}
