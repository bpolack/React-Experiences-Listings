<?php
// This file enqueues plugin shortcode

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );


function create_rel_app( $atts ) {

    wp_enqueue_script('rel-plugin-frontend');
    wp_enqueue_style('rel-plugin-style');

    $default_atts = array( 
        'view' => 'grid', //grid, list, or map
        'perpage' => '6',
        'order' => 'asc',
        'orderby' => '', // author, date, id, include, modified, parent, relevance, slug, include_slugs, title, menu_order
        'initial_category' => '0',
        'exclude_categories' => '10',
        'initial_region' => '',
        'exclude_regions' => '50,63,51,56,62',
        'initial_flag' => '',
        'single_listing' => '',
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
            "phoneField": "<?php echo $globals["phone"]; ?>",
            "websiteField": "<?php echo $globals["website"]; ?>",
            "addressField": "<?php echo $globals["address"]; ?>",
            "hoursField": "<?php echo $globals["hours"]; ?>",
            "logoField": "<?php echo $globals["logo"]; ?>",
            "mapField": "<?php echo $globals["map_pin"]; ?>",
            "categoryName": "<?php echo $globals["category"]; ?>",
            "flagName": "<?php echo $globals["flag"]; ?>",
            "flagHiddenField": "<?php echo $globals["flag_hidden"]; ?>",
            "flagIconField": "<?php echo $globals["flag_icon"]; ?>",
            "regionName": "<?php echo $globals["region"]; ?>",
            "regionColourField": "<?php echo $globals["region_colour"]; ?>",
            "placeholderImage": "<?php echo $globals["placeholder"]; ?>",
            "apiKey": "<?php echo $globals["apikey"]; ?>"
        };
        window.relSettings = window.relSettings || {};
        window.relSettings["<?php echo $sc_id; ?>"] = {
            "view": "<?php echo $args["view"]; ?>",
            "perpage": "<?php echo $args["perpage"]; ?>",
            "order": "<?php echo $args["order"]; ?>",
            "orderby": "<?php echo $args["orderby"]; ?>",
            "initialCategory": "<?php echo $args["initial_category"]; ?>",
            "excludeCategories": "<?php echo $args["exclude_categories"]; ?>",
            "initialRegion": "<?php echo $args["initial_region"]; ?>",
            "excludeRegions": "<?php echo $args["exclude_regions"]; ?>",
            "initialFlag": "<?php echo $args["initial_flag"]; ?>",
            "singleListing": "<?php echo $args["single_listing"]; ?>"
        };
    </script>
    <div class="rel-root" data-id="<?php echo $sc_id; ?>"></div>

    <?php
    return ob_get_clean();
}
add_shortcode( 'react_experiences', 'create_rel_app');