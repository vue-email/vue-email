import { JSDOM } from 'jsdom'
import DOMPurifyInitializer from 'dompurify'

function initDOMPurifyWithJSDOM() {
  const { window } = new JSDOM('<!DOCTYPE html>')
  return DOMPurifyInitializer(window)
}

function resolveDOMPurify() {
  try {
    return initDOMPurifyWithJSDOM()
  } catch (err) {
    console.warn('Failed to initialize DOMPurify with JSDOM, falling back to default initialization.')
    return DOMPurifyInitializer()
  }
}

const DOMPurify = resolveDOMPurify()

export default DOMPurify
