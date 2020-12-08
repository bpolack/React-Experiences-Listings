const { Component } = wp.element;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import './RelCategories.css';

export class RelCategories extends Component {

    renderCategories() {
        return (
            <div className="rel-header-categories">
                <button className="rel-cat-button" onClick={() => this.props.changeCategory('0')}>
                    All
                </button>
                {this.props.categories.map((category, index) => {
                    return (
                        <button className="rel-cat-button" onClick={() => this.props.changeCategory(category.id.toString())}>
                            {entities.decode(category.name)}
                        </button>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="rel-header-item">
                {this.renderCategories()}
            </div>
        )
    }
}

export default RelCategories
