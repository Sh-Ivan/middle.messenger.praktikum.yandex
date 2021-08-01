import { validate } from './validate';

export default function handleSubmit(e: Event) {
  e.preventDefault();
  let formDataValid: boolean = true;
  const formData: { [key: string]: string } = {};
  const target = e.currentTarget as HTMLFormElement;
  const { elements } = target;

  for (let i = 0; i < elements.length; i += 1) {
    const element = <HTMLInputElement>elements[i];
    const validateResult: string = validate(element);
    formDataValid = formDataValid && validateResult === 'valid';
    if (element.type !== 'submit') {
      formData[element.name] = element.value;
    }
  }

  // eslint-disable-next-line no-console
  console.log(formData);
  return formDataValid ? formData : null;
}
