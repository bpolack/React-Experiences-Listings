const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
import './RelCategories.css';

// Import Components
import RelCategoryButton from './RelCategoryButton/RelCategoryButton';

export class RelCategories extends Component {

    render() {
        return (
            <div className="rel-header-item">
                <div className="rel-header-categories">
                    {this.props.categories.map((category, index) => {
                        return (
                            <RelCategoryButton key={uuidv4()} category={category} currentCategory={this.props.currentCategory} changeCategory={this.props.changeCategory} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RelCategories
