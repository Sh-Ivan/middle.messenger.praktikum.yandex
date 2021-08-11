import { IBlock } from '../components/block/block';

function render(query: string, block: IBlock) {
  const root: Element | null = document.querySelector(query);
  if (root !== null) {
    console.log(block);
    root.appendChild(block.getContent());
    console.log(root);
  }
  return root;
}

export default render;
