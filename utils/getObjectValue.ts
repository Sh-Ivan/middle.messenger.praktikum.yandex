export default function getObjectValue<T1, T2>(obj: T1, path: string, defaultValue?: T2): unknown | T2 {
	const arrPath: string[] = path.split('.');
	const result = arrPath.reduce((result: any, value: string) => {
		if (result && typeof result === "object") return result[value];
	}, obj);
	return result || defaultValue;
}
