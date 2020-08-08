'use strict';

import {Field} from "./field.js";
import {capitalizeFirstLetter} from "./utils.js";

export class Form {
    constructor(options) {
        this.container = options.container;

        this.types = options.types;

        this.name = options.form.name || "Unnamed";
        this.buttons = options.form.buttons || null;
        this.fields = options.form.fields || null;
        this.references = options.form.references || null;

        this.create();
    }

    create(){
        const {container, name} = this;
        const containers = ['fields', 'buttons', 'references'];
        const form = $(`<form id="form__${name}"></form>`);

        this.form = $('<div></div>')
            .append($(`<h4>${name}</h4>`))
            .append(form);

        container.append(this.form);

        containers.forEach(e => {
            const childContainer = $(`<div class="${e}-container"></div>`);
            form.append(childContainer);
            if(this[e]) this[`create${capitalizeFirstLetter(e)}`](childContainer);
        });
    }

    createFields(container){
        const { fields } = this;
        this.fieldsElements = Array.from({length: fields.length}, 
            (_, i) => new Field({
                container,
                field: fields[i],
                id: i,
                types: this.types
            }))
    }

    createButtons(){
      
    }

    createReferences(){}

    remove(){
        this.form.remove();
    }
}