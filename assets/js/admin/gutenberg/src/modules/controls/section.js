/**
 * WordPress dependencies
 */

import { BaseControl } from  './base-control';

const {
	PanelBody,
} = wp.components;

class StartSection extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-section',
			title: '',
			icon: '',
			initial_open: false,
			type: 'end-section',
			attributes: false,
		};
	}

	renderControl(){
		let {
			id,
			title,
			icon,
			initial_open,
			class_name,
			_child
		} = this.args;

		return <PanelBody title={ title } className={ class_name } icon={ icon } initialOpen={ initial_open } key={ id }>
					{ _child }
				</PanelBody>;
	}
}

export { StartSection };
