import React from "react";
import "../styles/styles.css"

export default class App extends React.Component {
  render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
