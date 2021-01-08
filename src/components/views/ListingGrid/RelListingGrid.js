const { Component } = wp.element;
import './RelListingGrid.css';

// Import Components
import RelListingGridItem from './RelListingGridItem/RelListingGridItem';

export class RelListingGrid extends Component {
    render() {
        return (
            <div className="rel-listings-grid">
                {this.props.listings.map((listing, index) => {
                    return (
                        <RelListingGridItem 
                            key={listing.key} 
                            listing={listing} 
                            globals={this.props.globals} 
                            toggleModal={this.props.toggleModal}
                        />
                    )
                })}
            </div>
        )
    }
}

export default RelListingGrid
