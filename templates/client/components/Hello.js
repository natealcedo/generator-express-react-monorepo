import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import webpackImg from "images/webpack.svg";

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      up: "",
    };
  }

  async componentWillMount() {
    const { data } = await axios.get("/api/up");
    this.setState({
      up: data.up,
    });
  }
  render() {
    return (
      <div>
        <Link to="/there">There</Link>
        {this.state.up}
        <img alt="webpackImg" src={webpackImg} />
      </div>
    );
  }
}
