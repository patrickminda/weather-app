import { StyleSheet, Dimensions } from "react-native";

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
       paddingTop: 10,
       alignItems: 'center',
    
       borderRadius: 50,
       backgroundColor: 'rgba(192, 192, 192, 0.8)',
      },
      searchView: {
        position: 'absolute',
      top: 100, 
      backgroundColor: 'pink',
        borderRadius: 20,
        width: '100%',
        zIndex: 2 ,
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
      }, 
      cityText: {
        
        fontSize: 26, 
        fontWeight: '700'
      },
      countryText: {
        fontSize: 20, 
        fontWeight: '400'
      },
      currentTemp: {
       fontSize: 36, 
       fontWeight: '700'
      }, 
      currentTempText: {
        fontSize: 22, 
        letterSpacing: 0.5
      }

});

export default styles;