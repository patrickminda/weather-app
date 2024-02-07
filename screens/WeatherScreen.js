
import { StyleSheet, Text, View,ImageBackground,Dimensions, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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

    


    <View style={{ flex: 1,alignItems: 'center', justifyContent: 'space-evenly'}}>

          <Text style={{color: 'white',fontSize: 22, fontWeight: '700'}}> London, 
             <Text style={{fontSize: 18, fontWeight: '400'}}>United Kingdom</Text>
          </Text>
        
        <View style={{ justifyContent: 'center'}}>
            <Image
                source = {require('../assets/image/partlycloudy.png')}
                style={{width: 200, height: 200,}}
            />
        </View>

        <View style={{ alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 36, fontWeight: '700'}}>  
              23&#176;
            </Text>
            <Text style={{color: 'white', fontSize: 22, letterSpacing: 0.5 }}>  
              Partly Cloudy
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

        <View style={{width: '100%', backgroundColor: 'red'}} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo name="calendar" size={18} color="white" />
                <Text style={{color: 'white' }}> Daily forecast</Text>
            </View>

            <ScrollView 
               horizontal
               contentContainerStyle={{paddingHorizontal: 15}}
               showsHorizontalScrollIndicator={false}
            >

            
             
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 70, marginHorizontal: 10, borderRadius: 20,backgroundColor: 'rgba(255, 255, 255, 0.4)', }}>

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
    marginBottom: 30,
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
