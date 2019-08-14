<?php
namespace JET_SM;

use \Elementor\Stylesheet;
use \Elementor\Core\Responsive\Responsive;

/**
 * CSS Renderer
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define CSS_Render class
 */
class CSS_Render {

	/**
	 * Constructor for the class
	 */
	public function __construct() {
		add_action( 'elementor/css-file/post/enqueue', array( $this, 'enqueue_fonts' ) );
		add_action( 'elementor/preview/enqueue_styles', array( $this, 'load_preview_styles' ) );
	}

	/**
	 * Load hidden styles at preview
	 *
	 * @return [type] [description]
	 */
	public function load_preview_styles() {

		$post_id = get_the_ID();
		ob_start();
		$this->render_styles( array( 'post_id' => $post_id ), null, true );
		$css = ob_get_clean();
		$css = str_replace( '.elementor .elementor-inner', '#elementor.elementor .elementor-inner', $css );

		echo $css;

		$this->enqueue_hidden_fonts( array( 'post_id' => $post_id ) );
		\Elementor\Plugin::$instance->frontend->print_fonts_links();
	}

	/**
	 * Enqueue hidden fonts for given post ID
	 *
	 * @param  [type] $post_id [description]
	 * @return [type]          [description]
	 */
	public function enqueue_hidden_fonts( $query, $query_rel = 'AND' ) {

		$hidden_rules = Plugin::instance()->db->query( $query, 0, 0, array(), $query_rel );

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
		$this->enqueue_hidden_fonts( array( 'post_id' => $post_css->get_post_id() ) );
	}

	/**
	 * Render styles using internal or external stylesheet object
	 */
	public function render_styles( $query = array(), $stylesheet_obj = null, $inline = false, $query_rel = 'AND' ) {

		$hidden_rules = Plugin::instance()->db->query( $query, 0, 0, array(), $query_rel );

		if ( empty( $hidden_rules ) ) {
			return;
		}

		if ( ! $stylesheet_obj ) {
			$stylesheet_obj = new Stylesheet();
			$breakpoints    = Responsive::get_breakpoints();

			$stylesheet_obj
				->add_device( 'mobile', 0 )
				->add_device( 'tablet', $breakpoints['md'] )
				->add_device( 'desktop', $breakpoints['lg'] );
		}

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

		if ( $inline ) {
			printf( '<style>%s</style>', $stylesheet_obj->__toString() );
		}

	}

	/**
	 * Render skin related styles
	 *
	 * @return [type] [description]
	 */
	public function render_skin_styles() {

	}

}