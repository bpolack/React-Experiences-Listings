const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
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
                            <RelRegionButton key={uuidv4()} region={region} currentRegion={this.props.currentRegion} changeRegion={this.props.changeRegion} regionColourField={this.props.regionColourField} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RelRegions
