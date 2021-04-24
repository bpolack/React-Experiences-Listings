const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import {getTaxonomyTerms} from '../../../../helpers/apiHelpers';
import './RelListingGridItem.css';

// Import Components
import RelListingFlag from '../../../elements/RelListingFlag/RelListingFlag';

export class RelListingGridItem extends Component {

    renderLogo(listing, logoField) {
        if (typeof listing.rel_fields[logoField] !== 'undefined' && listing.rel_fields[logoField] != false) {
            return (
                <div className="rel-listing-logo">
                    <img width="90" height="90" src={listing.rel_fields[logoField]} />
                </div>
            )
        }
    }

    renderFlags(listing, flagName, flagHiddenField) {
        if (flagName) {
            const flags = getTaxonomyTerms( flagName, listing );
            if (flags) {
                return (
                    <div className="rel-grid-flags">
                        {flags.map((flag, index) => {
                            if (!flag.rel_fields[flagHiddenField]) {
                                return (
                                    <RelListingFlag flag={flag} description={false} tooltip={true} globals={this.props.globals} />
                                )
                            }
                        })}
                    </div>
                )
            }
        }
    }

    render() {

        // Destruct required props and globals
        const {listing} = this.props;
        const {addressField, logoField, flagName, flagHiddenField, regionColourField, placeholderImage} = this.props.globals;

        // Check for a featured image if it exists
        let thumbSrc = placeholderImage;
        let thumbAlt = '';
        try {
            thumbSrc = listing._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
            thumbAlt = listing._embedded['wp:featuredmedia'][0].alt_text;
        } catch (err) {
            // No Featured Media
        }

        // Get the Region dot colour if it exists
        let dotStyle = {
            backgroundColor: '#c7c7c7'
        }
        try {
            dotStyle.backgroundColor = listing._embedded['wp:term'][2][0].rel_fields[regionColourField];
        } catch (err) {
            // No region colour
        }
        
        return (
            <div className="rel-listing-grid-item" onClick={(e) => this.props.toggleModal(e, false, listing)}>
                <div className="rel-listing-image">
                    <img src={thumbSrc} width="400" height="260" alt={thumbAlt} />
                    {this.renderLogo(listing, logoField)}
                    {this.renderFlags(listing, flagName, flagHiddenField)}
                </div>
                <div className="rel-listing-grid-details">
                    <div className="rel-listing-grid-text">
                        <h4>{entities.decode(listing.title.rendered)}</h4>
                        <p>{entities.decode(listing.rel_fields[addressField])}</p>
                    </div>
                    <div className="rel-listing-grid-dot-container">
                        <div className="rel-listing-grid-dot" style={dotStyle} ></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RelListingGridItem
