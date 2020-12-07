/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	ColorPalette,
} = wp.components;

const {
	select
} = wp.data;

class ColorPicker extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		let settings = select('core/block-editor').getSettings();

		this.args = {
			class_name: 'jet-st-color-picker',
			label: '',
			separator: 'none',
			colors: settings.colors,
			disable_custom_colors: false,
			clearable: true,
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
		let {
			id,
			colors,
			disable_custom_colors,
			clearable,
		} = this.args;

		return (
			<ColorPalette
				colors={ colors }
				disableCustomColors={ disable_custom_colors }
				clearable={ clearable }
				value={ this.getValue() }
				onChange={ ( newValue ) => this.setValue( newValue ) }
			/>
		);
	}
}

export { ColorPicker  };
