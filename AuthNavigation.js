
import React, { useEffect, useState } from 'react'
import { Navigation1, SignedOutStack } from './Screens/Navigation1'
import {firebase} from './firebase'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState (null)

    const userHandler = user => 
    user ? setCurrentUser(user) : setCurrentUser(null)


    useEffect(
        () => firebase.auth().onAuthStateChanged(user => userHandler(user)),
        []
    )
    return ( 
        currentUser ? <Navigation1 /> : <SignedOutStack />
    ) 

}

export default AuthNavigation