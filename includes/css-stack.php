<?php
namespace JET_SM;

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

	private $stack           = false;
	private $fonts_stack     = array();
	private $css_file        = null;
	private $render          = null;
	private $processed_files = array();

	private static $hooked = false;

	/**
	 * Constructor for the class
	 */
	public function __construct() {

		$this->render = new CSS_Render();

		add_action( 'elementor/element/before_parse_css', array( $this, 'start_new_stack' ) );
		add_action( 'elementor/document/after_save', array( $this, 'reset_stack' ) );

	}

	public function reset_stack( $document ) {
		do_action( 'jet-styles-manager/css-stack/reset', $document->get_main_id() );
		delete_post_meta( $document->get_main_id(), '_jet_sm_is_processed' );
	}

	/**
	 * Start new elemetns stack
	 *
	 * @return [type] [description]
	 */
	public function start_new_stack( $post_css = null ) {

		if ( $post_css ) {

			$post_id = $post_css->get_post_id();

			if ( in_array( $post_id, $this->processed_files ) ) {
				return;
			}

			$this->processed_files[] = $post_id;
			$is_processed            = get_post_meta( $post_id, '_jet_sm_is_processed', true );

			if ( $is_processed ) {
				return;
			}

		}

		if ( false === $this->stack ) {

			if ( ! self::$hooked ) {
				add_action( 'elementor/element/parse_css', array( $this, 'process_element' ), 10, 2 );
				add_action( 'elementor/css-file/post/parse', array( $this, 'process_stack' ) );
				self::$hooked = true;
			}

			$this->stack = array();
		}
	}

	/**
	 * Returns CSS file instance
	 *
	 * @param  [type] $post_css [description]
	 * @return [type]           [description]
	 */
	public function get_css_file( $post_css = null ) {
		if ( ! $this->css_file ) {
			$this->css_file = new CSS_File( $this, $post_css );
		}
		return $this->css_file;
	}

	/**
	 * Process single element
	 *
	 * @param  [type] $post_css      [description]
	 * @param  array  $rule_data     [description]
	 * @param  array  $controls_data [description]
	 * @return [type]                [description]
	 */
	public function process_element( $post_css = null, $element = null ) {

		if ( false === $this->stack ) {
			return;
		}

		$css_file = $this->get_css_file( $post_css );

		if ( $post_css ) {
			$unique_selector = $post_css->get_element_unique_selector( $element );
		} else {
			$unique_selector = $css_file->get_element_unique_selector( $element );
		}

		Plugin::instance()->skins->add_skin_to_rendered( $element );

		$css_file->set_parent( $post_css );

		$css_file->add_controls_stack_style_rules(
			$element,
			$element->get_style_controls( null, $element->get_parsed_dynamic_settings() ),
			$element->get_settings(),
			array( '{{ID}}', '{{WRAPPER}}' ),
			array( $element->get_id(), $unique_selector )
		);

	}

	/**
	 * Add new rules to apropriate stylesheet level object
	 *
	 * @param integer $level     [description]
	 * @param string  $plugin    [description]
	 * @param array   $rule_data [description]
	 */
	public function add_to_stack( $post_id = false, $level = 0, $plugin = null, $rule = array() ) {

		if ( ! $post_id ) {
			$key = 'general';
		} else {
			$key = $post_id;
		}

		if ( empty( $this->stack[ $key ] ) ) {
			$this->stack[ $key ] = array();
		}

		if ( empty( $this->stack[ $key ][ $level ] ) ) {
			$this->stack[ $key ][ $level ] = array();
		}

		if ( empty( $this->stack[ $key ][ $level ][ $plugin ] ) ) {
			$this->stack[ $key ][ $level ][ $plugin ] = array();
		}

		if ( false !== strpos( $rule['output_css_property'], 'font-family' ) ) {
			$this->fonts_stack[ $key ][ $level ][ $plugin ][] = $this->get_font_from_css_prop( $rule['output_css_property'] );
		}

		$this->stack[ $key ][ $level ][ $plugin ][] = $rule;

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
	 * Write current stack into database
	 *
	 * @return [type] [description]
	 */
	public function write_stack_to_db( $post_css, $widget = null, $skin = null ) {

		if ( ! $post_css ) {
			$post_css = $this->get_css_file();
		}

		$post_id = $post_css->get_post_id();

		if ( ! $post_id ) {
			$key = 'general';
		} else {
			$key = $post_id;
		}

		$stack   = ! empty( $this->stack[ $key ] ) ? $this->stack[ $key ] : array();
		$cleared = array();

		foreach ( $stack as $level => $plugins ) {

			foreach ( $plugins as $plugin => $rules ) {

				$current_fonts = ! empty( $this->fonts_stack[ $key ][ $level ][ $plugin ] ) ? $this->fonts_stack[ $key ][ $level ][ $plugin ] : array();
				$current_fonts = array_filter( $current_fonts );
				$current_fonts = array_unique( $current_fonts );
				$load_level    = Plugin::instance()->compatibility->get_plugin_level( $plugin );

				if ( empty( $cleared[ $plugin ] ) ) {

					$where = array(
						'plugin'     => $plugin,
						'visible_on' => $load_level,
					);

					if ( $post_id ) {
						$where['post_id'] = $post_id;
					}

					if ( $widget ) {
						$where['widget'] = $widget;
					}

					if ( $skin ) {
						$where['skin'] = $skin;
						unset( $where['visible_on'] );
					}

					Plugin::instance()->db->delete_row( $where );

					$cleared[ $plugin ] = true;

				}

				$stylesheet = $this->render->get_stylesheet();

				foreach ( $rules as $rule ) {
					$stylesheet->add_rules(
						$rule['parsed_selector'],
						$rule['output_css_property'],
						$rule['query']
					);
				}

				Plugin::instance()->db->update_row(
					array(
						'visible_on' => $level,
						'post_id'    => $post_id,
						'plugin'     => $plugin,
						'widget'     => $widget,
						'skin'       => $skin,
						'styles'     => $stylesheet->__toString(),
						'fonts'      => json_encode( $current_fonts ),
					)
				);
			}
		}

		if ( $post_id ) {
			update_post_meta( $post_id, '_jet_sm_is_processed', 1 );
		}

	}

	/**
	 * Start new elemetns stack
	 *
	 * @return [type] [description]
	 */
	public function process_stack( $post_css ) {

		$this->write_stack_to_db( $post_css );

		$skins = Plugin::instance()->skins->get_rendered_skins();

		if ( empty( $skins ) ) {
			$query          = array( 'post_id' => $post_css->get_post_id() );
			$query_relation = 'AND';
		} else {

			$skins = array_map( function( $item ) {

				$whitelisted_item = array(
					'skin'   => $item['skin'],
					'widget' => $item['widget'],
				);

				return $whitelisted_item;

			}, $skins );

			$query          = array_merge( array( 'post_id' => $post_css->get_post_id() ), $skins );
			$query_relation = 'OR';
		}

		$this->render->render_styles( $query, $post_css->get_stylesheet(), false, $query_relation );

	}

}
