import { useEffect, useState } from "react";

export function useObjectUrl(object: ArrayBuffer): string | null {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		const blob = new Blob([
			object,
		]);

		const currentUrl = URL.createObjectURL(blob);
		setUrl(currentUrl);

		return () => URL.revokeObjectURL(currentUrl);
	}, [object]);

	return url;
}
