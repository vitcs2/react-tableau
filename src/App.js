import React, { Component } from "react";
import "./App.css";
// import Dataviz from "./Dataviz";
import Singleviz from "./components/singleviz";
import FilterViz from "./components/filterViz";
import PowerBI from "./components/powerbi";
import BodyData from "./components/search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MemberTimeline from "./components/memberTimeline";





// function App(){
//    const vizList = [
//      "http://public.tableau.com/views/RegionalSampleWorkbook/Flights",
//      "http://public.tableau.com/views/RegionalSampleWorkbook/Obesity",
//      "http://public.tableau.com/views/RegionalSampleWorkbook/College",
//      "http://public.tableau.com/views/RegionalSampleWorkbook/Stocks",
//      "http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
//    ];
//     const dataViz = vizList.map((number, index) => (
//       <Dataviz url={number} index={index}/>
//     ));

//   return (
//     <div className="App-header">
//       {dataViz}
//     </div>
//   );
// }

// export default App;

export default class App extends Component {

  

  render() {
    return (
      <Router>
        <div >
          {/* <Singleviz count={this.state.count} /> */}
          {/* <BodyData /> */}
          {/* <PowerBI/>
         */}
          <div>
            <div>
              {/* Member Timeline */}
            </div>
            <Routes />
          </div>
          {/* <div>
          <button onClick={this.decrement}>Previous</button>
          <button onClick={this.increment}>Next</button>
        </div> */}
        </div>
      </Router>
    );
  }
}

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <PowerBI {...props} />} />
      <Route path="/member-timeline/:id" render={(props) => <MemberTimeline {...props} />} />
    </Switch>
  )
}

