import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Results from './Results'
import Location from './Location'

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: 'select',
      city: '',
      restaurants: [],
      location: '',
      showLocation: false,
      showResults: false,
      temperature: '',
      weatherDescription: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'city') {
      this.setState({ city: e.target.value })
    } else if (e.target.name === 'category') {
      this.setState({ category: Number(e.target.value) })
    }
  }

  handleClick() {

    this.setState({ location: '', showLocation: false, showResults: false });

    const config = {
      headers: {
        'user-key': '7ce317de9fe8166df0c58db6fe8e29b5',
        "Content-Type": "application/json"
      }
    };

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=imperial&appid=c36de55d2876618e06c7ba365992b895`)
      .then(data => this.setState({ temperature: data.data.main.temp, weatherDescription: data.data.weather[0].description }))

    axios
      .get(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.city}`, config)
      .then(data => {
        console.log(data);
        if (data.data.location_suggestions.length > 0) {
          this.setState({ location: data.data.location_suggestions[0].name, showLocation: true })
          axios
            .get(`https://developers.zomato.com/api/v2.1/search?entity_id=${data.data.location_suggestions[0].id}&entity_type=city&count=20&category=${this.state.category}`, config)
            .then(data => {
              var restaurants = data.data.restaurants
              this.setState({ restaurants: restaurants, showResults: true })
            })
        } else {
          this.setState({ showLocation: true })
        }
      });

  }

  render() {
    const { city, category } = this.state;
    const isEnabled = city.length > 0 && category !== 'select';

    return (
      <div className="main">
        <div className="title">
          <h1 className="text-center">The Perfect Lunch</h1>
        </div>

        <div className="myform">
          <div className="form-group">
            <label htmlFor="category">Pick a category</label>
            <select name="category" className="form-control" onChange={this.handleChange} value={this.state.category}>
              <option value="select" disabled>Select</option>
              <option value="1">Delivery</option>
              <option value="2">Dine-out</option>
              <option value="3">Night-life</option>
              <option value="5">Takeaway</option>
              <option value="6">Cafes</option>
              <option value="8">Breakfast</option>
              <option value="9">Lunch</option>
              <option value="10">Dinner</option>
              <option value="11">Pubs & Bars</option>
              <option value="13">Pocket Friendly Delivery</option>
              <option value="14">Clubs & Lounges</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">Enter your city</label>
            <input name="city" className="form-control" type="text" value={this.state.city} onChange={this.handleChange}></input>
          </div>

          <button className="btn btn-success btn-block" onClick={this.handleClick} disabled={!isEnabled}>Get Restaurants in Area</button>

        </div>

        {this.state.showLocation ?
          <div className="location">
            <Location location={this.state.location} temperature={this.state.temperature} weatherDescription={this.state.weatherDescription} />
          </div> : null
        }

        {this.state.showResults ?
          <div className="results">
            <Results restaurants={this.state.restaurants} />
          </div> : null
        }

      </div >
    );
  }
}

export default App;
