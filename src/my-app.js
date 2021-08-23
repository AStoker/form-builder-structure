
import FormVersion from "./FormVersion.js";

import { inject, IContainer } from 'aurelia';

@inject(IContainer)
export class MyApp {
    message = 'Hello World!';
    formVersion = null;

    constructor(auContainer) {
        this.auContainer = auContainer;

        this.formVersion = new FormVersion();


        window.formVersion = this.formVersion;
        console.log(auContainer);

        this.initialize();

        // this.cloneFormVersion = new FormVersion(this.formJSON);
        // console.log(this.cloneFormVersion);

    }

    bound() {

        // this.container.appendChild(this.block.toView());

        // this.formVersion.setFromJSONString(this.formJSON);
        // this.formVersion.parts.forEach(part => {
        //     this.created.appendChild(part.toView());
        // });

    }

    initialize() {
        let firstName = this.formVersion.add('et-input', {
            label: 'First Name',
            placeholder: 'First Name',
            value: 'John'
        });
        console.log(firstName);
        
        let lastName = this.formVersion.add('et-input', {
            label: 'Last Name',
            placeholder: 'Last Name'
        });

        let label = this.formVersion.add('et-label', {
            text: () => {
                console.log('Getting');
                return `Full Name: ${firstName.value} ${lastName.value}`;
            }
        });
        console.log(label);
    }

    initialize_old() {
        // let createElement = this.formVersion.createElement;
        // let createComponent = this.formVersion.createComponent;

        // let inputFirstNameElement = createElement('firstNameInput', {
        //     type: 'input', 
        //     attributes: { 
        //         placeholder: 'First Name',
        //         id: 'firstName',
        //         value: 'John'
        //     },
        //     events: {
        //         'change': (e) => {
        //             console.log(e);
        //         }
        //     }
        // });
        // let labelFirstNameElement = createElement('firstNameLabel', {
        //     type: 'label',
        //     attributes: {
        //         innerText: 'First Name',
        //         for: 'firstName'
        //     }
        // });
        // this.firstNameElement = createComponent('firstName', {
        //     type: 'div',
        //     attributes: {

        //     }},
        //     [labelFirstNameElement, inputFirstNameElement]
        // );

        // let inputLastNameElement = createElement('lastNameInput', {
        //     type: 'input', 
        //     attributes: { 
        //         placeholder: 'Last Name',
        //         id: 'lastName'
        //     }
        // });
        // let labelLastNameElement = createElement('lastNameLabel', {
        //     type: 'label',
        //     attributes: {
        //         innerText: 'Last Name',
        //         for: 'lastName'// this doesn't work
        //     }
        // });
        // this.lastNameElement = createComponent('lastName', {
        //     type: 'div',
        //     attributes: {

        //     }},
        //     [labelLastNameElement, inputLastNameElement]
        // );

        // let attr = {}
        // //Define a getter for innerText
        // //TODO: how can we get this kind of reference working when we come from JSON?

        // Object.defineProperty(attr, 
        //     'innerText',
        //     {
        //         enumerable: true,
        //         get() {
        //             return `Full Name: ${inputFirstNameElement.value} ${inputLastNameElement.value}`;
        //         }
        //     });

        // let fullNameLabelElement = createElement('fullNameLabel', {
        //     type: 'label',
        //     attributes: attr
        // });
        // this.fullNameElement = createComponent('fullName', {
        //     type: 'div',
        //     attributes: {

        //     }},
        //     [fullNameLabelElement]
        // );
        
        // this.block = createComponent('allNames', {
        //     type: 'div',
        //     attributes: {
        //     }},
        //     [this.firstNameElement, this.lastNameElement, this.fullNameElement]
        // );
        
        // this.formVersion.parts.push(this.block);
        // console.log(this.formVersion.parts);
    }

    get formJSON() {
        /*
            The structure of the JSON is as follows:
            {
                version: '1.0',
                parts: []
            }

        */
        return this.formVersion.toJSON();
    }

}
