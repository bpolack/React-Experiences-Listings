const { Component } = wp.element;
import './App.css';

export class App extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        return (
            <div className={'rel-wrapper ' + this.props.args.view} >
                Hello World
            </div>
        )
    }
}

export default App
