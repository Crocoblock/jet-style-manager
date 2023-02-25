<?php


namespace JET_SM\Gutenberg;


class Controls_Stack {

	const SCRIPT_SLUG = 'jet-sm-gb';

	private static $instance = null;

	private $style_controls = array();
	private $controls       = array();
	private $fonts          = array();
	private $breakpoints    = array();

	private function __construct() {
		$this->init_font_manager();
		$this->set_breakpoints();

		add_action( 'wp_enqueue_scripts', [ $this, 'set_block_controls' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'set_block_controls' ] );
		add_filter( 'register_block_type_args', [ $this, 'add_block_attributes' ], 10, 2 );
	}

	public function add_extra_attrs( string $block_slug, array $attrs ) {
		if ( ! isset( $this->style_controls[ $block_slug ] ) ) {
			$this->style_controls[ $block_slug ] = array();
		}
		if ( ! isset( $this->controls[ $block_slug ] ) ) {
			$this->controls[ $block_slug ] = array();
		}

		$this->style_controls[ $block_slug ][] = $attrs;
		$this->controls[ $block_slug ][]       = $attrs;
	}

	public function init_font_manager() {
		if ( ! is_admin() ) {
			return;
		}

		$manager = new Fonts_Manager( [ 'path' => JET_SM_PATH ] );

		$this->fonts = array_merge(
			$manager->get_fonts(),
			$manager->get_fonts( 'google' )
		);
	}

	public function add_block_attributes( $args, $name ) {
		if (
			! empty( $args['attributes']['blockID'] ) ||
			! isset( $this->controls[ $name ] )
		) {
			return $args;
		}


		$style_controls = $this->style_controls[ $name ] ?? array();
		$controls       = $this->controls[ $name ] ?? array();

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

		return $args;
	}

	private function get_attributes_id( $controls_stack = [] ): array {

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

	public function set_block_controls() {
		$style_controls = $this->parse_blocks_stack( $this->style_controls );
		$controls       = $this->parse_blocks_stack( $this->controls );

		if ( ! empty( $controls ) ) {
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmBlockControl',
				$controls
			);
		}
		if ( ! empty( $style_controls ) ) {
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmBlockStyleControl',
				$style_controls
			);
		}
		if ( ! empty( $this->fonts ) ) {
			wp_localize_script(
				self::SCRIPT_SLUG,
				'jetSmFonts',
				$this->fonts
			);
		}
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

	public function parse_blocks_stack( $blocks_stack ) {
		if ( empty( $blocks_stack ) ) {
			return [];
		}

		foreach ( $blocks_stack as $block_slug => $controls ) {
			$blocks_stack[ $block_slug ] = $this->parse_controll_stack( $controls );
		}

		return $blocks_stack;
	}

	private function parse_controll_stack( $controls_stack ) {

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

	public function add_control(
		string $block_slug,
		array $args,
		string $store = 'style_controls'
	) {
		if ( empty( $args['id'] ) ) {
			esc_html_e( 'Property "id" is empty in type ' . $args['type'], 'jet-styles-manager' );
		}

		if ( empty( $args['type'] ) ) {
			esc_html_e( 'Property "type" is empty in ' . $args['id'], 'jet-styles-manager' );
		}

		switch ( $store ) {
			case 'style_controls':
				if ( ! isset( $this->style_controls[ $block_slug ] ) ) {
					$this->style_controls[ $block_slug ] = [];
				}

				$this->style_controls[ $block_slug ][] = $args;
				break;
			case 'controls':
				if ( ! isset( $this->controls[ $block_slug ] ) ) {
					$this->controls[ $block_slug ] = [];
				}

				$this->controls[ $block_slug ][] = $args;
				break;
		}
	}

	public function has_controls( string $block_slug ): bool {
		return (
			array_key_exists( $block_slug, $this->controls ) ||
			array_key_exists( $block_slug, $this->style_controls )
		);
	}

	/**
	 * @return array
	 */
	public function get_breakpoints(): array {
		return $this->breakpoints;
	}

	private function setDeepValue( &$array, $keys, $value ) {
		$keys    = explode( ".", $keys );
		$current = &$array;

		foreach ( $keys as $key ) {
			$current = &$current[ $key ];
		}

		$current = $value;
	}

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

}