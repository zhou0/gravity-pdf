<?php

namespace GFPDF\Controller;

use GFPDF\Helper\Helper_Abstract_Controller;
use GFPDF\Helper\Helper_Data;

/**
 * @package     Gravity PDF
 * @copyright   Copyright (c) 2019, Blue Liquid Designs
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

/* Exit if accessed directly */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Controller_System_Report extends Helper_Abstract_Controller {

	/**
	 * Holds our Helper_Data object
	 * which we can autoload with any data needed
	 *
	 * @var \GFPDF\Helper\Helper_Data
	 *
	 * @since 4.0
	 */
	protected $data;

	/**
	 * Setup our class by injecting our dependancies
	 *
	 * @param $data
	 *
	 * @since 5.2.0
	 */
	public function __construct( $data ) {
		$this->data = $data;
	}

	/**
	 * Initialise our class defaults
	 *
	 * @since 5.2.0
	 *
	 * @return void
	 */
	public function init() {
		$this->add_filters();
	}

	/**
	 * Apply any filters needed for the settings page
	 *
	 * @since 5.2.0
	 *
	 * @return void
	 */
	public function add_filters() {
		add_filter( 'gform_system_report', [ $this, 'system_report' ] );
	}

	/**
	 * Include the add-on table in the PHP Server Environment system report.
	 *
	 * @since 5.2.0
	 *
	 * @param array $system_report
	 *
	 * @return array
	 */
	public function system_report( $system_report ) {

		if ( isset( $system_report[2]['tables'][1]['items'] ) && is_array( $system_report[2]['tables'][1]['items'] ) ) {
			$insert_val[] = [
				'label'        => 'alow_url_fopen',
				'label_export' => 'alow_url_fopen',
				'value'        => $this->check_allow_url( $this->data ),
				'value_export' => $this->check_allow_url( $this->data ),
			];

			array_splice( $system_report[2]['tables'][1]['items'], 11, 0, $insert_val );
		}

		return $system_report;
	}

	/**
	 * Yes or No status for allow_url_fopen
	 *
	 * @param $data
	 *
	 * @return string
	 */
	protected function check_allow_url( $data ) {
		return isset( $data ) ? esc_html__( 'Yes', 'gravity-forms-pdf-extended' ) : esc_html__( 'No', 'gravity-forms-pdf-extended' );
	}
}