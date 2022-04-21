import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import AddNewPost from '../Components/newPost/AddNewPost'

const NewPostScreen = ({navigation}) => {
  return (
      
    
        <View> 
        <AddNewPost  navigation={navigation}/>
        </View>
    
    
  )
}

export default NewPostScreen

const style = StyleSheet.create({ 

})