(function() {
  'use strict';

  // Configure RequireJS to shim Jasmine
  require.config({
    baseUrl: '..',
    paths: {
      'jasmine': 'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.min',
      'jasmine-html': 'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine-html.min',
      'boot': 'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/boot.min'
    },
    shim: {
      'jasmine': {
        exports: 'window.jasmineRequire'
      },
      'jasmine-html': {
        deps: ['jasmine'],
        exports: 'window.jasmineRequire'
      },
      'boot': {
        deps: ['jasmine', 'jasmine-html'],
        exports: 'window.jasmineRequire'
      }
    }
  });

  // Define all of your specs here. These are RequireJS modules.
  var specs = [
    'tests/spec/donut.specs'
  ];

  // Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
  // AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
  // we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
  // initialize the HTML Reporter and execute the environment.
  require(['boot'], function () {

    // Load the specs
    require(specs, function () {

      // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
      window.onload();
    });
  });
})();
