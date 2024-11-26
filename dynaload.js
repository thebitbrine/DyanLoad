// DynaLoad Library
// A utility for dynamically loading and caching HTML components, CSS, and JavaScript.
// https://github.com/thebitbrine/DynaLoad/

const DynaLoad = (function() {
  // Cache to store loaded component HTML
  const cache = new Map();

  // Sets to track loaded scripts and styles
  const loadedScripts = new Set();
  const loadedStyles = new Set();

  /**
   * Load a component into an element on the page
   * @param {string} selector - CSS selector for the target element
   * @param {string} url - URL of the component HTML
   * @param {object} options - Additional options (CSS, JS, callback)
   */
  function loadComponent(selector, url, options) {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`[DynaLoad] 🔍 Element not found: ${selector}`);
      return;
    }

    // Check the cache first
    if (cache.has(url)) {
      element.innerHTML = cache.get(url);
      handleOptions(element, options);
      return;
    }

    // Fetch the component HTML
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`[DynaLoad] ❌ Failed to load component: ${url}`);
        }
        return response.text();
      })
      .then(html => {
        // Cache the HTML and insert it into the element
        cache.set(url, html);
        element.innerHTML = html;
        handleOptions(element, options);
      })
      .catch(error => {
        console.error(`[DynaLoad] ❌ Error loading component: ${url}`, error);
        element.innerHTML = `<p>[DynaLoad] 🚨 Failed to load component: ${url}</p>`;
      });
  }

  /**
   * Handle additional options for a loaded component
   * @param {HTMLElement} element - The target element
   * @param {object} options - Additional options (CSS, JS, callback)
   */
  function handleOptions(element, options) {
    if (options.css) {
      loadCSS(options.css);
    }
    if (options.js) {
      loadJS(options.js, options.jsAttributes);
    }
    if (options.callback) {
      options.callback(element);
    }
  }

  /**
   * Load a CSS file
   * @param {string} url - URL of the CSS file
   */
  function loadCSS(url) {
    if (loadedStyles.has(url)) {
      return;
    }

    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.addEventListener('load', () => {
      loadedStyles.add(url);
      console.log(`[DynaLoad] ✅ CSS loaded: ${url}`);
    });
    link.addEventListener('error', () => {
      console.error(`[DynaLoad] ❌ Failed to load CSS: ${url}`);
    });
    document.head.appendChild(link);
  }

  /**
   * Load a JavaScript file
   * @param {string} url - URL of the JavaScript file
   * @param {object} attributes - Additional attributes for the script tag
   */
  function loadJS(url, attributes = {}) {
    if (loadedScripts.has(url)) {
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    Object.entries(attributes).forEach(([attr, value]) => {
      script.setAttribute(attr, value);
    });
    script.addEventListener('load', () => {
      loadedScripts.add(url);
      console.log(`[DynaLoad] ✅ JavaScript loaded: ${url}`);
    });
    script.addEventListener('error', () => {
      console.error(`[DynaLoad] ❌ Failed to load JavaScript: ${url}`);
    });
    document.body.appendChild(script);
  }

  /**
   * Initialize the DynaLoad library with a configuration object
   * @param {object} config - Configuration object with selectors and settings
   */
  function init(config) {
    document.addEventListener('DOMContentLoaded', function() {
      Object.entries(config).forEach(([selector, settings]) => {
        const { url, options } = settings;
        loadComponent(selector, url, options || {});
      });
    });
  }

  return {
    init: init,
    loadComponent: loadComponent
  };
})();
