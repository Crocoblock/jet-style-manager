/**
 * WordPress dependencies
 */

import { BaseControl } from  './base-control';

const {
	TabPanel,
} = wp.components;

class StartTabs extends BaseControl {

	constructor( args ) {
		super( args );

		return args.id;
	}

	setDefaultArgs() {
		this.args = {
			class_name: 'jet-st-tabs',
			active_class: 'jet-st-active-tab',
			orientation: 'horizontal', // vertical or horizontal
			initialTabName: '',
			type: 'start-tabs',
			attributes: false,
		};
	}

	renderControl(){
		let {
			id,
			class_name,
			active_class,
			orientation,
			_child,
		} = this.args;

		return <TabPanel
			className={ class_name }
			activeClass={ active_class }
			orientation={ orientation }
			tabs={ _child } >
			{
				( tab ) => <div key={ tab.id } name={ tab.name }>{ tab.content }</div>
			}
		</TabPanel>
	}
}

class StartTab extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		this.args = {
			title: '',
			type: 'start-tab',
			attributes: false,
		};
	}

	renderControl(){
		return {
			id: this.args.id,
			name: this.args.id,
			title: this.args.title,
			content: this.args._child
		};
	}

	render(){
		return this.renderControl()
	}
}

export { StartTabs, StartTab };
