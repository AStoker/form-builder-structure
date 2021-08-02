import BasicElement from './element.js';
import Part from './Part.js';

export default class Component extends Part {

    constructor(name = 'component', {type, attributes}, children = []) {
        super(name, {type, attributes});
        this.children = parseJSONChildren(children);
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

function parseJSONChildren(children) {
    return children.map(({name, type, attributes, children}) => {
        if (children) {
            return new Component(name, {type, attributes}, children);
        } else {
            return new BasicElement(name, {type, attributes});
        }
    });
}