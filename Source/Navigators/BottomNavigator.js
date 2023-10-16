import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons, FontAwesome, AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Dashboard from '../Screens/Dashboard';
import Lottery from '../Screens/Lottery';
import Profile from '../Screens/Profile';
import Members from '../Screens/Members';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'black'
        }} >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                tabBarIcon: ({focused,color}) => {
                    return <AntDesign name="windows" size={24} color={color} />
            }}} />
            <Tab.Screen name="Lottery" component={Lottery}
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Fontisto name="spinner-fidget" size={24} color={color} />
                    }
                }}
            />
            {/* <Tab.Screen name='Members' component={Members} options={{
                tabBarIcon: ({ focused, color }) => {
                    return <FontAwesome name="group" size={24} color={color} />
                }
            }} /> */}
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused, color }) => {
                    return <MaterialCommunityIcons name="account" size={30} color={color} />
                }
            }} />

        </Tab.Navigator>
    );
}

export default BottomTabs