const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './ListingGridItem.css';

export class ListingGridItem extends Component {
    render() {

        // Destruct required props and globals
        const {listing} = this.props;
        const {addressField, regionColourField, placeholderImage} = this.props.globals;

        // Check for a featured image if it exists
        let thumbSrc = placeholderImage;
        let thumbAlt = '';
        if (listing._embedded['wp:featuredmedia']) {
            thumbSrc = listing._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
            thumbAlt = listing._embedded['wp:featuredmedia'][0].alt_text;
        }

        // Get the Region dot colour if it exists
        let dotStyle = {
            backgroundColor: '#c7c7c7'
        }
        if ((typeof listing._embedded['wp:term'][2] !== 'undefined') && (listing._embedded['wp:term'][2].length > 0) && (typeof listing._embedded['wp:term'][2][0].rel_fields[regionColourField] !== 'undefined')) {
            dotStyle.backgroundColor = listing._embedded['wp:term'][2][0].rel_fields[regionColourField];
        }
        
        return (
            <div className="rel-listing-grid-item">
                <div className="rel-listing-image">
                    <img src={thumbSrc} alt={thumbAlt} />
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

export default ListingGridItem
