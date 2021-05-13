import React from "react";
import "../styles/styles.css";

// Commonly used with containers
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import ReportRow from "../components/report_row.jsx";

export default class TestContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading: false,
			buttonText: "Generar Reporte"
		}
	}

	componentDidMount() {
		this.loadTests();
	}

	generateReport() {
		this.setButtonLoadingState();
		fetch("/api/tests", {
			method: "POST",
			headers: new Headers({
				"Accept": "application/json",
				"Content-Type": "application/json",
			})
		})
			.then((response) => {
				this.unsetButtonLoadingState();
				return response.json()
			})
			.then((data) => {
				if(data.success) {
					this.loadTests();
				} else {
					alert("Error");
				}
			})
			.catch((error) => {
				alert("Error");
			});
	}

	loadTests() {
		fetch("/api/tests")
			.then(results => {
				return results.json();
			}).then(data => {
				this.setState({
					data: data
				})
			});
	}

	renderRows() {
		return this.state.data.map((d) => {
			return <ReportRow data={d} />
		});
	}

	setButtonLoadingState() {
		this.setState({
			isLoading: true,
			buttonText: "Generando Reporte..."
		});
	}

	unsetButtonLoadingState() {
		this.setState({
			isLoading: false,
			buttonText: "Generar Reporte"
		});
	}

	render() {
		return (
			<Container>
				<Button color="primary" className="btnGenerarReporte" onClick={this.generateReport.bind(this)} disabled={this.state.isLoading}>{this.state.buttonText}</Button>
				<Row className="table-header">
					<Col className="header" md={{size: 2, offset: 2}}>Imagen Base</Col>
					<Col className="header" md="2">Imagen Modificada</Col>
					<Col className="header" md="2">Diferencias</Col>
				</Row>
				{this.renderRows()}
			</Container>
		);
	}
}
