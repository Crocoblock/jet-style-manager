/**
 * class BaseControl
 */
const {
	Button,
	ButtonGroup,
	Dropdown,
	BaseControl: WpBaseControl
} = wp.components;

class BaseControl{

	constructor( args ) {
		this.setDefaultArgs();
		this.setDefaultAttribut();
		this.setVars( args );
	}

	setDefaultArgs() {
		this.args = {
			id: '',
			type: '',
			separator: 'none',
			condition: '',
			css_selector: '',
			not_wrap: false,
			default_intervals: { step: 0.1, min: -2, max:20, initialPosition: 0 },
			//conditions: [],
			class_name: '',
			label: '',
			hide_label_from_vision: false,
			help: '',
		};
	}

	defaultEventDetail(){
		return [
			'unit',
			'min',
			'max',
			'step',
			'return_value',
		];
	}

	setDefaultAttribut(){
		this.attributes = {}
	}

	setVars( args ){
		this.args = Object.assign( {}, this.args, args );

		let innerAttributes = args[ 'attributes' ] ? args[ 'attributes' ] : {} ;
		this.attributes = Object.assign( {}, this.attributes, innerAttributes );
	}

	init( props ) {
		this.blockProps = props;
		this.curent_breakpoints = this.blockProps.attributes[ 'curentBreakpoints' ] || 'desktop';

		if( this.blockProps.isSelected ){
			let value   = this.attributes.default,
				id      = this.args.id,
				blockID = this.blockProps.attributes.blockID;

			if( this.args.css_selector && blockID && ! this.getMetaValue( id, blockID ) && value ){
				//If the last value is set true, the default values will be applied
				this.setMetaValue( value, blockID, this.args, false );
			}

			if( ! this.args.css_selector && blockID && ! this.getAtributValue( id, blockID ) && value ){
				this.setAtributValue( value, id, blockID );
			}

		}
	}

	beforeGetValue( value, id ){
		return value;
	}

	getValue(){
		let blockID = this.blockProps.attributes.blockID,
			id = this.args.id,
			optionName = ! this.args.breakpoints || ! this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints,
			valueObject,
			value;

		valueObject = ! this.args.css_selector ? this.getAtributValue( id, blockID ) : this.getMetaValue( id, blockID ) || this.getAtributValue( id, blockID );

		/*if( undefined === valueObject || undefined === valueObject.value ){
			valueObject = this.attributes.default;
		}*/

		if( valueObject ){
			value = valueObject[ optionName ];
		}

		return this.beforeGetValue( value, id )
	}

	getMetaValue( id, blockID ){
		if( ! window.jetSmControlsValues
			|| ! window.jetSmControlsValues[ blockID ]
			|| ! window.jetSmControlsValues[ blockID ][ id ]
		){
			return undefined;
		}
		return window.jetSmControlsValues[ blockID ][ id ];
	}

	getAtributValue( id, blockID ){
		return this.blockProps.attributes[ id ];
	}

	beforeSetValue( value, id ) {
		switch ( this.attributes.type.toLowerCase() ) {
			case 'string':
				value = String( value );
			break;
			case 'number':
				value = Number( value );
			break;
			case 'int' || 'integer':
				value = parseInt( value );
			break;
			case 'boolean':
				value = Boolean( value );
			break;
			case 'array':
				value = value;
			break;
			case 'object':
				value = value;
			break;
			default:
				value = value;
			break;
		}

		return value;
	}

	setValue( value ) {
		let id = this.args.id,
			blockID = this.blockProps.attributes.blockID,
			valueObject = this.getAtributValue( id, blockID ) || this.attributes.default,
			updValueObject,
			optionName = ! this.args.breakpoints || ! this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints ;

		if( 'object' === typeof value ){
			value = Object.assign( {}, valueObject[ optionName ], value );
		}

		value          = this.beforeSetValue( value, id );
		updValueObject = Object.assign( {}, valueObject, { [ optionName ]: value } );

		if( this.args.css_selector ){
			this.setMetaValue( updValueObject, blockID, this.args );
		}//else{
			this.setAtributValue( updValueObject, id, blockID );
		//}
	}

	setMetaValue( value, blockID, args, isInitSet = false ){
		let id = args.id,
			detail = {
				id: id,
				value: value,
				blockID : blockID,
				css_selector : args.css_selector || null,
				breakpoints : args.breakpoints || 'desktop',
				isInitSet : isInitSet,
				controlType : args.type,
			};

		if ( ! window.jetSmControlsValues ) {
			window.jetSmControlsValues = {};
		}

		if( ! window.jetSmControlsValues[ blockID ] ){
			window.jetSmControlsValues[ blockID ] = {};
		}

		window.jetSmControlsValues[ blockID ][ id ] = value;

		for ( let key of this.defaultEventDetail() ) {
			if ( args[ key ] ){
				detail[ key ] = args[ key ];
			}
		}

		const event = new CustomEvent(
			'jet-sm-update-meta',
			{
				detail: detail
			}
		);

		document.dispatchEvent( event );
	}

	setAtributValue( value , id, blockID ){
		this.blockProps.setAttributes( { [ id ] : value } );
	}

	renderUnitsControl( units, id, valueCuretn, valuesStack ){
		let untisOptions = [];

		for ( let key in units ) {
			let args = units[ key ],
				disabled = units.length === 1 ? true : false ,
				buttonType = ( args.value === valueCuretn[id] && ! disabled ) ? true : false,
				lable = args.label ? args.label : args.value;

			untisOptions.push( <Button
					isPrimary = { buttonType }
					isSecondary = { ! buttonType }
					disabled = { disabled }
					isSmall
					key={ key }
					onClick={ ( e ) => {
						valuesStack[id] = args.value;
						this.setValue( valuesStack );
					} }
				>{ lable.toUpperCase() }</Button> );
		}

		return <ButtonGroup className={ 'jet-st-control-units' }>{ untisOptions }</ButtonGroup>;
	}

	renderBreakpointsControl(){

		if( ! this.args.breakpoints ){
			return null;
		}

		let breakpoints = this.args.breakpoints;

		return <Dropdown
				className='jet-st-breakpoints-control'
				contentClassName='jet-st-breakpoint-dropdown'
				renderContent={ ( { isOpen, onToggle, onClose } ) => {
					let breakpointsControl = [];

					for ( let key in breakpoints ) {
						let args = breakpoints[ key ],
							buttonType = ( this.curent_breakpoints === key ) ? true : false;

						breakpointsControl.push( <Button
							isSmall
							isPrimary = { buttonType }
							isSecondary = { ! buttonType }
							showTooltip={ true }
							tooltipPosition={ 'center' }
							shortcut={ args.label }
							icon={ args.icon }
							className={ args.class_name }
							key={ key }
							onClick={ ( e ) => {
								this.blockProps.setAttributes( { curentBreakpoints : key } )
								onClose();
							} }
						></Button> );
					}

					return breakpointsControl;
				 } }
				renderToggle={ ( { isOpen, onToggle, onClose } ) => (
					<Button
						isSmall
						onClick={ onToggle }
						showTooltip={ true }
						tooltipPosition={ 'center' }
						shortcut={ breakpoints[ this.curent_breakpoints ].label }
						icon={ breakpoints[ this.curent_breakpoints ].icon }
						className={ "jet-st-curent-breakpoint " + breakpoints[ this.curent_breakpoints ].class_name }
					></Button>
				) }
		/>;
	}

	getIntervals( units, curentUnit ){
		if( ! units[0] ){
			return this.args.default_intervals;
		}

		for (let unit of units ) {
			if( unit.value === curentUnit ){
				if( unit.intervals ){
					return unit.intervals;
				}else{
					return this.args.default_intervals;
				}
			}
		}
	}

	conditionRules( condition ){
		let conditionState = true,
			blockID        = this.blockProps.attributes.blockID;

		if( 'object' !== typeof condition || ! Object.keys( condition )[0] ){
			return conditionState;
		}

		for ( let option in condition ) {
			let value = this.getMetaValue( option, blockID ) || this.getAtributValue( option, blockID ),
				conditionValue = condition[ option ],
				optionName;

			if( 'object' === typeof( value ) && undefined !== value.value ){
				optionName = ! this.args.breakpoints || ! this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints;
				value      = value[ optionName ];
			}

			switch ( typeof conditionValue ) {
				case "object":
					if( ! conditionValue.includes( value ) ){
						conditionState = false;
					}
				break;

				default:
					if( value !== conditionValue ){
						conditionState = false;
					}
			}
		}

		return conditionState;
	}

	renderControl(){
		return null;
	}

	render(){
		const {
			HorizontalRule
		} = wp.components;

		let {
			id,
			separator,
			label,
			hide_label_from_vision,
			help,
			class_name,
			condition
		} = this.args;

		if( ! this.conditionRules( condition ) ){
			return null;
		}

		return (
			<div key={ id }>
				{ ( 'before' === separator || 'both' === separator ) && <HorizontalRule /> }
					<WpBaseControl
						hideLabelFromVision={ hide_label_from_vision }
						help={ help }
						className={ `${class_name} jet-sm-gb-control-wrapper` }
					>
						<div className={ 'jet-sm-gb-control-header' }>
							{ label && <WpBaseControl.VisualLabel>{ label }</WpBaseControl.VisualLabel> }
							{ this.renderBreakpointsControl() }
						</div>
						<div className={ 'jet-sm-gb-control-inner' } >
							{ this.renderControl() }
						</div>
					</WpBaseControl>
				{ ( 'after' === separator || 'both' === separator ) && <HorizontalRule /> }
			</div>
		);
	}
}

export { BaseControl };