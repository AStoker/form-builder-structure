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

// import { DI, ILogger, ConsoleSink, IPlatform, LogLevel, LoggerConfiguration, Registration } from '@aurelia/kernel';
// import { BrowserPlatform } from '@aurelia/platform-browser';

// const PLATFORM = BrowserPlatform.getOrCreate(globalThis);

// const staticContainer = DI.createContainer();
// staticContainer.register(Registration.instance(IPlatform, Registration));
// staticContainer.register(LoggerConfiguration.create({ sinks: [ConsoleSink], level: LogLevel.fatal }));

// export const log = staticContainer.get(ILogger).scopeTo('iaAnyware');

export const createElement = (name, elemType, cnt) => {
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

    const component = new Elem();

    console.log(CustomElement);
    const host = document.createElement(name)
    const controller = Controller.$el(container, component, host, null, null);

    controller.activate(controller, null, null);

    return controller; // access the host on controller.host

}