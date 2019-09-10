(function( $ ) {

	'use strict';

	window.JetSM = {
		modal: null,
		currentElement: null,
		init: function() {

			$( document )
				.on( 'click', '.jet-sm-popup-close', JetSM.hidePopup )
				.on( 'click', '#jet-sm-save-skin', JetSM.saveSkin )
				.on( 'click', '.jet-sm-apply-skin', JetSM.applySkin )
				.on( 'click', '.jet-sm-delete-skin', JetSM.deleteSkin );

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
						callback: JetSM.applySkinPopup.bind( { element: element } )
					}, {
						name: 'jet_sm_skins_reset',
						icon: 'eicon-close',
						title: 'Reset Skin',
						isVisible: true,
						callback: JetSM.resetSkin.bind( { element: element } )
					}]
				} );

				return groups;
			} );

			window.elementor.on( 'preview:loaded', function() {

				if ( ! window.JetSMRenderedSkins.length ) {
					return;
				}

				var $previewBody = window.elementor.$preview.contents();

				$.ajax({
					url: window.ajaxurl,
					type: 'POST',
					dataType: 'json',
					data: {
						action: 'jet_sm_load_skins_css',
						skins: JSON.stringify( window.JetSMRenderedSkins ),
					},
				}).done( function( response ) {
					$previewBody.find( 'head' ).append( response.data.css );
				}).fail( function() {
					// TODO: show error
				});

				window.JetSMRenderedSkins.forEach( function( element ) {
					$previewBody.find( 'div[data-id="' + element.id + '"]' ).addClass( element.class_name );
				} );

			} );

		},
		removeSkinClass: function( $el ) {

			var classes = $el.attr( 'class' ).split( /\s+/ );

			classes.forEach( function( className ) {
				if ( className.includes( 'elementor-element-skin-' ) ) {
					$el.removeClass( className );
				}
			} );
		},
		resetSkin: function() {
			var editModel = this.element.getEditModel(),
				skin      = editModel.getSetting( 'jet_sm_skin' );

			if ( ! skin ) {
				return;
			}

			JetSM.removeSkinClass( this.element.$el );
			window.elementor.saver.setFlagEditorChange( true );

		},
		getModal: function() {

			if ( ! this.modal ) {

				this.modal = window.elementor.dialogsManager.createWidget( 'lightbox', {
					id: 'jet-sm-skins-modal',
					closeButton: true
				} );

				this.modal.setHeaderMessage( '<div class="jet-sm-popup-close elementor-templates-modal__header__close elementor-templates-modal__header__close--normal elementor-templates-modal__header__item"><i class="eicon-close" aria-hidden="true" title="Close"></i><span class="elementor-screen-only">Close</span></div>' );
			}

			return this.modal;

		},
		saveSkin: function() {

			if ( ! JetSM.currentElement ) {
				// TODO: show error
				return;
			}

			var skinName = $( '#jet-sm-skin-name' ).val(),
				settings = JetSM.currentElement.controlsCSSParser.getSettings(),
				values   = settings.settingsModel.attributes,
				widget   = JetSM.currentElement.model.attributes.widgetType;

			for ( var control in values ) {
				if ( values[ control ].model && values[ control ].models ) {
					delete( values[ control ] );
				}
			}

			$.ajax({
				url: window.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'jet_sm_save_skin',
					name: skinName,
					widget: widget,
					values: JSON.stringify( values ),
				},
			}).done( function() {
				JetSM.hidePopup();
			}).fail( function() {
				// TODO: show error
			});

		},
		deleteSkin: function() {

			if ( ! JetSM.currentElement ) {
				// TODO: show error
				return;
			}

			var $button  = $( this ),
				skinName = $button.attr( 'data-skin' );

			$.ajax({
				url: window.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'jet_sm_delete_skin',
					name: skinName,
					widget: JetSM.currentElement.model.attributes.widgetType,
				},
			}).done( function( response ) {
				if ( response.success ) {
					var modal = JetSM.getModal();

					if ( response.success ) {
						modal.setMessage( JetSM.getModalMessage( response.data.skins ) );
					}
				}
			}).fail( function() {
				// TODO: show error
			});

		},
		applySkin: function() {

			if ( ! JetSM.currentElement ) {
				// TODO: show error
				return;
			}

			var $button  = $( this ),
				skinName = $button.attr( 'data-skin' );

			$.ajax({
				url: window.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'jet_sm_apply_skin',
					name: skinName,
					widget: JetSM.currentElement.model.attributes.widgetType,
				},
			}).done( function( response ) {
				if ( response.success ) {

					var editModel = window.JetSM.currentElement.getEditModel();

					editModel.setSetting( {
						jet_sm_skin: skinName,
					} );

					JetSM.removeSkinClass( JetSM.currentElement.$el );
					JetSM.currentElement.el.classList.add( response.data.class_name );

					window.elementor.$preview.contents().find( 'head' ).append( response.data.css );
					window.elementor.saver.setFlagEditorChange( true );

					JetSM.hidePopup();
				}
			}).fail( function() {
				// TODO: show error
			});

		},
		hidePopup: function() {
			JetSM.currentElement = null;
			JetSM.getModal().hide();
			JetSM.getModal().setMessage( '' );
		},
		showSkinsPopup: function() {

			var modal = JetSM.getModal();

			JetSM.currentElement = this.element;

			modal.setMessage( '<div class="jet-sm-save-skin"><div class="jet-sm-popup-actions"><div class="jet-sm-popup-heading">Save current widget styling as skin</div><div class="jet-sm-popup-sub-heading">You\'ll be able to apply this skin to any widget of the same type.</div></div><input type="text" id="jet-sm-skin-name"><button id="jet-sm-save-skin" class="elementor-button elementor-button-success"><span class="elementor-state-icon"><i class="eicon-loading eicon-animation-spin" aria-hidden="true"></i></span>Save</button></div>' );

			modal.show();

		},
		applySkinPopup: function() {

			var modal = JetSM.getModal();

			JetSM.currentElement = this.element;

			modal.setMessage( '<div class="jet-sm-skins__loading">Loading skins...</div>' );
			modal.show();

			$.ajax({
				url: window.ajaxurl,
				type: 'GET',
				dataType: 'json',
				data: {
					action: 'jet_sm_get_skins_for_widget',
					widget: JetSM.currentElement.model.attributes.widgetType,
				},
			}).done( function( response ) {
				if ( response.success ) {
					modal.setMessage( JetSM.getModalMessage( response.data.skins ) );
				}
				modal.refreshPosition();
			}).fail( function() {
				// TODO: show error
			});

		},
		getModalMessage: function( skins ) {

			var modalMessage = null;

			modalMessage = '<div class="jet-sm-skins">';

			if ( skins.length ) {
				modalMessage += '<table class="jet-sm-skins__table"><thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody>';

				skins.forEach( function( skin ) {
					modalMessage += '<tr><td>' + skin.skin + '</td><td><button type="button" class="elementor-button elementor-button-success jet-sm-apply-skin" data-skin="' + skin.skin + '">Apply</button><a href="#" class="jet-sm-delete-skin" data-skin="' + skin.skin + '">Delete</a></td></tr>';
				});

				modalMessage += '</tbody></table>';
			} else {
				modalMessage += '<div class="jet-sm-skins__not-found">No skins found for this widget</div>';
			}

			modalMessage += '</div>';

			return modalMessage;
		},
	};

	$( window ).on( 'elementor:init', JetSM.init );

})( jQuery );