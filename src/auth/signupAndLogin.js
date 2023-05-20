import SignupLoginActions from '../UIActions/SignupLoginActions.js';
import AuthController from './AuthController.js';
import {
  forms,
  links,
  passwordsShowHide,
} from '../HtmlAndElements/elementsFromLoginPage.js';

new AuthController();
SignupLoginActions.addLinkListeners(links, forms);
SignupLoginActions.addPwShowHideListeners(passwordsShowHide);
