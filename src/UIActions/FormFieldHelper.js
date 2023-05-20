export default class FormFieldHelper {
  static toggleInvalidClass(field, className, add) {
    if (add) {
      field.classList.add(className);
    } else {
      field.classList.remove(className);
    }
  }
}
