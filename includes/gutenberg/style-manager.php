<?php
namespace JET_SM\Gutenberg;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Style_Manager {

	private static $instance = null;

	const META_SLUG = '_jet_sm_block_style';

	const STYLE_META_SLUG = '_jet_sm_ready_style';

	const SCRIPT_SLUG = 'jet-sm-gb';

	public function __construct() {
		add_action( 'init', [ $this, 'register_meta' ], 5000 );
		add_action( 'wp_print_footer_scripts', [ $this, 'render_blocks_style' ] );
		add_action( 'admin_print_footer_scripts', [ $this, 'render_editor_block_style' ] );

		add_filter( 'render_block', [ $this, 'wrap_block' ], 10, 2 );
	}

	public function wrap_block( $block_content, $block ) {
		$blockName = $block['blockName'];
		$attr = $block['attrs'];

		if( ! empty( $attr['blockID'] ) && ( array_key_exists( $blockName, Controls_Manager::$controls ) || array_key_exists( $blockName, Controls_Manager::$style_controls ) ) ){
			$className     = apply_filters( $blockName . '/class-name', $attr['className'] );
			$filter_id     = ! empty( $attr['filter_id'] ) ? 'data-id="' . $attr['filter_id'] . '"' : '';
			$format        = apply_filters( 'jet_style_manager/gutenberg/block_wrapper_format', '<div class="%1$s" data-block-id="%2$s" %3$s>%4$s</div>' );
			$block_content = sprintf( $format, $className, $attr['blockID'], $filter_id, $block_content );
		}

		return $block_content;
	}

	public function register_meta(){
		register_meta(
			'post',
			'_jet_sm_ready_style',
			[
				'single'            => true,
				'type'              => 'string',
				'show_in_rest'      => true,
				'auth_callback'     => [ $this, 'auth_callback' ],
				'sanitize_callback' => [ $this, 'sanitize_callback' ],
			]
		);

		register_meta(
			'post',
			'_jet_sm_style',
			[
				'single'            => true,
				'type'              => 'string',
				'show_in_rest'      => true,
				'auth_callback'     => [ $this, 'auth_callback' ],
				'sanitize_callback' => [ $this, 'sanitize_callback' ],
			]
		);

		register_meta(
			'post',
			'_jet_sm_controls_values',
			[
				'single'            => true,
				'type'              => 'string',
				'show_in_rest'      => true,
				'auth_callback'     => [ $this, 'auth_callback' ],
				'sanitize_callback' => [ $this, 'sanitize_callback' ],
			]
		);
	}

	public function get_meta(){
		$meta = get_metadata(
			'post',
			get_the_ID(),
			self::META_SLUG,
			false
		);

		return $meta;
	}

	public function render_blocks_style( $ID = false ){
		$style = $this->get_blocks_style( $ID );

		if( $style ){
			printf( '<style class="jet-sm-gb-style">%s</style>', $style );
		}
	}

	public function get_blocks_style( $ID = false ){
		global $post;

		if( ! $ID && isset( $post ) ){

			$ID = $post->ID;
		}

		if( ! $ID ){
			return false;
		}

		$style = get_post_meta( $post->ID, self::STYLE_META_SLUG, true );

		return ! empty( $style ) ? $style : false ;
	}


	public function render_editor_block_style(){
		echo '<div id="jet-sm-gb-style"></div>';
	}

	public function auth_callback( $res, $key, $post_id, $user_id, $cap ) {
		return true;
	}

	public function sanitize_callback( $meta_value, $meta_key, $object_type ){
		return $meta_value;
	}

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}
