'use strict';

import {Form} from "./form.js";

const options = {
    formsName: [
        'addpost.json',
        'colorsheme.json',
        'interview.json',
        'signin.json',
        'signup.json',
    ],
    forms:[],
    $form__container: $('#form_container'),
    $select_form__container: $('#select_form'),
};

const getForm = async (name) => {
    return await fetch(`assets/json/${name}`).then(async res => await res.json());
};

const forms = Promise.all(Array.from({length: options.formsName.length}, async (_, i) => await getForm(options.formsName[i])));

const createOption = (name, i) =>{
    options.$select_form__container.append($(`<option value="${i}">${name}</option>`))
};

window.updateForm = () => {
    //window.form.remove();
    forms.then( result => {
        window.form = new Form(result[options.$select_form__container.val()] , options.$form__container);
    });
}

forms.then( result => {
    result.forEach((e, i) => createOption(e.name || "New Form", i));
    window.form = new Form(result[options.$select_form__container.val()], options.$form__container);
});
