<?php
namespace JET_SM;

/**
 * Plugins compatibility manager
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define Compatibility class
 */
class Compatibility {

	private $_plugins = array();

	/**
	 * Allow plugins to regsiter compatibility
	 */
	public function __construct() {

		/**
		 * Register plugin compatibility on this hook
		 */
		do_action( 'jet-styles-manager/compatibility/register-plugin', $this );
	}

	/**
	 * Register new plugin with loading level option support
	 *
	 * @param  string  $slug          Plugin slug. Should be the same as for slug pased into control
	 * @param  integer $current_level [description]
	 * @return void
	 */
	public function register_plugin( $slug = null, $current_level = 100 ) {

		if ( ! $slug ) {
			return;
		}

		$this->_plugins[ $slug ] = $current_level;

	}

	/**
	 * Check if plugin is supported
	 *
	 * @param  stirng  $slug [description]
	 * @return boolean       [description]
	 */
	public function is_plugin_supported( $slug = null ) {

		if ( ! $slug ) {
			return false;
		} else {
			return isset( $this->_plugins[ $slug ] );
		}
	}

	/**
	 * Get plugin load level
	 *
	 * @param  [type] $slug [description]
	 * @return [type]       [description]
	 */
	public function get_plugin_level( $slug = null ) {

		if ( ! $slug || ! isset( $_plugins[ $slug ] ) ) {
			return false;
		} else {
			return absint( $_plugins[ $slug ] );
		}

	}

	/**
	 * [prepare_control_args description]
	 * @param  [type] $args [description]
	 * @return [type]       [description]
	 */
	public function prepare_control_args( $args ) {
		return $args;
	}

	/**
	 * [prepare_control_args description]
	 * @param  [type] $args [description]
	 * @return [type]       [description]
	 */
	public function prepare_group_control_args( $args ) {
		return $args;
	}

	/**
	 * Return supported plugins slug with apropriate load level
	 *
	 * @return array
	 */
	public function get_supported_plugins() {
		return $this->_plugins;
	}

}
