import Templator from '../../../utils/templator';
import inputTemplate from './Input.tmpl';
import Block from '../../components/block/block';
import validate from '../../../utils/validate';

const inputTmpl = new Templator(inputTemplate);

class Input extends Block {
  constructor(props) {
    super('div', props);
  }

  handleFocus(e) {
    const element = e.target;
    const errorElement = document.querySelector(`[data-error="${element.name}"]`);
    const validateResult = validate(element);
    if (errorElement) {
      if (validateResult !== 'valid') {
        errorElement.textContent = validateResult;
        errorElement.classList.remove('hide');
      } else {
        errorElement.classList.add('hide');
      }
    }
  }

  handleBlur(e) {
    const element = e.target;
    const errorElement = document.querySelector(`[data-error="${element.name}"]`);
    const validateResult = validate(element);
    if (errorElement) {
      if (validateResult !== 'valid') {
        errorElement.textContent = validateResult;
        errorElement.classList.remove('hide');
      } else {
        errorElement.classList.add('hide');
      }
    }
  }

  render() {
    const context = { ...this.props.context };
    return inputTmpl.compile(context);
  }
}

export default Input;
