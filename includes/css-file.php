<?php
namespace JET_SM;

use \Elementor\Controls_Stack;
use \Elementor\Element_Base;
use \Elementor\Plugin;
use \Elementor\Core\DynamicTags\Manager;
use \Elementor\Controls_Manager;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define CSS_File class
 */
class CSS_File extends \Elementor\Core\Files\CSS\Base {

	private $parent_file;

	/**
	 * CSS file constructor.
	 *
	 * Initializing Elementor CSS file.
	 *
	 * @since 1.2.0
	 * @access public
	 */
	public function __construct( $parent_file ) {
		$this->parent_file = $parent_file;
		parent::__construct( $this->parent_file->get_file_name() );
	}

	/**
	 * Add controls-stack style rules.
	 *
	 * Parse the CSS for all the elements inside any given controls stack.
	 *
	 * This method recursively renders the CSS for all the child elements in the stack.
	 *
	 * @since 1.6.0
	 * @access public
	 *
	 * @param Controls_Stack $controls_stack The controls stack.
	 * @param array          $controls       Controls array.
	 * @param array          $values         Values array.
	 * @param array          $placeholders   Placeholders.
	 * @param array          $replacements   Replacements.
	 * @param array          $all_controls   All controls.
	 */
	public function add_controls_stack_style_rules( Controls_Stack $controls_stack, array $controls, array $values, array $placeholders, array $replacements, array $all_controls = null) {

		if ( ! $all_controls ) {
			$all_controls = $controls_stack->get_controls();
		}

		$parsed_dynamic_settings = $controls_stack->parse_dynamic_settings( $values, $controls );

		foreach ( $controls as $control ) {

			var_dump( $this->is_restricted_control( $control ) );

			if ( $this->is_restricted_control( $control ) ) {
				continue;
			}

			if ( ! empty( $control['style_fields'] ) ) {
				$this->add_repeater_control_style_rules( $controls_stack, $control, $values[ $control['name'] ], $placeholders, $replacements );
			}

			if ( ! empty( $control[ Manager::DYNAMIC_SETTING_KEY ][ $control['name'] ] ) ) {
				$this->add_dynamic_control_style_rules( $control, $control[ Manager::DYNAMIC_SETTING_KEY ][ $control['name'] ] );
			}

			if ( Controls_Manager::ICONS === $control['type'] ) {
				$this->icons_fonts[] = $values[ $control['name'] ]['library'];
			}

			if ( ! empty( $parsed_dynamic_settings[ Manager::DYNAMIC_SETTING_KEY ][ $control['name'] ] ) ) {
				unset( $parsed_dynamic_settings[ $control['name'] ] );
				continue;
			}

			if ( empty( $control['selectors'] ) ) {
				continue;
			}

			$this->add_control_style_rules( $control, $parsed_dynamic_settings, $all_controls, $placeholders, $replacements );

		}

		if ( $controls_stack instanceof Element_Base ) {
			foreach ( $controls_stack->get_children() as $ch_element ) {

				$element_settings = $ch_element->get_settings();

				$this->add_controls_stack_style_rules(
					$ch_element,
					$ch_element->get_style_controls( null, $ch_element->get_parsed_dynamic_settings() ),
					$element_settings,
					array( '{{ID}}', '{{WRAPPER}}' ),
					array( $ch_element->get_id(), $this->parent_file->get_element_unique_selector( $ch_element ) )
				);
			}
		}
	}

	/**
	 * Check if current control is restricted by load level
	 *
	 * @param  [type]  $control [description]
	 * @return boolean          [description]
	 */
	public function is_restricted_control( $control ) {

		if ( empty( $control['visible_on_level'] ) ) {
			return false;
		}

		if ( empty( $control['jet_plugin'] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Get CSS file name.
	 *
	 * Retrieve the CSS file name.
	 *
	 * @since 1.6.0
	 * @access public
	 *
	 * @return string CSS file name.
	 */
	public function get_name() {
		return 'css-stack';
	}

	/**
	 * Get file handle ID.
	 *
	 * Retrieve the handle ID for the post CSS file.
	 *
	 * @since 1.2.0
	 * @access protected
	 *
	 * @return string CSS file handle ID.
	 */
	protected function get_file_handle_id() {
		return 'css-stack';
	}

	/**
	 * Render CSS.
	 *
	 * Parse the CSS for all the elements.
	 *
	 * @since 1.2.0
	 * @access protected
	 */
	protected function render_css() {
	}

}