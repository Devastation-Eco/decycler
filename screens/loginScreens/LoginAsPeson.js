import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { KeyboardAvoidingView } from 'react-native';
import { TextInput, Dimensions} from 'react-native';

import { auth } from "../../firebase";
import { firestore } from '../../firebase';

import * as Animatable from 'react-native-animatable';

const LoginAsPerson = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      let threwError = false;
      await auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
          alert(error.message);
          threwError = true;
      });

      if(!threwError)
      {
          if(!auth.currentUser.emailVerified){
              alert("Verify your email to continue");
          }
          else{
              await firestore.collection("users").doc(auth.currentUser.uid).get()
              .then(snapshot => {
                if(snapshot.exists){
                  if(snapshot.data().userType === "seller"){
                    navigation.navigate('UserPage');
                  }
                  else{
                    alert("Account already created as a buyer");
                    auth.signOut();
                  }
                }
              })
          }
      }
    } 

    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <TouchableOpacity style={{width: "100%", alignItems: "center", position: "absolute"}} onPress={() => {navigation.navigate("Decide")}}>
          <Animatable.Image
            style={styles.backButton}
            animation="bounceInRight"
            duration={1600}
            source={require('../../assets/stanga.png')}
          /> 
        </TouchableOpacity>
      
        <Animatable.Image 
          className="h-[200px] w-[200px]" 
          source={require('../../assets/logo.png')}
          animation="fadeInDown"
          duration={1600}
        /> 
        
        <Animatable.View style={styles.inputContainer} animation="bounceInLeft" duration={1600}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </Animatable.View>

        <Animatable.View style={styles.buttonContainer} animation="bounceInUp" duration={1600}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login as a person</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{margin: 15}} onPress={() => {navigation.navigate("Register as seller")}}>
            <Text style={styles.signUpText}>Create a new account</Text>
          </TouchableOpacity>
                
        </Animatable.View>
          
      </KeyboardAvoidingView>
  );
}

export default LoginAsPerson;

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton:{
    width: 40,
    height: 40,
    backgroundColor: "green",
    borderRadius: 50,
    right: SCREEN_WIDTH/2-40,
    bottom: SCREEN_HEIGHT/2-80,
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button:{
    elevation: 10,
    backgroundColor: "#086b2e",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText:{
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  signUpText: {
    color: "#067069",
    fontWeight: "320",
    fontSize: 16,
},
});
