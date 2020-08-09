import {App} from './classes/app.js';

const options = {
    formsName: [
        'addpost.json',
        'colorsheme.json',
        'interview.json',
        'signin.json',
        'signup.json',
    ],
    $form__container: $('#form_container'),
    $select_form__container: $('#select_form'),
};

window.app = new App(options);
