const { Component } = wp.element;
import {SlideDown} from 'react-slidedown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RelHeader.css';
import 'react-slidedown/lib/slidedown.css';

// Fontawesome Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Import Components
import RelViews from './RelViews/RelViews';
import RelCategories from './RelCategories/RelCategories';
import RelRegions from './RelRegions/RelRegions';

export class RelHeader extends Component {

    constructor(props) {
        super(props);

        // Set the initial state
        this.state = {
            filtersClosed: true
        };

        // Bind callback methods to class
        this.toggleFilterBar = this.toggleFilterBar.bind(this);
    }

    toggleFilterBar() {
        this.setState({
            filtersClosed: !this.state.filtersClosed
        })
    }

    renderFilterBar() {
        let classList = "rel-filter-bar ";
        if (!this.state.filtersClosed) {
            classList += "active";
        }

        return (
            <div className={classList} onClick={this.toggleFilterBar}>
                <span>Filters</span>
                <FontAwesomeIcon className="rel-filter-bar-icon" icon={faPlus} />
            </div>
        )
    }

    renderViewMenu() {
        switch (this.props.currentView) {
            case 'single':
                return;
            default:
                return (
                    <div className="rel-header-options">
                        <RelViews 
                            currentView={this.props.currentView}  
                            changeView={this.props.changeView} 
                        />
                    </div>
                )
        }
    }

    renderCategories() {
        switch (this.props.currentView) {
            case 'single':
                return;
            default:
                return (
                    <SlideDown className="rel-header-filters" closed={this.state.filtersClosed}>
                        <RelCategories 
                            categories={this.props.categories} 
                            currentCategory={this.props.currentCategory} 
                            changeCategory={this.props.changeCategory} 
                        />
                        <RelRegions 
                            regions={this.props.regions} 
                            currentRegion={this.props.currentRegion} 
                            changeRegion={this.props.changeRegion} 
                            regionColourField={this.props.regionColourField} 
                        />
                    </SlideDown>
                )
        }
    }

    render() {
        return (
            <div className="rel-header">
                {this.renderViewMenu()}
                {this.renderFilterBar()}
                {this.renderCategories()}
            </div>
        )
    }
}

export default RelHeader
