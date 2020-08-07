'use strict';

import { StringToBool } from "./utils.js";

export class Field{
    constructor(options){
        this.container = options.container;
        
        this.id = options.id;
        this.label = options.field.label || null;
        this.input = options.field.input;

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
        const {container, label, input, id, types} = this;
        const type = input.type;
        const formGroup = $('<div/>',{'class': (type === 'checkbox') ? 'custom-control custom-checkbox' : 'form-group'}).appendTo(container);

        if(label) formGroup.append(`<label for="input__${id}" class="${type === 'checkbox' ? 'custom-control-label' : ''}">${label}</label>`);

        if(types.includes(type)) {
            const classes = {
                'file' : 'form-control-file',
                'checkbox' : 'custom-control-input'
            }
            
            this.field = $('<input/>')
                .attr('class', (['file', 'checkbox'].includes(type)) ? classes[type] : 'form-control');
            
            for(let name in input){
                if(name == 'checked') input['checked'] = StringToBool(input['checked']); 
                this.field.attr(name, input[name])
            }
        }   
        else if(type === 'textarea') this.field = $('<textarea/>')
        else this.field = $('<select/>')
        
        this.field
            .attr('id', `input__${id}`)
            .attr('name', `input_name__${id}`);

        if(type !== 'checkbox'){
            formGroup.append(this.field);
        }
        else{
            $(`label[for="input__${id}"]`).before(this.field);
        }
    }
}