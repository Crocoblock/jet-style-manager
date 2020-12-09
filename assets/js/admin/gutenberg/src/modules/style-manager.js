"use strict";

function JetStyleManagerMeta(){
	const {
		data: { dispatch, select }
	} = wp;

	const styleSlug      = '_jet_sm_style',
		  readyStyleSlug = '_jet_sm_ready_style',
		  controlsValues = '_jet_sm_controls_values';

	let postMeta     = select('core/editor').getEditedPostAttribute('meta') || { [ styleSlug ]: '', [ readyStyleSlug ]: '', [ controlsValues ]: '' },
		blockStyle   = postMeta[ styleSlug ] ? JSON.parse( postMeta[ styleSlug ] ) : {},
		blocksOption = {},
		updPostMeta  = {};

	window.jetSmControlsValues = postMeta[ controlsValues ] ? JSON.parse( postMeta[ controlsValues ] ) : {} ;

	if ( Object.keys( blockStyle )[0] ) {
		renderStyle( blockStyle );
	}

	document.addEventListener( 'jet-sm-update-meta', debounce( setMeta, 50 ) );
	function debounce(func, wait, immediate) {
		let timeout;

		return function() {
			let context = this,
				args = arguments,
				later = function() {
					timeout = null;
					if ( ! immediate ) func.apply( context, args );
				},
				callNow = args[0].detail.isInitSet || immediate && !timeout;

			clearTimeout(timeout);

			timeout = setTimeout( later, wait );

			if ( callNow ) func.apply( context, args );
		};
	};

	function setMeta( event ){
		let {
			id,
			blockID,
		} = event.detail;

		if( ! blockStyle[ blockID ] ){
			blockStyle[ blockID ] = {};
		}

		if( ! blocksOption[ blockID ] ){
			blocksOption[ blockID ] = {};
		}

		let { value } = event.detail.value

		/*if( undefined === value ){
			delete blocksOption[ blockID ][ id ];
		} else {*/
			blocksOption[ blockID ][ id ] = event.detail;
		//}


		clearMeta();
		collectStyle( blockID );
	}

	function clearMeta(){
		let blockIDs = getBlockList( select( 'core/block-editor' ).getBlocks() );

		for ( let blockStyleId in blockStyle ) {
			if( -1 === blockIDs.indexOf( blockStyleId ) ){
				delete blockStyle[ blockStyleId ];
				delete window.jetSmControlsValues[ blockStyleId ];
			}
		}


	}

	function getBlockList( blockList ){
		let blockIDs = [];

		for ( let block in blockList ) {
			let innerBlocks = blockList[ block ].innerBlocks;

			if ( innerBlocks && innerBlocks[ 0 ] ){
				blockIDs.push( ...getBlockList( innerBlocks ) );
			}

			if( ! blockList[ block ].attributes.blockID ){
				continue;
			}

			blockIDs.push( blockList[ block ].attributes.blockID );
		}

		return blockIDs;
	}

	function collectStyle( blockID ){
		for( let control in blocksOption[ blockID ] ) {
			let controlObject = blocksOption[ blockID ][ control ],
				selectors     = controlObject.css_selector;

			for( let style in selectors ) {
				let	styleOption      = selectors[ style ],
					styleSelector    = replaceSelectorMacros( controlObject, style ) ,
					readyStyleOption = replaceOptionMacros( controlObject, styleOption );

				readyStyleOption = replaceValueMacros( controlObject, readyStyleOption, styleSelector );

				if( ! blockStyle[ blockID ][ styleSelector ] ){
					blockStyle[ blockID ][ styleSelector ] = {};
				}

				if( ! readyStyleOption ){
					delete blockStyle[ blockID ][ styleSelector ][ control ];
				}else{
					blockStyle[ blockID ][ styleSelector ][ control ] = readyStyleOption;
				}
			}
		}

		renderStyle( blockStyle );
	}

	function replaceSelectorMacros( controlObject, cssSelector ){
		let blockID = controlObject.blockID;

		cssSelector = cssSelector
						.replace( /{{WRAPPER}}/gmi, '.' + blockID )
						.replace( /{{ID}}/gmi, blockID );

		return cssSelector;
	}

	function replaceOptionMacros( controlObject, cssOptions ){
		for ( let key in controlObject ) {
			if( 'value' !== key ){
				let macrosReg = new RegExp('{{' + key.toUpperCase() + '}}', 'gmi');
				if( -1 !== cssOptions.search( macrosReg ) ){
					cssOptions = cssOptions.replace( macrosReg, controlObject[key] );
				}
			}
		}

		cssOptions += ';';
		cssOptions = cssOptions
						.replace( ';;', ';' )
						.replace( /\s{2}/gm, '' );

		return cssOptions;
	}

	function replaceValueMacros( controlObject, cssOptions, cssSelector ){
		let {
			value,
			breakpoints
		} = controlObject;

		if( undefined === value  ){
			return false;
		}

		let outputCssOptions = {};

		for ( let item in value ) {
			let breakpointValue = value[ item ];

			if( undefined === breakpointValue ){
				return false;
			}

			if( breakpoints && breakpoints[ item ] ){
				let {
						min,
						max
					} = breakpoints[ item ],
					optionMedia = ( -1 !== max ) ? `@media only screen and (max-width: ${max}px)` :  `@media only screen and (min-width: ${min}px)` ;

				outputCssOptions[ item ] = {
					max: ( -1 !== max ) ? max : min,
					mediaQuery: optionMedia,
					option: parseValue( controlObject, cssOptions, breakpointValue )
				}
			}else{
				outputCssOptions[ item ] = parseValue( controlObject, cssOptions, breakpointValue );
			}
		}

		return outputCssOptions;
	}

	function parseValue( controlObject, cssOptions, value ){

		switch( typeof value ){
			case 'object':

				for ( let key in value ) {
					let macrosReg = new RegExp('{{' + key.toUpperCase() + '}}', 'gmi'),
						deepValue = value[ key ];

					if( 'object' === typeof deepValue ){
						deepValue = Object.values( deepValue ).join( ' ' );
					}

					cssOptions = cssOptions.replace( macrosReg, deepValue );
				}
			break;

			default:

				value = controlObject.return_value ? controlObject.return_value[ value ] : value ;

				cssOptions = cssOptions.replace( /{{VALUE}}/gmi, value );
			break;
		}

		cssOptions += ';';
		cssOptions = cssOptions
						.replace( ';;', ';' )
						.replace( /\s{2}/gm, ' ' );

		return cssOptions;
	}

	function renderStyle( blocks ){
		let outputCSS = '';

		for( let blockID in blocks ) {
			if ( ! blocks.hasOwnProperty( blockID ) ) {
				continue;
			}

			let block = blocks[ blockID ];

			for ( let selector in block ) {
				if ( ! block.hasOwnProperty( selector ) ) {
					continue;
				}

				let control        =  block[ selector ],
					desktopCss     = '',
					breakpointsCss = '';

				for ( let options in control ) {
					if ( ! control.hasOwnProperty( options ) ) {
						continue;
					}

					let values = control[ options ],
						valuesArray;

					if( values.value ){
						desktopCss += values.value;
					}

					if( ! Object.keys( values )[0] ){
						continue;
					}

					valuesArray = Object.values( values ).sort( function(a, b) {
						if( a.max > b.max ){
							return -1;
						}else{
							return 1;
						}
					});

					for ( let value of valuesArray ) {
						if( 'object' !== typeof value ){
							continue;
						}

						let {
							mediaQuery,
							option
						} = value;

						breakpointsCss += `${ mediaQuery }{ ${ selector } { ${ option } } }`;
					}
				}

				outputCSS += `${ selector }{${ desktopCss }} ${ breakpointsCss }`;
			}
		}

		updPostMeta = {
			[ readyStyleSlug ]: outputCSS,
			[ styleSlug ]: JSON.stringify( blocks ),
			[ controlsValues ]: JSON.stringify( window.jetSmControlsValues )
		};

		ReactDOM.render( <style>{ outputCSS }</style>, document.getElementById('jet-sm-gb-style') );

		dispatch('core/editor').editPost( { meta: Object.assign( {}, postMeta, updPostMeta ) } );
	}
}

window.onload = function(e){
	setTimeout( JetStyleManagerMeta, 500 );
};
