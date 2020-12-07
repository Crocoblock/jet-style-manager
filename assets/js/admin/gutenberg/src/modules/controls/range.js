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
			type: 'number',
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: { value: 0 },
			type: 'object',
		}
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
			separator_type
		} = this.args;

		return <RangeControl
			value={ this.getValue() }
			onChange={ ( newValue ) => this.setValue( newValue ) }
			marks={ marks }
			min={ min }
			max={ max }
			step={ step }
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
		/>
	}
}

export { Range };
