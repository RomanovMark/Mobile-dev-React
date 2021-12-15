import React, {useState,Component,useEffect} from 'react';
import type {Node} from 'react';
import {
   SafeAreaView,
   Button,
   View,
   ScrollView
   } from 'react-native';

import axios from 'axios';
import Dialog from "react-native-dialog";
import { Header,Container,Title,Input,Text,Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAxios, {AxiosRequestConfig} from 'axios-hooks';



const App: () => Node = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState([]);

  // load cities when app starts
  useEffect(() => {
    getData();
  },[]);  

  // save cities if cities state changes
  useEffect(() => {
    storeData();
  },[cities]); 
  

  const openDialog = () => {
    setModalVisible(true);
  }

  const addCity = () => {
    setCities( [...cities,{id:Math.random(), name:cityName}]);
    setModalVisible(false);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const deleteCity = (deleteCity) => {
    let filteredArray = cities.filter(city => city.id !== deleteCity.id);
    setCities(filteredArray); 
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      // saving error
      console.log("Cities saving error!");
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
    }
  }
  
  const WeatherForecast = (params) => {
    const city = params.city;
    const API_KEY = '6cf02fa3bcdf6088f0be9199b77bf398';
    const URL = 'https://api.openweathermap.org/data/2.5/weather';

    const refreshForecast = () => {
      refetch();
    }
    
    const deleteCity = () => {
      params.deleteCity(city);
    } 
    let config: AxiosRequestConfig = {
      url: URL,
      method: 'GET',
      params: {
        q: city,
        appid: API_KEY,
        units: "metric" 
      }
    }

    const [{ data, loading, error }, refetch] = useAxios(
      config
    )

    if (loading) return (
      <Card>
        <Card.Title>Loading....</Card.Title>
      </Card>
    )
    if (error) return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    )

    // just for testing
    console.log(data);
    
      return (
          <Card>
            <Card.Title>{city}</Card.Title>
            <Text>Main: {data.weather[0].main}</Text>
            <Text>Temp: {data.main.temp} °C</Text>
            <Text>Temp_min: {data.main.temp_min} °C</Text>
            <Text>Temp_max: {data.main.temp_max} °C</Text>
            <View style={{paddingTop:10}}/>
            <Button title="-refresh" onPress={refreshForecast}/>
            <View style={{paddingTop:10}}/>
            <Button title="-del" onPress={deleteCity}/>
          </Card>
        );
  }

  return (
    <SafeAreaView>
      <Header
        centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}
      />

      <ScrollView>
        {cities.map(city => (
          <WeatherForecast
           key={city.id} 
           city={city.name} 
           deleteCity={deleteCity} />
        ))}
      </ScrollView>
      
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
          <Input
            onChangeText={ (text) => setCityName(text)}
            placeholder='Type cityname here'
          />
        </View>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>

  </SafeAreaView>
  );
 
};

export default App;