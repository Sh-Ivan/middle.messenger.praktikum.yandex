export default function getObjectValue(obj, path, defaultValue) {
	const arrPath = path.split('.');
	const result = arrPath.reduce((result, value) => {
		if (result) return result[value];
	}, obj);
	return result || defaultValue;
}
