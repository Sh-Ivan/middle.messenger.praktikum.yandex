import Templator from '../../helpers/templator';
import buttonTemplate from './Button.tmpl';
import Block from '../block/block';

const buttonTmpl = new Templator(buttonTemplate);

type buttonProps = {
  handleClick?: (e: Event) => void;
  class: string;
  text: string;
};

class Button extends Block<buttonProps> {
  constructor(props: buttonProps) {
    super('button', props);
  }

  render() {
    const context = { ...this.props };
    return buttonTmpl.compile(context);
  }
}

export default Button;
