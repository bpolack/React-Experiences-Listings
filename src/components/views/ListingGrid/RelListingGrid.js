const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
import './RelListingGrid.css';

// Import Components
import RelListingGridItem from './RelListingGridItem/RelListingGridItem';

export class RelListingGrid extends Component {
    render() {
        return (
            <div className="rel-listings-grid">
                {this.props.listings.map((listing, index) => {
                    return (
                        <RelListingGridItem key={uuidv4()} listing={listing} globals={this.props.globals} />
                    )
                })}
            </div>
        )
    }
}

export default RelListingGrid
