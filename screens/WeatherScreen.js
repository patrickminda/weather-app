
import { StyleSheet, Text, View,ImageBackground,Dimensions, TextInput, TouchableOpacity } from 'react-native';
import BG from '../assets/BG.png';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { useState } from 'react';

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

export default function WeatherScreen() {

  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1,2,3]);

  const handleLocation = (loc) => {
    console.log ('location: ', loc);
  }

  return (  
 
    <ImageBackground source={BG}  resizeMode="cover" style={styles.bgImage}>
    
    <View style={styles.container}>

        <View  style={[styles.serachBox, {backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.3)' : 'transparent'}]}>

          {
            showSearch ? (
                    <TextInput 
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
                   onPress={() => handleLocation()}
                    key={index}
                    style={styles.locationItem}
                   >
                        <Entypo name="location-pin" size={22} color="gray" />
                        <Text style={styles.textLocation}>London, United Kingdom</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            ): null
            
             
        }

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
    opacity: 0.9,
  }, 
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
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
   flex: 1,
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
