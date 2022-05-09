import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BaseLayout from "./components/BaseLayout/";
import Dashboard from "./components/Dashboard/Dashboard";
import Test from "./components/Form/AddRecord";
import DataTable from "./components/Table/DataTable";
import SimpleTable from "./components/Table/SimpleTable";
import Tagging from "./components/ImageTagging/Tagging";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import login from "./pages/SignIn/SignIn";
import DataEntry from "./components/DataEntry/DataEntry";
import Aitagging from "./components/ImageTagging/Aitagging";
import Sidebar from "./components/Sidebar/Sidebar";
import ImageSeries from "./components/ImageSeries/ImageSeries";
import IndexTagging from "./components/ImageTagging/Indextagging";

function App() {
  return (
    <Router>
      <Switch>
        <>
          <div className="wrapper">
            <BaseLayout exact path="/" component={Dashboard} />
            <BaseLayout exact path="/Add-record" component={Test} />
            <BaseLayout exact path="/All-data" component={DataTable} />
            <BaseLayout exact path="/Simple-table" component={SimpleTable} />
            <BaseLayout exact path="/series" component={ImageSeries} />

            <Route exact path="/sidebar" component={Sidebar} />
            <Route exact path="/tag" component={Tagging} />
            <Route exact path="/tag-index" component={IndexTagging} />
            <Route exact path="/nav" component={Navbar} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={login} />
            <Route exact path="/entry" component={DataEntry} />
            <Route exact path="/ai" component={Aitagging} />
          </div>
        </>
      </Switch>
    </Router>
  );
}

export default App;
