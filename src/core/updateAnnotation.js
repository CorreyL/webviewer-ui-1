export default (annotation) =>
  window.docViewer
    .getAnnotationManager()
    .updateAnnotation(annotation);
