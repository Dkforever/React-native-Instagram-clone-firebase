import { View, Text, Image,StyleSheet, TextInput } from 'react-native'
import React from 'react'
import SignupForm from '../Components/signupScreen/SignupForm'
//import LoginForm from '../Components/loginScreen/LoginForm'


const INSTAGRAMLOGO ='https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg'

const SignupScreen = ({navigation}) => (
  
    <View style={styles.container}>  
      <View style={styles.LogoContainer}>
       <Image source={require('../Asset/Instagram-logo.png')}  style={styles.logo } />
      </View>
    
    
      {/* Login Form */}
      <SignupForm navigation={navigation} />
   

    </View>
  )

const styles = StyleSheet.create({
   container:{
     flex:1,
     padding:50,
     paddingHorizontal:12,
   },
    LogoContainer:{
      alignItems:'center',
      marginTop:60,
    },
    logo:{
      width:150,
      height:150,
    },

})

export default SignupScreen;