<?php
/**
 * Plugin Name: JetStylesManager
 * Plugin URI:
 * Description: Styles manager
 * Version:     1.0.0
 * Author:      Crocoblock
 * Author URI:
 * Text Domain: jet-styles-manager
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

add_action( 'plugins_loaded', 'jet_styles_manager_init' );

function jet_styles_manager_init() {

	define( 'JET_SM_VERSION', '1.0.0' );

	define( 'JET_SM__FILE__', __FILE__ );
	define( 'JET_SM_PLUGIN_BASE', plugin_basename( JET_SM__FILE__ ) );
	define( 'JET_SM_PATH', plugin_dir_path( JET_SM__FILE__ ) );
	define( 'JET_SM_URL', plugins_url( '/', JET_SM__FILE__ ) );

	require JET_SM_PATH . 'includes/plugin.php';

}

function jet_styles_manager() {
	return JET_SM\Plugin::instance();
}
