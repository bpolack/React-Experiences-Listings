const { Component } = wp.element;
import './RelFooter.css';

export class RelFooter extends Component {

    renderLoadMore() {
        if (this.props.currentView === 'grid' || this.props.currentView === 'list') {
            return (
                <button className="rel-load-more-button" onClick={() => this.props.loadMore()}>
                    Load More
                </button>
            )
        }
    }

    render() {
        return (
            <div className="rel-footer">
                {this.renderLoadMore()}
            </div>
        )
    }
}

export default RelFooter
