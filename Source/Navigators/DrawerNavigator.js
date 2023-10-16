import { } from 'react'
import {View, Text} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomNavigator';
import CustomDrawer from '../Components/CustomDrawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator options={{headerShown:false}} drawerContent={props =><CustomDrawer {...props} />} >
            <Drawer.Screen name="BottomTab" component={BottomTabs} options={{headerShown:false}} />
        </Drawer.Navigator>
    );
}



export default MyDrawer