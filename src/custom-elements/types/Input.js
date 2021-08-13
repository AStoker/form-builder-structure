

export class Input {
    placeholder = 'Oh hi';

    static template = '<input placeholder.bind="placeholder" />';

    attached() {
        console.log('Attached!');
    }

}