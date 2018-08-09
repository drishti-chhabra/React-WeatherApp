import React, { Component } from 'react'
import {geolocated} from 'react-geolocated';
import {Container,Image} from 'semantic-ui-react';
import './App.css';

const API_KEY="a0d0a8ea14bd1a7a31755fe21992cd38";
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      temp:undefined,
      humidity:undefined,
      pressure: undefined,
      country:undefined,
      city:undefined,
      description:undefined,
      wind:undefined,
      icon:undefined

    }

  }
  componentDidUpdate(prevProps){
    if(prevProps.coords!==this.props.coords)
    {console.log(this.props.coords);
  var lati=this.props.coords.latitude;
  var longi=this.props.coords.longitude;
  console.log(lati,longi);
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEY}&units=metric`)
  .then(response=> {
   return response.json();
  }).then(data=>{

    this.setState({temp:data.main.temp, 
      humidity:data.main.humidity,
      pressure: data.main.pressure,
      country:data.sys.country,
      city:data.name,
      wind:data.wind.speed,
      description:data.weather[0].description,
      icon:data.weather[0].icon})

  })

}
  }
  
  render () {
     var x="http://openweathermap.org/img/w/"+this.state.icon+".png";
     console.log(x);
      return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
         ? <div className="back">
         <Container textAlign='center'>
         <h1>Current Weather Update</h1>
         <Image centered src={x} size="small" />
         <p>Temperature : {this.state.temp}</p>
         <p> {this.state.description}</p>
         <p>Wind speed: {this.state.wind}mps</p>
         <p>Humidity :{this.state.humidity}%</p>
         <p> {this.state.city}, {this.state.country}</p>
         <p>Pressure :{this.state.pressure}hPa</p>
          </Container>
         </div>
          : <div>Getting the location data&hellip; </div>;
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);