import {Input} from "./input.js";

export class Form {
    constructor(form, $form_container) {
        this.name = form.name || 'New Form';
        this.buttons = form.buttons || null;
        this.fields = form.fields || null;
        this.references = form.references || null;
        this.inputs = null;

        this.$form_container = $form_container;

        this.createForm();
        this.createInputs();
    }

    createForm(){

        this.form = $(`<form id="custom_${this.name}_form"></form>`);
        this.$form_container.append(`<h4>${this.name}</h4><br>`);
        this.$form_container.append(this.form);
    }

    createInputs() {
        this.inputs = Array.from({length: this.fields.length}, (_, i) => new Input(this.fields[i], this.form));
    }
}