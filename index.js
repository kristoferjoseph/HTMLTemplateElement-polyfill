"use strict";

module.exports = function () {
  if (typeof HTMLTemplateElement !== "undefined") {
    return;
  }

  (function () {
    HTMLTemplateElement = function () {};
    HTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);

    HTMLTemplateElement.decorate = function (template) {
      if (!template.content) {
        template.content = template.ownerDocument.createDocumentFragment();
        var child;
        while (child = template.firstChild) {
          template.content.appendChild(child);
        }
      }
    };

    HTMLTemplateElement.initialize = function (doc) {
      var templates = doc.querySelector("template");
      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        HTMLTemplateElement.decorate(t);
      };
    };

    addEventListener("DOMContentLoaded", function () {
      HTMLTemplateElement.initialize(document);
    });
  })();
};
