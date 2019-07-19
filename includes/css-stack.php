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

	/**
	 * Current styles stack
	 *
	 * @var boolean
	 */
	private $stack = false;

	/**
	 * Constructor for the class
	 */
	public function __construct() {

		//add_filter( 'elementor/css-file/post/parsed-css-property', array( $this, 'process_current_stack' ), 10, 6 );

		add_action( 'elementor/element/before_parse_css', array( $this, 'start_new_stack' ), 10, 2 );
		//add_action( 'elementor/element/parse_css', array( $this, 'process_element' ), 10, 2 );
		add_action( 'elementor/css-file/post/parse-control-property', array( $this, 'process_element' ), 10, 3 );
		add_action( 'elementor/css-file/post/parse', array( $this, 'write_stack' ) );
		add_action( 'elementor/preview/enqueue_styles', array( $this, 'load_preview_styles' ) );

	}

	/**
	 * Process current CSS stack
	 *
	 * @param  [type] $css             [description]
	 * @param  [type] $parsed_selector [description]
	 * @param  [type] $query           [description]
	 * @param  [type] $control         [description]
	 * @param  [type] $controls_stack  [description]
	 * @param  [type] $file            [description]
	 * @return [type]                  [description]
	 */
	public function process_current_stack( $css, $parsed_selector, $query, $control, $controls_stack, $file ) {

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


	public function process_element( $post_css, $rule_data = array(), $controls_data = array() ) {

		$control = $controls_data['control'];

		if ( empty( $control['visible_on_level'] ) ) {
			return;
		}

		if ( empty( $control['jet_plugin'] ) ) {
			return;
		}

		$level  = absint( $control['visible_on_level'] );
		$plugin = $control['jet_plugin'];

		if ( Plugin::instance()->compatibility->is_plugin_supported( $plugin ) ) {
			$this->add_to_stack(
				$level,
				$plugin,
				$rule_data
			);
		}

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
			$this->stack[ $level ] = array();
		}

		$this->stack[ $level ][ $plugin ][] = $rule;

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

		printf( '<style>%s</style>', $stylesheet_obj->__toString() );

	}

	/**
	 * Start new elemetns stack
	 *
	 * @return [type] [description]
	 */
	public function write_stack( $post_css ) {

		foreach ( $this->stack as $level => $plugins ) {
			foreach ( $plugins as $plugin => $rules ) {

				Plugin::instance()->db->update_row(
					array(
						'visible_on' => $level,
						'post_id'    => $post_css->get_post_id(),
						'plugin'     => $plugin,
						'widget'     => '',
						'skin'       => '',
						'styles'     => json_encode( $rules ),
					),
					array(
						'post_id'    => $post_css->get_post_id(),
						'visible_on' => $level,
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
