import { } from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Navbar({ header, navigation}) {
    return (<View style={{
        width: '100%',
        backgroundColor: 'purple',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginTop:-1
        
    }} >
        <StatusBar backgroundColor='purple' barStyle='light-content' />
        <TouchableOpacity onPress={() => navigation.openDrawer()} >
            <MaterialCommunityIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize:20, fontWeight:'600', marginHorizontal:10, color:"white"}} >{header}</Text>
    </View>)
}