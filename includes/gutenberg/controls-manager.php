<?php

namespace JET_SM\Gutenberg;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Controls_Manager {

	public $block_slug = null;

	public $style_manager_instant = null;

	private $wrapper_type = null;

	public static $fonts = [];

	private $wrapper = [
		'section' => null,
		'tabs'    => null,
		'tab'     => null,
	];

	private $_section_id = 'default';

	public function __construct( $block_slug = null ) {
		$this->block_slug            = $block_slug;
		$this->style_manager_instant = Style_Manager::get_instance();
		$this->add_extra_attrs();

		Controls_Stack::get_instance();
	}

	private function add_extra_attrs() {
		Controls_Stack::get_instance()->add_extra_attrs(
			$this->block_slug,
			array(
				'id'   => 'extra_args',
				'type' => 'extra-atributes',
			)
		);
	}

	public function add_control( $args = [], $control_stack_name = 'style_controls' ) {
		$wrapper = $this->wrapper[ end( $this->wrapper_type ) ];

		if ( isset( $wrapper['controlStack'] ) ) {
			$control_stack_name = $wrapper['controlStack'];
		}

		Controls_Stack::get_instance()->add_control(
			$this->block_slug,
			$args,
			$control_stack_name
		);
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
		do_action( "jet-sm/controls/" . $this->block_slug . "/${id}/before_start", $this );

		$this->start_wrapper( $control_stack, $args, 'section' );

		do_action( "jet-sm/controls/" . $this->block_slug . "/${id}/after_start", $this );
	}

	public function end_section() {
		$id = $this->_get_section_id();
		do_action( "jet-sm/controls/" . $this->block_slug . "/${id}/before_end", $this );

		$this->end_wrapper( 'section' );

		$action = "jet-sm/controls/" . $this->block_slug . "/${id}/after_end";

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
			$args['breakpoints'] = Controls_Stack::get_instance()->get_breakpoints();
		}

		$this->add_control( $args, $control_stack_name );
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