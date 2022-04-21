import { View, Text, ScrollView, Image,StyleSheet } from 'react-native'
import React from 'react'
import { USERS } from '../data/Users'


const Stories = () => {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

               {/* This line fetch data one by one  */}
 
                {USERS.map((story, index) => (
                    <View key= {index}style={{alignItems:'center'}}> 
                    <Image source={{ uri: story.image }} style={styles.story} />
                    <Text style={{alignItems:'center',marginLeft:10,}}>
                
            {/*This line shorts the name ...  */}

                    {story.user.length > 11 
                    ? story.user.slice(0, 6).toLowerCase() +'...'
                    : story.user.toLowerCase()}
                    </Text>
                    </View>
                ))}

            </ScrollView>
            
        </View>
    )
}


const styles = StyleSheet.create({
    story: {
          width: 60,
            height: 60,
            borderRadius: 40,
            marginHorizontal: 2,
            marginLeft:18,
            borderWidth:3,
            borderColor: '#ff8501',
    },
    storyuser:{

    },
})

export default Stories;