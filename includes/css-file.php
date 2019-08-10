<?php
namespace JET_SM;

use \Elementor\Controls_Stack;
use \Elementor\Element_Base;
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
	private $stack;

	/**
	 * CSS file constructor.
	 *
	 * Initializing Elementor CSS file.
	 *
	 * @since 1.2.0
	 * @access public
	 */
	public function __construct( $parent_file, $stack ) {
		$this->parent_file = $parent_file;
		$this->stack       = $stack;
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

			if ( ! $this->is_control_should_processed( $control ) ) {
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

			$this->add_control_style_rules(
				$control,
				$parsed_dynamic_settings,
				$all_controls,
				$placeholders,
				$replacements
			);

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
	 * Add control rules.
	 *
	 * Parse the CSS for all the elements inside any given control.
	 *
	 * This method recursively renders the CSS for all the selectors in the control.
	 *
	 * @since 1.2.0
	 * @access public
	 *
	 * @param array    $control        The controls.
	 * @param array    $controls_stack The controls stack.
	 * @param callable $value_callback Callback function for the value.
	 * @param array    $placeholders   Placeholders.
	 * @param array    $replacements   Replacements.
	 */
	public function add_control_rules( array $control, array $controls_stack, callable $value_callback, array $placeholders, array $replacements ) {
		$value = call_user_func( $value_callback, $control );

		if ( null === $value || empty( $control['selectors'] ) ) {
			return;
		}

		foreach ( $control['selectors'] as $selector => $css_property ) {
			try {
				$output_css_property = preg_replace_callback( '/\{\{(?:([^.}]+)\.)?([^}| ]*)(?: *\|\| *(?:([^.}]+)\.)?([^}| ]*) *)*}}/', function( $matches ) use ( $control, $value_callback, $controls_stack, $value, $css_property ) {
					$external_control_missing = $matches[1] && ! isset( $controls_stack[ $matches[1] ] );

					$parsed_value = '';

					if ( ! $external_control_missing ) {
						$parsed_value = $this->parse_property_placeholder( $control, $value, $controls_stack, $value_callback, $matches[2], $matches[1] );
					}

					if ( '' === $parsed_value ) {
						if ( isset( $matches[4] ) ) {
							$parsed_value = $matches[4];

							$is_string_value = preg_match( '/^([\'"])(.*)\1$/', $parsed_value, $string_matches );

							if ( $is_string_value ) {
								$parsed_value = $string_matches[2];
							} elseif ( ! is_numeric( $parsed_value ) ) {
								if ( $matches[3] && ! isset( $controls_stack[ $matches[3] ] ) ) {
									return '';
								}

								$parsed_value = $this->parse_property_placeholder( $control, $value, $controls_stack, $value_callback, $matches[4], $matches[3] );
							}
						}

						if ( '' === $parsed_value ) {
							if ( $external_control_missing ) {
								return '';
							}

							throw new \Exception();
						}
					}

					return $parsed_value;
				}, $css_property );
			} catch ( \Exception $e ) {
				return;
			}

			if ( ! $output_css_property ) {
				continue;
			}

			$device_pattern = '/^(?:\([^\)]+\)){1,2}/';

			preg_match( $device_pattern, $selector, $device_rules );

			$query = [];

			if ( $device_rules ) {
				$selector = preg_replace( $device_pattern, '', $selector );

				preg_match_all( '/\(([^\)]+)\)/', $device_rules[0], $pure_device_rules );

				$pure_device_rules = $pure_device_rules[1];

				foreach ( $pure_device_rules as $device_rule ) {
					if ( Element_Base::RESPONSIVE_DESKTOP === $device_rule ) {
						continue;
					}

					$device = preg_replace( '/\+$/', '', $device_rule );

					$endpoint = $device === $device_rule ? 'max' : 'min';

					$query[ $endpoint ] = $device;
				}
			}

			$parsed_selector = str_replace( $placeholders, $replacements, $selector );

			if ( ! $query && ! empty( $control['responsive'] ) ) {
				$query = array_intersect_key( $control['responsive'], array_flip( [ 'min', 'max' ] ) );

				if ( ! empty( $query['max'] ) && Element_Base::RESPONSIVE_DESKTOP === $query['max'] ) {
					unset( $query['max'] );
				}
			}

			$level  = absint( $control['visible_on_level'] );
			$plugin = $control['jet_plugin'];

			$this->stack->add_to_stack(
				$level,
				$plugin,
				array(
					'parsed_selector'     => $parsed_selector,
					'output_css_property' => $output_css_property,
					'query'               => $query,
				)
			);
		}
	}

	/**
	 * Check if current control should be processed by style manager
	 *
	 * @param  [type]  $control [description]
	 * @return boolean          [description]
	 */
	public function is_control_should_processed( $control ) {

		if ( ! isset( $control['visible_on_level'] ) ) {
			return false;
		}

		if ( ! isset( $control['jet_plugin'] ) ) {
			return false;
		}

		if ( ! Plugin::instance()->compatibility->is_plugin_supported( $control['jet_plugin'] ) ) {
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
	protected function render_css() {}

}