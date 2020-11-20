<?php
/**
 * @wordpress-plugin
 * Plugin Name:       React Experiences Listings
 * Plugin URI:        https://github.com/bpolack/React-Experiences-Listings
 * Description:       Load React based experience/business listings via this Wordpress Plugin. Uses the Wordpress REST API as a backend.
 * Version:           0.1.0
 * Author:            Braighton Polack
 */

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

// Define Backend Constants
define( 'REL_NAMESPACE', 'rel' );
define( 'REL_APP_PATH', plugin_dir_path( __FILE__ ) . '/app' );
define( 'REL_ASSET_MANIFEST', REL_APP_PATH . '/build/asset-manifest.json' );
define( 'REL_INCLUDES', plugin_dir_path( __FILE__ ) . '/includes' );

require_once( REL_INCLUDES . '/enqueue.php' );