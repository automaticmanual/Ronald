var config = {
  taskName: 'requirejs.complile',
  options: {
    name: 'Ronald/main',
    include: 'lib/almond/almond',
    out: 'bin/ronald.min.js',
    wrap: {
      startFile: __dirname + '/start.frag',
      endFile: __dirname + '/end.frag'
    }
  }
};

module.exports = config;