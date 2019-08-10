<?php
namespace JET_SM;

use \Elementor\Stylesheet;

/**
 * Database manager class
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define CSS_Stack class
 */
class CSS_Stack {

	private $stack       = false;
	private $fonts_stack = array();
	private $css_file    = null;

	/**
	 * Constructor for the class
	 */
	public function __construct() {

		add_action( 'elementor/element/before_parse_css', array( $this, 'start_new_stack' ), 10, 2 );
		add_action( 'elementor/element/parse_css', array( $this, 'process_element' ), 10, 2 );
		add_action( 'elementor/css-file/post/parse', array( $this, 'write_stack' ) );
		add_action( 'elementor/css-file/post/enqueue', array( $this, 'enqueue_fonts' ) );
		add_action( 'elementor/preview/enqueue_styles', array( $this, 'load_preview_styles' ) );

	}

	/**
	 * Start new elemetns stack
	 *
	 * @return [type] [description]
	 */
	public function start_new_stack( $post_css, $element ) {
		if ( false === $this->stack ) {
			$this->stack = array();
		}
	}



	/**
	 * Process single element
	 *
	 * @param  [type] $post_css      [description]
	 * @param  array  $rule_data     [description]
	 * @param  array  $controls_data [description]
	 * @return [type]                [description]
	 */
	public function process_element( $post_css, $element ) {

		if ( ! $this->css_file ) {
			$this->css_file = new CSS_File( $post_css, $this );
		}

		$this->css_file->add_controls_stack_style_rules(
			$element,
			$element->get_style_controls( null, $element->get_parsed_dynamic_settings() ),
			$element->get_settings(),
			array( '{{ID}}', '{{WRAPPER}}' ),
			array( $element->get_id(), $post_css->get_element_unique_selector( $element ) )
		);

	}

	/**
	 * Add new rules to apropriate stylesheet level object
	 *
	 * @param integer $level     [description]
	 * @param string  $plugin    [description]
	 * @param array   $rule_data [description]
	 */
	public function add_to_stack( $level = 0, $plugin = null, $rule = array() ) {

		if ( empty( $this->stack[ $level ] ) ) {
			$this->stack[ $level ] = array();
		}

		if ( empty( $this->stack[ $level ][ $plugin ] ) ) {
			$this->stack[ $level ][ $plugin ] = array();
		}

		if ( false !== strpos( $rule['output_css_property'], 'font-family' ) ) {
			$this->fonts_stack[ $level ][ $plugin ][] = $this->get_font_from_css_prop( $rule['output_css_property'] );
		}

		$this->stack[ $level ][ $plugin ][] = $rule;

	}

	/**
	 * Retireieves font name from font-family property
	 *
	 * @param  [type] $css_property [description]
	 * @return [type]               [description]
	 */
	public function get_font_from_css_prop( $css_property ) {

		$found = preg_match( '/font-family: "(.*)"/', $css_property, $matches );

		if ( $found ) {
			return $matches[1];
		} else {
			return false;
		}

	}

	/**
	 * Load hidden styles at preview
	 *
	 * @return [type] [description]
	 */
	public function load_preview_styles() {

		$post_id = get_the_ID();

		$hidden_rules = Plugin::instance()->db->query( array(
			'post_id'     => $post_id,
		) );

		$stylesheet_obj = new Stylesheet();

		foreach ( $hidden_rules as $set ) {

			$load_level = Plugin::instance()->compatibility->get_plugin_level( $set['plugin'] );
			$visible_on = absint( $set['visible_on'] );

			if ( $visible_on > $load_level ) {

				$styles = json_decode( $set['styles'], true );

				if ( ! empty( $styles ) ) {
					foreach ( $styles as $style ) {
						$stylesheet_obj->add_rules(
							$style['parsed_selector'],
							$style['output_css_property'],
							$style['query']
						);
					}
				}

			}

		}

		$this->enqueue_hidden_fonts( $post_id );
		\Elementor\Plugin::$instance->frontend->print_fonts_links();

		printf( '<style>%s</style>', $stylesheet_obj->__toString() );

	}

	/**
	 * Enqueue hidden fonts for given post ID
	 *
	 * @param  [type] $post_id [description]
	 * @return [type]          [description]
	 */
	public function enqueue_hidden_fonts( $post_id ) {

		$hidden_rules = Plugin::instance()->db->query( array(
			'post_id' => $post_id,
		) );

		if ( empty( $hidden_rules ) ) {
			return;
		}

		foreach ( $hidden_rules as $set ) {

			$load_level = Plugin::instance()->compatibility->get_plugin_level( $set['plugin'] );
			$visible_on = absint( $set['visible_on'] );

			if ( $visible_on > $load_level ) {

				$fonts = json_decode( $set['fonts'], true );

				if ( ! empty( $fonts ) ) {
					foreach ( $fonts as $font ) {
						\Elementor\Plugin::$instance->frontend->enqueue_font( $font );
					}
				}

			}

		}

	}

	/**
	 * Enqueue saved google fonts
	 *
	 * @return [type] [description]
	 */
	public function enqueue_fonts( $post_css ) {
		$this->enqueue_hidden_fonts( $post_css->get_post_id() );
	}

	/**
	 * Start new elemetns stack
	 *
	 * @return [type] [description]
	 */
	public function write_stack( $post_css ) {

		foreach ( $this->stack as $level => $plugins ) {
			foreach ( $plugins as $plugin => $rules ) {

				$current_fonts = ! empty( $this->fonts_stack[ $level ][ $plugin ] ) ? $this->fonts_stack[ $level ][ $plugin ] : array();
				$current_fonts = array_filter( $current_fonts );
				$current_fonts = array_unique( $current_fonts );

				Plugin::instance()->db->update_row(
					array(
						'visible_on' => $level,
						'post_id'    => $post_css->get_post_id(),
						'plugin'     => $plugin,
						'widget'     => '',
						'skin'       => '',
						'styles'     => json_encode( $rules ),
						'fonts'      => json_encode( $current_fonts ),
					),
					array(
						'post_id'    => $post_css->get_post_id(),
						'visible_on' => $level,
						'plugin'     => $plugin,
					)
				);
			}
		}

		$hidden_rules = Plugin::instance()->db->query( array(
			'post_id' => $post_css->get_post_id(),
		) );

		if ( empty( $hidden_rules ) ) {
			return;
		}

		$stylesheet_obj = $post_css->get_stylesheet();

		foreach ( $hidden_rules as $set ) {

			$load_level = Plugin::instance()->compatibility->get_plugin_level( $set['plugin'] );
			$visible_on = absint( $set['visible_on'] );

			if ( $visible_on > $load_level ) {

				$styles = json_decode( $set['styles'], true );

				if ( ! empty( $styles ) ) {
					foreach ( $styles as $style ) {
						$stylesheet_obj->add_rules(
							$style['parsed_selector'],
							$style['output_css_property'],
							$style['query']
						);
					}
				}

			}

		}

	}

}
