import React, { Component } from "react";
import * as pbi from 'powerbi-client';
import Table from 'react-bootstrap/Table'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import "./searchResults.scss"


class PowerBI extends Component {
    constructor(props) {
        super(props);
        console.log('in const po', props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.searchResults = this.searchResults.bind(this);
        // this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        // this.initViz();
        fetch("http://demo0806608.mockable.io/images")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    console.log(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    componentDidUpdate() {
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                // <ul>
                //     {items.map(item => (
                //         <li key={item.ImageName}>
                //             {item.ImageName} {item.ImageGUID}
                //         </li>
                //     ))}
                // </ul>
                <div  className="search-table">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>CID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(this.searchResults)}
                    </tbody>
                </Table>
                </div>
            );
        }
    }

    handleClick(person) {
        console.log('clicked',person);
        this.props.history.push('/member-timeline/'+person.ConsumerIndividualIdentifier, {
            MemberFirstName: "LOGAN",
            MemberLastName: "DEHAVEN",
            MemberBirthDate: "1998-04-13",
            ARRM_CTC_NB: "H26004557",
            MemberHealthCareContractIdentifier: "H26004557",
            Memberemailaddresstext: "logandsdsafdfd@rocket.com",
            MemberGenderCode: "M",
            ConsumerIndividualIdentifier: "122354676"
        });
    }
    searchResults(person, index) {
        return (
            <tr key={index}>
                <td>
                    <span>{person.MemberFirstName} {person.MemberLastName}</span>
                    <div>{person.Memberemailaddresstext}</div>
                </td>
                <td>{person.ARRM_CTC_NB}</td>
                <td >{person.ConsumerIndividualIdentifier}</td>
                <td onClick={this.handleClick.bind(this, person)}>
                <FontAwesomeIcon icon={faUserCircle} />
                </td>
            </tr>
        )
    }
}

export default PowerBI;
