'use strict';

import { plural } from "./utils.js";

export class Field{
    constructor(options){
        this.container = options.container;
        
        this.id = options.id;
        this.label = options.field.label || null;
        this.type = options.field.input.type || 'text';
        this.required = options.field.input.required || false;
        this.checked = options.field.input.checked || false;
        this.placeholder = options.field.input.placeholder || null;
        this.mask = options.field.input.mask || null;
        this.multiple = options.field.input.multiple || false;
        this.filetype = options.field.input.filetype || null;
        this[plural(this.type)] = options.field.input[plural(this.type)] || null;

        this._init_();
    }

    async _init_(){
        this.types = await this.getTypes();
        this.create();
    }

    async getTypes(){
        return await fetch('assets/json/database/types.json').then(res => res.json());
    }

    create(){
        const {type, label, types, container, id} = this;
        const formGroup = $(`<div class="form-group"></div>`)

        if(label) formGroup.append(`<label for="input__${id}">${label}</label>`)

        if(types.includes(type)){
            this.field = $(`<input type="${type}" id="input__${id}" class="form-control">`);
        }
        else if(this.type === 'textarea'){
            this.field = $(`<textarea id="input__${id}" class="form-control"></textarea>`);
        }
        else{
            this.field = $(`<select id="input__${id}" class="form-control"></select>`);
        }

        formGroup.append(this.field);
        container.append(formGroup)
    }
}