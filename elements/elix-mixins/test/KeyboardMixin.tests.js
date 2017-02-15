import { assert } from 'chai';
import KeyboardMixin from '../src/KeyboardMixin';
import * as mockInteractions from '../../../test/mockInteractions';
import symbols from '../src/symbols';


class KeyboardTest extends KeyboardMixin(HTMLElement) {}
customElements.define('keyboard-test', KeyboardTest);


describe("KeyboardMixin", () => {

  let container;

  before(() => {
    container = document.getElementById('container');
  });

  afterEach(() => {
    container.innerHTML = '';
  });

  it("assigns a tabindex of 0 by default", done => {
    const fixture = document.createElement('keyboard-test');
    container.appendChild(fixture);
    // Give polyfill time to upgrade item.
    setTimeout(() => {
      assert.equal(fixture.getAttribute('tabindex'), '0');
      done();
    });
  });

  it("doesn't overwrite an explicit tabindex", () => {
    const fixture = document.createElement('keyboard-test');
    fixture.setAttribute('tabindex', '1');
    container.appendChild(fixture);
    assert.equal(fixture.getAttribute('tabindex'), '1');
  });

  it("listens to keydown and fires the keydown() method", done => {
    const fixture = document.createElement('keyboard-test');
    fixture[symbols.keydown] = (event) => {
      done();
    };
    container.appendChild(fixture);
    mockInteractions.dispatchSyntheticKeyboardEvent(fixture, 'keydown');
  });

});