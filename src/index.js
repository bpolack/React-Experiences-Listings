const { render, useState } = wp.element; // wp.element is an abstration layer on top of React, which ships with WP 5.0+
import App from './components/App';

const targets = document.querySelectorAll('.rel-root');

Array.prototype.forEach.call(targets, target => {
    const id = target.dataset.id;
    let args = window.relSettings[id]; // Shortcode settings
    let globals = window.relGlobals; // Global plugin settings

    // For dev use
    if (!args) {
        args = {
            "view": "grid",
            "results": "3",
            "perpage": "12"
        }
    }
    if (!globals) {
        globals = {
            "apiLocation": "http://harrison.infinus.technology/wp-json/wp/v2/",
            "postType": "listing",
            "categoryName": "listing_category",
            "phoneField": "phone",
            "websiteField": "website",
            "regionField": "region",
            "addressField": "address",
            "mapField": "location",
        }
    }

    render(
        <App globals={globals} args={args} />, 
        target
    )
});