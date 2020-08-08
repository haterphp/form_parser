'use strict';

import { StringToBool, plural } from "./utils.js";

export class Field{
    constructor(options){
        this.container = options.container;
        
        this.id = options.id;
        this.label = options.field.label || null;
        this.input = options.field.input;

        this.types = options.types;

        this.create();
    }

    create(){
        const {container, label, input, id, types} = this;
        const type = input.type;
        const formGroup = $('<div/>',{'class': (type === 'checkbox') ? 'custom-control custom-checkbox' : 'form-group'}).appendTo(container);

        if(label) formGroup.append(`<label for="input__${id}" class="${type === 'checkbox' ? 'custom-control-label' : ''}">${label}</label>`);

        if(types.includes(type)) this.field = $('<input/>');   
        else if(type === 'textarea') this.field = $('<textarea/>');
        else this.field = $('<select/>');

        if(input[plural(type)]){
            let select_container = this.field;
            
            if(['color'].includes(type)){
                select_container = $(`<datalist id="colorList__${id}" />`).appendTo(formGroup);
                this.field
                    .attr('list', `colorList__${id}`)
                    .attr('value', input[plural(type)][0]);
            }

            input[plural(type)].forEach(e => $(`<option value="${e}" label="${e}" />`).appendTo(select_container))
        }

        const classes = {
            'file' : 'form-control-file',
            'checkbox' : 'custom-control-input'
        }

        const attrs = {
            'filetype' : 'accept'
        }

        this.field
            .attr('id', `input__${id}`)
            .attr('name', `input_name__${id}`)
            .attr('class', (Object.keys(classes).includes(type)) ? classes[type] : 'form-control');

        for(let name in input){
            if(name == 'checked') 
                input['checked'] = StringToBool(input['checked']);

            if(name == 'filetype')
                input['filetype'] = input.filetype.map(e => `image/${e}`);

            if(name != plural(type))
                this.field.attr((Object.keys(attrs).includes(name)) ? attrs[name] : name, input[name])
        }
        
        if(type !== 'checkbox'){
            formGroup.append(this.field);
        }
        else{
            $(`label[for="input__${id}"]`).before(this.field);
        }

        if(input['mask'])
            this.field
                .attr('type', 'text')
                .mask(input['mask']);
    }
}