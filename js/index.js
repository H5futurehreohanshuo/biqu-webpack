import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

class Text extends Component {

	constructor () {
		super();
	}

	render () {
		return (
			<div>hello world!</div>
		);
	}

}

ReactDOM.render(<Text />,document.getElementById('content'));