import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import Navigation1 from '../../Screens/Navigation1'
import { firebase,db} from '../../firebase'




const PLACEHOLDER_IMG = 'https://img.icons8.com/dusk/64/000000/upload.png'


const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().required('A url is require'),
    caption: Yup.string().max(2200, 'Caption is Required')
})



const FormikPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
            }
            )})
        )
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

                    // now Below code is to Upload post to firebase
         const uploadPostTofirebase =(imageUrl , caption ,) => {
                const unsubscribe = db
                .collection('users')
                .doc(firebase.auth().currentUser.email)
                .collection('posts')
                .add({
                    imageUrl: imageUrl, 
                    user: currentLoggedInUser.username,
                    profile_picture : currentLoggedInUser.profilePicture,
                    owner_uid: firebase.auth().currentUser.uid,
                    owner_email: firebase.auth().currentUser.email, 
                    caption : caption,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),   
                    likes_by_users : [],
                    comments : [],
                })
                .then(() => navigation.goBack())  

              return unsubscribe
         }           
                   

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={values => {
                uploadPostTofirebase(values.imageUrl, values.caption)
                console.log(values)
                console.log('Your form is submitted successfully')
                navigation.goBack()
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
                <>
                    <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Image
                            source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
                            style={{ width: 100, height: 100 }} />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <TextInput
                                style={{ color: 'black', fontSize: 20 }}
                                placeholder='Enter Caption' placeholderTextColor='red'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Divider width={3} orientation="vertical" />
                    <TextInput
                        onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: 'blue', fontSize: 20, marginLeft: 10 }}
                        placeholder='Enter Image URL' placeholderTextColor='red'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ color: 'red', fontSize: 20, marginLeft: 10 }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>

            )}


        </Formik>
    )
}

export default FormikPostUploader;