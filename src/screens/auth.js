import { View, Text, Button, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



GoogleSignin.configure({
  webClientId: 'AIzaSyA1HAJz-3qho9yjO7QODcuodT03iO5iEO8',
  offlineAccess: true,
  scopes: [
    'https://www.googleapis.com/auth/user.gender.read',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/gmail.readonly',
  ],
});

const AuthLogin = () => {
  // Save User Data to Firestore
  const saveUserToFirestore = async (firebaseUser, googleUser) => {
    try {
      await firestore().collection('users').doc(firebaseUser.uid).set({
        email: googleUser.email,
        name: googleUser.name,
        photo: googleUser.photo,
        lastLogin: firestore.FieldValue.serverTimestamp(),
      });
      console.log('User saved to Firestore');
    } catch (error) {
      console.error('Firestore Error:', error);
    }
  };

  useEffect(() => {
  }, []);

  const login = async () => {
    try {
      // Check for Google Play Services
      await GoogleSignin.hasPlayServices();
      // Sign In and Retrieve ID Token
      const { idToken, user } = await GoogleSignin.signIn();
      // Create Firebase Credentials
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-In with Firebase
      const userCredential = await auth().signInWithCredential(googleCredential);
      // Save User Info to Firestore
      await saveUserToFirestore(userCredential.user, user);
      console.log('User Info:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };


  return (
    <View>
      <Text>auth</Text>
      <Pressable onPress={() => login()}>
        <Text>efrddfy</Text>
      </Pressable>
    </View>
  )
}

export default AuthLogin;