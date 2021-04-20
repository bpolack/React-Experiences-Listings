const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import './RelListingFlag.css';

// Icons
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

export class RelListingFlag extends Component {

    renderIcon(flag, flagIconField) {
        if (flag.rel_fields[flagIconField]) {
            return (
                <img src={flag.rel_fields[flagIconField].url} />
            )
        }
        else {
            return (
                <FontAwesomeIcon className="rel-default-flag-icon" icon={faExclamation} />
            )
        }
        
    }

    renderDesc(flag, showDesc) {
        if (showDesc) {
            return (
                <div className="rel-flag-desc">
                    {entities.decode(flag.name)}
                </div>
            )
        }
    }

    render() {
        const {flag, description, tooltip} = this.props;
        const {flagIconField} = this.props.globals;

        let flagClass = "rel-flag ";
        if (description) {
            flagClass += "contains-desc";
        }
        let tooltipText = "";
        if (tooltip) {
            tooltipText += entities.decode(flag.name);
        }

        return (
            <div className={flagClass}>
                <div data-tip={tooltipText} className="rel-flag-icon">
                    {this.renderIcon(flag, flagIconField)}
                </div>
                {this.renderDesc(flag, description)}
                <ReactTooltip effect="solid" />
            </div>
        )
    }
}

export default RelListingFlag
