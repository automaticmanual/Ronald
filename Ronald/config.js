require.config({
  paths: {
    Gizmo: '../lib/Gizmo/Gizmo',
    jQuery: '../lib/jquery/dist/jquery.min'
  },

  shim: {
    jQuery: {
      exports: 'jQuery'
    }
  }
});