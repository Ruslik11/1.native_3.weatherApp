import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {LinearGradient} from "expo-linear-gradient";

const weatherOptions = {
  Rain: {
    iconName: 'weather-rainy',
    gradient: ["#000046","#1CB5E0"],
    title: 'На вулиці дощ! :)',
    subtitle: 'Вызьмыть зонтик.'
  },
  Snow: {
    iconName: 'snowflake',
    gradient: ["#83a4d4","#b6fbff"],
    title: 'На вулиці сніг! :)',
    subtitle: 'Одягайтесь як тупліше.'
  },
  Clear: {
    iconName: 'weather-sunny',
    gradient: ["#56CCF2","#2F80ED"],
    title: 'На вулиці ясно! :)',
    subtitle: 'Одягайтесь як зручно.'
  },
};

export default function Weather({temp, condition}) {
  return (
    <LinearGradient
      colors={weatherOptions[condition] && weatherOptions[condition]?.gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          name={weatherOptions[condition] ? weatherOptions[condition]?.iconName : 'weather-cloudy'}
          color='white'
          size={96}
        />
        <Text style={styles.temp}>{temp}°</Text>
      </View>
      <View style={{...styles.halfContainer, ...styles.textContainer}}>
          <Text style={styles.title}>{weatherOptions[condition]?.title}</Text>
          <Text style={styles.subtitle}>{weatherOptions[condition]?.subtitle}</Text>
      </View>
    </LinearGradient>
  );
};

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado", "Clear", "Clouds"]).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  temp: {
    fontSize: 42,
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10
  },
  subtitle: {
    color: 'white',
    fontWeight: "600",
    fontSize: 24
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'flex-start'
  }
});

