var chai = require('chai');
var expect = require('chai').expect;
var HTMLTemplateElement = require('../');

describe('HTMLTemplateElement', function() {
  var body = document.body, frame, doc, template;
  beforeEach(function(done) {
    body.insertAdjacentHTML('beforeEnd', '<iframe style="border:none;" src="./fixtures/HTMLTemplateElement.html"></iframe>');
    frame = body.children[body.children.length - 1];
    frame.addEventListener('load', function() {
      doc = frame.contentDocument;
      template = doc.querySelector('template');
      done();
    });
  });

  afterEach(function() {
    body.removeChild(frame);
    template = null;
    doc = null;
    frame = null;
  });

  it('should remove template contents', function() {
    expect(template.children.length).to.equal(0);
  });

  it('should have content property', function() {
    expect(template.content).to.exist;
  });

  it('should have content nodes', function() {
    expect(template.content.childNodes.length).to.equal(3);
  });

  it('should not have content in document', function() {
    var content = document.querySelector('#content');
    expect(content).to.not.exist;
  });

  it('should append template content', function() {
    body.appendChild(document.importNode(template.content, true));
    var content = document.querySelector('#content');
    expect(content).to.exist;
    body.removeChild(content);
  });

});
