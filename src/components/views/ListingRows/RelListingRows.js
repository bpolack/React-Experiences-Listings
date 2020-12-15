const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
import './RelListingRows.css';

// Import Components
import RelListingRowItem from './RelListingRowItem/RelListingRowItem';

export class RelListingRows extends Component {
    render() {
        return (
            <div className="rel-listings-rows">
                {this.props.listings.map((listing, index) => {
                    return (
                        <RelListingRowItem key={uuidv4()} listing={listing} globals={this.props.globals} />
                    )
                })}
            </div>
        )
    }
}

export default RelListingRows
