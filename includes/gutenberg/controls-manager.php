<?php

namespace JET_SM\Gutenberg;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Controls_Manager {

	private static $instance = null;

	const SCRIPT_SLUG = 'jet-sm-gb';

	public $block_slug = null;

	public $breakpoints = [];

	public $style_manager_instant = null;

	public static $controls = [];

	public static $style_controls = [];

	private $wrapper_type = null;

	public $fonts_manager = null;

	public static $fonts = [];

	private $wrapper = [
		'section' => null,
		'tabs'    => null,
		'tab'     => null,
	];

	private $_section_id = 'default';

	public function __construct( $block_slug = null ) {
		$this->block_slug = $block_slug;
		$this->fonts_manager = new Fonts_Manager( [ 'path' => JET_SM_PATH ] );
		$this->style_manager_instant = Style_Manager::get_instance();
		$this->init_font_manager();
		$this->add_extra_atributes();
		$this->set_breakpoints();

		add_action( 'wp_enqueue_scripts', [ $this, 'before_set_block_controls' ], 9 );
		add_action( 'wp_enqueue_scripts', [ $this, 'set_block_controls' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'before_set_block_controls' ], 9 );
		add_action( 'admin_enqueue_scripts', [ $this, 'set_block_controls' ] );
		add_filter( 'register_block_type_args', [ $this, 'add_block_attributes' ], 10, 2 );
	}

	public function init_font_manager(){
		if ( is_admin() && empty( self::$fonts ) ){
			self::$fonts = array_merge( $this->fonts_manager->get_fonts('standart'), $this->fonts_manager->get_fonts('google') );
		}
	}

	private function add_extra_atributes(){
		$extra_atributes = [
			'id'   => 'extra_args',
			'type' => 'extra-atributes',
		];

		self::$style_controls[ $this->block_slug ][] = $extra_atributes;
		self::$controls[ $this->block_slug ][]       = $extra_atributes;
	}

	public function add_block_attributes( $args, $name ) {
		if ( $name === $this->block_slug && empty( $args['attributes']['blockID'] ) ) {
			$style_controls = isset( self::$style_controls[ $this->block_slug ] ) ? self::$style_controls[ $this->block_slug ] : [];
			$controls       = isset( self::$controls[ $this->block_slug ] ) ? self::$controls[ $this->block_slug ] : [];

			$args['attributes']['blockID']           = [
				'type'    => 'string',
				'default' => '',
			];
			$args['attributes']['curentBreakpoints'] = [
				'type'    => 'string',
				'default' => 'desktop',
			];

			$args['attributes'] = array_merge(
				$args['attributes'],
				$this->get_attributes_id( $style_controls ),
				$this->get_attributes_id( $controls )
			);
		};

		return $args;
	}

	private function set_breakpoints() {
		$this->breakpoints = apply_filters(
			'jet_style_manager/gutenberg/breakpoints',
			[
				'mobile'        => [
					'label' => esc_html__( 'Mobile Landscape', 'jet-styles-manager' ),
					'icon'  => 'smartphone',
					//'className' => 'jet-rotate-icon',
					'max'   => 480,
				],
				'tablet'        => [
					'label' => esc_html__( 'Tablet', 'jet-styles-manager' ),
					'icon'  => 'tablet',
					'max'   => 1025,
				],
				'desktop'       => [
					'label' => esc_html__( 'Desktop', 'jet-styles-manager' ),
					'icon'  => 'laptop',
					'max'   => 1200,
				],
				'desktop_large' => [
					'label' => esc_html__( 'Desktop Large', 'jet-styles-manager' ),
					'icon'  => 'desktop',
					'min'   => 1201,
					'max'   => - 1,
				],
			]
		);
	}

	private function get_attributes_id( $controls_stack = [] ) {

		if ( ! is_array( $controls_stack ) || empty( $controls_stack ) ) {
			return [];
		}

		$attribute_ids = [];

		foreach ( $controls_stack as $value ) {
			$id                   = $value['id'];
			$attribute_ids[ $id ] = [
				'type' => 'object',
			];
		}

		return $attribute_ids;
	}

	public function add_control( $args = [], $control_stack_name = 'style_controls' ) {
		if ( empty( $args['id'] ) ) {
			esc_html_e( 'Property "id" is empty in type ' . $args['type'], 'jet-styles-manager' );
		}

		if ( empty( $args['type'] ) ) {
			esc_html_e( 'Property "type" is empty in ' . $args['id'], 'jet-styles-manager' );
		}

		$wrapper = $this->wrapper[ end( $this->wrapper_type ) ];

		if ( isset( $wrapper['controlStack'] ) ) {
			$control_stack_name = $wrapper['controlStack'];
		}

		if ( ! isset( self::$$control_stack_name[ $this->block_slug ] ) ) {
			self::$$control_stack_name[ $this->block_slug ] = [];
		}

		self::$$control_stack_name[ $this->block_slug ][] = $args;
	}

	public function start_wrapper( $control_stack_name, $args = [], $type = 'section' ) {
		$args['type']         = 'start-' . $type;
		$args['is_wrapper']   = 'srart_wrapper';
		$args['controlStack'] = $control_stack_name;

		$this->wrapper[ $type ] = $args;
		$this->wrapper_type[]   = $type;
		$this->add_control( $args, $control_stack_name );
	}

	public function end_wrapper( $type = 'section' ) {
		if ( null === $this->wrapper[ $type ] ) {
			return;
		}

		$args               = $this->wrapper[ $type ];
		$args['id']         .= '_end';
		$args['type']       = 'end-' . $type;
		$args['is_wrapper'] = 'end_wrapper';

		$this->add_control( $args, $args['controlStack'] );

		$this->wrapper[ $type ] = null;
		array_pop( $this->wrapper_type );
	}

	public function start_section( $control_stack = 'controls', $args = [] ) {
		$id = $this->_get_section_id( $args );
		do_action( "jet-sm/controls/". $this->block_slug ."/${id}/before_start", $this );

		$this->start_wrapper( $control_stack, $args, 'section' );

		do_action( "jet-sm/controls/". $this->block_slug ."/${id}/after_start", $this );
	}

	public function end_section() {
		$id = $this->_get_section_id();
		do_action( "jet-sm/controls/". $this->block_slug ."/${id}/before_end", $this );

		$this->end_wrapper( 'section' );

		$action = "jet-sm/controls/". $this->block_slug ."/${id}/after_end";

		$this->_clear_section_id();
		do_action( $action, $this );
	}

	public function start_tabs( $control_stack = 'controls', $args = [] ) {
		$this->start_wrapper( $control_stack, $args, 'tabs' );
	}

	public function end_tabs() {
		$this->end_wrapper( 'tabs' );
	}

	public function start_tab( $control_stack = 'controls', $args = [] ) {
		$this->start_wrapper( $control_stack, $args, 'tab' );
	}

	public function end_tab() {
		$this->end_wrapper( 'tab' );
	}

	public function add_responsive_control( $args = [], $control_stack_name = null ) {
		if ( empty( $args['breakpoints'] ) ) {
			$args['breakpoints'] = $this->breakpoints;
		}

		$this->add_control( $args, $control_stack_name );
	}

	public function before_set_block_controls() {
		self::$style_controls = $this->parse_blocks_stack( self::$style_controls );

		self::$controls = $this->parse_blocks_stack( self::$controls );
	}

	public function parse_blocks_stack( $blocks_stack ) {
		if ( empty( $blocks_stack ) ) {
			return [];
		}

		if ( isset( $blocks_stack[ $this->block_slug ] ) ) {
			$blocks_stack[ $this->block_slug ] = $this->parse_controll_stack( $blocks_stack[ $this->block_slug ] );
		}

		return $blocks_stack;
	}

	public function parse_controll_stack( $controls_stack ) {

		if ( empty( $controls_stack ) ) {
			return [];
		}

		$sort_controls_stack = [];
		$parent_wrapper      = [];

		foreach ( $controls_stack as $key => $args ) {

			if ( isset( $args['is_wrapper'] ) ) {
				switch ( $args['is_wrapper'] ) {
					case 'srart_wrapper':
						$parent_wrapper[ $args['id'] ] = $args['id'];

						$args['child'] = [];
						break;

					case 'end_wrapper':
						$end_wrapper_id = str_replace( '_end', '', $args['id'] );
						unset( $parent_wrapper[ $end_wrapper_id ] );
						break;
				}
			}

			if ( ! isset( $args['is_wrapper'] ) || 'end_wrapper' !== $args['is_wrapper'] ) {
				$deep_path = '';
				foreach ( $parent_wrapper as $key ) {
					if ( $key === $args['id'] ) {
						continue;
					}

					$deep_path .= $key . '.child.';
				}

				$deep_path .= $args['id'];

				$this->setDeepValue( $sort_controls_stack, $deep_path, $args );
			}
		}

		return $sort_controls_stack;
	}

	public function setDeepValue( &$array, $keys, $value ) {
		$keys    = explode( ".", $keys );
		$current = &$array;

		foreach ( $keys as $key ) {
			$current = &$current[ $key ];
		}

		$current = $value;
	}

	public function set_block_controls() {
		if ( ! empty( self::$controls ) ) {
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmBlockControl',
				self::$controls
			);
		}
		if ( ! empty( self::$style_controls ) ) {
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmBlockStyleControl',
				self::$style_controls
			);
		}
		if( ! empty( self::$fonts ) ){
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmFonts',
				self::$fonts
			);
		}
	}

	private function _save_section_id( $id ) {
		$this->_section_id = $id;
	}

	private function _get_section_id( $args = array() ) {
		if ( $args && isset( $args['id'] ) ) {
			$this->_save_section_id( $args['id'] );
		}

		return $this->_section_id;
	}

	private function _clear_section_id() {
		$this->_section_id = 'default';
	}
}