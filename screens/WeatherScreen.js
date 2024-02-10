
import { StyleSheet, Text, View,ImageBackground,Dimensions, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BG from '../assets/BG.png';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImage } from '../constants';
import * as Progress from 'react-native-progress';
import { storeData, getData } from '../utils/asyncStorage';


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

console.log(weather?.forecast?.forecastday[4]?.day?.condition?.text);
  return (  
 
    <ImageBackground source={BG}  resizeMode="cover" style={styles.bgImage} >

      {
        loading? (
          <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
            <Progress.CircleSnail  thickness={10} size={140} color={'green'}/>
          </View>
        ):(
          
<View style={styles.container}>
          <View  style={[styles.serachBox, {backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.3)' : 'transparent'}]}>
  
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
  
      
  
  
      <View style={{ flex: 1,alignItems: 'center', justifyContent: 'space-evenly'}}>
  
            <Text style={{color: 'white',fontSize: 26, fontWeight: '700'}}> {location?.name}, 
               <Text style={{fontSize: 20, fontWeight: '400'}}>{" " + location?.country}</Text>
            </Text>
          
          <View style={{ justifyContent: 'center'}}>
              <Image
                 
                  source = {weatherImage[current?.condition?.text]}
                  style={{width: 200, height: 200,}}
              />
          </View>
  
          <View style={{ alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 36, fontWeight: '700'}}>  
              {current?.temp_c}&#176;
              </Text>
              <Text style={{color: 'white', fontSize: 22, letterSpacing: 0.5 }}>  
              {current?.condition?.text}
              </Text>
          </View>
  
  
          <View style={{flexDirection: 'row', justifyContent: 'space-around',width: '100%'}}>
              <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../assets/icon/wind.png')} 
                    style={{height: 20, width: 20,}}
                  />
                  <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}> 
                  {current?.wind_kph}km</Text>
              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../assets/icon/drop.png')} 
                    style={{height: 20, width: 20,}}
                  />
                  <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}> {current?.humidity}%</Text>
              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../assets/icon/sun.png')} 
                    style={{height: 20, width: 20,}}
                  />
                  <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}> {weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
              </View>
          </View>
  
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
                  <Text style={{color: 'white', fontSize: 16}}>{dayName}</Text>
                  <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>  {item?.day?.avgtemp_c}&#176;</Text>
                </View>
                    )
                  })
                }
               
  
              </ScrollView>
          </View>
  
      </View>
         
     </View>
        )
      }
    
    
    </ImageBackground> 

    
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 100,
    
  }, 
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 50,
  },
  serachBox: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginTop: 45,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  serachInput: {
   padding: 10,
   marginLeft: 10,
   color: 'white',
   width: '80%',
   fontSize: 18,
  },
  searchIcon: {
   backgroundColor: 'red',
   height: 50,
   width: 50,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 50,
   backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  searchView: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    zIndex: 1 ,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  textLocation: {
    fontSize: 18,
    marginLeft: 5,
  }
});
