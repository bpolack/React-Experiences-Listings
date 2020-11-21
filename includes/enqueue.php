<?php
// Enqueues the required scripts and styles for the plugin

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

// Register Theme JS with React Dependency
function rel_enqueue_plugin_js() {
    wp_register_script(
        'rel-plugin-frontend',
        REL_APP_URL . 'build/index.js',
        ['wp-element'],
        time(), // Change this to null for production
        true
    );
    wp_register_style(
        'rel-plugin-style',
        REL_APP_URL . 'build/index.css',
        [],
        time() // Change this to null for production
    );
}
add_action( 'wp_enqueue_scripts', 'rel_enqueue_plugin_js' );