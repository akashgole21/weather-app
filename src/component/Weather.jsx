import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DateTime from './DateTime';
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';

const api = {
  key: "907631567f1fb2cad54c17c99e2d9b2a",
  base: "https://api.openweathermap.org/data/2.5/",
};


export default function Weather() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [isCurrentLocation, setIsCurrentLocation] = useState(true);


  useEffect(() => {
    if (isCurrentLocation) { // Fetch current location weather on initial render
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;


        fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setSearch(result.name); // Update search term for consistency
            // console.log(result)
          })
          .catch((error) => {
            setIsCurrentLocation(false); // Handle errors gracefully (e.g., network issues)
            console.error('Error getting location:', error);
          });
      });
    }
  }, [isCurrentLocation]);

  const searchCity = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setIsCurrentLocation(false);
        // console.log(result)
      });
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  }

  const weatherImage = weather.weather ? weatherImages[weather.weather[0].main] : null

  // const backgroundImages = {
  //   Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
  //   Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
  //   Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
  //   Snow: 'linear-gradient(to right, #aff2ff, #fff)',
  //   Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
  //   Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
  // }

  // const backgroundImage = weather.weather
  //   ? backgroundImages[weather.weather[0].main]
  //   : 'linear-gradient(to right, #f3b07c, #fcd283)'

  return (
    <>
    <div className='bg-weather-image'>
      <Container className=''>
          <Row className='d-flex flex-wrap align-items-center row-height' >
            <Col xs={12} sm={4} className='column-margin'>
              <div className="bg-box-style d-flex flex-column flex-wrap text-center">
                <div className='search-bar'>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Search City..." className='search-text'
                       onChange={(e) => setSearch(e.target.value)}
                       // Add the onKeyDown event handler
                       onKeyDown={(event) => {
                         if (event.key === 'Enter') {
                           searchCity(); // Call the searchCity function
                         }
                       }} />
                    <Button onClick={searchCity} className='search-btn'>
                      <i class="bi bi-search"></i>
                    </Button>
                  </InputGroup>
                </div>

                {typeof weather.main !== "undefined" ? (
                  <div>
                    <h5>{weather.name}</h5>
                    <span><img src={weatherImage} width={"150px"} alt='weather' /></span>
                    <h1 className='mb-4'>{weather.main.temp}°</h1>

                    <p className='mb-1'>{weather.weather[0].main}</p>
                    <p><span>H:{weather.main.temp_max}°</span> | <span>L:{weather.main.temp_min}°</span></p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}

              </div>
            </Col>
            <Col xs={12} sm={8} className='column-margin'>
              <div className="bg-box-style d-flex flex-column flex-wrap">
                <div className='box-heading'>
                  <h6 className='sub-heading f-color-faint'>Current Weather Details</h6>
                </div>

                <DateTime />

                {typeof weather.main !== "undefined" ? (
                  <div className='weather-details'>
                    <Row>

                      <Col sm={6}>
                        <div className='d-flex justify-content-between detail-row'>
                          <p className='d-inline-block f-color-faint'>Wind Gusts</p>
                          <p className='d-inline-block'>{weather.wind.gust} m/s</p>
                        </div>

                        <div className='d-flex justify-content-between detail-row'>
                          <p className='d-inline-block f-color-faint'>Humidity</p>
                          <p className='d-inline-block'>{weather.main.humidity}%</p>
                        </div>

                        <div className='d-flex justify-content-between detail-row'>
                          <p className='d-inline-block f-color-faint'>Pressure</p>
                          <p className='d-inline-block'>{weather.main.pressure} hpa</p>
                        </div>
                      </Col>

                      <Col sm={6}>
                        <div className='d-flex justify-content-between detail-row'>
                          <p className='d-inline-block f-color-faint'>{weather.weather[0].main}</p>
                          <p className='d-inline-block'>{weather.weather[0].description}</p>
                        </div>

                        <div className='d-flex justify-content-between detail-row'>
                          <p className='d-inline-block f-color-faint'>Feels Like</p>
                          <p className='d-inline-block'>{weather.main.feels_like}°</p>
                        </div>

                        <div className='d-flex justify-content-between detail-row'>
                          <p className='d-inline-block f-color-faint'>Visibility</p>
                          <p className='d-inline-block'>{weather.visibility} m</p>
                        </div>
                      </Col>

                    </Row>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Col>
          </Row>

      </Container>
      </div>
    </>
  )
}
