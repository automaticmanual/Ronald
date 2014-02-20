define([
  'Gizmo',
  'Ronald/helpers/Error',
  'Ronald/helpers/Dot'
], function(Gizmo, Error, Dot) {

  describe('Ronald/helpers/Dot', function() {
    var dot;

    beforeEach(function() {
      dot = Dot.create();
    });

    describe('Ronald/helpers/Dot', function() {
      it('Should extend Gizmo.', function() {
        Dot.instanceOf(Gizmo).should.be.true;
        dot.instanceOf(Gizmo).should.be.true;
      });
    });

    describe('#assert', function() {
      it('Should throw on falsy statments.', function() {
        var throwMe = function(condition) {
          return function() {
            Dot.assert(condition);
          };
        };

        throwMe(false).should.throw;
        throwMe(null).should.throw;
        throwMe(undefined).should.throw;
        throwMe(0).should.throw;
        throwMe('').should.throw;
      });

      it('Should throw an Ronald/helpers/Error if one is not provided.', function() {
        var throwMe = function() {
          Dot.assert();
        };

        throwMe.should.throw(Error);
      });

      it('Should throw a provided error.', function() {
        var throwMe = function() {
          Dot.assert(null, Error.create('error', 'explosions'));
        };

        throwMe.should.throw('explosions');
      });

      it('Should return self on pass.', function() {
        dot.assert(true).should.equal(dot);
      });
    });

    describe('#result', function() {
      it('Should return an evaluated property.', function() {
        var object = {
          item: function() {
            return 'item';
          },

          cat: 'ronnie'
        };

        Dot.result(object, 'item').should.equal('item');
        Dot.result(object, 'cat').should.equal('ronnie');
        should.not.exist(Dot.result(object, 'doesnt-exist'));
      });
    });
  });
});