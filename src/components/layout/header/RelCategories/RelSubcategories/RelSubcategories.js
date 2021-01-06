const { Component } = wp.element;
import { v4 as uuidv4 } from 'uuid';
import './RelSubcategories.css';

// Import Components
import RelSubcategoryItem from './RelSubcategoryItem/RelSubcategoryItem';

export class RelSubcategories extends Component {

    // Recursively render subcategories if they exist
    renderSubcategories(categories) {
        return (
            <div className="rel-header-subcategory-level">
                <div className="rel-header-item">
                    <div className="rel-header-subcategories">
                        {categories.map((category, index) => {
                            return (
                                <RelSubcategoryItem 
                                    key={uuidv4()} 
                                    category={category} 
                                    currentCategory={this.props.currentCategory} 
                                    changeCategory={this.props.changeCategory} 
                                    activeBranch={this.props.activeBranch} 
                                    changeBranch={this.props.changeBranch} 
                                />
                            )
                        })}
                    </div>
                </div>
                {categories.map((category, index) => {
                    if (typeof category.subcategories !== 'undefined' && category.subcategories.length > 0 && this.props.activeBranch.includes(category.id)) {
                        return this.renderSubcategories(category.subcategories);
                    }
                })}
            </div>
        )
    }

    render() {
        return (
            this.renderSubcategories(this.props.categories)
        )
    }
}

export default RelSubcategories
