const { Component } = wp.element;
import './RelHeader.css';

// Import Components
import RelCategories from './RelCategories';
import RelRegions from './RelRegions';

export class RelHeader extends Component {

    renderViewMenu() {
        switch (this.props.currentView) {
            case 'single':
                return;
            default:
                return (
                    <div className="rel-header-item">
                        <div className="rel-header-views">
                            <button className="rel-view-button" onClick={() => this.props.changeView('grid')}>
                                Grid
                            </button>
                            <button className="rel-view-button" onClick={() => this.props.changeView('rows')}>
                                Rows
                            </button>
                            <button className="rel-view-button" onClick={() => this.props.changeView('map')}>
                                Map
                            </button>
                        </div>
                    </div>
                )
        }
    }

    renderCategories() {
        switch (this.props.currentView) {
            case 'map':
                return;
            case 'single':
                return;
            default:
                return (
                    <div className="rel-header-filters">
                        <RelCategories categories={this.props.categories} currentCategory={this.props.currentCategory} changeCategory={this.props.changeCategory} />
                        <RelRegions regions={this.props.regions} currentRegion={this.props.currentRegion} changeRegion={this.props.changeRegion} />
                    </div>
                )
        }
    }

    render() {
        return (
            <div className="rel-header">
                {this.renderViewMenu()}
                {this.renderCategories()}
            </div>
        )
    }
}

export default RelHeader
