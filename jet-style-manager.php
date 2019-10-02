<?php
/**
 * Plugin Name: JetStyleManager
 * Plugin URI:  https://crocoblock.com
 * Description: Style manager for Crocoblock plugins
 * Version:     1.0.0-beta
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com
 * Text Domain: jet-styles-manager
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

define( 'JET_SM_VERSION', '1.0.0' );
define( 'JET_SM__FILE__', __FILE__ );
define( 'JET_SM_PLUGIN_BASE', plugin_basename( JET_SM__FILE__ ) );
define( 'JET_SM_PATH', plugin_dir_path( JET_SM__FILE__ ) );
define( 'JET_SM_URL', plugins_url( '/', JET_SM__FILE__ ) );

add_action( 'plugins_loaded', 'jet_styles_manager_init' );
register_activation_hook( JET_SM__FILE__, 'jet_styles_manager_install' );

/**
 * Returns plugin instance
 *
 * @return [type] [description]
 */
function jet_styles_manager() {
	return JET_SM\Plugin::instance();
}

function jet_styles_manager_init() {
	require JET_SM_PATH . 'includes/plugin.php';
	jet_styles_manager();
}

/**
 * Install DB table
 * @return [type] [description]
 */
function jet_styles_manager_install() {
	require JET_SM_PATH . 'includes/db.php';
	JET_SM\DB::create_db_table();
}
