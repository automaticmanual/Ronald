define([
  'Gizmo',
  'Ronald/helpers/patterns/Registry'
], function(Gizmo, Registry) {

  describe('Ronald/helpers/Registry', function() {
    var registry = Registry.create();

    describe('Ronald/helpers/Registry', function() {
      it('Should extend Gizmo.', function() {
        Registry.instanceOf(Gizmo).should.be.true;
        registry.instanceOf(Gizmo).should.be.true;
      });
    });

    describe('#register', function() {
      it('Should return self.', function() {
        registry
          .register()
          .should.equal(registry);
      });

      it('Should register an item.', function() {
        var item = registry
          .register('cat', 'ronnie')
          .get('cat');

        should.exist(item);
      });
    });

    describe('#remove', function() {
      it('Should remove an item.', function() {
        var item = registry
          .register('cat', 'ronnie')
          .remove('cat')
          .get('cat');

        should.not.exist(item);
      });
    });

    describe('#has', function() {
      it('Should determine if an item key is register.', function() {
        registry
          .register('cat', 'ronnie')
          .register('item')
          .has('item')
          .should.be.true;

        registry
          .has('cat')
          .should.be.true;

        registry
          .has('color')
          .should.be.false;
      });
    });

    describe('#get', function() {
      it('Should return an item by key.', function() {
        registry
          .register('cat', 'ronnie')
          .get('cat')
          .should.equal('ronnie');
      });

      it('Should return nothing on non-existant keys.', function() {
        should.not.exist(registry.get('non-existant'));
      });
    });

    describe('#keys', function() {
      it('Should return an array of keys that are currently registred.', function() {
        registry
          .register('cat', 'ronnie')
          .register('item')
          .register('color')
          .remove('color')
          .keys()
          .should.be.an('array');

        registry
          .keys()
          .should.deep.equal(['cat', 'item']);
      });
    });
  });
});