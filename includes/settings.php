<?php
// This file enqueues plugin shortcode

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

function rel_add_settings_page() {
    add_options_page( 'React Experience Listings', 'Experience Listings', 'manage_options', 'react-experiences-listings', 'rel_render_plugin_settings_page' );
}
add_action( 'admin_menu', 'rel_add_settings_page' );

function rel_render_plugin_settings_page() {
    ?>
    <h2>Listing Configurations</h2>
    <form action="options.php" method="post">
        <?php 
        settings_fields( 'rel_plugin_options' );
        do_settings_sections( 'react-experiences-listings' ); ?>
        <input name="submit" class="button button-primary" type="submit" value="<?php esc_attr_e( 'Save' ); ?>" />
    </form>
    <?php
}

function rel_register_settings() {
    register_setting( 'rel_plugin_options', 'rel_plugin_options', 'rel_plugin_options_validate' );
    add_settings_section( 'post_type_settings', 'Post Type Settings', 'rel_plugin_section_text', 'react-experiences-listings' );

    add_settings_field( 'rel_plugin_setting_post_type', 'Listing Post Type', 'rel_plugin_setting_post_type', 'react-experiences-listings', 'post_type_settings' );
    add_settings_field( 'rel_plugin_setting_category', 'Custom Taxonomy (optional)', 'rel_plugin_setting_category', 'react-experiences-listings', 'post_type_settings' );
    add_settings_field( 'rel_plugin_setting_phone', 'ACF Phone Field', 'rel_plugin_setting_phone', 'react-experiences-listings', 'post_type_settings' );
    add_settings_field( 'rel_plugin_setting_website', 'ACF Website Field', 'rel_plugin_setting_website', 'react-experiences-listings', 'post_type_settings' );
    add_settings_field( 'rel_plugin_setting_region', 'ACF Region Field', 'rel_plugin_setting_region', 'react-experiences-listings', 'post_type_settings' );
    add_settings_field( 'rel_plugin_setting_address', 'ACF Address Field', 'rel_plugin_setting_address', 'react-experiences-listings', 'post_type_settings' );
    add_settings_field( 'rel_plugin_setting_map_pin', 'ACF Map Field', 'rel_plugin_setting_map_pin', 'react-experiences-listings', 'post_type_settings' );
}
add_action( 'admin_init', 'rel_register_settings' );

function rel_plugin_section_text() {
    echo '<p>Listing post type and post field settings.</p>';
}

function rel_plugin_setting_post_type() {
    $options = get_option( 'rel_plugin_options' );
    echo "<input id='rel_plugin_setting_post_type' name='rel_plugin_options[post_type]' type='text' value='{esc_attr( $options['post_type'] )}' />";
}
function rel_plugin_setting_category() {
    $options = get_option( 'rel_plugin_options' );
    echo "<input id='rel_plugin_setting_category' name='rel_plugin_options[category]' type='text' value='{esc_attr( $options['category'] )}' />";
}
function rel_plugin_setting_phone() {
    $options = get_option( 'rel_plugin_options' );
    echo "<input id='rel_plugin_setting_phone' name='rel_plugin_options[phone]' type='text' value='{esc_attr( $options['phone'] )}' />";
}