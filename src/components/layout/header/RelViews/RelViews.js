const { Component } = wp.element;
import './RelViews.css';

// Import Components
import RelViewButton from './RelViewButton/RelViewButton';

export class RelViews extends Component {
    render() {
        return (
            <div className="rel-header-item">
                <div className="rel-header-views">
                    <RelViewButton view="grid" currentView={this.props.currentView} changeView={this.props.changeView} />
                    <RelViewButton view="list" currentView={this.props.currentView} changeView={this.props.changeView} />
                    <RelViewButton view="map" currentView={this.props.currentView} changeView={this.props.changeView} />
                </div>
            </div>
        )
    }
}

export default RelViews
