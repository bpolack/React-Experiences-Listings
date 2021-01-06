const { Component } = wp.element;
import './RelFooter.css';

export class RelFooter extends Component {

    renderLoadMore() {
        if (this.props.currentView === 'grid' || this.props.currentView === 'list') {
            
            if (this.props.page < this.props.totalPages) {
                return (
                    <button className="rel-load-more-button" onClick={() => this.props.loadMore()}>
                        Load More
                    </button>
                )
            }
            else {
                return (
                    <div className="rel-end-of-posts" >
                        end of listings - try exploring a new category!
                    </div>
                )
            }
            
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
