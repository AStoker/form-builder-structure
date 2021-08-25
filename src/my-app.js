import { inject, IContainer } from 'aurelia';

import dragula from 'dragula';

import FormVersion from "./FormVersion.js";

import 'dragula/dist/dragula.css';


@inject(IContainer)
export class MyApp {
    formVersion = null;

    constructor(auContainer) {
        this.auContainer = auContainer;

        this.formVersion = new FormVersion();


        window.formVersion = this.formVersion;
        console.log(auContainer);

        this.initialize();

        this.cloneFormVersion = new FormVersion(this.formJSON);
        // console.log(this.cloneFormVersion);

    }

    bound() {

    }

    attached() {
        this.drake = dragula([this.elementsList, this.formParts], {
            copy: true,
            moves: (el, source, handle, sibling) => {
                console.log(el, source, handle, sibling);
            }
        });
        window.drake = this.drake;
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
                return `Full Name: ${firstName.value} ${lastName.value}`;
            }
        });
        console.log(label);
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
