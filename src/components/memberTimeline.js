import React, { Component } from "react";
import "./memberTimeline.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';



class MemberTimeline extends Component {
    constructor(props) {
        super(props);
        console.log("in con", this.props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            personDetails: null
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ personDetails: this.props.location.state });
        console.log("props", params.id, this.props.location.state);
        fetch("http://demo0806608.mockable.io/images")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: {
                            'ConsumerID': "4242820",
                            "HCCID": "H23683133",
                            "Domain": "Medical Claims",
                            "SubDomain": "ER Visit",
                            "Event Date": "2019-03-2010",
                            "EventDateDescription": "Claim Begin Date",
                            "EventID": "17731237232",
                            "EventDescription": "Claim Number"
                        }
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
        const { error, isLoaded, data } = this.state;
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
                // <Card body>This is some text within a card body.</Card>
                <div >
                    <div className="page-header">Member Timeline Details</div>
                    <div className="member-cont-1">
                        <div className="member-details-cont">
                            <FontAwesomeIcon icon={faUserCircle} />
                            <span className="member-details-1">
                                {this.state.personDetails.MemberFirstName} {this.state.personDetails.MemberLastName}
                            </span>
                            <div className="member-details-2">
                                <span><span className="label">CIP ID: </span> {this.state.personDetails.ConsumerIndividualIdentifier} | </span>
                                <span><span className="label">HCC ID: </span> {this.state.personDetails.MemberHealthCareContractIdentifier} | </span>
                                <span><span className="label">DOB:</span> {this.state.personDetails.MemberBirthDate} | </span>
                                <span><span className="label">Email:</span> {this.state.personDetails.Memberemailaddresstext}</span>
                            </div>
                            <div className="member-details-2">
                                <span><span className="label">Segment: </span> Group | </span>
                                <span><span className="label">Product: </span> BLUEOPTIONS PREDICTABLE COST </span>
                            </div>
                        </div>
                        <div className="address-cont">
                            <span className="label">Address</span>
                            <div className="address">
                                <span>8586 Columbia Ave. Farmingdale, NY 11735</span>
                            </div>
                        </div>
                    </div>
                    <div className="member-cont-2">
                        <div className="member-sub-cont">
                            <div className="header"> Latest Claims </div>
                            <div> <span className="label">Rx: </span><span className="value">1998-04-13</span></div>
                            <div> <span className="label">Professional Claims: </span><span className="value">1998-04-13</span></div>
                            <div> <span className="label">Institutional Claims: </span><span className="value">1998-04-13</span></div>

                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest Interactions </div>
                            <div> <span className="label">Call: </span><span className="value">1998-04-13</span></div>
                            <div> <span className="label">Website Login: </span><span className="value">1998-04-13</span></div>                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest Surveys </div>
                            <div class="none"> None </div>
                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest CSAT </div>
                            <div className="none">
                                <FontAwesomeIcon icon={faExclamation} className="exclamation" />
                            </div>
                            <div class="none"> No Response </div>
                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest TNPS </div>
                            <div className="none">
                                <FontAwesomeIcon icon={faExclamation} className="exclamation" />
                            </div>
                            <div class="none"> No Response </div>
                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest NPS </div>
                            <div className="none">
                                <FontAwesomeIcon icon={faExclamation} className="exclamation" />
                            </div>
                            <div class="none"> No Response </div>                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest Claims </div>
                            <div className="none">
                                <FontAwesomeIcon icon={faExclamation} className="exclamation" />
                            </div>
                            <div class="none"> No Response </div>
                        </div>
                        <div className="member-sub-cont">
                            <div className="header"> Latest Claims </div>
                            <div className="none">
                                <FontAwesomeIcon icon={faExclamation} className="exclamation" />
                            </div>
                            <div class="none"> No Response </div>
                        </div>
                    </div>

                    <div className="member-cont-3">
                        <div className="timeline-graph">
                            <div className="header">Timeline</div>
                            <div>
                                Graph
                                <ScatterChart
                                    width={600}
                                    height={400}
                                    margin={{
                                        top: 20, right: 20, bottom: 20, left: 20,
                                    }}
                                >
                                    <CartesianGrid />
                                    <XAxis type="number" dataKey="x" name="stature"/>
                                    <YAxis type="number" dataKey="y" name="weight" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="A school" data={rechartsData} fill="#8884d8" />
                                </ScatterChart>
                            </div>
                        </div>
                        <div className="timeline-table">
                            <div className="header">Top 10 Daignosis by Paid Amount</div>
                        </div>
                        <div className="timeline-table"><div className="header">
                            Top 10 Rx used by..
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
}

const rechartsData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];

export default MemberTimeline;
