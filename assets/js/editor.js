(function( $ ) {

	'use strict';

	var JetSM = {
		modal: null,
		getModal: function() {

			if ( ! this.modal ) {
				this.modal = window.elementor.dialogsManager.createWidget( 'lightbox', {
					id: 'jet-sm-skins-modal',
					closeButton: true
				} );
			}

			return this.modal;

		},
		init: function() {
			var self = this;
			window.elementor.hooks.addFilter( 'elements/widget/contextMenuGroups', function( groups, element ) {

				groups.push( {
					name: 'jet_sm_skins',
					actions: [{
						name: 'jet_sm_skins_save',
						icon: 'eicon-save',
						title: 'Save as Skin',
						isVisible: true,
						callback: JetSM.showSkinsPopup.bind( {
							element: element,
						} )
					}, {
						name: 'jet_sm_skins_apply',
						icon: 'eicon-arrow-down',
						title: 'Apply Skin',
						isVisible: true,
						callback: JetSM.applySkin.bind( { element: element } )
					}]
				} );

				return groups;
			} );
		},
		showSkinsPopup: function() {
			JetSM.getModal().show();
		},
		applySkin: function() {

		},
	};

	$( window ).on( 'elementor:init', JetSM.init );

})( jQuery );