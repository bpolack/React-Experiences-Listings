const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelRegions.css';

export class RelRegions extends Component {

    render() {
        return (
            <div className="rel-header-item">
                <div className="rel-header-regions">
                    {this.props.regions.map((region, index) => {
                        return (
                            <button className="rel-region-button" onClick={() => this.props.changeRegion(region.id.toString())}>
                                {entities.decode(region.name)}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RelRegions
