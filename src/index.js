export default () => {
  if (typeof HTMLTemplateElement === 'undefined') {
    () => {
      HTMLTemplateElement = () => {};
      HTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);

      HTMLTemplateElement.decorate = (template) => {
        if (!template.content) {
          template.content = template.ownerDocument.createDocumentFragment();
          var child;
          while (child = template.firstChild) {
            template.content.appendChild(child);
          }
        }
      };

      HTMLTemplateElement.initialize = (doc) => {
        var templates = doc.querySelector('template');
        for (var i = 0, l = templates.length, t;
          (i < l) && (t = templates[i]); i++) {
          HTMLTemplateElement.decorate(t);
        };
      };

      addEventListener('DOMContentLoaded', () => {
        HTMLTemplateElement.initialize(document);
      })
    }();
  };
};
