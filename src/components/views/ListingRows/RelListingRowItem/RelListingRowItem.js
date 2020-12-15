const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelListingRowItem.css';

export class RelListingRowItem extends Component {
    render() {

        // Destruct required props and globals
        const {listing} = this.props;
        const {addressField, regionColourField} = this.props.globals;

        // Get the Region dot colour if it exists
        let dotStyle = {
            backgroundColor: '#c7c7c7'
        }
        if ((typeof listing._embedded['wp:term'][2] !== 'undefined') && (listing._embedded['wp:term'][2].length > 0) && (typeof listing._embedded['wp:term'][2][0].rel_fields[regionColourField] !== 'undefined')) {
            dotStyle.backgroundColor = listing._embedded['wp:term'][2][0].rel_fields[regionColourField];
        }
        
        return (
            <div className="rel-listing-row-item">
                <div className="rel-listing-row-details">
                    <div className="rel-listing-row-dot-container">
                        <div className="rel-listing-row-dot" style={dotStyle} ></div>
                    </div>
                    <div className="rel-listing-row-text">
                        <h4>{entities.decode(listing.title.rendered)}</h4>
                        <p>{entities.decode(listing.rel_fields[addressField])}</p>
                    </div>
                    <div className="rel-listing-row-arrow-container">
                        <div className="rel-listing-row-arrow"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RelListingRowItem
