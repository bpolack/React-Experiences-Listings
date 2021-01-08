const { Component } = wp.element;
import './RelRegions.css';

// Import Components
import RelRegionButton from './RelRegionButton/RelRegionButton';

export class RelRegions extends Component {

    render() {
        return (
            <div className="rel-header-item">
                <div className="rel-header-regions">
                    {this.props.regions.map((region, index) => {
                        return (
                            <RelRegionButton key={region.key} region={region} currentRegion={this.props.currentRegion} changeRegion={this.props.changeRegion} regionColourField={this.props.regionColourField} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RelRegions
