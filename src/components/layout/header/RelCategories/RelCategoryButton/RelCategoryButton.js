const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelCategoryButton.css';

export class RelCategoryButton extends Component {
    render() {

        let buttonClass = "rel-cat-button";
        if (this.props.category.ignoreSubcategories && this.props.activeBranch[this.props.activeBranch.length - 1] !== this.props.category.id) {
            // This means the "All" category button should not be active
        }
        else if (this.props.activeBranch.includes(this.props.category.id)) {
            buttonClass += " active";
        }

        return (
            <div className={buttonClass} onClick={() => {
                this.props.changeBranch(this.props.category.id, this.props.category.parent, this.props.category.link);
                this.props.changeCategory(this.props.category.id.toString());
            }} >
                {entities.decode(this.props.category.name)}
            </div>
        )
    }
}

export default RelCategoryButton
