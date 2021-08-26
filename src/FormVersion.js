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
                    break;
                default:
                    throw new Error('FormVersion: Invalid element type');
            }

            let parsedAttributes = parseGetters(attributes);
            let elementPart = new Part(elementName, elementClass, parsedAttributes);

            this.parts.push(elementPart);
            // console.log(this.parts);
            return elementPart;
        } else {
            //Assume it's an element ready for us to use
        }
    }

}

function parseGetters(obj) {
    let newObj = {};

    //Go through the object and any functions turn into getters
    for (let key in obj) {
        let attrDesc = Object.getOwnPropertyDescriptor(obj, key);
        if (typeof attrDesc.value === 'function') {
            Object.defineProperty(newObj, key, {
                enumerable: true,
                get() {
                    return attrDesc.value();
                }
            });
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
