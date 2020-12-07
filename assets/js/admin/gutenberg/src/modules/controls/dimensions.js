/**
 * Class Dimensions
 */

import { BaseControl } from  './base-control';

const {
	__experimentalBoxControl: BoxControl,
} = wp.components;

class Dimensions extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-dimensions-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			units: [
				{ value: 'px', label: 'px', default: 0 },
				{ value: '%', label: '%', default: 0 },
				{ value: 'em', label: 'em', default: 0 },
				{ value: 'rem', label: 'rem', default: 0 },
			],
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: {
				value: {
					top:    "0px",
					right:  "0px",
					bottom: "0px",
					left:   "0px",
				}
			},
			type: 'object',
		}
	}

	beforeSetValue( value, id ) {
		for ( let key in value ) {
			if( null === value[key] ){
				value[key] = '0px';
			}
		}

		return value;
	}

	parseUnits( units ){
		if( 0 !== units.length ){
			let outputUnits = [];

			for ( let unit of units ) {
				if( 'object' === typeof unit && unit.value ){
					continue;
				}

				outputUnits.push({
					value: unit,
					label: unit,
					default: 0
				});
			}
			return outputUnits;
		}

		return units;
	}

	renderControl(){
		let {
			units
		} = this.args;

		let value = Object.assign( {}, this.attributes.default.value, this.getValue() );

		units = this.parseUnits( units );

		return (
			<BoxControl
				values = { value }
				units = { units }
				label = { "" }
				onChange ={ ( newValue ) => { this.setValue( newValue ); } }
			/>
		);
	}
}

export { Dimensions };
