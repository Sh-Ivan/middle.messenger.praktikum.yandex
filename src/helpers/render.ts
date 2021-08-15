import { IBlock } from '../components/block/block';

function render(query: string, block: IBlock<unknown>) {
  const root: Element | null = document.querySelector(query);
  if (root !== null) {
    root.appendChild(block.getContent());
  }
  return root;
}

export default render;
