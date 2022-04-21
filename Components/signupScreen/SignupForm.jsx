import {
    View, Text, TextInput, Button, StyleSheet, Pressable,
    TouchableOpacity
  } from 'react-native'
  import React, { useState } from 'react'
  import { Formik } from 'formik'
  import * as Yup from 'yup'
  import Validator from 'email-validator'
  import {firebase, db} from '../../firebase'
  
  const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
      email: Yup.string().email().required(' An Email is Required'),
      username: Yup.string().required().min(2,'Username is Required'),
      password: Yup.string().required()
        .min(6, 'Your Need to have atleast 6 character')
    })

    // This below code gets Random user Profilie picture from api
    const getRandomProfilePicture = async () => {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      return data.results[0].picture.large
    }

    // to signup the user on firebabse 
    const onSignup = async (email, password, username) => {
      try {
      const authUser =  await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log('Firebase Signup Successfull', email, password)
        db.collection('users').doc(authUser.user.email).set({
          owner_uid: authUser.user.uid,
          username: username,
        email: authUser.user.email,
      profile_picture: await getRandomProfilePicture(),
      })
      }catch(error){
        Alert.alert(error.message)
      }
    }
  
    return (
      <View>
        <Formik
          initialValues={{ email: '', username:''  ,password: '',  }}
          onSubmit={values => {
            onSignup(values.email, values.password, values.username)
            console.log(values)
          }}
          validationSchema={SignupFormSchema}
          validateOnMount={true}
        >
  
          {({ handleChange, handleBlur, handleSubmit, values,isValid,}) => (
  
            <>
  
              <Text style={{ fontSize: 25, color: 'blue', alignSelf: 'center' }}>Instagramg</Text>
              <View style={[styles.InputField,
              {borderColor: values.email.length <1 || Validator.validate(values.email) ? 'purple' :'red' }
              ]}>
                <TextInput
                  placeholderTextColor='#444'
                  placeholder='Phone Number'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus={true}
                  style={styles.formText}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value= {values.email}
                />
              </View>


              <View style={[styles.InputField,
              
                {borderColor: 1> values.username || values.username.length >=2
                    ? 'purple' : 'red'}
                
             ]}>
                <TextInput
                  placeholderTextColor='#444'
                  placeholder='Username'
                  autoCapitalize='none'
                
                  autoFocus={true}
                  style={styles.formText}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value= {values.username}
                />
              </View>
  
              <View style={[styles.InputField,
              {borderColor: 1> values.password || values.password.length >=6
              ? 'purple' : 'red'}
              ]}>
                <TextInput
                  placeholder='Password'
                  placeholderTextColor='#444'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType='password'
                  style={styles.formText}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value= {values.password}
  
                />
              </View>
  
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#6BB0F5', fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}> Forgot Password</Text>
              </View>
  
              <Pressable style={styles.LoginButton(isValid)} onPress={handleSubmit}
              disabled={!isValid}
              >
                <Text style={{ fontSize: 20 }}>Sign Up</Text>
              </Pressable>
  
              <View style={styles.SignupContainer}>
                <Text style={{ fontSize: 20 }}>Already have an Account ? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.signupText}> Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
  
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    InputField: {
      marginTop: 10,
      alignContent: 'center',
      borderRadius: 5,
      borderColor: 'purple',
      padding: 10,
      marginBottom: 10,
      borderWidth: 2,
      fontSize: 16,
    },
    formText: {
      fontSize: 20,
    },
  
    LoginButton:(isValid) => ({
      backgroundColor: isValid ?'#0096F6' :'#a0d0fa',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 4,
      padding: 10,
      width: '50%',
    }),
    SignupContainer: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
  
    },
    signupText: {
      fontSize: 20,
      color: 'blue',
    }
  
  })
  export default SignupForm;