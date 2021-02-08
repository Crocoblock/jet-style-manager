/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	RangeControl
} = wp.components;

class Range extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-range-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			beforeIcon: '',
			afterIcon: '',
			icon: '',
			disabled: false,
			initial_position: 0,
			is_shift_step_enabled: true,
			allow_reset: false,
			marks: [],
			min: 0,
			max: 100,
			step: 1,
			rail_color: '',
			track_color: '',
			render_tooltip_content: '',
			show_tooltip: false,
			with_input_field: true,
			separator_type: 'none', // none | fullWidth | topFullWidth
			units: [
				{ value: 'px', label: 'PX', intervals: { step: 1, min: 0, max:200, initialPosition: 14 } },
			],
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: { value: {
				value:0,
				unit: 'px'
			} },
			type: 'object',
		}
	}

	beforeGetValue( value, id ){
		if( 'number'=== typeof value ){
			value = {
				value: value,
				unit: 'px'
			}
		}

		return value;
	}

	renderControl(){
		let {
			beforeIcon,
			afterIcon,
			icon,
			disabled,
			initial_position,
			is_shift_step_enabled,
			allow_reset,
			marks,
			min,
			max,
			step,
			rail_color,
			track_color,
			render_tooltip_content,
			show_tooltip,
			with_input_field,
			separator_type,
			units
		} = this.args;

		let valueObject = Object.assign( {}, this.attributes.default.value, this.getValue() );

		return (
			<div className={ 'jet-st-range-wrapper' }>
				<RangeControl
					value={ valueObject.value }
					onChange = { ( newValue ) => {
						valueObject.value = newValue;
						this.setValue( valueObject );
					} }
					marks={ marks }
					beforeIcon={ beforeIcon }
					afterIcon={ afterIcon }
					icon={ icon }
					disabled={ disabled }
					initialPosition={ initial_position }
					isShiftStepEnabled={ is_shift_step_enabled }
					allowReset={ allow_reset }
					railColor={ rail_color }
					trackColor={ track_color }
					renderTooltipContent={ render_tooltip_content }
					showTooltip={ show_tooltip }
					withInputField={ with_input_field }
					separatorType={ separator_type }
					{ ...this.getIntervals( units, valueObject.unit ) }
				/>
				{ this.renderUnitsControl( units, 'unit', valueObject, valueObject ) }
			</div>
		);
	}
}

export { Range };
