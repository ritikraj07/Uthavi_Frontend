import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import MyDrawer from "./DrawerNavigator";
import SignUp from "../Screens/SignUp";
import Login from "../Screens/Login";
import CreateGroup from "../Screens/CreateGroup";
import AddMembers from "../Screens/AddMembers";

const Stack = createStackNavigator();

export default function StackTabs() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>     
                       
                <Stack.Screen name="LogIn" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="AddMembers" component={AddMembers} />
                <Stack.Screen name="CreateGroup" component={CreateGroup} />
                <Stack.Screen name="Drawer" component={MyDrawer} />     
                                  
            </Stack.Navigator>
        </NavigationContainer>
    );
}
