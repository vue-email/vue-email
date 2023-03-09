import { convert } from 'html-to-text';
import pretty from 'pretty';
import { createApp, h, type Component } from 'vue';
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

/**
 * Convert Vue file into HTML email template
 * @param component the main component to render
 * @param props props to pass to component
 * @returns {string}
 */
export const renderComponent = async (component: Component, props?: any) => {
  const app = createApp({ render: () => h(component) }, props);
  const html = await renderToString(app);

  return html;
}

const renderAsText = async (component: Component) => {
  const markup = await renderToString(h(component));
  return convert(markup, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: '#__vue-email-preview', format: 'skip' },
    ],
  });
};
