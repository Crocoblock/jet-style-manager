<?php
	namespace JET_SM\Gutenberg;

	if ( ! defined( 'ABSPATH' ) ) {
		exit; // Exit if accessed directly.
	}

	class Fonts_Manager {

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
		 * Module arguments
		 *
		 * @var array
		 */
		public $args = array();

		/**
		 * Module directory URI.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @var array.
		 */
		protected $fonts = [];

		public function __construct( $args = [ 'path' => '' ] ) {
			$this->args = $args;
			$this->path = isset( $args['path'] ) ? $args['path'] : false;
		}

		/**
		 * Retrieve array with font-family (for select element).
		 *
		 * @since  1.0.0
		 * @param  string $type Font type.
		 * @return array
		 */
		public function get_fonts( $type = 'standart' ) {
			return $this->prepare_fonts( $type );
		}

		/**
		 * Retrieve array with fonts file path.
		 *
		 * @since  1.0.0
		 * @return array
		 */
		public function get_fonts_data( $font_type ) {
			$fonts_sources = apply_filters( 'jet_style_manager/gutenberg/fonts_sources', array(
				'standart' => $this->path . 'assets/fonts/standard.json',
				'google'   => 'https://api.crocoblock.com/?action=get_google_fonts',
			), $this );

			return $fonts_sources[ $font_type ] ? $fonts_sources[ $font_type ] : false ;

		}

		/**
		 * Retrieve a set with `font-family` ( 'foo' => 'foo' ).
		 *
		 * @since  1.0.0
		 * @param  array $data All fonts data.
		 * @return array
		 */
		public function satizite_font_family( $data ) {
			$values = array_map( array( $this, '_build_values' ), $data );
			$keys = array_map( array( $this, '_build_keys' ), $data );

			$values = array_filter( $values );
			$keys   = array_filter( $keys );

			return array_combine( $keys, $values );
		}

		/**
		 * Function _build_keys.
		 *
		 * @since 1.0.0
		 */
		public function _build_keys( $item ) {

			if ( empty( $item['family'] ) ) {
				return false;
			}

			return sprintf( '%1$s, %2$s', $item['family'], $item['category'] );
		}

		/**
		 * Function _build_values.
		 *
		 * @since 1.0.0
		 */
		public function _build_values( $item ) {

			if ( empty( $item['family'] ) ) {
				return false;
			}

			return [
				'family'   => $item['family'],
				'category' => $item['category'],
				'variants' => $item['variants'],
				'subsets'  => $item['subsets'],
				'type'     => ( 'standartfonts#standartfonts' === $item['kind'] ) ? 'standart' : 'google' ,
			];
		}

		/**
		 * Prepare fonts.
		 *
		 * @since 1.0.0
		 */
		public function prepare_fonts( $font_type ) {
			$fonts_url = $this->get_fonts_data( $font_type );

			if( $fonts_url ) {
				$fonts = $this->read_font_file( $fonts_url );

				if ( is_array( $fonts ) ) {
					$this->fonts = $this->satizite_font_family( $fonts );
				}
			}

			$this->fonts = apply_filters( 'jet_style_manager/gutenberg/fonts_list', $this->fonts, $this );

			return $this->fonts;
		}

		/**
		 * Retrieve a data from font's file.
		 *
		 * @since  1.0.0
		 * @param  string $file          File path.
		 * @return array        Fonts data.
		 */
		public function read_font_file( $url ) {
			if ( $this->file_exists( $url ) ) {
				$json = $this->get_file( $url );
			} elseif ( wp_http_validate_url( $url ) ){
				$json = $this->get_request( $url );
			}else{
				return false;
			}

			if ( ! $json ) {
				return new \WP_Error( 'reading_error', 'Error when reading file' );
			}

			$content = is_array( $json ) ? $json : json_decode( $json, true );

			return $content['items'];
		}

		/**
		 * @return array
		 */
		public function get_request( $url ){
			delete_transient('jet_sm_google_fonts');
			$response = get_transient( 'jet_sm_google_fonts' );

			if ( is_wp_error( $response ) ) {
				delete_transient( 'jet_sm_google_fonts' );
				$response = false;
			}
			
			if( ! $response ){
				$response = wp_remote_get( $url );

				set_transient(
					'jet_sm_google_fonts',
					$response,
					432000 //5 days
				);
			}
			
			if( ! is_wp_error( $response ) && isset( $response['body'] ) ){
				$json = $response['body'] ? json_decode( $response['body'], true ) : false ;
				$json = $json ? $json['data']['fonts'] : false ;
			}else{
				$fonts_url = $this->get_fonts_data( 'standart' );
				$json      = $this->get_file( $fonts_url );
			}

			return $json;
		}

		/**
		 * Safely checks exists file or not.
		 *
		 * @since  1.1.4
		 * @global object $wp_filesystem
		 * @param  string $file File path.
		 * @return bool
		 */
		public function file_exists( $file ) {
			return file_exists( $file );
		}

		/**
		 * Safely get file content.
		 *
		 * @since  1.1.4
		 * @global object $wp_filesystem
		 * @param  string $file File path.
		 * @return bool
		 */
		public function get_file( $file ) {

			if ( ! file_exists( $file ) ) {
				return false;
			}

			ob_start();

			include $file;

			return ob_get_clean();
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