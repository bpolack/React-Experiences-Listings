const { Component } = wp.element;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RelCategories.css';


// Fontawesome Icons
import { faLink } from '@fortawesome/free-solid-svg-icons';

// Import Components
import RelCategoryButton from './RelCategoryButton/RelCategoryButton';
import RelSubcategories from './RelSubcategories/RelSubcategories';

export class RelCategories extends Component {

    constructor(props) {
        super(props);

        // Set the initial state
        this.state = {
            activeBranch: [parseInt(this.props.currentCategory)],
            activeLink: ''
        };

        // Bind callback methods to class
        this.changeBranch = this.changeBranch.bind(this);
    }

    // Method to update the active category branch 
    // *** used for displaying category levels and updating the category link icon
    changeBranch(childCategory, parentCategory, childCategoryLink) {

        let newBranch;

        if (typeof parentCategory !== 'undefined') {
            // Grab the index of the parent category from the array 
            const parentIndex = this.state.activeBranch.findIndex(category => category === parentCategory);

            if (parentIndex !== -1) {
                newBranch = this.state.activeBranch.slice(0, parentIndex).concat([parentCategory, childCategory]);
            }
            else {
                newBranch = [parentCategory, childCategory];
            }
        }
        else { 
            // Special case for "All" category links
            const childIndex = this.state.activeBranch.findIndex(category => category === childCategory);
            
            if (childIndex !== -1) {
                newBranch = this.state.activeBranch.slice(0, childIndex + 1);
            }
            else {
                newBranch = [childCategory];
            }
            
        }

        this.setState({
            activeBranch: newBranch,
            activeLink: childCategoryLink
        })
    }

    renderSubcategorySection(category) {
        if( typeof category.subcategories !== 'undefined' && category.subcategories.length > 0 && this.state.activeBranch.includes(category.id) ) {
            return (
                <RelSubcategories 
                    categories={category.subcategories} 
                    currentCategory={this.props.currentCategory} 
                    changeCategory={this.props.changeCategory} 
                    activeBranch={this.state.activeBranch} 
                    changeBranch={this.changeBranch} 
                />
            )
        }
    }

    renderLink() {
        if (this.state.activeLink != false && typeof this.state.activeLink !== 'undefined') {
            return (
                <a href={this.state.activeLink}><FontAwesomeIcon className="rel-header-category-link" icon={faLink} /></a>
            )
        }
    }

    render() {
        return (
            <div className="rel-header-category-wrapper">
                <div className="rel-header-item">
                    <div className="rel-header-categories">
                        {this.props.categories.map((category, index) => {
                            return (
                                <RelCategoryButton 
                                    key={category.key} 
                                    category={category} 
                                    currentCategory={this.props.currentCategory} 
                                    changeCategory={this.props.changeCategory} 
                                    activeBranch={this.state.activeBranch} 
                                    changeBranch={this.changeBranch} 
                                />
                            )
                        })}
                    </div>
                </div>
                {this.props.categories.map((category, index) => {
                    return (
                        this.renderSubcategorySection(category)
                    )
                })}
                {this.renderLink()}
            </div>
        )
    }
}

export default RelCategories
