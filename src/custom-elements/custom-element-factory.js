import Aurelia, { CustomElement, kebabCase } from 'aurelia';
import { Controller } from '@aurelia/runtime-html';

import { Input } from './types/Input.js';
import { Text } from './types/Text.js';


/*
* Creates a custom element class.
*/

export function enhanceElement(name) {

    var host = document.createElement('div');
    var template = '<input placeholder.bind="placeholder" />';
    host.innerHTML = template;
    
    let component = {
        placeholder: 'Hi there'
    }

    Aurelia.enhance({host, component});

    return host;
}

export const createElementDefinition = (name, elemType, cnt) => {
    let container = cnt;
    if (!container) {
        let au = new Aurelia();
        container = au.container;
    }

    name = kebabCase(name);

    let vm = elemType;

    const Elem = CustomElement.define({
        name,
        shadowOptions: { mode: 'open' },
        template: vm.template
    }, vm);

    return Elem;
}

export const createElement = (name, elemType, attributes = {}, events, cnt) => {
    let container = cnt;
    if (!container) {
        let au = new Aurelia();
        container = au.container;
    }

    name = kebabCase(name);

    let vm = elemType === 'input' ? Input : Text

    const Elem = CustomElement.define({
        name,
        shadowOptions: { mode: 'open' },
        template: vm.template
    }, vm);

    const component = container.get(Elem);

    // Add attributes to component if they don't already exist
    if (!component.attributes) {
        component.attributes = {};
    }
    for (let attr in attributes) {
        let attrDesc = Object.getOwnPropertyDescriptor(attributes, attr)
        Object.defineProperty(component.attributes, attr, attrDesc)
    }

    console.log(CustomElement);
    const host = document.createElement(name)
    const controller = Controller.$el(container, component, host, null, null);

    //controller.activate(controller, null, null);

    return controller; // access the host on controller.host

}