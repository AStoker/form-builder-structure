import Part from './Part.js';

export default class BasicElement extends Part {

    constructor(name, {type, attributes}) {
        super(name, {type, attributes});
    }

    
    toView() {
        let element = document.createElement(this.type);

        //Set attributes
        for (let attribute in this.attributes) {
            element[attribute] = this.attributes[attribute];
        }

        return element;
    }

    toFormBuilderView() {
        let element = this.toView();
        //Do something with element
        return element;
    }

}