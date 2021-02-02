<?php
namespace JET_SM;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Main file
 */
class Plugin {

	/**
	 * Instance.
	 *
	 * Holds the plugin instance.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @var Plugin
	 */
	public static $instance = null;

	public $db;
	public $styles_handler;
	public $compatibility;
	public $skins;

	/**
	 * Plugin constructor.
	 */
	private function __construct() {

		$this->register_autoloader();
		$this->load_files();

		add_action( 'init', array( $this, 'init_components' ), 20 );
	}

	/**
	 * Instance.
	 *
	 * Ensures only one instance of the plugin class is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @return Plugin An instance of the class.
	 */
	public static function instance() {

		if ( is_null( self::$instance ) ) {

			self::$instance = new self();

		}

		return self::$instance;

	}

	/**
	 * Register autoloader.
	 */
	private function register_autoloader() {
		require JET_SM_PATH . 'includes/autoloader.php';
		Autoloader::run();
	}

	/**
	 * Initialize plugin parts
	 *
	 * @return void
	 */
	public function init_components() {
		$this->db            = new DB();
		$this->css_stack     = new Elementor\CSS_Stack();
		$this->compatibility = new Compatibility();
		$this->skins         = new Elementor\Skins();
	}

	/**
	 * Load required files.
	 *
	 * @return void
	 */
	public function load_files() {
		require JET_SM_PATH . 'includes/gutenberg/jet-sm-gutenberg-integration.php';
	}

}
