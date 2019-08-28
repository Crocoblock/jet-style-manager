<?php
namespace JET_SM;

/**
 * Database manager class
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define DB class
 */
class DB {

	/**
	 * Check if booking DB table already exists
	 *
	 * @var bool
	 */
	private $table_exists = null;

	/**
	 * Stores latest queried result to use it
	 *
	 * @var null
	 */
	public $latest_result = null;

	/**
	 * Constructor for the class
	 */
	public function __construct() {

		if ( ! empty( $_GET['jet_sm_install_table'] ) ) {
			$this->install_table();
		}

	}

	/**
	 * Check if booking table alredy exists
	 *
	 * @return boolean [description]
	 */
	public function is_table_exists() {

		if ( null !== $this->table_exists ) {
			return $this->table_exists;
		}

		$table = self::table();

		if ( $table === self::wpdb()->get_var( "SHOW TABLES LIKE '$table'" ) ) {
			$this->table_exists = true;
		} else {
			$this->table_exists = false;
		}

		return $this->table_exists;
	}

	/**
	 * Try to recreate DB table by request
	 *
	 * @return void
	 */
	public function install_table() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		self::create_db_table();

	}

	/**
	 * Returns WPDB instance
	 * @return [type] [description]
	 */
	public static function wpdb() {
		global $wpdb;
		return $wpdb;
	}

	/**
	 * Returns table name
	 * @return [type] [description]
	 */
	public static function table() {
		return self::wpdb()->prefix . 'jet_widgets_styles';
	}

	/**
	 * Insert item
	 *
	 * @param  array  $item
	 * @return [type]          [description]
	 */
	public function update_row( $item = array(), $where = array() ) {

		if ( empty( $where ) ) {
			self::wpdb()->insert(
				self::table(),
				$item,
				array( '%d', '%d', '%s', '%s', '%s', '%s', '%s' )
			);
		} else {

			$this->delete_row( $where );

			self::wpdb()->insert(
				self::table(),
				$item,
				array( '%d', '%d', '%s', '%s', '%s', '%s', '%s' )
			);

		}

	}

	/**
	 * Delete booking by passed parameters
	 *
	 * @param  [type] $where [description]
	 * @return [type]        [description]
	 */
	public function delete_row( $where = array() ) {

		$table = self::table();

		$where_string = '';
		$glue         = '';

		foreach ( $where as $key => $value ) {

			$operator = '=';

			if ( 'visible_on' === $key ) {
				$operator = '<=';
			}

			if ( ! is_int( $value ) ) {
				$value = sprintf( '\'%s\'', $value );
			}

			$where_string .= $glue . '`' . $key . '` ' . $operator . ' ' . $value;
			$glue = ' AND ';
		}

		self::wpdb()->query( "DELETE FROM $table WHERE $where_string;" );

	}

	/**
	 * Create database table for tracked information
	 *
	 * @return void
	 */
	public static function create_db_table() {

		if ( ! function_exists( 'dbDelta' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		}

		$charset_collate = self::wpdb()->get_charset_collate();
		$table           = self::table();

		$sql = "CREATE TABLE $table (
			ID bigint(20) NOT NULL AUTO_INCREMENT,
			visible_on bigint(20),
			post_id bigint(20),
			plugin text,
			widget text,
			skin text,
			styles longtext,
			fonts longtext,
			PRIMARY KEY (ID)
		) $charset_collate;";

		dbDelta( $sql );

	}

	/**
	 * Add nested query arguments
	 *
	 * @param  [type]  $key    [description]
	 * @param  [type]  $value  [description]
	 * @param  boolean $format [description]
	 * @return [type]          [description]
	 */
	public function get_sub_query( $key, $value, $format = false ) {

		$query = '';
		$glue  = '';

		if ( ! $format ) {

			if ( false !== strpos( $key, '!' ) ) {
				$format = '`%1$s` != \'%2$s\'';
				$key    = ltrim( $key, '!' );
			} else {
				$format = '`%1$s` = \'%2$s\'';
			}

		}

		foreach ( $value as $child ) {
			$query .= $glue;
			$query .= sprintf( $format, esc_sql( $key ), esc_sql( $child ) );
			$glue   = ' OR ';
		}

		return $query;

	}

	/**
	 * Add where arguments to query
	 *
	 * @param array  $args [description]
	 * @param string $rel  [description]
	 */
	public function add_where_args( $args = array(), $rel = 'AND', $plain = false ) {

		$query      = '';
		$multi_args = false;

		if ( ! empty( $args ) ) {

			if ( ! $plain ) {
				$query .= ' WHERE ';
			}

			$glue = '';

			if ( count( $args ) > 1 ) {
				$multi_args = true;
			}

			foreach ( $args as $key => $value ) {

				$format = '`%1$s` = \'%2$s\'';

				$query .= $glue;

				if ( false !== strpos( $key, '!' ) ) {
					$key    = ltrim( $key, '!' );
					$format = '`%1$s` != \'%2$s\'';
				} elseif ( false !== strpos( $key, '>' ) ) {
					$key    = rtrim( $key, '>' );
					$format = '`%1$s` > %2$d';
				} elseif ( false !== strpos( $key, '<' ) ) {
					$key    = rtrim( $key, '<' );
					$format = '`%1$s` < %2$d';
				}

				if ( is_array( $value ) ) {
					if ( is_numeric( $key ) ) {
						$query .= sprintf( '( %s )', $this->add_where_args( $value, 'AND', true ) );
					} else {
						$query .= sprintf( '( %s )', $this->get_sub_query( $key, $value, $format ) );
					}
				} else {
					$query .= sprintf( $format, esc_sql( $key ), esc_sql( $value ) );
				}

				$glue = ' ' . $rel . ' ';

			}

		}

		return $query;

	}

	/**
	 * Add order arguments to query
	 *
	 * @param array $args [description]
	 */
	public function add_order_args( $order = array() ) {

		$query = '';

		if ( ! empty( $order['orderby'] ) ) {

			$orderby = $order['orderby'];
			$order   = ! empty( $order['order'] ) ? $order['order'] : 'desc';
			$order   = strtoupper( $order );
			$query  .= " ORDER BY $orderby $order";

		}

		return $query;

	}

	/**
	 * Query data from db table
	 *
	 * @return [type] [description]
	 */
	public function query( $args = array(), $limit = 0, $offset = 0, $order = array(), $rel = 'AND' ) {

		$table = self::table();

		if ( empty( $args['__select'] ) ) {
			$query = "SELECT * FROM $table";
		} else {
			$query = "SELECT " . $args['__select'] . " FROM $table";
			unset( $args['__select'] );
		}

		if ( ! $rel ) {
			$rel = 'AND';
		}

		$query .= $this->add_where_args( $args, $rel );
		$query .= $this->add_order_args( $order );

		if ( intval( $limit ) > 0 ) {
			$limit  = absint( $limit );
			$offset = absint( $offset );
			$query .= " LIMIT $offset, $limit";
		}

		$raw = self::wpdb()->get_results( $query, ARRAY_A );

		return $raw;
	}

}
