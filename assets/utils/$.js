export const qsa = (selector, element = document) => element.querySelectorAll(selector);
export const qs = (selector, element = document) => element.querySelector(selector);
export const createEl = (tagName) => document.createElement(tagName);
export const el = (html) => {
  const div = createEl("div");
  div.innerHTML = html;
  return div.children[0];
}