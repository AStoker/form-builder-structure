import Part from './Part.js';

export default class Block extends Part {

    constructor(name = 'block', {type, attributes}, children = []) {
        super(name, {type, attributes});
        this.children = children;
    }

    toView() {
        let element = document.createElement(this.type); //We should create the element based off name
        
        this.children.forEach(child => {
            element.appendChild(child.toView());
        });
        
        return element;
    }

    toFormBuilderView() {
        let element = this.toView();
        //Do something with element
        return element;
    }

    toJSON() {
        let json = {
            name: this.name,
            type: this.type,
            attributes: this.attributes,
            children: this.children.map(child => child.toJSON())
        };

        return json;
    }

}