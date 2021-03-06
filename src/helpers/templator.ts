import getObjectValue from './getObjectValue';

declare global {
  interface Window {
    handleClick?: any;
  }
}

export default class Templator {
  private _template: string;

  constructor(template: string) {
    this._template = template;
  }

  compile(ctx: { [key: string]: unknown } = {}): string {
    let newTemplate: string = this._template;
    if (!ctx || Object.keys(ctx).length === 0) {
      return this._template;
    }
    Object.entries(ctx).forEach(([key, value]: [string, unknown]) => {
      // eslint-disable-next-line no-useless-escape
      const templateVar = new RegExp(`\{\{\\s*${key}\\s*\}\}`, 'g');

      if (typeof value === 'function') {
        newTemplate = newTemplate.replace(templateVar, key);
      } else if (Array.isArray(value)) {
        let listElements = '';
        value.forEach((elem: string) => {
          listElements = listElements.concat(elem);
        });
        newTemplate = newTemplate.replace(templateVar, listElements);
        const newCtx = { ...ctx };
        newCtx[key] = null;
        return new Templator(newTemplate).compile(newCtx);
      } else if (typeof value === 'object' && value !== null) {
        // eslint-disable-next-line no-useless-escape
        const temolateObjectVar: RegExp = new RegExp(`{{\\s*${key}\\s*\}\}?`, 'g');
        const varsInObject: RegExpMatchArray | null = newTemplate.match(temolateObjectVar);
        if (varsInObject !== null) {
          varsInObject.forEach((nextVar: string) => {
            const path: string = nextVar.slice(2, -2).trim();
            console.log(ctx);
            console.log(path);
            const newValue: unknown = getObjectValue(ctx, path);
            console.log(newValue);
            const replacer: string = newValue === '' ? '""' : (newValue as string);
            newTemplate = newTemplate.replace(nextVar, replacer);
          });
        }
      } else {
        let replacer: string = value === '' ? '&nbsp;' : (value as string);
        if (value === null || value === undefined) {
          replacer = '&nbsp;';
        }
        newTemplate = newTemplate.replace(templateVar, replacer);
      }
    });

    return newTemplate;
  }
}
