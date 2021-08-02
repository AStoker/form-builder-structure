import BasicElement from "./parts/element.js";
import Component from "./parts/component.js";
import Block from "./parts/block.js";

import FormBuilderParser from "./FormBuilderParser.js";


export class MyApp {
    message = 'Hello World!';

    constructor() {
        this.createStuff();
    }

    bound() {
        console.log('MyApp created');
        this.container.appendChild(this.block.toView());

        let parser = new FormBuilderParser(this.formJSON);
        this.created.appendChild(parser.parseDOM());
    }

    createStuff() {
        let inputFirstNameElement = new BasicElement('firstNameInput', {
            type: 'input', 
            attributes: { 
                placeholder: 'First Name',
                id: 'firstName'
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
        
        this.block = new Block('names', {
            type: 'div',
            attributes: {
            }},
            [this.firstNameElement, this.lastNameElement]
        );
        this.block2 = new Block('names2', {
            type: 'div',
            attributes: {
            }},
            [this.firstNameElement, this.lastNameElement]
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
            parts: [this.block.toJSON(), this.block2.toJSON()]
        }, null, 4);
    }

}