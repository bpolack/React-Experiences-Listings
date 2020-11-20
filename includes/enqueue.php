<?php
// Enqueues the required scripts and styles for the plugin

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

// Enqueue Theme JS w React Dependency
function rel_enqueue_plugin_js() {
    wp_enqueue_script(
        'rel-plugin-frontend',
        plugin_dir_url() . 'build/index.js',
        ['wp-element'],
        time(), // Change this to null for production
        true
    );
}
add_action( 'wp_enqueue_scripts', 'rel_enqueue_plugin_js' );