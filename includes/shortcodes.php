<?php
// This file enqueues plugin shortcode

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );


function create_rel_app( $atts ) {
    $default_atts = array( 
        'view' => 'grid',
        'results' => '3',
        'perpage' => '12'
    );
    $args = shortcode_atts( $default_atts, $atts );
    $sc_id = uniqid('rel');

    ob_start();
    ?>

    <script>
        window.relSettings = window.relSettings || {};
        window.relSettings["<?php echo $sc_id; ?>"] = {
            "view": "<?php echo $args["view"]; ?>",
            "results": "<?php echo $args["results"]; ?>",
            "perpage": "<?php echo $args["perpage"]; ?>"
        }
    </script>
    <div class="rel-root" data-id="<?php echo $sc_id; ?>"></div>

    <?php
    return ob_get_clean();
}
add_shortcode( 'react_experiences', 'create_rel_app');