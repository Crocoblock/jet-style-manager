/**
 * Class InputControl
 */

const {
	TextControl,
} = wp.components;

const { __ } = wp.i18n;

class ExtraAtributes {

	constructor( args ) {
		this.setDefaultAttribut();

		this.args = args;
		this.attributes = Object.assign( {}, this.attributes, this.args );
	}

	init( props ) {
		if( props.isSelected && props.attributes && ! props.attributes.blockID ){

			let id = `jet-sm-gb-${ props.clientId }`,
				className;

			if( props.attributes.className ){
				className = props.attributes.className;
			}else{
				className = `${ props.className || '' } jet-sm-gb-wrapper ${ id }`;
			}

			props.setAttributes( { blockID: id, className: className } );
		}

		this.blockProps = props;
	}

	setDefaultAttribut(){
		this.attributes = {
			blockID: {
				default: '',
				type: 'string'
			},
			curentBreakpoints: {
				default: 'desktop',
				type: 'string'
			},
		}
	}

	render( props ) {
		let output = [
			<h3>{ __( 'Debag info', 'jet-styles-manager' ) }</h3>,
			<p>{ __( 'Displayed only in debug mode.', 'jet-styles-manager' ) }</p>
		];

		for ( let key in this.attributes ) {

			if( 'object' !== typeof this.attributes[ key ] ){
				continue;
			}

			let value = this.blockProps.attributes[ key ] || this.attributes[ key ].default;

			output.push( <TextControl label={ key } value={ value } disabled={ true } />);
		}

		return ( <div className={ 'jet-sm-gb-block-info' }>{ output }</div> );
	}
}

export { ExtraAtributes };