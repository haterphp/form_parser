'use strict';

import {Field} from "./field.js";
import {capitalizeFirstLetter} from "../utils.js";
import { Button } from "./button.js";
import { Reference } from "./reference.js";

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
        const { fields, types } = this;
        this.fieldsElements = Array.from({length: fields.length}, 
            (_, i) => new Field({
                container,
                field: fields[i],
                id: i,
                types
            }))
    }

    createButtons(container){
      const { buttons } = this;
      this.buttonsElements = Array.from({length: buttons.length},
            (_, i) => new Button({
                container,
                button: buttons[i],
                id: i
            }))
    }

    createReferences(container){
        const { references, types } = this;
        if(references[0].input){
            references[0].label = `<span>${references[1]['text without ref'] || ''} <a href="${references[1].ref || '/'}">${references[1].text || 'Unnamed Link'}</a></span>`;     
            this.refElements =  new Reference({
                container,
                ref: references[0],
                id: 0,
                types
            });
            return true;
        }
        this.refElements = Array.from({length: references.length}, 
            (_, i) => new Reference({
                container,
                ref: references[i],
                id: i,
                types
            }))
    }

    remove(){
        this.form.remove();
    }
}