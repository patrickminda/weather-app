
import {Text, View,Image, } from 'react-native';
import styles from './style';

const DetailsWeather = ({current, weather}) => {

  return (  

                  <View style={styles.container}>
                        <View style={styles.mainContent}>
                            <Image
                              source={require('../../assets/icon/wind.png')} 
                              style={styles.icon}
                            />
                            <Text style={styles.text}> 
                                {current?.wind_kph}km 
                            </Text>
                        </View>

                        <View style={styles.mainContent}>
                            <Image
                              source={require('../../assets/icon/drop.png')} 
                              style={styles.icon}
                            />
                            <Text style={styles.text}> 
                                {current?.humidity}%
                            </Text>
                        </View>

                        <View style={styles.mainContent}>
                            <Image
                              source={require('../../assets/icon/sun.png')} 
                              style={styles.icon}
                            />
                            <Text style={styles.text}> 
                                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                            </Text>
                        </View>
               </View>
  )
}

export default DetailsWeather;