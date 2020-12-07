/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

class Stepper extends BaseControl {

	constructor( { controlArgs, attributes, setAttributes, className, isSelected } ) {
		super( { controlArgs, attributes, setAttributes, className, isSelected } );
	}

	setDefault() {
		this.defaulf = {
			label: '',
			value: 10,
			icon: '',
			max: 100,
			min: 0,
		};
	}

	render(){
		const {
			TextControl
		} = wp.components;

		const class_name = 'jet-st-stepper ' + this.props.className;
		const {
			id,
			label,
			icon,
			max,
			min,
		} = this.props;

		return (
			<StepperControl
				className={ class_name }
				icon={ icon }
				label={ label }
				max={ max }
				min={ min }
				value={ this.getValue() }
				onChange={ ( newValue ) => this.setValue( newValue, id ) }
			/>)
	}
}

export { Stepper };
