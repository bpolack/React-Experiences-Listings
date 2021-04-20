const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import {getTaxonomyTerms} from '../../../../helpers/apiHelpers';
import './RelListingRowItem.css';

// Import Components
import RelListingFlag from '../../../elements/RelListingFlag/RelListingFlag';

export class RelListingRowItem extends Component {

    renderFlags(listing, flagName, flagHiddenField) {
        if (flagName) {
            const flags = getTaxonomyTerms( flagName, listing );
            if (flags) {
                return (
                    <div className="rel-row-flags">
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
        const {addressField, flagName, flagHiddenField, regionColourField} = this.props.globals;

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
            <div className="rel-listing-row-item" onClick={(e) => this.props.toggleModal(e, false, listing)}>
                <div className="rel-listing-row-details">
                    <div className="rel-listing-row-dot-container">
                        <div className="rel-listing-row-dot" style={dotStyle} ></div>
                    </div>
                    <div className="rel-listing-row-text">
                        <h4>{entities.decode(listing.title.rendered)}</h4>
                        {this.renderFlags(listing, flagName, flagHiddenField)}
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
