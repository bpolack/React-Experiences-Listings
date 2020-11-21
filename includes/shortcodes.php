<?php
// This file enqueues plugin shortcode

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );


function create_rel_app( $atts ) {

    wp_enqueue_script('rel-plugin-frontend');
    wp_enqueue_style('rel-plugin-style');

    $default_atts = array( 
        'view' => 'grid',
        'results' => '3',
        'perpage' => '12'
    );
    $args = shortcode_atts( $default_atts, $atts );
    $sc_id = uniqid('rel');

    $globals = get_option( 'rel_plugin_options' );

    ob_start();
    ?>

    <script>
        window.relGlobals = window.relGlobals || {};
        window.relGlobals = {
            "apiLocation": "<?php echo $globals["api_loc"]; ?>",
            "postType": "<?php echo $globals["post_type"]; ?>",
            "categoryName": "<?php echo $globals["category"]; ?>",
            "phoneField": "<?php echo $globals["phone"]; ?>",
            "websiteField": "<?php echo $globals["website"]; ?>",
            "regionField": "<?php echo $globals["region"]; ?>",
            "addressField": "<?php echo $globals["address"]; ?>",
            "mapField": "<?php echo $globals["map_pin"]; ?>"
        };
        window.relSettings = window.relSettings || {};
        window.relSettings["<?php echo $sc_id; ?>"] = {
            "view": "<?php echo $args["view"]; ?>",
            "results": "<?php echo $args["results"]; ?>",
            "perpage": "<?php echo $args["perpage"]; ?>"
        };
    </script>
    <div class="rel-root" data-id="<?php echo $sc_id; ?>"></div>

    <?php
    return ob_get_clean();
}
add_shortcode( 'react_experiences', 'create_rel_app');