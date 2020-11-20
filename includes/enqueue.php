<?php
// Enqueues the required scripts and styles for the plugin

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

add_action( 'init', function() {

    add_filter( 'script_loader_tag', function( $tag, $handle ) {
        if ( ! preg_match( '/^rel-/', $handle ) ) { return $tag; }
        return str_replace( ' src', ' async defer src', $tag );
    }, 10, 2 );
  
    add_action( 'wp_enqueue_scripts', function() {
        $asset_manifest = json_decode( file_get_contents( REL_ASSET_MANIFEST ), true )['files'];

        if ( isset( $asset_manifest[ 'main.css' ] ) ) {
            wp_enqueue_style( REL_NAMESPACE, get_site_url() . $asset_manifest[ 'main.css' ] );
        }

        wp_enqueue_script( REL_NAMESPACE.'-runtime', get_site_url() . $asset_manifest[ 'runtime~main.js' ], array(), null, true );

        wp_enqueue_script( REL_NAMESPACE.'-main', get_site_url() . $asset_manifest[ 'main.js' ], array(REL_NAMESPACE.'-runtime'), null, true );

        foreach ( $asset_manifest as $key => $value ) {
            if ( preg_match( '@static/js/(.*)\.chunk\.js@', $key, $matches ) ) {
                if ( $matches && is_array( $matches ) && count( $matches ) === 2 ) {
                    $name = REL_NAMESPACE."-" . preg_replace( '/[^A-Za-z0-9_]/', '-', $matches[1] );
                    wp_enqueue_script( $name, get_site_url() . $value, array( REL_NAMESPACE.'-main' ), null, true );
                }
            }

            if ( preg_match( '@static/css/(.*)\.chunk\.css@', $key, $matches ) ) {
                if ( $matches && is_array( $matches ) && count( $matches ) == 2 ) {
                    $name = REL_NAMESPACE."-" . preg_replace( '/[^A-Za-z0-9_]/', '-', $matches[1] );
                    wp_enqueue_style( $name, get_site_url() . $value, array( REL_NAMESPACE ), null );
                }
            }
        }
    });
});