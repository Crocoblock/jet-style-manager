/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	FontSizePicker,
	SelectControl,
	RangeControl,
	HorizontalRule,
	BaseControl: WpBaseControl,
} = wp.components;

const { __ } = wp.i18n;

class Typography extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-typography-control',
			label: __( 'Typography', 'jet-styles-manager' ),
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			disable_family: false,
			disable_size: false,
			disable_weight: false,
			disable_transform: false,
			disable_style: false,
			disable_decoration: false,
			disable_line_height: false,
			disable_letter_spacing: false,

			family: [
				{ label: 'Default', value: 'inherit' },
				{ label: 'Arial', value: '"Arial", sans-serif' },
				{ label: 'Tahoma', value: '"Tahoma"' },
				{ label: 'Verdana', value: '"Verdana"' },
				{ label: 'Helvetica', value: '"Helvetica"' },
				{ label: 'Times New Roman', value: '"Times New Roman"' },
				{ label: 'Trebuchet MS', value: '"Trebuchet MS"' },
				{ label: 'Georgia', value: '"Georgia"' },
			],
			weight: [
				{ label: '100', value: '100' },
				{ label: '200', value: '200' },
				{ label: '300', value: '300' },
				{ label: '400', value: '400' },
				{ label: '500', value: '500' },
				{ label: '600', value: '600' },
				{ label: '700', value: '700' },
				{ label: '800', value: '800' },
				{ label: '900', value: '900' },
				{ label: 'Default', value: '' },
				{ label: 'Normal', value: 'normal' },
				{ label: 'Bold', value: 'bold' },
			],
			transform: [
				{ label: 'Default', value: 'inherit' },
				{ label: 'Uppercase', value: 'uppercase' },
				{ label: 'Lowercase', value: 'lowercase' },
				{ label: 'Capitalize', value: 'capitalize' },
				{ label: 'Normal', value: 'none' },
			],
			style: [
				{ label: 'Default', value: 'inherit' },
				{ label: 'Normal', value: 'normal' },
				{ label: 'Italic', value: 'italic' },
				{ label: 'Oblique', value: 'oblique' },
			],
			decoration: [
				{ label: 'Default', value: 'inherit' },
				{ label: 'Underline', value: 'underline' },
				{ label: 'Overline', value: 'overline' },
				{ label: 'Line Through', value: 'line-through' },
				{ label: 'None', value: 'none' },
			],
			s_units: [
				{ label: 'PX', value: 'px', intervals: { step: 1, min: 1, max:200, initialPosition: 14 } },
				{ label: 'EM', value: 'em', intervals: { step: 0.1, min: 0.1, max:10, initialPosition: 1 } },
				{ label: 'REM', value: 'rem', intervals: { step: 0.1,min: 0.1, max:10, initialPosition: 1 } },
				{ label: 'VW', value: 'vw', intervals: { step: 0.1, min: 0.1, max:10, initialPosition: 1 } },
			],
			lh_units: [
				{ label: 'None', value: '', intervals: { step: 0.1, min: 0.1, max:10, initialPosition: 1 } },
				{ label: 'PX', value: 'px', intervals: { step: 1, min: 1, max:200, initialPosition: 14 } },
				{ label: 'EM', value: 'em', intervals: { step: 0.1, min: 0.1, max:10, initialPosition: 1 } },
			],
			ls_units: [],
			default_intervals: { step: 0.1, min: -2, max:20, initialPosition: 0 },
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: {
				value: {
					family: 'inherit',
					size: 14,
					s_unit: 'px',
					weight: '400',
					transform: 'inherit',
					style: 'inherit',
					decoration: 'inherit',
					lineHeight: 1.2,
					lh_unit: '',
					letterSpacing: 0,
					ls_unit: 'px',
				}
			},
			type: 'object',
		}
	}

	parseFontFamily( family ){
		let output = [ { label: 'Default', value: 'inherit' } ];

		for ( const [ key, value ] of Object.entries( family ) ) {
			output.push( { label: value.family, value: key } )
		}

		return output;
	}

	parseFontWeight( weight ) {
		let output = [{label: 'Normal', value: ''}];

		for ( let value of weight ) {
			if( 'regular' === value ){
				continue;
			}
			output.push( { label: value, value: value } )
		}

		return output;
	}

	renderControl(){
		let {
			family,
			weight,
			transform,
			style,
			decoration,

			s_units,
			lh_units,
			ls_units,

			disable_family,
			disable_size,
			disable_weight,
			disable_transform,
			disable_style,
			disable_decoration,
			disable_line_height,
			disable_letter_spacing,
		} = this.args;

		let controlValue = Object.assign( {}, this.attributes.default.value, this.getValue() ),
			value = controlValue,
			curentFont = window.jetSmFonts && value.family ? window.jetSmFonts[ value.family ] : '' ;

		family = window.jetSmFonts ? this.parseFontFamily( window.jetSmFonts ) : family;

		/* to be or not to be ????
		weight = curentFont ? this.parseFontWeight( curentFont.variants ) : weight ;
		value.weight = curentFont && curentFont.variants.includes( value.weight ) ? value.weight : 'normal' ;*/

		return (
			<div>
				{ ! disable_size &&
					<div className={ 'jet-st-typography-control-size' }>
						<RangeControl
							beforeIcon = { 'editor-textcolor' }
							label = { __( 'Size', 'jet-styles-manager' ) }
							value = { value.size }
							onChange = { ( newValue ) => {
								controlValue.size = newValue;
								this.setValue( controlValue );
							} }
							initialPosition='2'
							{ ...this.getIntervals( s_units, controlValue.s_unit ) }
						/>
						{ this.renderUnitsControl( s_units, 's_unit', value, controlValue ) }
					</div>
				}

				{ ! disable_line_height &&
					<div className={ 'jet-st-typography-control-size' }>
						<RangeControl
							beforeIcon={ 'image-flip-vertical' }
							label = { __( 'Line Height', 'jet-styles-manager' ) }
							value = { value.lineHeight }
							onChange = { ( newValue ) => {
								controlValue.lineHeight = newValue;
								this.setValue( controlValue );
							} }
							{ ...this.getIntervals( lh_units, controlValue.lh_unit ) }
						/>
						{ this.renderUnitsControl( lh_units, 'lh_unit', value, controlValue ) }
					</div>
				}
				{ ! disable_letter_spacing &&
					<div className={ 'jet-st-typography-control-size' }>
						<RangeControl
							beforeIcon={ 'image-flip-horizontal' }
							label = { __( 'Letter Spacing', 'jet-styles-manager' ) }
							value = { value.letterSpacing }
							onChange = { ( newValue ) => {
								controlValue.letterSpacing = newValue;
								this.setValue( controlValue );
							} }
							{ ...this.getIntervals( ls_units, controlValue.ls_unit ) }
						/>
						{ this.renderUnitsControl( ls_units, 'ls_unit', value, controlValue ) }
					</div>
				}

				{ ! disable_family &&
					<div className={ 'jet-st-typography-control-select' }>
						<SelectControl
							value = { value.family }
							onChange = { ( newValue ) => {
								controlValue.family = newValue;
								this.setValue( controlValue );
							} }
							options = { family }
							label = { __( 'Family', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
				{ ! disable_weight &&
					<div className={ 'jet-st-typography-control-select' }>
						<SelectControl
							value = { value.weight }
							onChange = { ( newValue ) => {
								controlValue.weight = newValue;
								this.setValue( controlValue );
							} }
							options = { weight }
							label = { __( 'Weight', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
				{ ! disable_transform &&
					<div className={ 'jet-st-typography-control-select' }>
						<SelectControl
							value = { value.transform }
							onChange = { ( newValue ) => {
								controlValue.transform = newValue;
								this.setValue( controlValue );
							} }
							options = { transform }
							label = { __( 'Transform', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
				{ ! disable_style &&
					<div className={ 'jet-st-typography-control-select' }>
						<SelectControl
							value = { value.style }
							onChange = { ( newValue ) => {
								controlValue.style = newValue;
								this.setValue( controlValue );
							} }
							options = { style }
							label = { __( 'Style', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
				{ ! disable_decoration &&
					<div className={ 'jet-st-typography-control-select' }>
						<SelectControl
							value = { value.decoration }
							onChange = { ( newValue ) => {
								controlValue.decoration = newValue;
								this.setValue( controlValue );
							} }
							options = { decoration }
							label = { __( 'Decoration', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
			</div>
		);
	}
}

export { Typography };