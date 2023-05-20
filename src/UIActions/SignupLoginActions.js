export default class SignupLoginActions {
  // We have link on our both forms that will
  // change form when user click
  static addLinkListeners(links, forms) {
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        forms.classList.toggle('show-signup');
      });
    });
  }
  // For user password we hide the text
  // and if necessary user can see his password
  static addPwShowHideListeners(icons) {
    icons.forEach(eyeIcon => {
      eyeIcon.addEventListener('click', () => {
        const passwordsField =
          eyeIcon.parentElement.parentElement.querySelectorAll('.password');

        passwordsField.forEach(password => {
          if (password.type == 'password') {
            password.type = 'text';
            eyeIcon.classList.replace('bx-hide', 'bx-show');
          } else {
            password.type = 'password';
            eyeIcon.classList.replace('bx-show', 'bx-hide');
          }
        });
      });
    });
  }
  static checkStorageAndShowForm(forms) {
    const isStorageEmpty = localStorage.length == 0;
    if (isStorageEmpty) {
      forms.classList.add('show-signup');
    } else {
      forms.classList.remove('show-signup');
    }
  }
}
