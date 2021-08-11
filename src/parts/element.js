import Part from './Part.js';

export default class BasicElement extends Part {

    constructor(name, {type, attributes, events}) {
        super(name, {type, attributes, events});
    }
    
    //toView inherited from Part

    toFormBuilderView() {
        let element = this.toView();
        //Do something with element
        return element;
    }

    toJSON() {
        let json = {
            name: this.name,
            type: this.type,
            attributes: this.attributes
        };

        return json;
    }

}