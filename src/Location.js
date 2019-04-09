import React from 'react'

export default function Location(props) {

  return (
    <div>
      <h5>{props.location.length > 0 ? `The temperature is ${props.temperature} F in ${props.location} with ${props.weatherDescription}.` : <div class="alert alert-danger text-center" role="alert">
        Sorry, no results found.
      </div>}</h5>
    </div>
  )
}
