import React, { Component } from 'react';
import './Restaurant.css';

class Restaurant extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <img src={this.props.resImage} className="card-img-top"></img>
          <h5 className="card-title">{this.props.resName}</h5>
          <p>{this.props.resAddress}</p>
          <p><span style={{ fontWeight: 'bold' }}>Cuisines:</span> {this.props.resCuisine}</p>
          <p><span style={{ fontWeight: 'bold' }}>Rating:</span> <span className="badge badge-success">{this.props.resRating}</span></p>
          <p><span style={{ fontWeight: 'bold' }}>Cost for two:</span> {this.props.resCurrency} {this.props.resCost}</p>
          <p><a href={this.props.resSite}>Website</a></p>
        </div>
      </div >
    )
  }
}

export default Restaurant;
