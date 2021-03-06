# Contributor guidelines

* New components and features should have extremely broad appeal. Our goal is to
  provide great implementations of the user interface patterns which are already
  in widespread use, not to design or promote user interface innovations. We
  only consider implementing a relatively new UI idea after a large number of
  sites/applications have adopted it or expressed interest in it.
* To the extent possible, components should measure up to the [Gold
  Standard checklist for web
  components](https://github.com/webcomponents/gold-standard/wiki).
* Code should follow the [Google JavaScript Style
  Guide](http://google.github.io/styleguide/jsguide.html). (Ignore the sections
  on "Source file structure" and "Policies".)
* Use standard JavaScript ES6 idioms and web platform patterns when possible.
  Strive for making the code’s intent clear to someone who is an expert web
  developer but knows nothing about this project. Example: a modest degree of
  boilerplate code replicated in multiple places may be preferable to
  introducing a new, project-specific abstraction.
* Keep in mind that code must run on IE 11, which has many limitations.
* Try to avoid introducing the need for new polyfills. We currently do not
  require any polyfills except the web components v1 polyfills.
* Keep an element’s public API clean. Do not expose internals on an element as
  underscore-prefixed properties or methods. Instead, use closures and Symbol
  keys to keep internals hidden.
* Use [jsDoc](http://usejsdoc.org/) comments to document the public API. Our
  build system will generate the documentation from those comments.
* When in doubt, sort things alphabetically: lists of imports, mixins, etc.
  Alphabetic order is usually just as good as any other, and is often the only
  sort order anyone other than you is going to be able to remember. Exception:
  when defining members of a class, define the `constructor()` first, followed
  by all public members in alphabetical order.
* Capitalize the names of mixin that accept and return a class, to reflect their
  class-like nature.
* Write user interface specifications to document end-user visible behavior.
  It’s fine to reference such behavior in code comments, but try to avoid
  letting comments be the sole place where user-visible behavior is described.
