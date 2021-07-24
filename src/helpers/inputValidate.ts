import { validate } from './validate';

export function handleFocus(e: Event) {
  const element = e.target as HTMLInputElement;
  validate(element);
}

export function handleBlur(e: Event) {
  const element = e.target as HTMLInputElement;
  validate(element);
}
