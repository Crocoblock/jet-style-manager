/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	ToolbarButton,
} = wp.components;

class Choose extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-choose-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			options: {
				alignleft: { icon:'dashicons-editor-alignleft', label:'alignleft', shortcut:'alignleft' },
				aligncenter: { icon:'dashicons-editor-aligncenter', label:'aligncenter', shortcut:'aligncenter' },
				alignright: { icon:'dashicons-editor-alignright', label:'alignright', shortcut:'alignright' },
				justify: { icon:'dashicons-editor-justify', label:'justify', shortcut:'justify' },
			},
			icon_size: 20,
			show_tooltip: true,
			tooltip_position : 'top center',
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: { value: '' },
			type: 'object',
		}
	}

	chooseOption(){
		let output = [];

		return output;
	}

	renderControl(){
		let {
			id,
			class_name,
			options,
			icon_size,
			show_tooltip,
			tooltip_position,
		} = this.args,
		value = this.getValue(),
		outputOptions = [];

		for ( let key in options ) {
			let option = options[ key ],
				icon;

			if( option.icon ){
				if( -1 !== option.icon.search('dashicons-') ){
					icon = option.icon.replace( 'dashicons-', '' );
				} else if ( -1 !== option.icon.search('fa-') ) {
					icon = <i className={ option.icon }></i>;
				} else {
					icon = option.icon
				}
			}

			outputOptions.push( <ToolbarButton
				key={ key }
				icon={ icon }
				shortcut={ option.shortcut }
				iconSize={ icon_size }
				showTooltip={ show_tooltip }
				tooltipPosition={ tooltip_position }
				onClick={ () => { this.setValue( key ) } }
				className={ key === value ? 'is-active-option' : '' }
			>{ option.label }</ToolbarButton>);
		}

		return ( <div className={ class_name + '-options' }>{ outputOptions }</div> );
	}
}

export { Choose };
