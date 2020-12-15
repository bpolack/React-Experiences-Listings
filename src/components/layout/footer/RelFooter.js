const { Component } = wp.element;
import './RelFooter.css';

export class RelFooter extends Component {
    render() {
        return (
            <div className="rel-footer">
                <button className="rel-load-more-button" onClick={() => this.props.loadMore()}>
                    Load More
                </button>
            </div>
        )
    }
}

export default RelFooter
