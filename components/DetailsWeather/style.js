import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    mainContent: {
        flexDirection: 'row', 
        marginHorizontal: 2,
        alignItems: 'center'
    },
    text: {
        fontSize: 16, 
        fontWeight: '400'
    },
    icon: {
        height: 20,
        width: 20
    }
});

export default styles;