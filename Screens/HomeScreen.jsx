import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Stories from '../Components/Stories';
import Header from '../Components/Header';
import Post from '../Components/Post';
import { POSTS } from '../data/Postdata';

import BottomTabs, { bottomTabIcons } from '../Components/BottomTabs';
import { firebase, db } from '../firebase';


const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([])


    {/*This is normal backup code without backen
   
useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => doc.data()))
})
}, [])
*/}

    useEffect(() => {
        db.collectionGroup('posts')
        .orderBy('createdAt', 'desc')
                   .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })))
            })
    }, [])

    return (

        <View>


            <Header navigation={navigation} />
            <Stories />

            <ScrollView>
                {posts.map((post, index) => (

                    <Post post={post} key={index} />
                ))}
            </ScrollView>

            <BottomTabs icons={bottomTabIcons} />

        </View>


    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',


        justifyContent: 'center',
        marginBottom: 20,
    },
}
)
export default HomeScreen;

