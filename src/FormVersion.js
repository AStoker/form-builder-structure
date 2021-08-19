// import BasicElement from "./parts/element.js";
// import Component from "./parts/component.js";
import Part from './Part.js';

import { Input } from './custom-elements/types/Input.js';
import { Text } from './custom-elements/types/Text.js';

import { createElementDefinition } from './custom-elements/custom-element-factory.js';

export default class FormVersion {
    version = '1.0.0';
    parts = [];

    constructor(form) {
        //If the form is a string, we'll try and parse from json
        if (typeof form === 'string') {
            try {
                this.setFromJSONString(form);
            } catch (e) {
                throw new Error(e);
            }
        } else if (form) { //The form is assumed to be a full form object
            this.version = form.version;
            this.parts = form.parts;
        }
    }

    /*
    * Parse the form version from JSON
    * @param {string} formJson - The form as a JSON string
    */
    setFromJSONString(formJson) {

        //Try and parse the json string
        let formVersion = {};
        try {
            formVersion = JSON.parse(formJson);
        } catch (e) {
            throw new Error('FormVersion: Invalid form JSON');
        }

        if (!formVersion.parts) {
            return; //Nothing to parse out
        }

        for (let {name, attributes} of formVersion.parts) {
            this.add(name, attributes);
        }

        this.version = formVersion.version || this.version;

        return this;
    }

    toJSON() {
        return JSON.stringify({
            version: this.version,
            parts: this.parts
        }, null, 4);
    }

    /*
    * Add an element to the form.
    * @param {string|object} element - The element to add
    * @returns object - The element added
    */
    add(element, attributes) {
        if (typeof element === 'string') {
            //Create an element based off the assumed ID given
            let elementClass = null;
            let elementName = element;
            switch (elementName) { //TODO: pull this out into an element resolver
                case 'et-input':
                    elementClass = createElementDefinition(elementName, Input);
                    break;
                case 'et-label':
                    elementClass = createElementDefinition(elementName, Text);
                    if (attributes.text && typeof attributes.text === 'function') {
                        //Redefine text as a getter
                        let originalTextGetter = attributes.text;

                        //TODO: Get this getter to work
                        Object.defineProperty(attributes, 
                            'text',
                            {
                                enumerable: true,
                                get: originalTextGetter
                            });
                    }
                    break;
                default:
                    throw new Error('FormVersion: Invalid element type');
            }

            let elementPart = new Part(elementName, elementClass, attributes);

            this.parts.push(elementPart);
            console.log(this.parts);
            return elementPart;
        } else {
            //Assume it's an element ready for us to use
        }
    }


    // parseJSONComponent({name, type, attributes, children}) {
    //     let parsedChildren = children.map(child => {
    //         if (child.children) {
    //             return this.parseJSONComponent(child);
    //         } else {
    //             return this.parseJSONElement(child);
    //         }
    //     });
    //     let component = new Component(name, {type, attributes}, parsedChildren);
    //     return component;
    // }

    // parseJSONElement({name, type, attributes}) {
    //     let element = new BasicElement(name, {type, attributes});
    //     return element;
    // }


    // createElement(elementName, {type, id, attributes, events}) {
    //     let element = new BasicElement(elementName, {
    //         type,
    //         id, //TODO: We want to generate the ID here so we can keep track of them all
    //         attributes,
    //         events
    //     });
    //     return element;
    // }

    // createComponent(componentName, {type, id, attributes, events}, children) {
    //     let component = new Component(componentName, {
    //         type,
    //         id,
    //         attributes,
    //         events
    //     }, children);
    //     return component;
    // }
}

/*
let fullNameLabelElement = new BasicElement('fullNameLabel', {
    type: 'label',
    attributes: attr
});
this.fullNameElement = new Component('fullName', {
    type: 'div',
    attributes: {

    }},
    [fullNameLabelElement]
);
*/