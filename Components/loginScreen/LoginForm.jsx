import {
  View, Text, TextInput, Button, StyleSheet, Pressable,
  TouchableOpacity, Alert,
} from 'react-native'
import {firebase ,db} from '../../firebase'
import React, { useState, } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required(' An Email is Required'),
    password: Yup.string().required()
      .min(6, 'Your Need to have atleast 6 character')
  })

     //This below code gets Random user Profilie picture from api


    //this Below code of line is Required to perform the Login and Validate

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log('Firebase Login Successfull', email, password)
    } catch (error) {
      Alert.alert(error.message)
      
    }
  }

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          onLogin(values.email, values.password)
          console.log(values)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >

        {({ handleChange, handleBlur, handleSubmit, values, isValid, }) => (

          <>

            <Text style={{ fontSize: 25, color: 'blue', alignSelf: 'center' }}>Instagramg</Text>
            <View style={[styles.InputField,
            { borderColor: values.email.length < 1 || Validator.validate(values.email) ? 'purple' : 'red' }
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
                value={values.email}
              />
            </View>

            <View style={[styles.InputField,
            {
              borderColor: 1 > values.password || values.password.length >= 6
                ? 'purple' : 'red'
            }
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
                value={values.password}

              />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#6BB0F5', fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}> Forgot Password</Text>
            </View>

            <Pressable style={styles.LoginButton(isValid)} onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ fontSize: 20 }}>Login</Text>
            </Pressable>

            <View style={styles.SignupContainer}>
              <Text style={{ fontSize: 20 }}>Dont Have an Account ? </Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={styles.signupText}>Sign Up</Text>
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

  LoginButton: (isValid) => ({
    backgroundColor: isValid ? '#0096F6' : '#a0d0fa',
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
export default LoginForm;