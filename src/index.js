const { render, useState } = wp.element; // wp.element is an abstration layer on top of React, which ships with WP 5.0+
import App from './components/App';

const targets = document.querySelectorAll('.rel-root');

Array.prototype.forEach.call(targets, target => {
    const id = target.dataset.id;
    const args = window.relSettings[id]; // Shortcode settings
    const globals = window.relGlobals; // Global plugin settings

    render(
        <App globals={globals} args={args} />, 
        target
    )
});