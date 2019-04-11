import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    temp: "",
    humidity: "",
    image: "",
    text: "",
    place: "",
    country: ""
  };

  handleClick = async e => {
    e.preventDefault();
    // const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(
      `http://api.apixu.com/v1/current.json?key=84c6eee171054352b2561042191104&q=${country}`
    );
    const rtr = await api.json();
    // console.log(rtr.current.condition.icon);
    this.setState({
      image: rtr.current.condition.icon,
      text: rtr.current.condition.text,
      temp: rtr.current.temp_c,
      humidity: rtr.current.humidity,
      place: rtr.location.name,
      country: rtr.location.country
    });
  };
  render() {
    return (
      <div className="container">
        <center className="float-left">
          <div className="card" id="card1">
            <h1>Weather App</h1>
            <form id="form" onSubmit={this.handleClick}>
              <br />
              <input
                type="text"
                placeholder="Enter Country Name"
                name="country"
                className="form-control"
              />
              <br />
              <button className="btn btn-info">Get Weather</button>
            </form>
          </div>
        </center>
        <center>
        <div className="float-left" >
        <div className="card" id="displayWeather">
            {this.state.temp !== "" ? <image src={this.state.image} /> : ""}
            {this.state.temp !== "" ? <text>{this.state.place},{this.state.country}</text> : ""}
            {this.state.temp !== "" ? <h2>{this.state.text}</h2> : ""}
            {this.state.temp !== "" ? (
              <h3>Temp: {this.state.temp}&#x2103; celsius</h3>
            ) : (
              ""
            )}
            {this.state.temp !== "" ? (
              <h4>Humidity: {this.state.humidity}</h4>
            ) : (
              ""
            )}
          </div>
          </div>
          </center>
      </div>
    );
  }
}
export default App;
