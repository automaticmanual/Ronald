var config = {
  taskName: 'jsdoc',
  dist: {
    src: ['Ronald/'],
    options: {
      recurse: true,
      destination: 'doc',
      template: 'node_modules/ink-docstrap/template',
      configure: './bin/jsdoc-config.json'
    }
  }
};

module.exports = config;