export interface FileData {
	readonly data: Promise<ArrayBuffer>;
	readonly name: string;
}
