/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	ToggleControl
} = wp.components;

class Toggle extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-toggle-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: { value: false },
			type: 'object',
		}
	}

	renderControl(){
		return <ToggleControl
			checked={ this.getValue() }
			onChange={ ( newValue ) => this.setValue( newValue ) }
		/>;
	}
}

export { Toggle };
