/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	ColorPalette,
	SelectControl,
	__experimentalBoxControl: BoxControl,
} = wp.components;

const { __ } = wp.i18n;

const {
	select
} = wp.data;

class Border extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		let settings = select('core/block-editor').getSettings();

		this.args = {
			class_name: 'jet-st-border-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			style: [
				{ label: __( 'None', 'jet-styles-manager' ), value: 'none' },
				{ label: __( 'Solid', 'jet-styles-manager' ), value: 'solid' },
				{ label: __( 'Double', 'jet-styles-manager' ), value: 'double' },
				{ label: __( 'Dotted', 'jet-styles-manager' ), value: 'dotted' },
				{ label: __( 'Dashed', 'jet-styles-manager' ), value: 'dashed' },
				{ label: __( 'Groove', 'jet-styles-manager' ), value: 'groove' },
			],
			width_unit: [
				{ value: 'px', label: 'PX', default: 0 },
			],
			radius_unit: [
				{ value: 'px', label: 'PX', default: 0 },
				{ value: '%', label: '%', default: 0 },
			],
			colors: settings.colors,
			disable_custom_colors: false,
			clearable: true,
			disable_style:false,
			disable_radius:false,
			disable_width:false,
			disable_color:false,
		};

		this.defaultValue = {
			style: 'none',
			radius: {
				top:    '0px',
				right:  '0px',
				bottom: '0px',
				left:   '0px'
			},
			width: {
				top:    '0px',
				right:  '0px',
				bottom: '0px',
				left:   '0px'
			},
			color: '#000000',
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: {
				value: {
					style: 'none',
					radius: {
						top: '1px',
						right: '1px',
						bottom: '1px',
						left: '1px'
					},
					width: {
						top: '1px',
						right: '1px',
						bottom: '1px',
						left: '1px'
					},
					color: '#000000',
				}
			},
			type: 'object',
		}
	}

	beforeSetValue( value, id ) {
		for ( let key in value ) {
			switch( key ){
				case "width":
				case "radius":
					for ( let option in value[ key ] ) {
						if( null === value[ key ][ option ] ){
							value[key][ option ] = '0px';
						}
					}
				break;
			}
		}

		return value;
	}

	renderControl(){
		let {
			style,
			width_unit,
			radius_unit,
			colors,
			disable_custom_colors,
			clearable,
			disable_style,
			disable_radius,
			disable_width,
			disable_color,
		} = this.args;

		let value = Object.assign( {}, this.defaultValue, this.getValue() );

		return (
			<div className={'jet-st-border-options'} >
				{ ! disable_style &&
					<div key={ 'border-type' } className={'jet-st-border-type'}>
						<SelectControl
							value = { value.style }
							onChange = { ( newValue ) => {
								this.setValue( { style: newValue } );
							} }
							options = { style }
							label = { __( 'Border Type', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
				{ 'none' !== value.style && ! disable_width &&
					<div key={ 'border-width' } className={'jet-st-border-width'}>
						<BoxControl
							values = { value.width }
							units = { width_unit }
							onChange ={ ( newValue ) => {
								this.setValue( { width: newValue } );
							} }
							labelPosition = 'side'
							type  = 'number'
							label = { __( 'Border Width', 'jet-styles-manager' ) }
						/>
					</div>
				}
				{ 'none' !== value.style && ! disable_radius &&
					<div key={ 'border-radius' } className={'jet-st-border-radius'}>
						<BoxControl
							values = { value.radius }
							units = { radius_unit }
							onChange = { ( newValue ) => {
								this.setValue( { radius: newValue } );
							} }
							labelPosition = 'side'
							label = { __( 'Border Radius', 'jet-styles-manager' ) }
						/>
					</div>
				}
				{ 'none' !== value.style && ! disable_color &&
					<div key={ 'border-color' } className={'jet-st-border-color'}>
						<p className='component-box-control__label'>{ __( 'Border Color', 'jet-styles-manager' ) }</p>
						<ColorPalette
							value={ value.color }
							colors={ colors }
							disableCustomColors={ disable_custom_colors }
							clearable={ clearable }
							onChange={ ( newValue ) => {
								this.setValue( { color: newValue } );
							} }
						/>
					</div>
				}
			</div>
		);
	}
}

export { Border };
