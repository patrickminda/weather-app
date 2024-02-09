
import { StyleSheet, Text, View,ImageBackground,Dimensions, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BG from '../assets/BG.png';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImage } from '../constants';


export default function WeatherScreen() {

  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  

  const handleLocation = (loc) => {

    console.log ('location: ', loc);
    
    setLocations([]);
    toggleSearch(false);
      fetchWeatherForecast({
        cityName: loc.name,
        days: '7'
      }).then(data => {
        setWeather(data);
        console.log('got forecat: ', data)
      })
  }

  const handleSearch = value => {
  
    if(value.length > 2){
      fetchLocations({cityName: value}).then(data => {
      setLocations(data);
    })
    }
    
  }
  const handleTextDevounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;


  return (  
 
    <ImageBackground source={BG}  resizeMode="cover" style={styles.bgImage} >
    
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
                <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}> 22km</Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center'}}>
                <Image
                  source={require('../assets/icon/drop.png')} 
                  style={{height: 20, width: 20,}}
                />
                <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}> 23%</Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center'}}>
                <Image
                  source={require('../assets/icon/sun.png')} 
                  style={{height: 20, width: 20,}}
                />
                <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}> 6:05 AM</Text>
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

            
             
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 70, marginHorizontal: 10, padding: 5, borderRadius: 20,backgroundColor: 'rgba(255, 255, 255, 0.2)', }}>

                <Image
                  source={require('../assets/image/heavyrain.png')}
                  style={{width:50,height: 50}}
                />
                <Text style={{color: 'white'}}>Monday</Text>
                <Text style={{color: 'white'}}>  23&#176;</Text>
              </View>
             
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 70, marginHorizontal: 10, borderRadius: 20,backgroundColor: 'rgba(255, 255, 255, 0.4)', }}>

<Image
  source={require('../assets/image/heavyrain.png')}
  style={{width:50,height: 50}}
/>
<Text style={{color: 'white'}}>Monday</Text>
<Text style={{color: 'white'}}>  23&#176;</Text>
</View>

<View style={{ justifyContent: 'center', alignItems: 'center', width: 70, marginHorizontal: 10, borderRadius: 20,backgroundColor: 'rgba(255, 255, 255, 0.4)', }}>

                <Image
                  source={require('../assets/image/heavyrain.png')}
                  style={{width:40,height: 50}}
                />
                <Text style={{color: 'white'}}>Monday</Text>
                <Text style={{color: 'white'}}>  23&#176;</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', width: 70, marginHorizontal: 10, borderRadius: 20,backgroundColor: 'rgba(255, 255, 255, 0.4)', }}>

                <Image
                  source={require('../assets/image/heavyrain.png')}
                  style={{width:50,height: 50}}
                />
                <Text style={{color: 'white'}}>Monday</Text>
                <Text style={{color: 'white'}}>  23&#176;</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', width: 70, marginHorizontal: 10, borderRadius: 20,backgroundColor: 'rgba(255, 255, 255, 0.4)', }}>

                <Image
                  source={require('../assets/image/heavyrain.png')}
                  style={{width:50,height: 50}}
                />
                <Text style={{color: 'white'}}>Monday</Text>
                <Text style={{color: 'white'}}>  23&#176;</Text>
              </View>

            </ScrollView>
        </View>

    </View>
       
    </View>
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
