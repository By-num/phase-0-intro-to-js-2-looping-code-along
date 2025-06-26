const { expect } = require('chai');
const sinon = require('sinon');

// JavaScript

describe('Sinon core features', () => {
  describe('Spies', () => {
    it('should record calls and arguments', () => {
      const obj = {
        add: function(a, b) {
          return a + b;
        }
      };
      const spy = sinon.spy(obj, 'add');
      obj.add(1, 2);
      obj.add(3, 4);

      expect(spy.called).to.be.true;
      expect(spy.callCount).to.equal(2);
      expect(spy.firstCall.args).to.deep.equal([1, 2]);
      expect(spy.secondCall.args).to.deep.equal([3, 4]);
      spy.restore();
    });
  });

  describe('Stubs', () => {
    it('should replace a function and control its return value', () => {
      const obj = {
        greet: function(name) {
          return `Hello, ${name}`;
        }
      };
      const stub = sinon.stub(obj, 'greet').returns('stubbed');
      expect(obj.greet('World')).to.equal('stubbed');
      expect(stub.calledOnce).to.be.true;
      stub.restore();
    });
  });

  describe('Mocks', () => {
    it('should set expectations and verify them', () => {
      const obj = {
        update: function() {}
      };
      const mock = sinon.mock(obj);
      mock.expects('update').once().withExactArgs(42);

      obj.update(42);
      mock.verify();
      mock.restore();
    });
  });
});