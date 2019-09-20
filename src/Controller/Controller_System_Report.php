<?php

namespace GFPDF\Controller;

use GFPDF\Helper\Helper_Abstract_Controller;

use Psr\Log\LoggerInterface;

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
	 * Holds our log class
	 *
	 * @var \Monolog\Logger|LoggerInterface
	 *
	 * @since 4.0
	 */
	protected $log;

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
	 * @param \Monolog\Logger|LoggerInterface $log Our logger class
	 *
	 * @since 4.0
	 */
	public function __construct( LoggerInterface $log ) {
		/* Assign our internal variables */
		$this->log  = $log;
		$this->data = (bool) ini_get( 'allow_url_fopen' );
	}

	/**
	 * Initialise our class defaults
	 *
	 * @since 4.0
	 *
	 * @return void
	 */
	public function init() {
		$this->add_filters();
	}

	/**
	 * inserted data below the MB String row in the PHP section
	 */
	public function add_filters() {
		add_filter( 'gform_system_report', function( $report ) {

			if ( isset( $report[2]['tables'][1]['items'] ) && is_array( $report[2]['tables'][1]['items'] ) ) {
				$insert_val[] = [
					'label'        => 'alow_url_fopen',
					'label_export' => 'alow_url_fopen',
					'value'        => $this->check_allow_url( $this->data ),
					'value_export' => $this->check_allow_url( $this->data ),
				];

				array_splice( $report[2]['tables'][1]['items'], 11, 0, $insert_val );
			}

			return $report;
		} );
	}

	/**
	 * Yes or No status for allow_url_fopen
	 *
	 * @param $data
	 *
	 * @return string
	 */
	private function check_allow_url( $data ) {
		return isset( $data ) ? 'Yes' : 'No';
	}
}