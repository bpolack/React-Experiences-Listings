const { Component } = wp.element;
import './RelViewButton.css';

// Icons
import gridIcon from './icons/grid.png';
import listIcon from './icons/list.png';
import mapIcon from './icons/map.png';

export class RelViewButton extends Component {
    
    renderIcon() {
        switch (this.props.view) {
            case 'map':
                return (
                    <img src={mapIcon} alt="View Icon" />
                )
            case 'list':
                return (
                    <img src={listIcon} alt="View Icon" />
                )
            default:
                return (
                    <img src={gridIcon} alt="View Icon" />
                )
        }
    }
    
    render() {
        let buttonClass = "rel-view-button";
        if (this.props.currentView == this.props.view) {
            buttonClass += " active";
        }

        return (
            <div className={buttonClass} onClick={() => this.props.changeView(this.props.view)} >
                {this.renderIcon()}
            </div>
        )
    }
}

export default RelViewButton
