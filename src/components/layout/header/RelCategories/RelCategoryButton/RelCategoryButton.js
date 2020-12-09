const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelCategoryButton.css';

export class RelCategoryButton extends Component {
    render() {

        let buttonClass = "rel-cat-button";
        if (parseInt(this.props.currentCategory) == this.props.category.id) {
            buttonClass += " active";
        }

        return (
            <div className={buttonClass} onClick={() => this.props.changeCategory(this.props.category.id.toString())} >
                {entities.decode(this.props.category.name)}
            </div>
        )
    }
}

export default RelCategoryButton
