import { convert } from 'html-to-text';
import pretty from 'pretty';
import { h, type Component } from 'vue';
import { renderToString } from 'vue/server-renderer';

export interface Options {
  pretty?: boolean;
  plainText?: boolean;
}

export const render = async (component: Component, options?: Options) => {
  if (options?.plainText) {
    return renderAsText(component);
  }

  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const markup = await renderToString(h(component));
  const document = `${doctype}${markup}`;

  if (options?.pretty) {
    return pretty(document);
  }

  return document;
};

const renderAsText = async (component: Component) => {
  const markup = await renderToString(h(component));
  return convert(markup, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: '#__vue-email-preview', format: 'skip' },
    ],
  });
};
