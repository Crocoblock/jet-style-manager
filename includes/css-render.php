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

	const FONTS_META_KEY = '_jet_sm_fonts_cache';

	private $cache = array();

	/**
	 * Constructor for the class
	 */
	public function __construct() {
		add_action( 'elementor/css-file/post/enqueue', array( $this, 'enqueue_fonts' ) );
		add_action( 'elementor/preview/enqueue_styles', array( $this, 'load_preview_styles' ) );

		add_action( 'jet-styles-manager/css-stack/reset', array( $this, 'reset_fonts_cache' ) );
	}

	/**
	 * Clear fonts cache on appropriate post update
	 *
	 * @param  [type] $post_id [description]
	 * @return [type]          [description]
	 */
	public function reset_fonts_cache( $post_id ) {
		delete_post_meta( $post_id, self::FONTS_META_KEY );
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
	 * Returns cached fonts
	 *
	 * @param  [type] $query     [description]
	 * @param  [type] $query_rel [description]
	 * @return [type]            [description]
	 */
	public function get_cached( $query, $query_rel ) {

		$hash_query = $query;

		if ( isset( $hash_query['__select'] ) ) {
			unset( $hash_query['__select'] );
		}

		$hash = md5( http_build_query( $hash_query ) . $query_rel );

		if ( ! isset( $this->cache[ $hash ] ) ) {
			$this->cache[ $hash ] = Plugin::instance()->db->query( $query, 0, 0, array(), $query_rel );
		}

		return $this->cache[ $hash ];

	}

	/**
	 * Enqueue hidden fonts for given post ID
	 *
	 * @param  [type] $post_id [description]
	 * @return [type]          [description]
	 */
	public function enqueue_hidden_fonts( $query, $query_rel = 'AND' ) {

		$post_id = ! empty( $query['post_id'] ) ? $query['post_id'] : get_the_ID();
		$fonts   = $this->get_cached_fonts( $post_id, $query );

		if ( false !== $fonts ) {
			foreach ( $fonts as $font ) {
				\Elementor\Plugin::$instance->frontend->enqueue_font( $font );
			}
			return;
		}

		$query['__select'] = ' `plugin`, `visible_on`, `fonts` ';

		$hidden_rules = $this->get_cached( $query, $query_rel );

		if ( empty( $hidden_rules ) ) {
			$this->update_fonts_cache( $post_id, $query, array() );
			return;
		}

		$cache = array();

		foreach ( $hidden_rules as $set ) {

			$load_level = Plugin::instance()->compatibility->get_plugin_level( $set['plugin'] );
			$visible_on = absint( $set['visible_on'] );

			if ( $visible_on > $load_level ) {

				$fonts = json_decode( $set['fonts'], true );

				if ( ! empty( $fonts ) ) {
					foreach ( $fonts as $font ) {

						if ( ! in_array( $font, $cache ) ) {
							$cache[] = $font;
						}

						\Elementor\Plugin::$instance->frontend->enqueue_font( $font );
					}
				}

			}

		}

		$this->update_fonts_cache( $post_id, $query, $cache );

	}

	/**
	 * Update cached fonts
	 *
	 * @param  [type] $post_id [description]
	 * @param  [type] $query   [description]
	 * @param  [type] $cache   [description]
	 * @return [type]          [description]
	 */
	public function get_cached_fonts( $post_id = 0, $query = array() ) {

		$hash = md5( http_build_query( $query ) );
		$meta = get_post_meta( $post_id, self::FONTS_META_KEY, true );

		if ( empty( $meta ) ) {
			return false;
		} elseif ( ! isset( $meta[ $hash ] ) ) {
			return false;
		} else {
			return $meta[ $hash ];
		}

	}

	/**
	 * Update cached fonts
	 *
	 * @param  [type] $post_id [description]
	 * @param  [type] $query   [description]
	 * @param  [type] $cache   [description]
	 * @return [type]          [description]
	 */
	public function update_fonts_cache( $post_id = 0, $query = array(), $cache = array() ) {

		if ( isset( $query['__select'] ) ) {
			unset( $query['__select'] );
		}

		$hash = md5( http_build_query( $query ) );
		$meta = get_post_meta( $post_id, self::FONTS_META_KEY, true );

		if ( empty( $meta ) ) {
			$meta = array();
		}

		$meta[ $hash ] = $cache;

		update_post_meta( $post_id, self::FONTS_META_KEY, $meta );

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
	 * Returns new stylesheet instance
	 * @return [type] [description]
	 */
	public function get_stylesheet() {

		$stylesheet_obj = new Stylesheet();
		$breakpoints    = Responsive::get_breakpoints();

		$stylesheet_obj
			->add_device( 'mobile', 0 )
			->add_device( 'tablet', $breakpoints['md'] )
			->add_device( 'desktop', $breakpoints['lg'] );

		return $stylesheet_obj;

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
			$stylesheet_obj = $this->get_stylesheet();
		}

		if ( $inline ) {
			$result = '';
		}

		foreach ( $hidden_rules as $set ) {

			$load_level = Plugin::instance()->compatibility->get_plugin_level( $set['plugin'] );
			$visible_on = absint( $set['visible_on'] );

			if ( $visible_on > $load_level ) {


				$css = $set['styles'];

				$stylesheet_obj->add_raw_css( $css );

				if ( $inline ) {
					$result .= $css;
				}

			}

		}

		if ( $inline ) {
			printf( '<style>%s</style>', $result );
		}

	}

}
