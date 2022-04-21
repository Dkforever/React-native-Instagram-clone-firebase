import { View, Text } from 'react-native'
import React from 'react'
import Post from './Post'
import { POSTS } from '../data/Postdata';
import { ScrollView } from 'react-native-web'

const Postmain = (post) => {
  return (
      <View>
   <ScrollView>
     {POSTS.map((post, index) =>(
                <Post post={post} key={index} />
                ))}
   </ScrollView>
   </View>
  )
}

export default Postmain