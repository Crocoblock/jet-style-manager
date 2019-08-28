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

		if ( ! $slug || ! isset( $this->_plugins[ $slug ] ) ) {
			return false;
		} else {
			return absint( $this->_plugins[ $slug ] );
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

	/**
	 * Set up control arguments
	 */
	public function set_control_args( $control_args, $load_level, $plugin ) {

		$control_args['visible_on_level'] = $load_level;
		$control_args['jet_plugin']       = $plugin;

		return $control_args;
	}

	/**
	 * Prepare arguments for Elementor grouped controls
	 *
	 * @param  [type] $control_type [description]
	 * @param  [type] $control_args [description]
	 * @param  [type] $load_level   [description]
	 * @param  [type] $plugin       [description]
	 * @return [type]               [description]
	 */
	public function set_group_control_args( $control_type, $control_args, $load_level, $plugin ) {

		$load_info = array(
			'visible_on_level' => $load_level,
			'jet_plugin'       => $plugin,
		);

		$new_args = array();

		switch ( $control_type ) {

			case 'background':
				$new_args = array(
					'color'             => $load_info,
					'color_stop'        => $load_info,
					'color_b'           => $load_info,
					'color_b_stop'      => $load_info,
					'gradient_type'     => $load_info,
					'gradient_angle'    => $load_info,
					'gradient_position' => $load_info,
					'image'             => $load_info,
					'position'          => $load_info,
					'xpos'              => $load_info,
					'ypos'              => $load_info,
					'attachment'        => $load_info,
					'repeat'            => $load_info,
					'size'              => $load_info,
					'bg_width'          => $load_info,
					'video_link'        => $load_info,
					'video_start'       => $load_info,
					'video_end'         => $load_info,
					'play_once'         => $load_info,
					'video_fallback'    => $load_info,
				);
				break;

			case 'box-shadow':
				$new_args = array(
					'box_shadow'          => $load_info,
					'box_shadow_position' => $load_info,
				);
				break;

			case 'border':
				$new_args = array(
					'width'  => $load_info,
					'border' => $load_info,
					'color'  => $load_info,
				);
				break;

			case 'typography':
				$new_args = array(
					'font_size'       => $load_info,
					'font_family'     => $load_info,
					'font_weight'     => $load_info,
					'text_transform'  => $load_info,
					'text_decoration' => $load_info,
					'line_height'     => $load_info,
					'letter_spacing'  => $load_info,
				);
				break;

			case 'jet-box-style':
				$new_args = array(
					'background'          => $load_info,
					'color'               => $load_info,
					'color_stop'          => $load_info,
					'color_b'             => $load_info,
					'color_b_stop'        => $load_info,
					'gradient_type'       => $load_info,
					'gradient_angle'      => $load_info,
					'gradient_position'   => $load_info,
					'box_font_color'      => $load_info,
					'box_font_size'       => $load_info,
					'box_size'            => $load_info,
					'box_border'          => $load_info,
					'box_border_width'    => $load_info,
					'box_border_color'    => $load_info,
					'box_border_radius'   => $load_info,
					'allow_box_shadow'    => $load_info,
					'box_shadow'          => $load_info,
					'box_shadow_position' => $load_info,

				);
				break;

		}

		if ( ! empty( $new_args ) ) {

			if ( empty( $control_args['fields_options'] ) ) {
				$control_args['fields_options'] = array();
			}

			$control_args['fields_options'] = array_merge_recursive( $control_args['fields_options'], $new_args );
		}

		return $control_args;

	}

}
