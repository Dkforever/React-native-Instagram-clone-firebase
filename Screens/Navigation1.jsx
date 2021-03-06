
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import NewPostScreen from './NewPostScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'

//import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false,
}


export const Navigation1 = () => (


    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={screenOptions}
        >
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
       </Stack.Navigator>
    </NavigationContainer>
)


 export const SignedOutStack = () => (
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={screenOptions}
    >
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
   </Stack.Navigator>
</NavigationContainer>

 )

