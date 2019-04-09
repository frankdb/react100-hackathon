import React, { Component } from 'react';
import Restaurant from './Restaurant'

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.restaurant);

    return (
      <div>
        <h4 className="text-center">Here are 20 top-rated spots in the area:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            this.props.restaurants.map(restaurant => {
              var res = restaurant["restaurant"]

              return (
                <Restaurant
                  key={res["R"].res_id}
                  resName={res.name}
                  resCuisine={res.cuisines}
                  resRating={res.user_rating.aggregate_rating}
                  resImage={res.thumb}
                  resCost={res.average_cost_for_two}
                  resSite={res.url}
                  resAddress={res.location.address}
                  resCurrency={res.currency}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Results;
