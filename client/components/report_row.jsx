import React, { Component  } from "react";
import { Container, Row, Col, Button } from "reactstrap";

export default class ReportRow extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	renderDimensionDifferenceWidth() {
		let results = this.props.data.results;
		let difference = results.dimensionDifference;
		if(difference && difference.width != undefined) {
			return(
				<div><strong>Width Difference:</strong> {difference.width}</div>
			);
		}
		return null;
	}

	renderDimensionDifferenceHeight() {
		let results = this.props.data.results;
		let difference = results.dimensionDifference;
		if(difference && difference.height != undefined) {
			return(
				<div><strong>Height Difference:</strong> {difference.height}</div>
			);
		}
		return null;
	}

	renderCreatedAt() {
		let results = this.props.data.results;
		let stringDate = this.props.data.createdAt;
		let date = new Date(stringDate);
		return date.toLocaleString();
	}

	render() {
		let data = this.props.data;
		let results = data.results;

		return (
			<Row className="reportRow">
				<Col className="dateEntry" md="2">{this.renderCreatedAt()}</Col>
				<Col className="imageEntry" md="2">
					<img className="testImage" src={data.beforePhoto} alt="test"/>
				</Col>
				<Col className="imageEntry" md="2">
					<img className="testImage" src={data.afterPhoto} alt="test"/>
				</Col>
				<Col className="imageEntry" md="2">
					<img className="testImage" src={data.diffPhoto} alt="test"/>
				</Col>
				<Col className="infoEntry" md="2">
					<div><strong>Mismatch Percentage:</strong> {results.misMatchPercentage}</div>
					<div><strong>Is Same Dimensions:</strong> {results.isSameDimension + ""}</div>
					{this.renderDimensionDifferenceWidth()}
					{this.renderDimensionDifferenceHeight()}
				</Col>
			</Row>
		);
	}
}
