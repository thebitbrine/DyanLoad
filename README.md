# DynaLoad

DynaLoad is a lightweight and flexible JavaScript library for dynamically loading components, CSS, and JavaScript files in web applications. It provides a simple and intuitive way to organize and load resources on-demand, improving performance and maintainability.

## Features

- Dynamic loading of HTML components
- Automatic loading of associated CSS and JavaScript files
- Caching of loaded components for improved performance
- Dependency tracking to prevent duplicate loading of scripts and styles
- Flexible configuration options for customization
- Error handling and fallback mechanisms
- Callback support for post-loading actions

## Installation

To use DynaLoad in your project, follow these steps:

1. Download the `dynaload.js` file from the repository.
2. Include the `dynaload.js` file in your HTML file.

```html
<script src="path/to/dynaload.js"></script>
```

## Usage

### 1. Create placeholders for your components

In your HTML file, create placeholders for your components using custom HTML elements. For example:

```html
<app-header></app-header>
<app-content></app-content>
<app-footer></app-footer>
```

### 2. Configure and initialize DynaLoad

In your JavaScript file, configure and initialize the DynaLoad library by calling the `init` function and passing a configuration object. The configuration object should map component selectors to their corresponding URLs and options.

```javascript
DynaLoad.init({
  'app-header': {
    url: 'path/to/header.html',
    options: {
      css: 'path/to/header.css',
      js: 'path/to/header.js',
      callback: function(element) {
        // Perform post-loading actions
      }
    }
  },
  'app-content': {
    url: 'path/to/content.html',
    options: {
      css: 'path/to/content.css',
      js: 'path/to/content.js',
      jsAttributes: {
        defer: true
      }
    }
  },
  'app-footer': {
    url: 'path/to/footer.html'
  }
});
```

### 3. Create component files

Create separate HTML, CSS, and JavaScript files for each component in the designated directories.

- HTML files: Contains the structure and content of the component.
- CSS files: Contains the styles specific to the component.
- JavaScript files: Contains the functionality and behavior of the component.

## Configuration Options

The configuration object passed to the `init` function supports the following options for each component:

- `url` (required): The URL or path to the HTML file of the component.
- `options` (optional): An object containing additional options for the component.
  - `css` (optional): The URL or path to the CSS file associated with the component.
  - `js` (optional): The URL or path to the JavaScript file associated with the component.
  - `jsAttributes` (optional): An object containing attributes to be added to the dynamically loaded script tag.
  - `callback` (optional): A function to be executed after the component has been loaded.

## Error Handling

DynaLoad includes error handling mechanisms to gracefully handle loading failures and provide fallback options.

- If a component fails to load, an error message will be displayed in the corresponding placeholder element.
- If a CSS or JavaScript file fails to load, an error will be logged in the console.

## Caching

DynaLoad utilizes caching to improve performance by storing the fetched HTML content of components. Subsequent requests for the same component will retrieve the content from the cache, avoiding unnecessary network requests.

## Dependency Tracking

DynaLoad keeps track of loaded scripts and styles to prevent duplicate loading of resources. If multiple components require the same CSS or JavaScript file, it will be loaded only once.

## Use Cases

### Single Page Application (SPA) Navigation

DynaLoad can be used to create a single-page application (SPA) experience by dynamically loading content based on user navigation. Here's an example of how to implement SPA-style navigation with DynaLoad:

```html
<!-- index.html -->
<body>
  <nav id="sidebar">
    <ul>
      <li><a href="#" data-route="home">Home</a></li>
      <li><a href="#" data-route="about">About</a></li>
      <li><a href="#" data-route="contact">Contact</a></li>
    </ul>
  </nav>

  <main>
    <div id="content"></div>
  </main>

  <script src="path/to/dynaload.js"></script>
  <script>
    // Initialize DynaLoad
    DynaLoad.init({
      '#content': {
        url: 'path/to/home.html', // Default content
      },
    });

    // Set up sidebar navigation
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const route = this.dataset.route;
        const contentUrl = `path/to/${route}.html`;

        // Load the content dynamically
        DynaLoad.loadComponent('#content', contentUrl);

        // Update the URL (optional)
        history.pushState(null, null, `#${route}`);
      });
    });
  </script>
</body>
```

### Lazy Loading Components

DynaLoad can be used to lazy load components that are not immediately visible on the page. This can improve the initial page load time by deferring the loading of non-critical components until they are needed. Here's an example of lazy loading a component:

```html
<!-- index.html -->
<body>
  <!-- Visible content -->

  <div id="lazy-component"></div>

  <script src="path/to/dynaload.js"></script>
  <script>
    // Initialize DynaLoad
    DynaLoad.init({
      '#lazy-component': {
        url: 'path/to/lazy-component.html',
        options: {
          css: 'path/to/lazy-component.css',
          js: 'path/to/lazy-component.js',
        },
      },
    });

    // Lazy load the component when it becomes visible
    const lazyComponent = document.getElementById('lazy-component');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          DynaLoad.loadComponent('#lazy-component', 'path/to/lazy-component.html');
          observer.unobserve(lazyComponent);
        }
      });
    });
    observer.observe(lazyComponent);
  </script>
</body>
```

### Loading Components Based on User Interaction

DynaLoad can be used to load components dynamically based on user interactions, such as clicking a button or triggering an event. Here's an example of loading a component when a button is clicked:

```html
<!-- index.html -->
<body>
  <button id="load-button">Load Component</button>
  <div id="dynamic-component"></div>

  <script src="path/to/dynaload.js"></script>
  <script>
    // Initialize DynaLoad
    DynaLoad.init({
      '#dynamic-component': {
        url: 'path/to/dynamic-component.html',
        options: {
          css: 'path/to/dynamic-component.css',
          js: 'path/to/dynamic-component.js',
        },
      },
    });

    // Load the component when the button is clicked
    const loadButton = document.getElementById('load-button');
    loadButton.addEventListener('click', function () {
      DynaLoad.loadComponent('#dynamic-component', 'path/to/dynamic-component.html');
    });
  </script>
</body>
```

These are just a few examples of how DynaLoad can be used in different scenarios. The library provides flexibility and customization options to cater to various use cases and requirements.

## Browser Support

DynaLoad is designed to work in modern web browsers that support ECMAScript 6 (ES6) features. It has been tested in the following browsers:

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

## Contributing

Contributions to DynaLoad are welcome! If you encounter any issues, have suggestions for improvements, or would like to add new features, please open an issue or submit a pull request.

## License

DynaLoad is released under the [MIT License](https://opensource.org/licenses/MIT).

## Credits

DynaLoad was created by TheBitBrine and is maintained by the open-source community.

## Support

If you have any questions, suggestions, or need assistance, please feel free to reach out by opening an issue on the GitHub repository.

## Meme
![image](https://github.com/user-attachments/assets/7b5be0d7-3a25-48a7-b88c-6f1ba74b476f)
