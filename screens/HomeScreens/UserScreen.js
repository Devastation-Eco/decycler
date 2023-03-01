import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import{
  UserIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, firestore } from '../../firebase';
import { FlatList } from 'react-native-gesture-handler';
import OrderCard from './OrderCard';

const UserScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore.collection("users")
    .doc(auth.currentUser.uid).get()
    .then(snapshot => {
      if(snapshot.exists){
        setData(snapshot.data());
      }
    })
  }, []);

  useEffect(() => {
    firestore.collection("posts")
    .onSnapshot(querrySnapshot => {
      const tempPosts = [];

      querrySnapshot.forEach(documentSnapshot => {
          const buffer = documentSnapshot.data();
          if(buffer.user === auth.currentUser.uid){
            tempPosts.push({
              ...buffer
            });
          }
      });

      setPosts(tempPosts);
    });
  }, []);

  return (
    <SafeAreaView className='bg-white pt-1 flex-1'>
    {/* Header */}  
      <View className='flex-row items-center '> 
        <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}} className='px-3 pb-3'>
          <UserIcon size={35} color='#086b2e'/>   
        </TouchableOpacity>

        <View className='flex-1 items-center'>
          <Text className='font-bold text-[#086b2e] text-lg'>Your Posts</Text>
        </View>

        <View className=' items-end mx-3 space-x-2 pb-4 '>
          <Image source={require("../logo2.png")} className='h-12 w-12 p-4 rounded-full'/>
        </View> 
      </View>

    

     {/* Listings */}
      <FlatList 
        className='bg-gray-100'
        data={posts}
        contentContainerStyle={{paddingBottom:100}}
        renderItem={({ item }) => (
          <OrderCard 
            id={item.uniqueid}
            imgurl={item.imgurl}
            title={item.title}
            short_description={item.description}
            long={item.longitude}
            lat={item.latitude}
            weight={item.weight}
            material={item.material}
            nav={navigation}
          />
        )}
      />

      {/* New post button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('AddNewPost')}}>
            <Text style={styles.buttonText}>New Post</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default UserScreen

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({

  buttonContainer: {
    position: 'absolute',
    width: "100%",
    alignItems: "center",
  },
  button:{
    backgroundColor: "#086b2e",
    width: "50%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 20,
    top: SCREEN_HEIGHT-120,
  },
  buttonText:{
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
});
