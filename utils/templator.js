import getObjectValue from './getObjectValue';

export default class Templator {
	constructor(template) {
		this._template = template;
	}

	compile(ctx) {
		let newTemplate = this._template;
		Object.entries(ctx).forEach(([key, value]) => {
			const templateVar = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
			if (typeof value === 'function') {
				window.handleClick = ctx[key];
				newTemplate = newTemplate.replace(templateVar, `window.${key}()`);
			} else if (typeof value === 'object') {
				const temolateObjectVar = new RegExp(`{{\\s*${key}\..*?}}`, 'g');
				const varsInObject = newTemplate.match(temolateObjectVar);
				varsInObject.forEach((nextVar) => {
					const path = nextVar.slice(2, -2).trim();
					const newValue = getObjectValue(ctx, path);
					newTemplate = newTemplate.replace(nextVar, newValue);
				});
			} else {
				newTemplate = newTemplate.replace(templateVar, value);
			}
		});
		return newTemplate;
	}
}
