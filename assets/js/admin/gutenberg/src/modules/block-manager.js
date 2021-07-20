"use strict";

import { ExtraAtributes } from "./controls/extra-atributes";
import { StartSection } from "./controls/section";
import { StartTabs, StartTab } from "./controls/tabs";
import { Input } from "./controls/input";
import { Toggle } from "./controls/toggle";
import { ColorPicker } from "./controls/color-picker";
import { Range } from "./controls/range";
import { Choose } from "./controls/choose";
import { Dimensions } from "./controls/dimensions";
import { Border } from "./controls/border";
import { Typography } from "./controls/typography";
import { Select } from "./controls/select";
import { Text } from "./controls/text";

const { addFilter } = wp.hooks;

class JetBlockManager {

	constructor() {
		var self = this;

		self.setControlsInstance();
		self.addAttributes();
		self.registerBlocks();
		self.registerBlockStyle();
	}

	setControlsInstance() {
		window.jetSmControlCallback = {
			ExtraAtributes: ExtraAtributes,
			StartSection: StartSection,
			StartTabs: StartTabs,
			StartTab: StartTab,
			Input: Input,
			ColorPicker: ColorPicker,
			Toggle: Toggle,
			Range: Range,
			Choose: Choose,
			Dimensions: Dimensions,
			Border: Border,
			Typography: Typography,
			Select: Select,
			Text: Text,
		};
	}

	registerBlocks() {

		if( ! window.jetSmGutenbergBlocks || 0 === window.jetSmGutenbergBlocks.blocks.length ){
			return;
		}

		const { registerBlockType } = wp.blocks,
			  { InspectorControls } = wp.blockEditor;

		let self          = this,
			blocks        = window.jetSmGutenbergBlocks.blocks,
			blockControls = [];

		for ( let block in blocks ) {
			let blockArgs = blocks[ block ],
				blockControls = {},
				controlStack;

			blockControls[ block ] = window.jetSmBlockControl && window.jetSmBlockControl[ block ] ? window.jetSmBlockControl[ block ] : [] ;

			blockArgs[ 'save' ] =  props => {
				if( undefined !== blockArgs[ 'save_callback' ] ){
					if( "function" !== typeof jetSmGutenbergBlocks[ blockArgs[ 'save_callback' ] ] ){
						console.error('The "save_callback" attribute function was not found in the jetSmGutenbergBlocks object. ');
					}else{
						return jetSmGutenbergBlocks[ blockArgs[ 'save_callback' ] ]( props );
					}
				}else{
					return null;
				}
			}

			blockArgs[ 'edit' ] = props => {
				controlStack = self.renderControls( blockControls[ block ], props );

				return [
					props.isSelected && controlStack && (
						<InspectorControls key={ 'inspector' }>
							{ controlStack }
						</InspectorControls>
					),
					<div key={ props.clientId }>{ blockArgs[ 'save' ]( props ) }</div>
				]
			}

			//Set block atributes
			blockArgs[ 'attributes' ] = Object.assign(
				{},
				blockArgs[ 'attributes' ],
				self.getAtributes(  self.getControlsInstant( blockControls[ block ] ) )
			);

			registerBlockType( block, blockArgs );
		}
	}

	registerBlockStyle() {
		if( ! window.jetSmBlockStyleControl || 0 === window.jetSmBlockStyleControl.length ){
			return;
		}

		const { __ } = wp.i18n,
			  { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost,
			  { Fragment } = wp.element;

		let self       = this,
			blocks     = window.jetSmBlockStyleControl,
			blockNames = Object.keys( blocks ),
			blockArgs  = [];


		for ( let block in blocks ) {
			blockArgs[ block ] = [];
			blockArgs[ block ]['attributes'] = self.getAtributes( self.getControlsInstant( blocks[ block ] ) );
		}

		addFilter(
			'blocks.registerBlockType',
			'jet-styles-manager',
			( props, name ) => {

				if( -1 === blockNames.indexOf( name ) ){
					return props;
				}

				props.attributes = Object.assign( {}, props.attributes, blockArgs[ name ].attributes );

				return props;
			}
		)

		addFilter(
			'editor.BlockEdit',
			'jet-styles-manager',
			( BlockEdit ) => {
				return ( props ) => {

					if( -1 === blockNames.indexOf( props.name ) ){
						return <BlockEdit { ...props } key={ props.clientId } />;
					}

					let controlStack = self.renderControls( window.jetSmBlockStyleControl[ props.name ], props );

					return [
						<BlockEdit { ...props } key={ props.clientId } />,
						( props.isSelected && controlStack && (
							<Fragment>
								<PluginSidebarMoreMenuItem target={ 'jet-sm-style-sidebar' } key={ 'style-sidebar-link' } >
									{ __( 'Block Style', 'jet-styles-manager' ) }
								</PluginSidebarMoreMenuItem>
								<PluginSidebar className={ 'jet-sm-style-sidebar' } name={ 'jet-sm-style-sidebar' } icon={ 'admin-customizer' } title={ __( 'Block Style', 'jet-styles-manager' ) } key={ 'style-sidebar' }>
									{ controlStack }
								</PluginSidebar>
							</Fragment>
						))
					]
				};
			}
		);
	}

	addAttributes(){
		let allBlocks = this.getAllBlockSteck();

		if( ! allBlocks ){
			return;
		}

		addFilter(
			'editor.BlockListBlock',
			'jet-styles-manager',
			( BlockListBlock ) => {
				return ( props ) => {

					if( -1 === allBlocks.indexOf( props.name ) ){
						return <BlockListBlock { ...props } />;
					}

					let id = props.attributes.blockID,
						className = props.attributes.className;

					return <BlockListBlock { ...props } id={ id } className={ className } />;
				}
			}
		);
	}

	/// Function return class instance
	getControlsInstant( controlsStack ) {
		if( ! controlsStack ){
			return null;
		};

		let controls = [],
			args,
			className,
			newControl;

		for( let key in controlsStack ) {
			if( controlsStack.hasOwnProperty( key ) ) {
				args      = controlsStack[ key ];
				className = this.getClassNameByType( args['type'] );

				if( ! jetSmControlCallback[ className ] ){
					continue;
				}

				newControl = new jetSmControlCallback[ className ]( args );

				if( newControl ){
					controls.push( newControl );
				}

				if( args['child'] ){
					let child = this.getControlsInstant( args['child'] );
					controls.push( ...child );
				}
			}
		}

		return controls;
	}

	getAtributes( controlsStack ) {
		var atributes = {};

		if( ! controlsStack ){
			return atributes;
		}

		for( let control of controlsStack ) {
			if( ! control.attributes && ! control.args.attributes ){
				continue;
			}

			if( 'extra-atributes' === control.attributes.type ){
				atributes = Object.assign(
					{},
					atributes,
					control.attributes
				);

				delete atributes['id'];
				delete atributes['type'];
			}else{
				atributes[ control.args.id ] = ( control.args.css_selector ) ? Object.assign( { source: 'children' }, control.attributes ) : control.attributes ;
			}
		}

		return atributes;
	}

	renderControls( controlsStack, props ) {
		let reactControls = [];

		if( ! controlsStack ){
			return reactControls;
		}

		for( let key in controlsStack ) {
			let args      = controlsStack[ key ],
				className = this.getClassNameByType( args['type'] ),
				controlBuild,
				newControl;

			if( ! jetSmControlCallback[ className ] ){
				continue;
			}

			if( args['child'] /*&& ! args['_child']*/ ){
				args['_child'] = this.renderControls( args['child'], props );
			}

			newControl = new jetSmControlCallback[ className ]( args );
			newControl.init( props );

			controlBuild = newControl.render();

			if( controlBuild ){
				reactControls.push( controlBuild );
			}
		}

		return reactControls;
	}

	getClassNameByType( className = '' ) {
		className = className.replace( /_|-/g, ' ' );
		className = className.replace( /^(.)|\s+(.)/g, ( $1 ) => {
			return $1.toUpperCase();
		})
		className = className.replace( ' ', '' );

		return className;
	}

	getAllBlockSteck(){
		if( ! window.jetSmBlockStyleControl && ! window.jetSmBlockControl ){
			return false;
		}

		let blockStyle = window.jetSmBlockStyleControl ? Object.keys(jetSmBlockStyleControl) : [],
			registerBlock = window.jetSmBlockControl ? Object.keys(jetSmBlockControl) : [],
			allBlocks = new Set( [
				...blockStyle,
				...registerBlock,
			] );

		allBlocks = [ ...allBlocks ];

		if( 0 === allBlocks.length ){
			return false;
		}

		return allBlocks;
	}
}

new JetBlockManager();
