define([
  'jQuery',
  'Gizmo',
  'Ronald/db/Request'
], function($, Gizmo, Request) {

  describe('Ronald/db/Request', function() {
    var request, model, options;

    beforeEach(function() {
      model = {
        item: 'item'
      };

      options = {
        option: 'option'
      };

      request = Request.construct(model, options);
    });

    describe('Ronald/db/Request', function() {
      it('Should extend Gizmo', function() {
        Request.instanceOf(Gizmo).should.be.true;
        request.instanceOf(Gizmo).should.be.true;
      });
    });

    describe('#construct', function() {
      it('Should have a model based on argument.', function() {
        request.should.have.property('model', model);
      });

      it('Should have options based on argument.', function() {
        request.should.have.property('options', options);
      });

      it('Should construct an empty object if options are not provided.', function() {
        var request = Request.construct(model);

        request.should.have.property('options');
        request.options.should.be.an('object');
      });
    });

    describe('#deferred', function() {
      it('Should return a $.Deferred object.', function() {
        Object.keys(request.deferred()).should.be.deep.equal(Object.keys($.Deferred()));
      });
    });
  });
});