import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => (
    <View>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation} />
    </View>

)




const Header = ({navigation}) => (
    <View>
        <View style={styles.container1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={{ uri: 'https://img.icons8.com/fluency/344/back.png', }}
                    style={{ width: 30, height: 30, }} />
            </TouchableOpacity>
            <Text style={styles.headerText} > New Post</Text>
            <Text> </Text>
        </View>

    </View>
)

const styles = StyleSheet.create({
    container1: {
        fontSize: 22,
        fontWeight: 'bold',
        justifyContent:'space-between',
        marginTop: 19,
        flexDirection: 'row',

    },
    headerText:{
        fontSize: 22,
        fontWeight: 'bold',

    }


})

export default AddNewPost;
