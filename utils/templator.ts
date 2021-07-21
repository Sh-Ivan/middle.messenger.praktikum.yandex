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

  compile(ctx: object): string {
    let newTemplate: string = this._template;
    if (!ctx || Object.keys(ctx).length === 0) {
      return this._template;
    }
    Object.entries(ctx).forEach(([key, value]: [string, unknown]) => {
      const templateVar = new RegExp(`\{\{\\s*${key}\\s*\}\}`, 'g');

      if (typeof value === 'function') {
        newTemplate = newTemplate.replace(templateVar, key);
      } else if (typeof value === 'object') {
        const temolateObjectVar: RegExp = new RegExp(`{{\\s*${key}\..*?}}`, 'g');
        const varsInObject: RegExpMatchArray | null = newTemplate.match(temolateObjectVar);
        if (varsInObject !== null) {
          varsInObject.forEach((nextVar: string) => {
            const path: string = nextVar.slice(2, -2).trim();
            const newValue: unknown = getObjectValue(ctx, path);
            const replacer: string = newValue === '' ? '""' : (newValue as string);
            newTemplate = newTemplate.replace(nextVar, replacer);
          });
        }
      } else {
        const replacer: string = value === '' ? '""' : (value as string);
        newTemplate = newTemplate.replace(templateVar, replacer);
      }
    });

    return newTemplate;
  }
}
