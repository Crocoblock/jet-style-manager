/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	__experimentalText:TextControl
} = wp.components;

class Text extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-text',
			variant: 'title',
			as: 'h3',
			content: '',
			not_wrap: true,
			separator: 'both',
		};
	}

	renderControl(){
		let {
			variant,
			as,
			content,
		} = this.args;

		return ( <TextControl
					variant={ variant }
					as={ as }
				>{ content }</TextControl> );
	}
}

export { Text };
