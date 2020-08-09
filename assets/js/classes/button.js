export class Button{
    constructor(options){

        this.container = options.container;
        this.button = options.button;
        this.id = options.id;

        this.create();
    }

    create(){
        const { button, container, id } = this;
        this.element = $(`<button id="button__${id}">${button.text || "Send"}</button>`).appendTo(container);
        
        const attrs = {
            'class': button.className || 'btn btn-primary',
            'type': button.type || 'Submit'
        }

        for(let name in attrs)
            this.element.attr(name, attrs[name]);
    
    }
}