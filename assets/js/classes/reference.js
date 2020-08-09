import { Field } from "./field.js";

export class Reference{
    constructor(options){
        this.container = options.container;
        this.ref = options.ref;
        this.id = options.id;
        this.types = options.types;

        this.create();
    }

    create(){
        const { ref, container, types, id } = this;
        const refContainer = $(`<div/>`)
                                .attr('id', `ref_group__${id}`)
                                .attr('class', `form-group`)
                                .appendTo(container);
        if(ref.input){
            this.input = new Field({
                container: refContainer,
                field: ref,
                types,
                id: `ref_input__${id}`
            })
            return true;
        }

        refContainer.append($(`<a href="${ref.ref}">${ref.text}</a>`));
    }
}