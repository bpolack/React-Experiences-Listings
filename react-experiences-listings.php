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
define( 'REL_APP_URL', plugin_dir_url( __FILE__ ) );
define( 'REL_APP_PATH', plugin_dir_path( __FILE__ ) . '/app' );
//define( 'REL_ASSET_MANIFEST', REL_APP_PATH . '/build/asset-manifest.json' );
define( 'REL_INCLUDES', plugin_dir_path( __FILE__ ) . '/includes' );

require_once( REL_INCLUDES . '/settings.php' );
require_once( REL_INCLUDES . '/enqueue.php' );
require_once( REL_INCLUDES . '/shortcodes.php' );

// Expose all ACF fields to the REST API
function hrv_acf_to_rest_api($response, $post, $request) {
    if (!function_exists('get_fields')) return $response;

    if (isset($post)) {
        $acf = get_fields($post->id);
        $response->data['rel_fields'] = $acf;
    }
    return $response;
}
add_filter('rest_prepare_post', 'hrv_acf_to_rest_api', 10, 3);
add_filter('rest_prepare_listing', 'hrv_acf_to_rest_api', 10, 3);