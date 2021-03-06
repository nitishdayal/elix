import symbols from './symbols';


/**
 * Mixin which maps a click (actually, a mousedown) to a selection.
 *
 * This simple mixin is useful in list box-like elements, where a click on a
 * list item implicitly selects it.
 *
 * The standard use for this mixin is in list-like elements. Native list
 * boxes don't appear to be consistent with regard to whether they select
 * on mousedown or click/mouseup. This mixin assumes the use of mousedown.
 * On touch devices, that event appears to trigger when the touch is *released*.
 *
 * Much has been written about how to ensure "fast tap" behavior on mobile
 * devices. This mixin makes a very straightforward use of a standard event, and
 * this appears to perform well on mobile devices when, e.g., the viewport is
 * configured with `width=device-width`.
 *
 * This mixin expects the component to provide an `items` property. It also
 * expects the component to define a `selectedItem` property; you can provide
 * that yourself, or use [SingleSelectionMixin](SingleSelectionMixin.md).
 *
 * If the component receives a clicks that doesn't correspond to an item (e.g.,
 * the user clicks on the element background visible between items), the
 * selection will be removed. However, if the component defines a
 * `selectionRequired` and this is true, a background click will *not* remove
 * the selection.
 *
 * @module ClickSelectionMixin
 * @param base {Class} the base class to extend
 * @returns {Class} the extended class
 */
export default function ClickSelectionMixin(base) {

  /**
   * The class prototype added by the mixin.
   */
  class ClickSelection extends base {

    constructor() {
      super();
      this.addEventListener('mousedown', event => {

        this[symbols.raiseChangeEvents] = true;

        // If the item clicked on is a button, the event seems to be raised in
        // phase 2 (AT_TARGET) — but the event target will be the component, not
        // the item that was clicked on.
        const target = event.target === this ?
          event.path[0] : // Event target isn't the item, so get it from path.
          event.target;

        // Find which item was clicked on and, if found, select it. For elements
        // which don't require a selection, a background click will determine
        // the item was null, in which we case we'll remove the selection.
        const item = itemForTarget(this, target);
        if (item || !this.selectionRequired) {

          if (!('selectedItem' in this)) {
            console.warn(`ClickSelectionMixin expects a component to define a "selectedItem" property.`);
          } else {
            this.selectedItem = item;
          }

          // We don't call preventDefault here. The default behavior for
          // mousedown includes setting keyboard focus if the element doesn't
          // already have the focus, and we want to preserve that behavior.
          event.stopPropagation();
        }

        this[symbols.raiseChangeEvents] = false;
      });
    }

  }

  return ClickSelection;
}


/*
 * Return the list item that is, or contains, the indicated target element.
 * Return null if not found.
 */
function itemForTarget(listElement, target) {
  const items = listElement.items;
  const itemCount = items ? items.length : 0;
  for (let i = 0; i < itemCount; i++) {
    let item = items[i];
    if (item === target || item.contains(target)) {
      return item;
    }
  }
  return null;
}
