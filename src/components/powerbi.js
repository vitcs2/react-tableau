import React, { Component } from "react";
import * as pbi from 'powerbi-client';
import Table from 'react-bootstrap/Table'


class PowerBI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
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
                <Table striped bordered variant="dark" hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(this.searchResults)}
                    </tbody>
                </Table>
            );
        }
    }

    searchResults(person, index) {
        return (
            <tr key={index}>
                <td>{person.ImageName}</td>
                <td>{person.ImageGUID}</td>
                <td >{person.UploadDateTime}</td>
            </tr>
        )
    }
}

export default PowerBI;
