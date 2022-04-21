import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Stories from './Stories'
import { firebase } from '../firebase'

// code for SignOut Button
const handleSignOut = async () => {
    try {
        await firebase.auth().signOut()
        console.log('Signout Succesfull')
    } catch (error) {
        console.log(error)
    }
}



const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity  onPress={handleSignOut}>
                <Image style={styles.logo} source={require('../Asset/logo1.png')} />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image style={styles.headericon} source={require('../Asset/posticon.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.headericon} source={require('../Asset/hearticon1.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.unreadbadge}>
                        <Text>11</Text>
                    </View>
                    <Image style={styles.headericon} source={require('../Asset/messageicon.png')} />
                </TouchableOpacity>

            </View>

        </View>


    )
}



const styles = StyleSheet.create({

    container: {
        marginTop: 35,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    logo: {
        padding: 10,
        width: 150,
        height: 50,
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    headericon: {
        width: 40,
        height: 45,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    unreadbadge: {
        backgroundColor: 'red',
        position: 'absolute',
        left: 12,
        bottom: 25,
        width: 35,
        height: 28,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    }

})
export default Header;