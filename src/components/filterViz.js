import React, { Component } from "react";

let viz = undefined;
const containerStyle = {
    width: '900px',
    height: '700px'
};
const controlStyle = {
    marginTop: '15px',
    marginBottom: '5px'
};
const dropdownStyle = {
    borderRadius: '12px',
    width: '120px',
    height: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: 'aliceblue'
}
// drop down lables 
const spanStyle = {
    fontWeight: 'bold',
    color: 'darkorange',
    fontSize: '80%',
    fontFamily: 'sans-serif'
}

const countStyle = {
    color: '#6495ed',
    fontWeight: 'bold'
}

class FilterViz extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenToMarksSelection = this.listenToMarksSelection.bind(this);
        this.onMarksSelection = this.onMarksSelection.bind(this);
        this.reportSelectedMarks = this.reportSelectedMarks.bind(this);


    }

    componentDidMount() {
        this.initViz();
    }

    componentDidUpdate() {
        this.initViz();
    }


    initViz = () => {
        const url = "http://public.tableau.com/views/RegionalSampleWorkbook/College";
        const options = {
            "Academic Year": "",
            "College": "",
            "Select Gender": "",
            hideTabs: false,
            onFirstInteractive: function () {
                // this.listenToMarksSelection();
                // viz.addEventListener(window.tableau.TableauEventName.MARKS_SELECTION, this.onMarksSelection);
                var sheetCount = viz.getWorkbook().getPublishedSheetsInfo().length;
                console.log(sheetCount);
                const pararms = viz.getWorkbook();
                console.log(viz.getWorkbook())
                pararms.then((par) => {
                    console.log(par);
                })
                var sheet = viz.getWorkbook().getActiveSheet().getUnderlyingDataAsync();
                sheet.then((data) => {
                    var tgt = document.getElementById("dataTarget");
                    // #### change data.getData().length to data.getData() if you want to see the entire data array.
                    tgt.innerHTML = "<h4>Underlying Data count:</h4><p style={countStyle}>" + JSON.stringify(data.getData().length) + "</p>";
                })
            }
        };
        var containerDiv = document.getElementById("vizContainer");
        viz = new window.tableau.Viz(containerDiv, url, options);

    }

    listenToMarksSelection = () => {
        if (viz) viz.addEventListener(window.tableau.TableauEventName.MARKS_SELECTION, this.onMarksSelection);
    }

    onMarksSelection = (marksEvent) => {
        return marksEvent.getMarksAsync().then(this.reportSelectedMarks);
    }

    reportSelectedMarks = (marks)  => {
        var html = "";

        for (var markIndex = 0; markIndex < marks.length; markIndex++) {
            var pairs = marks[markIndex].getPairs();
            html += "<b>Mark " + markIndex + ":</b><ul>";

            for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
                var pair = pairs[pairIndex];
                html += "<li><b>Field Name:</b> " + pair.fieldName;
                html += "<br/><b>Value:</b> " + pair.formattedValue + "</li>";
            }

            html += "</ul>";
        }

        var infoDiv = document.getElementById('markDetails');
        infoDiv.innerHTML = html;
    }

    yearFilter(event) {
        if (viz) {
            var sheet = viz.getWorkbook().getActiveSheet();
            if (event.target.value === "") {
                sheet.clearFilterAsync("Academic Year");
            } else {
                sheet.applyFilterAsync("Academic Year", event.target.value, window.tableau.FilterUpdateType.REPLACE).then((data) => {
                    var sheetAfterFilter = viz.getWorkbook().getActiveSheet().getUnderlyingDataAsync();
                    sheetAfterFilter.then((data2) => {
                        var tgt = document.getElementById("dataTarget");
                        // #### change data2.getData().length to data2.getData() if you want to see the entire data array.
                        tgt.innerHTML = "<h4>Underlying Data:</h4><p>" + JSON.stringify(data2.getData().length) + "</p>";
                    })
                });;;
            }
        }
    }

    collegeFilter(event) {
        if (viz) {
            var sheet = viz.getWorkbook().getActiveSheet();
            if (event.target.value === "") {
                sheet.clearFilterAsync("College");
            } else {
                sheet.applyFilterAsync("College", event.target.value, window.tableau.FilterUpdateType.REPLACE);
            }
        }
    }

    genderFilter(event) {
        if (viz) {
            var sheet = viz.getWorkbook().getActiveSheet();
            if (event.target.value === "") {
                sheet.clearFilterAsync("Select Gender");
            } else {
                sheet.applyFilterAsync("Select Gender", event.target.value, window.tableau.FilterUpdateType.REPLACE);
            }
        }
    }

    render() {
        return (

            <div>

                <div id="markDetails">Information about selected marks displays here.</div>
                <br />
                <div id="dataTarget" style={countStyle}></div>
                <div id="controls" style={controlStyle}>Member Timeline:</div>
                <div id="controls" style={controlStyle}>
                    <span style={spanStyle}>Select Year: </span> <select id="changeYear" onChange={this.yearFilter} style={dropdownStyle}>
                        <option value="">All</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                    </select>
                </div>

                <div id="controls" style={controlStyle}>
                    <span style={spanStyle}>Select College: </span> <select id="changeCollege" onChange={this.collegeFilter} style={dropdownStyle}>
                        <option value="">All</option>
                        <option value="Business">Business</option>
                        <option value="Communication">Communication</option>
                        <option value="Education">Education</option>
                    </select>
                </div>

                <div id="controls" style={controlStyle}>
                    <span style={spanStyle}>Select GENDER: </span> <select id="changeCollege" onChange={this.genderFilter} style={dropdownStyle}>
                        <option value="">All</option>
                        <option value="Men">Men</option>
                        <option value="Woman">Woman</option>
                    </select>
                </div>
                <hr size='10' background-color='#6199DF'></hr>
                <div id="vizContainer" style={containerStyle}></div>
            </div>
        );
    }
}

export default FilterViz;
