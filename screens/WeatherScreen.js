
import { StyleSheet, Text, View,ImageBackground, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BG from '../assets/BG.png';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImage } from '../constants';
import * as Progress from 'react-native-progress';
import { storeData, getData } from '../utils/asyncStorage';
import styles from "./style";
import DetailsWeather from '../components/DetailsWeather';


export default function WeatherScreen() {

  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {

   
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
      fetchWeatherForecast({
        cityName: loc.name,
        days: '7'
      }).then(data => {
        setWeather(data);
        setLoading(false);
        storeData('city', loc.name)
     
      })
  }

  const handleSearch = value => {
  
    if(value.length > 2){
      fetchLocations({cityName: value}).then(data => {
      setLocations(data);
    })
    }
    
  }

  useEffect(() => {
    fetchMyWeatherData();
  }, []);


   
   const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'London';
    if (myCity) cityName = myCity;
      fetchWeatherForecast({
        cityName,
      days: '7'
      }). then(data => {
        setWeather(data); 
        setLoading(false);
      })
      
  }
  const handleTextDevounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;

  return (  
 
    <ImageBackground source={BG}  resizeMode="cover" style={styles.bgImage} >

      {
        loading? (
          <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
            <Progress.CircleSnail  thickness={10} size={140} color={'green'}/>
          </View>
        ):(
          
          <View style={styles.container}>
                <View  style={[styles.serachBox, {backgroundColor: showSearch ? 'rgba(192, 192, 192, 0.5)' : 'transparent'}]}>
                    {
                      showSearch ? (
                              <TextInput 
                                onChangeText={handleTextDevounce}
                                placeholder = 'Search city' 
                                placeholderTextColor={'lightgray'} 
                                style={styles.serachInput}
                            />
                      ): null
                    }
          
                            <TouchableOpacity 
                              onPress={() => toggleSearch(!showSearch)}
                              style={styles.searchIcon}
                            >
                                <EvilIcons  name="search" size={30} color="white" />
                            </TouchableOpacity>
                </View>
  
          <View style={{ flex: 1,alignItems: 'center', justifyContent: 'space-evenly'}}>
      
                    <Text style={styles.cityText}> {location?.name}, 
                      <Text style={styles.countryText}>{" " + location?.country}</Text>
                    </Text>
                  
                  <View style={{ justifyContent: 'center'}}>
                      <Image source = {weatherImage[current?.condition?.text]} style={{width: 180, height: 180,}} />
                  </View>
          
                  <View style={{ alignItems: 'center'}}>
                      <Text style={styles.currentTemp}>  
                          {current?.temp_c}&#176;
                      </Text>
                      <Text style={styles.currentTempText}>  
                          {current?.condition?.text}
                      </Text>
                  </View>
          
          
               <DetailsWeather  current={current} weather = {weather}/>
               
      
              <View style={{width: '100%', alignItems: 'flex-start'}} >
                  <View style={{flexDirection: 'row',  marginBottom: 10, marginLeft: 15,}}>
                      <Entypo name="calendar" size={18} color="white" />
                      <Text style={{color: 'white' }}> Daily forecast</Text>
                  </View>
      
                  <ScrollView 
                    horizontal
                    contentContainerStyle={{paddingHorizontal: 15}}
                    showsHorizontalScrollIndicator={false}
                    
                  >
      
                    {
                      weather?.forecast?.forecastday?.map((item, index) => {
                        let date = new Date(item.date);
                        let options = {weekday: 'long'};
                        let dayName = date.toLocaleDateString('en-US', options);
                        dayName = dayName.split(',')[0]
      
                  
      
                        return(
                          
                          <View  key = {index} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: 120,justifyContent: 'space-evenly', marginHorizontal: 10, paddingVertical: 5, height:120, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
      
                      <Image
                        source={weatherImage[item?.day?.condition?.text] || require('../assets/image/moderaterain.png')}
                        style={{width:50,height: 50}}
                      />
                      <Text style={{fontSize: 16}}>{dayName}</Text>
                      <Text style={{fontSize: 18, fontWeight: '500'}}>  {item?.day?.maxtemp_c}&#176;</Text>
                    </View>
                        )
                      })
                    }
                  
      
                  </ScrollView>
              </View>
      
          </View>

          {
            locations.length > 0 && showSearch ? (
              <View style={styles.searchView}>
                {
                  locations.map((loc, index) => {
                    return (
                     <TouchableOpacity
                     onPress={() => handleLocation(loc)}
                      key={index}
                      style={styles.locationItem}
                     >
                          <Entypo name="location-pin" size={22} color="gray" />
                          <Text style={styles.textLocation}>{loc?.name}, {loc?.country}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              ): null 
          }

     </View>
        )
      }
    </ImageBackground> 
  );
}