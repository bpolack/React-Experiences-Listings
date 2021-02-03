const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelListingSingle.css';

export class RelListingSingle extends Component {

    renderRegion(listing, regionColourField) {

        // Get the Region name & colour if it exists
        let regionName = false;
        let dotStyle = {
            backgroundColor: '#c7c7c7'
        }
        if ((typeof listing._embedded['wp:term'][2] !== 'undefined') && (listing._embedded['wp:term'][2].length > 0)) {
            if (typeof listing._embedded['wp:term'][2][0].rel_fields[regionColourField] !== 'undefined') {
                dotStyle.backgroundColor = listing._embedded['wp:term'][2][0].rel_fields[regionColourField];
            }
            regionName = entities.decode(listing._embedded['wp:term'][2][0].name);
        }

        if (regionName) {
            return (
                <div className="rel-single-region-container">
                    <div className="rel-single-region-dot" style={dotStyle} ></div>
                    <div className="rel-single-region">{regionName}</div>
                </div>
            )
        }
    }

    renderAddress(listing, addressField, mapField) {

        if (listing.rel_fields[addressField] != false && listing.rel_fields[mapField] != false) {
            
            const mapsLink = "http://maps.google.com/maps?q=" + listing.rel_fields[mapField].lat + "," + listing.rel_fields[mapField].lng;

            return (
                <div className="rel-single-field">
                    <div className="rel-single-region-dot empty"></div>
                    <div className="rel-single-address">
                        <a href={mapsLink} target="_blank">{entities.decode(listing.rel_fields[addressField])}</a>
                    </div>
                </div>
            )
        }
        else if (listing.rel_fields[addressField] != false) {
            return (
                <div className="rel-single-field">
                    <div className="rel-single-region-dot empty"></div>
                    <div className="rel-single-address">{entities.decode(listing.rel_fields[addressField])}</div>
                </div>
            )
        }
    }
    renderPhone(listing, phoneField) {

        if (listing.rel_fields[phoneField] != false) {
            return (
                <div className="rel-single-field">
                    <div className="rel-single-region-dot empty"></div>
                    <div className="rel-single-phone">{entities.decode(listing.rel_fields[phoneField])}</div>
                </div>
            )
        }
    }
    renderWebsite(listing, websiteField) {

        if (listing.rel_fields[websiteField] != false) {
            return (
                <div className="rel-single-field">
                    <div className="rel-single-region-dot empty"></div>
                    <div className="rel-single-website">
                        <a href={listing.rel_fields[websiteField]} target="_blank">{listing.rel_fields[websiteField]}</a>
                    </div>
                </div>
            )
        }
    }

    renderLogo(listing, logoField) {
        if (typeof listing.rel_fields[logoField] !== 'undefined' && listing.rel_fields[logoField] != false) {
            return (
                <div className="rel-single-logo">
                    <img src={listing.rel_fields[logoField]} />
                </div>
            )
        }
    }

    render() {

        // Destruct required props and globals
        const listing = this.props.singleListing;
        const {phoneField, addressField, logoField, mapField, websiteField, regionColourField, placeholderImage} = this.props.globals;

        if (listing) {
            // Check for a featured image if it exists
            let thumbSrc = placeholderImage;
            let thumbAlt = '';
            if (listing._embedded['wp:featuredmedia']) {
                thumbSrc = listing._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
                thumbAlt = listing._embedded['wp:featuredmedia'][0].alt_text;
            }

            return (
                <div className="rel-listings-single">
                    <div className="rel-single-image">
                        <img src={thumbSrc} alt={thumbAlt} />
                        {this.renderLogo(listing, logoField)}
                    </div>
                    <div className="rel-single-details">
                        <div className="rel-single-text">
                            <h4>{entities.decode(listing.title.rendered)}</h4>
                            <div className="rel-single-content" 
                                dangerouslySetInnerHTML={{ __html: entities.decode(listing.content.rendered) }} >
                            </div>
                        </div>
                        {this.renderRegion(listing, regionColourField)}
                        <div className="rel-single-field-container">
                            {this.renderAddress(listing, addressField, mapField)}
                            {this.renderPhone(listing, phoneField)}
                            {this.renderWebsite(listing, websiteField)}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="rel-listings-single"></div>
            )
        }
        
    }
}

export default RelListingSingle
