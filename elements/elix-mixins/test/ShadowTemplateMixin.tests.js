import { assert } from 'chai';
import symbols from '../src/symbols';
import ShadowTemplateMixin from '../src/ShadowTemplateMixin';


/* Element with a simple template */
class ElementWithStringTemplate extends ShadowTemplateMixin(HTMLElement) {
  get [symbols.template]() {
    return "Hello";
  }
}
customElements.define('element-with-string-template', ElementWithStringTemplate);


/* Element with a real template */
const template = document.createElement('template');
template.content.textContent = "Hello";
class ElementWithRealTemplate extends ShadowTemplateMixin(HTMLElement) {
  get [symbols.template]() {
    return template;
  }
}
customElements.define('element-with-real-template', ElementWithRealTemplate);


/* Element with styles to polyfill. */
class ElementWithStylesInTemplate extends ShadowTemplateMixin(HTMLElement) {
  get [symbols.template]() {
    return `
      <style>
        /* Use a style that will get polyfilled. */
        :host {
          background: rgb(255, 0, 0);
        }
      </style>
    `;
  }
}
customElements.define('element-with-styles-in-template', ElementWithStylesInTemplate);


describe("ShadowTemplateMixin", () => {

  let container;

  before(() => {
    container = document.getElementById('container');
  });

  afterEach(() => {
    container.innerHTML = '';
  });

  it("stamps string template into root", () => {
    const fixture = document.createElement('element-with-string-template');
    assert(fixture.shadowRoot);
    assert.equal(fixture.shadowRoot.textContent.trim(), "Hello");
  });

  it("stamps real template into root", () => {
    const fixture = document.createElement('element-with-real-template');
    assert(fixture.shadowRoot);
    assert.equal(fixture.shadowRoot.textContent.trim(), "Hello");
  });

  it("polyfills styles when ShadyCSS is loaded", done => {
    const fixture = document.createElement('element-with-styles-in-template');
    container.appendChild(fixture);
    // Give polyfill time to upgrade item.
    setTimeout(() => {
      assert.equal(getComputedStyle(fixture).backgroundColor, 'rgb(255, 0, 0)');
      done();
    });
  });

});
