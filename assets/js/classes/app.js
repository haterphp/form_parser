'use strict';

import { Form } from "./form.js";

export class App{
    constructor(options){
        this.formsName = options.formsName;
        this.selectedForm = 0;

        this.$form__container = options.$form__container; 
        this.$options__container = options.$select_form__container; 
        
        this._init_();
    }

    async _init_(){
        this.forms = await this.getForms();
        await this.createOptions();
        this.updateForm();
    }

    async getForms(){
        const { formsName } = this;
        return Promise.all(
            Array.from({length: formsName.length},
                async (_, i) => await fetch(`assets/json/${formsName[i]}`).then(res => res.json())));
    }

    async createOptions(){
        const { $options__container } = this;
        this.forms.forEach(async (item, index) => await $options__container
            .append($(`<option value="${index}">${item.name || "Unnamed"}</option>`)));
    }

    updateForm(){
        this.selectedForm = +this.$options__container.val();
        if(this.form) this.form.remove(); 
        this.form = new Form({
            form: this.forms[this.selectedForm],
            container: this.$form__container
        });
    }
}