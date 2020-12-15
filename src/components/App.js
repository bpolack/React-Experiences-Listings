const { Component } = wp.element;
const WPAPI = require('wpapi');
import Loader from 'react-loader-spinner'
import './App.css';

// Import Components
import RelHeader from './layout/header/RelHeader';
import RelFooter from './layout/footer/RelFooter';
import RelListingGrid from './views/ListingGrid/RelListingGrid';
import RelListingRows from './views/ListingRows/RelListingRows';
import ListingMap from './views/ListingMap/ListingMap';
import ListingSingle from './views/ListingSingle/ListingSingle';

export class App extends Component {

    constructor(props) {
        super(props);

        // Set the ititial state
        this.state = {
            view: props.args.view,
            loading: true,
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
        this.loadMore = this.loadMore.bind(this);
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
            page: 1,
            listings: [],
            loading: true
        }, () => {
            this.fetchNextListings();
        })
    }

    // Method to change the active region
    changeRegion(region) {
        if (region == this.state.currentRegion) {
            // Toggle region filtering off
            this.setState({
                currentRegion: '',
                page: 1,
                listings: [],
                loading: true
            }, () => {
                this.fetchNextListings();
            })
        }
        else {
            this.setState({
                currentRegion: region,
                page: 1,
                listings: [],
                loading: true
            }, () => {
                this.fetchNextListings();
            })
        }
    }

    // Method to load more listings
    loadMore() {
        const currentPage = this.state.page;

        this.setState({
            page: currentPage + 1,
            loading: true
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
            /*.param(regionName + '_exclude', (excludeRegions != false) ? excludeRegions.trim().split(',') : []) */
            .param('_embed', "1")
            .order('asc')
            .orderby('title')
            .page(page)
            .perPage(perpage)
            .then((data) => {
                if (data) {
                    this.setState({
                        listings: this.state.listings.concat(data),
                        loading: false
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
            .param('hide_empty', true)
            .then((data) => {
                if (data) {
                    // Add the parent category to the front of the array
                    data.unshift({
                        id: (parentCategory != false) ? parentCategory : 0,
                        name: 'All'
                    });
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
            .param('hide_empty', true)
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

    renderLoader() {
        if ((this.state.view == 'grid' || this.state.view == 'list') && this.state.loading) {
            return (
                <div className="rel-loader-container">
                    <Loader
                        type="RevolvingDot"
                        color="#173f57"
                        height={100}
                        width={100}
                        timeout={2000}
                    />
                </div>
            )
        }
    }

    renderView() {
        switch (this.state.view) {
            case 'list':
                return (
                    <RelListingRows listings={this.state.listings} globals={this.props.globals} />
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
                    <RelListingGrid listings={this.state.listings} globals={this.props.globals} />
                )
        }
    }

    render() {
        return (
            <div className="rel-wrapper" >
                <RelHeader currentView={this.state.view} changeView={this.changeView}
                    categories={this.state.categories} currentCategory={this.state.currentCategory} changeCategory={this.changeCategory}
                    regions={this.state.regions} currentRegion={this.state.currentRegion} changeRegion={this.changeRegion} regionColourField={this.props.globals.regionColourField}  />
                {this.renderView()}
                {this.renderLoader()}
                <RelFooter currentView={this.state.view} loadMore={this.loadMore} />
            </div>
        )
    }
}

export default App
