const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
import './RelViews.css';

// Import Components
import RelViewButton from './RelViewButton/RelViewButton';

export class RelViews extends Component {
    render() {
        return (
            <div className="rel-header-item">
                <div className="rel-header-views">
                    <RelViewButton key={uuidv4()} view="grid" currentView={this.props.currentView} changeView={this.props.changeView} />
                    <RelViewButton key={uuidv4()} view="list" currentView={this.props.currentView} changeView={this.props.changeView} />
                    <RelViewButton key={uuidv4()} view="map" currentView={this.props.currentView} changeView={this.props.changeView} />
                </div>
            </div>
        )
    }
}

export default RelViews
