import { createElement } from '../custom-elements/custom-element-factory.js';

import Aurelia, { inject, DI, IContainer } from 'aurelia';

import Part from './Part.js';

export default class BasicElement extends Part {

    constructor(name, {type, attributes, events}) {
        super(name, {type, attributes, events});
        console.log(Aurelia);
        console.log(DI);
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