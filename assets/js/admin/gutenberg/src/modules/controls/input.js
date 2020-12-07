/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	TextControl
} = wp.components;

class Input extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-input-control',
			separator: 'none',
			label: '',
			hide_label_from_vision: false,
			help: '',
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: { value: '' },
			type: 'object',
		}
	}

	renderControl(){
		return <TextControl
					value={ this.getValue() }
					type={ 'text' }
					onChange={ ( newValue ) => this.setValue( newValue ) }
				/>;
	}
}

export { Input };
