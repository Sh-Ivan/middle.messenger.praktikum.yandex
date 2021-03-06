function escape(str: string): string {
  if (!str) return str;
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

export default escape;
