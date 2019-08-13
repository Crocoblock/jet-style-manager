<?php
namespace JET_SM;

/**
 * Skins manager class
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define Skins class
 */
class Skins {

	/**
	 * Public function
	 */
	public function __construct() {
		add_action( 'elementor/editor/before_enqueue_scripts', array( $this, 'editor_assets' ) );
	}

	/**
	 * Load editor assets
	 *
	 * @return [type] [description]
	 */
	public function editor_assets() {
		wp_enqueue_script(
			'jet-sm-editor',
			JET_SM_URL . 'assets/js/editor.js',
			array(),
			JET_SM_VERSION,
			true
		);
	}

}