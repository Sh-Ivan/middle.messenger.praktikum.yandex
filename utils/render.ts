function render(query, block) {
  const root = document.querySelector(query);
  root.innerHTML = block.getContent().innerHTML;
  return root;
}

export default render;
