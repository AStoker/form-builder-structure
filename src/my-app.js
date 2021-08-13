import BasicElement from "./parts/element.js";
import Component from "./parts/component.js";

import FormVersion from "./FormVersion.js";

import { enhanceElement, createElement } from './custom-elements/custom-element-factory.js';

import Aurelia, { IPlatform, inject, IContainer } from 'aurelia';

@inject(IPlatform, IContainer)
export class MyApp {
    message = 'Hello World!';

    constructor(platform, auContainer) {
        this.platform = platform;
        this.auContainer = auContainer;

        console.log(auContainer);

        this.createStuff();

        // this.testElement = enhanceElement('test-me');
        this.otherTestElement = createElement('test-me-again', this.auContainer);
        console.log(this.otherTestElement);

    }

    bound() {
        console.log('MyApp created');

        // let elem = createElement(this.platform, 'test-me');
        // console.log(elem);
        this.container.appendChild(this.otherTestElement.host);

        this.container.appendChild(this.block.toView());

        let formVersion = new FormVersion(this.formJSON);
        formVersion.parts.forEach(part => {
            this.created.appendChild(part.toView());
        });

    }

    createStuff() {
        let inputFirstNameElement = new BasicElement('firstNameInput', {
            type: 'input', 
            attributes: { 
                placeholder: 'First Name',
                id: 'firstName',
                value: 'John'
            },
            events: {
                'change': (e) => {
                    console.log(e);
                }
            }
        });
        let labelFirstNameElement = new BasicElement('firstNameLabel', {
            type: 'label',
            attributes: {
                innerText: 'First Name',
                for: 'firstName'
            }
        });
        this.firstNameElement = new Component('firstName', {
            type: 'div',
            attributes: {

            }},
            [labelFirstNameElement, inputFirstNameElement]
        );

        let inputLastNameElement = new BasicElement('firstNameInput', {
            type: 'input', 
            attributes: { 
                placeholder: 'Last Name',
                id: 'lastName'
            }
        });
        let labelLastNameElement = new BasicElement('firstNameLabel', {
            type: 'label',
            attributes: {
                innerText: 'Last Name',
                for: 'lastName'// this doesn't work
            }
        });
        this.lastNameElement = new Component('firstName', {
            type: 'div',
            attributes: {

            }},
            [labelLastNameElement, inputLastNameElement]
        );

        let fullNameLabelElement = new BasicElement('fullNameLabel', {
            type: 'label',
            attributes: {
                innerText: 'Full Name: ' + inputFirstNameElement.value,
            }
        });
        this.fullNameElement = new Component('fullName', {
            type: 'div',
            attributes: {

            }},
            [fullNameLabelElement]
        );
        
        this.block = new Component('names', {
            type: 'div',
            attributes: {
            }},
            [this.firstNameElement, this.lastNameElement, this.fullNameElement]
        );
        
    }

    get formJSON() {
        /*
            The structure of the JSON is as follows:
            {
                version: '1.0',
                parts: []
            }

        */
        return JSON.stringify({
            version: '1.0',
            parts: [this.block.toJSON()]
        }, null, 4);
    }

}