import { useEffect, useState } from "react";

import styles from "./performance-tracker.module.css";

const MEGABYTES_PER_BYTE = 1000000;

interface MemoryPerformance extends Performance {
	memory: {
		usedJSHeapSize: number;
	}
}

function canTrackMemory(performance: Performance): performance is MemoryPerformance {
	return "memory" in performance &&
		typeof performance.memory === "object" &&
		performance.memory !== null &&
		"usedJSHeapSize" in performance.memory &&
		typeof performance.memory.usedJSHeapSize === "number";
}

export function PerformanceTracker() {
	const [usage, setUsage] = useState(0);

	if (!canTrackMemory(window.performance)) {
		return <div className={styles.main}>
			Memory Usage: N/A
		</div>;
	}

	const performance = window.performance;

	useEffect(() => {
		setUsage(performance.memory.usedJSHeapSize);

		const interval = setInterval(() => {
			setUsage(performance.memory.usedJSHeapSize);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <div className={styles.main}>
		<span>
			Memory Usage:
		</span>
		{" "}
		<span>
			{(usage / MEGABYTES_PER_BYTE).toFixed(2)} MB
		</span>
	</div>;
}
