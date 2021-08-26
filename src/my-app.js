import { inject, IContainer } from 'aurelia';

import Sortable from 'sortablejs';

import FormVersion from "./FormVersion.js";



@inject(IContainer)
export class MyApp {
    formVersion = null;

    constructor(auContainer) {
        this.auContainer = auContainer;

        this.formVersion = new FormVersion();


        window.formVersion = this.formVersion;
        // console.log(auContainer);

        this.initialize();

        this.cloneFormVersion = new FormVersion(this.formJSON);
        // console.log(this.cloneFormVersion);

    }

    bound() {

    }

    attached() {

        this.sortableElementsList = Sortable.create(this.elementsList, {
            group: {
                name: 'shared',
                pull: 'clone',
                // put: false
            },
            animation: 150,
            sort: false,
            setData: (dataTransfer, dragEl) => {
                console.log('Element list setData');
                console.log(dataTransfer, dragEl);
            }
        });
        this.sortableFormElements = Sortable.create(this.formParts, {
            group: {
                name: 'shared',
                // put: false
            },
            animation: 150,
            onEnd: (evt) => { //Will be called when moving within the list
                console.log('onEnd');
                console.log(evt);
            },
            onAdd: (evt) => { //Will be called when a new item is added
                console.log('onAdd');
                console.log(evt);

                //Remove the added element
                evt.to.removeChild(evt.item);

                //Add the element with the form builder
                let type = evt.item.dataset.type;
                let attributes = {};
                switch (type) {
                    case 'et-input':
                        attributes.label = 'Input';
                        break;
                    case 'et-label':
                        attributes.text = 'Label';
                        break;
                    default:
                        throw Error('Unknown type');
                }
                this.formVersion.add(type, attributes);
            }
        });
    }

    initialize() {
        let firstName = this.formVersion.add('et-input', {
            label: 'First Name',
            placeholder: 'First Name',
            value: 'John'
        });
        // console.log(firstName);
        
        let lastName = this.formVersion.add('et-input', {
            label: 'Last Name',
            placeholder: 'Last Name'
        });

        let label = this.formVersion.add('et-label', {
            text: () => {
                return `Full Name: ${firstName.value} ${lastName.value}`;
            }
        });
        // console.log(label);
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
