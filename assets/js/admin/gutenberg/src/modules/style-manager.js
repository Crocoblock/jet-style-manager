"use strict";

function JetStyleManagerMeta(){
	const {
		data: { dispatch, select }
	} = wp;

	const styleSlug      = '_jet_sm_style',
		  readyStyleSlug = '_jet_sm_ready_style',
		  controlsValues = '_jet_sm_controls_values',
		  fontCollectionSlug = '_jet_sm_fonts_collection',
		  fontLinks = '_jet_sm_fonts_links',
		  fontsAPIlink = 'https://fonts.googleapis.com/css2?';

	let postMeta        = select('core/editor').getEditedPostAttribute('meta') || { [ styleSlug ]: '', [ readyStyleSlug ]: '', [ controlsValues ]: '' },
		blockStyle      = postMeta[ styleSlug ] ? JSON.parse( postMeta[ styleSlug ] ) : {},
		fontsCollection = postMeta[ fontCollectionSlug ] ? JSON.parse( postMeta[ fontCollectionSlug ] ) : {},
		blocksOption    = {},
		updPostMeta     = {},
		readyFontLinks  = '';

	window.jetSmControlsValues = postMeta[ controlsValues ] ? JSON.parse( postMeta[ controlsValues ] ) : {} ;

	if ( Object.keys( blockStyle )[0] ) {
		parsedFontsCollection( fontsCollection );
		renderStyle( blockStyle );
		select( 'core/editor' ).isEditedPostAutosaveable = () => false;
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
			controlType
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

		if( 'typography' === controlType ){
			collectFonts( event.detail );
		}
		collectStyle( blockID );
	}

	function clearMeta(){
		let blockIDs = getBlockList( select( 'core/block-editor' ).getBlocks() );

		for ( let blockStyleId in blockStyle ) {
			if( -1 === blockIDs.indexOf( blockStyleId ) ){
				delete blockStyle[ blockStyleId ];
				delete fontsCollection[ blockStyleId ];
				delete window.jetSmControlsValues[ blockStyleId ];
			}
		}


	}

	function getBlockList( blockList ){
		let blockIDs = [];

		for ( let block in blockList ) {
			let innerBlocks = blockList[ block ].innerBlocks,
				blockID = blockList[ block ].attributes.blockID;

			if ( innerBlocks && innerBlocks[ 0 ] ){
				blockIDs.push( ...getBlockList( innerBlocks ) );
			}

			if( ! blockID ){
				continue;
			}

			blockIDs.push( blockID );
		}

		return blockIDs;
	}

	function collectFonts( { blockID, id, value, breakpoints } ){

		let { family, weight, style } = ! breakpoints || 'desktop' === breakpoints ? value.value : value[ breakpoints ],
			fontFamily = family.replace(/,\s*[\S\s]*/gm, '' );

		if( ! window.jetSmFonts[ family ] || "google" !== window.jetSmFonts[family].type ){
			return;
		}

		if( ! fontsCollection[ blockID ] ){
			fontsCollection[ blockID ] = {};
		}

		if( ! fontsCollection[ blockID ][ id ] ){
			fontsCollection[ blockID ][ id ] = {};
		}

		fontsCollection[ blockID ][ id ][ breakpoints ] = {
			fontFamily: fontFamily,
			fontWeight: weight,
			fontStyle: style,
		};

		parsedFontsCollection( fontsCollection );
	}

	function parsedFontsCollection( collection = {} ){

		if( ! collection ){
			return false;
		}

		let parsedFontsCollection = {};

		for ( let block in collection ){
			if ( ! collection.hasOwnProperty( block ) ) {
				continue;
			}

			let controls = collection[block];

			for ( let control in controls ) {

				if ( ! controls.hasOwnProperty( control ) ) {
					continue;
				}

				let breakpoints = controls[ control ];

				for ( let font in breakpoints ) {
					if ( ! breakpoints.hasOwnProperty( font ) ) {
						continue;
					}

					let { fontFamily, fontWeight, fontStyle } = breakpoints[font]

					if ( ! parsedFontsCollection[ fontFamily ] ){
						parsedFontsCollection[ fontFamily ] = {
							family: fontFamily,
							weight: [],
							style: []
						}
					}

					if( ! parsedFontsCollection[ fontFamily ].weight.includes( fontWeight ) ){
						parsedFontsCollection[ fontFamily ].weight.push( fontWeight );
					}

					if( ! parsedFontsCollection[ fontFamily ].style.includes( fontStyle ) ){
						parsedFontsCollection[ fontFamily ].style.push( fontStyle );
					}
				}
			}
		}

		createFontLinks( parsedFontsCollection )
	}


	function createFontLinks( fonts = {} ){
		if( ! fonts ){
			return false;
		}

		readyFontLinks = '<link rel="preconnect" href="https://fonts.gstatic.com">';

		for ( let font in fonts ) {

			if ( ! fonts.hasOwnProperty( font ) ) {
				continue;
			}

			let {
					family,
					weight,
					style
				} = fonts[ font ],
				weightDelimiter = weight.length > 1 ? ':' : '&' ;

			family = family.replace( /\s+/gm, '+' );
			weight = weight.sort().join(';');
			style = style.join(';');

			readyFontLinks += `<link href="${fontsAPIlink}family=${ family }${ weightDelimiter }wght@${ weight }&display=swap" rel="stylesheet">`;
		}
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
			[ controlsValues ]: JSON.stringify( window.jetSmControlsValues ),
			[ fontCollectionSlug ]: JSON.stringify( fontsCollection ),
			[ fontLinks ]: JSON.stringify( readyFontLinks )
		};

		ReactDOM.render( <style>{ outputCSS }</style>, document.getElementById('jet-sm-gb-style') );
		if( readyFontLinks ){
			ReactDOM.render( ( <div dangerouslySetInnerHTML= {{ __html:readyFontLinks }} /> ), document.getElementById('jet-sm-gb-fonts') );
		}

		const oldMeta = select('core/editor').getEditedPostAttribute('meta');
		dispatch('core/editor').editPost( { meta: Object.assign( {}, oldMeta, updPostMeta ) } );
	}
}

window.onload = function(e){
	setTimeout( JetStyleManagerMeta, 500 );
};