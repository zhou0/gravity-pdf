<?php

namespace GFPDF\Api\V1\Pdf\Settings;

use GFPDF\Helper\Helper_Data;
use GFPDF\Helper\Helper_Abstract_Addon;
use GFPDF\Helper\Helper_Logger;
use GFPDF\Helper\Helper_Singleton;
use WP_UnitTestCase;
use WP_REST_Request;
use GPDFAPI;

/**
 * @package     Gravity PDF GravityPDF
 * @copyright   Copyright (c) 2018, Blue Liquid Designs
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.0
 */

/* Exit if accessed directly */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
    This file is part of Gravity PDF GravityPDF.

    Copyright (C) 2018, Blue Liquid Designs

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

/**
 * Class TestApiPdfSettings
 *
 * @package GFPDF\Tests\GravityPDF
 *
 * @group   REST-API
 */
class TestApiPdfSettings extends WP_UnitTestCase {

	/**
	 * @var Api_Pdf_Settings
	 * @since 5.2
	 */
	protected $class;

	/**
	 * @var string
	 *
	 * @since 5.2
	 */
	protected $template_font_location;

	/**
	 * @var string
	 *
	 * @since 5.2
	 */
	protected $tmp_test_file = 'public_tmp_directory_test.txt';

	/**
	 * @since 5.2
	 */
	public function setUp() {

		$this->template_font_location = plugin_dir_path(__FILE__) . 'tmp/gravityforms/fonts/';

		// $this->data  = GPDFAPI::get_data_class();
		$this->class = new Api_Pdf_Settings( GPDFAPI::get_log_class(), GPDFAPI::get_misc_class(), $this->template_font_location );
		$this->class->init();

		parent::setUp();
	}

	/**
	 * @since 5.2
	 */
	public function test_rest_api_license_endpoints() {
		$wp_rest_server = rest_get_server();
		do_action( 'rest_api_init' );

		$this->assertContains( 'gravity-pdf/v1', $wp_rest_server->get_namespaces() );
		$this->assertArrayHasKey( '/gravity-pdf/v1/pdf/settings', $wp_rest_server->get_routes() );
	}

	/**
	 * @since 5.2
	 */
	public function test_check_tmp_pdf_security() {
		
		/* Test unable to access directory */
		$response = $this->class->check_tmp_pdf_security();

		$this->assertSame( 401, $response->get_error_data( 'test_public_tmp_directory_access' )['status'] );

		/* Test successful access on directory */
		// $request  = $this->get_request( [ 'addon_name' => 'test', 'license' => '12345' ] );
		$response = $this->class->test_public_tmp_directory_access();
		$this->assertSame( 200, $response->get_error_data( 'test_public_tmp_directory_access' )['status'] );
	}


}
