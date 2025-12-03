// Polyfills for web compatibility
// This must be loaded before any other imports that might use setImmediate

// Polyfill for setImmediate - needed for React Native on web
(function() {
  'use strict';
  
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  const globalObj = isBrowser ? window : global;
  
  // Only polyfill if setImmediate doesn't exist
  if (typeof globalObj.setImmediate === 'undefined') {
    // Try to use the setimmediate package if available (for Node.js)
    if (!isBrowser) {
      try {
        require('setimmediate');
        return; // Package handles it
      } catch (e) {
        // Package not available, use fallback
      }
    }
    
    // Fallback implementation using setTimeout
    globalObj.setImmediate = function(fn, ...args) {
      const argsArray = args.length > 0 ? args : [];
      return setTimeout(function() {
        if (typeof fn === 'function') {
          fn.apply(null, argsArray);
        }
      }, 0);
    };
    
    // Also set on global for React Native compatibility
    if (typeof global !== 'undefined' && global !== globalObj) {
      global.setImmediate = globalObj.setImmediate;
    }
  }
  
  // Polyfill clearImmediate
  if (typeof globalObj.clearImmediate === 'undefined') {
    globalObj.clearImmediate = function(id) {
      clearTimeout(id);
    };
    
    if (typeof global !== 'undefined' && global !== globalObj) {
      global.clearImmediate = globalObj.clearImmediate;
    }
  }
})();

