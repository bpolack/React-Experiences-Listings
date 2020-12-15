const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelRegionButton.css';

export class RelRegionButton extends Component {
    render() {

        let buttonClass = "rel-region-button";
        if (this.props.currentRegion == this.props.region.id) {
            buttonClass += " active";
        }

        // Get the Region dot colour if it exists
        let dotStyle = {
            backgroundColor: '#c7c7c7'
        }
        if (typeof this.props.region.rel_fields[this.props.regionColourField] !== 'undefined') {
            dotStyle.backgroundColor = this.props.region.rel_fields[this.props.regionColourField];
        }
        
        return (
            <div className={buttonClass} onClick={() => this.props.changeRegion(this.props.region.id.toString())}>
                <span className="region-dot" style={dotStyle}></span> {entities.decode(this.props.region.name)}
            </div>
        )
    }
}

export default RelRegionButton
