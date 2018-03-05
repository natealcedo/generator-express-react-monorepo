import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Hello from "../components/Hello";
import There from "../components/There";

const App = props => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Hello} />
      <Route exact path="/there" component={There} />
    </div>
  </BrowserRouter>
);

const mapStateToProps = ({ page }) => ({
  page,
});
export default connect(mapStateToProps)(App);
