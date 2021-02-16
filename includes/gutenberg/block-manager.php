<?php
namespace JET_SM\Gutenberg;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Block_Manager {

	private static $instance = null;

	public $controls_manager = null;

	public static $registered_blocks = [];

	const SCRIPT_SLUG = 'jet-sm-gb';

	public $script_dependencies = [
		'wp-edit-post',
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-components',
		'wp-data'
	];

	private $default_block_args = [
		'title'         => 'Jet-Gutenberg-Block',
		'icon'          => 'block-default',
		'description'   => 'Jet block for Gutenberg',
		'category'      => 'layout',
		'keywords'      => [ 'jet', 'croco' ],
		'className'     => 'jet-sm-gutenberg-block',
		'parent'        => [],
		'supports'      => [],
		'styles'        => null,
		'transforms'    => null,
		'edit'          => null, //The controls are built automatically in this function. But you can rewrite this function by set name to this property.
		'save_callback' => null, //JS function name or method name in object. The Function gets an argument with properties { attributes, setAttributes, className, isSelected }
	];

	public function __construct(){
		$this->script_dependencies = apply_filters( 'jet_style_manager/gutenberg/script_dependencies', $this->script_dependencies );

		add_action( 'enqueue_block_assets',        [ $this, 'localize_scripts' ],    1, 0 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'load_scripts' ],        2, 0 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'load_editor_scripts' ], 3, 0 );
		add_filter( 'admin_body_class',            [ $this, 'add_body_class' ],     10, 1 );
	}

	public function add_body_class( $classes ){

		if( WP_DEBUG ){
			$classes .= ' is_debug_mod';
		}

		return $classes;
	}


	public function register_block( $slug = null, $args = [] ){

		if( ! $slug ){
			return;
		}

		if( array_key_exists( $slug, self::$registered_blocks ) ){
			return new WP_Error( 'redeclaration', sprintf( esc_html__( 'Gutenberg block with slug "%s" already registered', 'jet-styles-manager' ), $slug ) );
		}

		$args = wp_parse_args( $args, $this->default_block_args );
		$args = $this->parse_args( $args );

		self::$registered_blocks[ $slug ] = $args;

		return new Controls_Manager( $slug );
	}

	public function unregister_block( $slug = null ){

		if( ! $slug ){
			return;
		}

		if( ! array_key_exists( $slug, self::$registered_blocks ) ){
			return new WP_Error( 'not_found', sprintf( esc_html__( 'No block with this slug "%s" found', 'jet-styles-manager' ), $slug ) );
		}

		unset( self::$registered_blocks[ $slug ] );
	}

	public function localize_scripts(){
		if( ! empty( self::$registered_blocks ) ){
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmGutenbergBlocks',
				[
					'blocks' => self::$registered_blocks
				]
			);
		}
	}

	public function load_scripts(){
		wp_register_script(
			self::SCRIPT_SLUG,
			JET_SM_URL . 'assets/js/admin/gutenberg/jet-sm-gb.js',
			$this->script_dependencies,
			JET_SM_VERSION,
			is_admin() ? false : true
		);

		wp_enqueue_script( self::SCRIPT_SLUG );
	}

	public function load_editor_scripts(){
		wp_register_style(
			self::SCRIPT_SLUG,
			JET_SM_URL . 'assets/css/admin/gutenberg.css',
			[],
			JET_SM_VERSION
		);

		wp_enqueue_style( self::SCRIPT_SLUG );
	}

	public function parse_args( $args = [] ){
		foreach ( $args as $key => $value ) {
			if( empty( $value ) ){
				unset( $args[ $key ] );
			}
		}

		if( $args[ 'icon' ] ){
			$args[ 'icon' ] = str_replace( 'dashicons-', '', $args[ 'icon' ] );
		}

		return $args;
	}

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}
