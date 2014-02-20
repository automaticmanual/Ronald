var config = {
  
  taskName: 'mustache_render.build-version',
  files: [{
    data: './package.json',
    template: './bin/ronald.min.js',
    dest: './bin/ronald.min.js'
  }]
};

module.exports = config;