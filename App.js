import React from 'react'
import { Alert } from 'react-native';
import * as Location from 'expo-location'
import Loading from "./Loading";
import axios from 'axios'
import Weather from "./Weather";

const API_KEY = 'ae969d498cf22de5a5b4f192cb245f2d';

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const {data: {main: {temp}, weather}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({
      isLoading: false,
      temp: temp,
      condition: weather[0].main,
    });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (e) {
      Alert.alert('Не могу определить местоположение', 'Очень грустно :(')
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render () {
    const {isLoading, temp, condition} = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}

