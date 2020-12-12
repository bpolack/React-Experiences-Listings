const { Component } = wp.element;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RelViewButton.css';

// Icons
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export class RelViewButton extends Component {

    renderIcon() {
        switch (this.props.view) {
            case 'map':
                return (
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                )
            case 'list':
                return (
                    <FontAwesomeIcon icon={faThList} />
                )
            default:
                return (
                    <FontAwesomeIcon icon={faThLarge} />
                )
        }
        
    }

    render() {
        let buttonClass = "rel-view-button";
        let fillIcon = false;
        if (this.props.currentView == this.props.view) {
            buttonClass += " active";
            fillIcon = true;
        }

        return (
            <div className={buttonClass} onClick={() => this.props.changeView(this.props.view)} >
                {this.renderIcon()}
            </div>
        )
    }
}

export default RelViewButton