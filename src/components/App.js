const { Component } = wp.element;
const WPAPI = require('wpapi');
import './App.css';

// Import Components
import RelHeader from './layout/header/RelHeader';
import RelFooter from './layout/RelFooter';
import ListingGrid from './views/ListingGrid';
import ListingRows from './views/ListingRows';
import ListingMap from './views/ListingMap';
import ListingSingle from './views/ListingSingle';

export class App extends Component {

    constructor(props) {
        super(props);

        // Set the ititial state
        this.state = {
            view: props.args.view,
            page: 1,
            currentCategory: props.args.initialCategory,
            currentRegion: props.args.initialRegion,
            categories: [],
            regions: [],
            listings: []
        };

        // Configure WPAPI handlers
        this.relWP = new WPAPI({ endpoint: props.globals.apiLocation });
        this.relWP.relListings = this.relWP.registerRoute('wp/v2', '/' + props.globals.postType + '/');
        this.relWP.relCategories = this.relWP.registerRoute('wp/v2', '/' + props.globals.categoryName + '/');
        this.relWP.relRegions = this.relWP.registerRoute('wp/v2', '/' + props.globals.regionName + '/');

        // Bind callback methods to class
        this.changeView = this.changeView.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeRegion = this.changeRegion.bind(this);
    }

    componentDidMount() {
        this.fetchCategories(this.state.currentCategory);
        this.fetchRegions(this.state.currentRegion);
        this.fetchNextListings();
    }

    // Method to change the active view
    changeView(view) {
        this.setState({
            view: view
        })
    }

    // Method to change the active category
    changeCategory(category) {
        this.setState({
            currentCategory: category,
            listings: []
        }, () => {
            this.fetchNextListings();
        })
    }

    // Method to change the active region
    changeRegion(region) {
        this.setState({
            currentRegion: region,
            listings: []
        }, () => {
            this.fetchNextListings();
        })
    }

    // Method to fetch the next set of listings from the API
    fetchNextListings() {

        // Destruct required props and states
        const { categoryName, regionName } = this.props.globals;
        const { perpage, excludeCategories, excludeRegions } = this.props.args;
        const { currentCategory, currentRegion, page } = this.state;

        this.relWP.relListings()
            .param(categoryName, (currentCategory != false) ? currentCategory.trim().split(',') : [])
            .param(categoryName + '_exclude', (excludeCategories != false) ? excludeCategories.trim().split(',') : [])
            .param(regionName, (currentRegion != false) ? currentRegion.trim().split(',') : [])
            .param(regionName + '_exclude', (excludeRegions != false) ? excludeRegions.trim().split(',') : [])
            .page(page)
            .perPage(perpage)
            .then((data) => {
                if (data) {
                    this.setState({
                        listings: this.state.listings.concat(data)
                    })
                }
            })
            .catch((err) => {
                console.error("WP API Get Error: " + err);
            });
    }

    // Method to fetch a set of category terms, given a parent term ID 
    fetchCategories(parentCategory) {

        // Destruct required props and states
        const { excludeCategories } = this.props.args;

        this.relWP.relCategories()
            .param('parent', (parentCategory != false) ? parentCategory : 0)
            .param('exclude', (excludeCategories != false) ? excludeCategories.trim().split(',') : [])
            .perPage(50)
            .param('hide_empty', false)
            .then((data) => {
                if (data) {
                    this.setState({
                        categories: data
                    })
                }
            })
            .catch((err) => {
                console.error("WP API Get Error: " + err);
            });

    }

    // Method to fetch a set of category terms, given a parent term ID 
    fetchRegions(parentRegion) {

        // Destruct required props and states
        const { excludeRegions } = this.props.args;

        this.relWP.relRegions()
            .param('parent', (parentRegion != false) ? parentRegion : 0)
            .param('exclude', (excludeRegions != false) ? excludeRegions.trim().split(',') : [])
            .perPage(50)
            .param('hide_empty', false)
            .then((data) => {
                if (data) {
                    this.setState({
                        regions: data
                    })
                }
            })
            .catch((err) => {
                console.error("WP API Get Error: " + err);
            });

    }

    renderView() {
        switch (this.state.view) {
            case 'rows':
                return (
                    <ListingRows />
                )
            case 'map':
                return (
                    <ListingMap />
                )
            case 'single':
                return (
                    <ListingSingle />
                )
            default:
                return (
                    <ListingGrid listings={this.state.listings} />
                )
        }
    }

    render() {
        return (
            <div className="rel-wrapper" >
                <RelHeader currentView={this.state.view} changeView={this.changeView}
                    categories={this.state.categories} currentCategory={this.state.currentCategory} changeCategory={this.changeCategory}
                    regions={this.state.regions} currentRegion={this.state.currentRegion} changeRegion={this.changeRegion}  />
                {this.renderView()}
                <div>

                </div>
                <RelFooter />
            </div>
        )
    }
}

export default App
