import { IBlock } from '../src/components/block/block';

function render(query: string, block: IBlock) {
  const root: Element | null = document.querySelector(query);
  if (root !== null) {
    root.appendChild(block.getContent());
  }
  return root;
}

export default render;
