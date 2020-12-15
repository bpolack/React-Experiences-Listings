const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
import './ListingGrid.css';

// Import Components
import ListingGridItem from './ListingGridItem/ListingGridItem';

export class RelListingGrid extends Component {
    render() {
        return (
            <div className="rel-listings-grid">
                {this.props.listings.map((listing, index) => {
                    return (
                        <ListingGridItem key={uuidv4()} listing={listing} globals={this.props.globals} />
                    )
                })}
            </div>
        )
    }
}

export default RelListingGrid
