export class Input{
    constructor(input, form){
        this.label = input.label || null;
        this.input = input.input;
        this.form = form;
        this.createInput();
    }

    createInput(){
        console.log(this.input);
        this.element = $(`<div class="form-group"></div>`);
        
        if(this.input.required){

        }

        this.element.append(`<input type="${this.input.type}" class="form-control">`);
        this.form.append(this.element);
    }
}