import { IterableWalker } from '@json-walker/core';

globalThis.addEventListener('DOMContentLoaded', () => {
  const textAreaElement = document.querySelector('.app__body__player__editor');
  const previewElement = document.querySelector('.app__body__player__preview');
  const walkElement = document.querySelector('.app__body__footer__walk');

  walkElement.addEventListener('click', () => {
    const jsonAsString = textAreaElement.value;
    let json;

    try {
      json = JSON.parse(jsonAsString);
    } catch (e) {
      alert('Not a valid JSON');
      return;
    }

    const properties = [];
    const walker = new IterableWalker(json);

    for (const value of walker) {
      properties.push({
        path: value.propertyPath.toString(),
        type: value.propertyType,
        value: value.propertyValue,
      });
    }

    previewElement.textContent = JSON.stringify(properties, null, 3);
  });
});
