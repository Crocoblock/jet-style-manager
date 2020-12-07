/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	SelectControl
} = wp.components;

const { __ } = wp.i18n;

class Select extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-select-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			multiple: false,
			placeholder: __( 'Select Option', 'jet-styles-manager' ),
			options: [],
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: { value: '' },
			type: 'object',
		}

		this.placeholderOption = { value: '', label: this.args.placeholder , disabled: true } ;
	}

	renderControl(){
		let {
			multiple,
			options,
			placeholder,
			disablePlaceholder
		} = this.args;

		if( placeholder && '' !== options[0].value ){
			options.unshift( this.placeholderOption );
		}

		return <SelectControl
			value={ this.getValue() }
			onChange={ ( newValue ) => this.setValue( newValue ) }
			multiple={ multiple }
			options={ options }
		/>
	}
}

export { Select };
