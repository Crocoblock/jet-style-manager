<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class JET_SM_Gutenberg_Integration {
	/**
	 * Instance.
	 *
	 * Holds the class instance.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @var Plugin
	 */
	public static $instance = null;

	/**
	 * JET_SM\Gutenberg\Block_Manager instance.
	 */
	private $block_manager = null;

	/**
	 * Class constructor.
	 */
	public function __construct(){
		if( class_exists( 'JET_SM\Gutenberg\Block_Manager' ) && class_exists( 'JET_SM\Gutenberg\Block_Manager' ) ){
			$this->set_style_manager_instance();
		}
	}

	/**
	 * Set style manager class instance
	 *
	 * @return object
	 */
	public function  set_style_manager_instance(){
		$this->block_manager = JET_SM\Gutenberg\Block_Manager::get_instance();
	}

	/**
	 * Set style manager class instance
	 *
	 * @return object
	 */
	public function register_style_for_block( $name ){
		return new JET_SM\Gutenberg\Controls_Manager( $name );
	}

	/**
	 * Set style manager class instance
	 *
	 * @return object
	 */
	public function register_block( $name = null, $args = [] ){
		return $this->block_manager->register_block( $name, $args );
	}

	/**
	 * Get Instance.
	 *
	 * Ensures only one instance of the class is loaded or can be loaded.
	 *
	 * @since 1.1.4
	 * @access public
	 * @static
	 *
	 * @return Plugin An instance of the class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

function jet_sm_register_style_for_block( $name = false ){

	if( ! $name ){

		echo 'Not $name parameter in function "jet_sm_register_style_for_block"';

		return;
	}

	return JET_SM_Gutenberg_Integration::get_instance()->register_style_for_block( $name );
}

function jet_sm_register_block( $name = null, $args = [] ){

	if( ! $name ){

		echo 'Not $name parameter in function "jet_sm_register_block"';

		return;
	}

	return JET_SM_Gutenberg_Integration::get_instance()->register_block( $name, $args );
}
