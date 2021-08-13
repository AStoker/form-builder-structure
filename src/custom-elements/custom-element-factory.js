import Aurelia, { CustomElement } from 'aurelia';
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

export const createElement = (name, container) => {
    const Elem = CustomElement.define({
        name,
        shadowOptions: { mode: 'open' },
        template: Input.template
    }, Input);

    const component = new Elem();

    console.log(CustomElement);
    const host = document.createElement(name)
    const controller = Controller.$el(container, component, host, null, null);

    controller.activate(controller, null, null);

    return controller; // access the host on controller.host

}