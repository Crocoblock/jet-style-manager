<?php
namespace JET_SM;

/**
 * Skins manager class
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define Skins class
 */
class Skins {

	private $rendered_skins = array();

	/**
	 * Public function
	 */
	public function __construct() {

		$this->editor();

		add_action(
			'elementor/element/common/_section_attributes/before_section_end',
			array( $this, 'register_skin_control' )
		);

		add_action(
			'elementor/widget/before_render_content',
			array( $this, 'set_skin_class' )
		);

		add_action( 'elementor/editor/after_enqueue_scripts', array( $this, 'localize_skins' ) );

	}

	/**
	 * Print localized skins
	 *
	 * @return [type] [description]
	 */
	public function localize_skins() {
		$script = "var JetSMRenderedSkins = " . wp_json_encode( $this->rendered_skins ) . ';';
		printf( "<script type='text/javascript'>\n%s\n</script>\n", $script );
	}

	/**
	 * Set skin class if is set and add widget info to renderd skins
	 *
	 * @param [type] $widget [description]
	 */
	public function set_skin_class( $widget ) {

		$skin_data = $this->add_skin_to_rendered( $widget );

		if ( ! empty( $skin_data ) ) {
			$widget->add_render_attribute(
				'_wrapper',
				'class',
				array(
					$skin_data['class_name']
				)
			);
		}

	}

	/**
	 * Check if element has skin and add this skin to processed skins
	 *
	 * @param [type] $element [description]
	 */
	public function add_skin_to_rendered( $element ) {

		$skin = $element->get_settings( 'jet_sm_skin' );
		$data = array();

		if ( $skin ) {

			$data = array(
				'id'         => $element->get_id(),
				'skin'       => $skin,
				'widget'     => $element->get_name(),
				'class_name' => $this->get_skin_class_name( $skin, $element->get_name() )
			);

			$this->rendered_skins[] = $data;

			return $data;
		} else {
			return false;
		}

	}

	/**
	 * Returns all rendered skins
	 *
	 * @return [type] [description]
	 */
	public function get_rendered_skins() {
		return array_map( 'unserialize', array_unique( array_map( 'serialize', $this->rendered_skins ) ) );
	}

	/**
	 * Register hidden control for skin
	 *
	 * @return [type] [description]
	 */
	public function register_skin_control( $widget ) {

		$widget->add_control(
			'jet_sm_skin',
			array(
				'label'       => 'Skin',
				'type'        => \Elementor\Controls_Manager::HIDDEN,
				'render_type' => 'none',
			)
		);

	}

	/**
	 * Editor hooks
	 * @return [type] [description]
	 */
	public function editor() {
		add_action( 'elementor/editor/before_enqueue_scripts', array( $this, 'editor_assets' ) );
		add_action( 'wp_ajax_jet_sm_save_skin', array( $this, 'save_skin' ) );
		add_action( 'wp_ajax_jet_sm_delete_skin', array( $this, 'delete_skin' ) );
		add_action( 'wp_ajax_jet_sm_get_skins_for_widget', array( $this, 'get_skins_for_widget' ) );
		add_action( 'wp_ajax_jet_sm_apply_skin', array( $this, 'apply_skin' ) );
		add_action( 'wp_ajax_jet_sm_load_skins_css', array( $this, 'load_preview_skin_css' ) );
	}

	/**
	 * Load preview CSS
	 * @return [type] [description]
	 */
	public function load_preview_skin_css() {

		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array( 'message' => 'You don\'t have permissions to do this' ) );
		}

		$skins = $_REQUEST['skins'] ? json_decode( wp_unslash( $_REQUEST['skins'] ), true ) : array();
		$skins = array_map( function( $item ) {

			$whitelisted_item = array(
				'skin'   => $item['skin'],
				'widget' => $item['widget'],
			);

			return $whitelisted_item;

		}, $skins );

		$query_relation = 'OR';

		$render = new CSS_Render();

		ob_start();
		$render->render_styles( $skins, false, true, $query_relation );
		$render->enqueue_hidden_fonts( $skins, $query_relation );
		$css = ob_get_clean();
		$css = str_replace( '.elementor .elementor-inner', '#elementor.elementor .elementor-inner', $css );

		wp_send_json_success( array(
			'css' => $css,
		) );
	}

	/**
	 * Apply skin for selected widget
	 *
	 * @return [type] [description]
	 */
	public function apply_skin() {

		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array( 'message' => 'You don\'t have permissions to saving skins' ) );
		}

		$widget = $_REQUEST['widget'] ? esc_attr( $_REQUEST['widget'] ) : false;
		$skin   = $_REQUEST['name'] ? esc_attr( $_REQUEST['name'] ) : false;
		$render = new CSS_Render();

		ob_start();
		$render->render_styles( array( 'widget' => $widget, 'skin' => $skin ), null, true );
		$render->enqueue_hidden_fonts( array( 'widget' => $widget, 'skin' => $skin ) );
		\Elementor\Plugin::$instance->frontend->print_fonts_links();
		$css = ob_get_clean();
		$css = str_replace( '.elementor .elementor-inner', 'body #elementor.elementor .elementor-inner', $css );

		wp_send_json_success( array(
			'class_name' => $this->get_skin_class_name( $skin, $widget ),
			'css'        => $css,
		) );

	}

	public function get_skin_class_name( $skin, $widget ) {
		return 'elementor-element-' . $this->get_skin_id( $skin, $widget );
	}

	/**
	 * Returns available skins
	 *
	 * @return [type] [description]
	 */
	public function get_skins_for_widget() {

		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array( 'message' => 'You don\'t have permissions to saving skins' ) );
		}

		$widget = $_REQUEST['widget'] ? esc_attr( $_REQUEST['widget'] ) : false;

		if ( ! $widget ) {
			wp_send_json_error( array( 'message' => 'Widget type not found in request' ) );
		}

		$skins = Plugin::instance()->db->query( array(
			'__select' => 'DISTINCT skin',
			'widget'   => $widget,
		) );

		wp_send_json_success( array( 'skins' => $skins ) );

	}

	/**
	 * Delete skin
	 *
	 * @return [type] [description]
	 */
	public function delete_skin() {

		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array( 'message' => 'You don\'t have permissions to deleting skins' ) );
		}

		$widget = $_REQUEST['widget'] ? esc_attr( $_REQUEST['widget'] ) : false;
		$skin   = $_REQUEST['name'] ? esc_attr( $_REQUEST['name'] ) : false;

		Plugin::instance()->db->delete_row( array(
			'widget' => $widget,
			'skin'   => $skin,
		) );

		$this->get_skins_for_widget();

	}

	/**
	 * Save skin
	 *
	 * @return [type] [description]
	 */
	public function save_skin() {

		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array( 'message' => 'You don\'t have permissions to saving skins' ) );
		}

		$widget   = $_REQUEST['widget'] ? esc_attr( $_REQUEST['widget'] ) : false;
		$name     = $_REQUEST['name'] ? esc_attr( $_REQUEST['name'] ) : false;
		$settings = $_REQUEST['values'] ? json_decode( wp_unslash( $_REQUEST['values'] ), true ) : array();

		$element_type = \Elementor\Plugin::$instance->widgets_manager->get_widget_types( $widget );

		if ( ! $element_type ) {
			wp_send_json_error( array( 'message' => 'Can\'t find element' ) );
		}

		$element_class = $element_type->get_class_name();
		$element_class = '\\' . $element_class;

		try {
			$args         = array();
			$element_data = array(
				'id'         => $this->get_skin_id( $name, $widget ),
				'elType'     => 'widget',
				'settings'   => $settings,
				'elements'   => array(),
				'widgetType' => $widget
			);
			$element      = new $element_class( $element_data, $args );
		} catch ( \Exception $e ) {
			wp_send_json_error( array( 'message' => 'Can\'t create element instance' ) );
		}

		try {
			Plugin::instance()->css_stack->start_new_stack();
			Plugin::instance()->css_stack->process_element( null, $element );
			Plugin::instance()->css_stack->write_stack_to_db( null, $widget, $name );
		} catch ( \Exception $e ) {
			wp_send_json_error( array( 'message' => 'Can\'t write skin style into database' ) );
		}

		wp_send_json_success();
	}

	/**
	 * Get unique skin ID
	 *
	 * @param  [type] $name   [description]
	 * @param  [type] $widget [description]
	 * @return [type]         [description]
	 */
	public function get_skin_id( $name, $widget ) {
		return 'skin-' . substr( md5( $name . $widget ), 0, 12 );
	}

	/**
	 * Load editor assets
	 *
	 * @return [type] [description]
	 */
	public function editor_assets() {

		wp_enqueue_script(
			'jet-sm-editor',
			JET_SM_URL . 'assets/js/editor.js',
			array(),
			JET_SM_VERSION . time(),
			true
		);

		wp_enqueue_style(
			'jet-sm-editor',
			JET_SM_URL . 'assets/css/editor.css',
			array(),
			JET_SM_VERSION
		);
	}

}
