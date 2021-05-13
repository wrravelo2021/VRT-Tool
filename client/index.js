import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TestContainer from "./containers/test_container"

ReactDOM.render(
		<Router>
			<App>
				<Switch>
					<Route exact="/" component={TestContainer}/>
				</Switch>
			</App>
		</Router>
	, document.getElementById('app'));
