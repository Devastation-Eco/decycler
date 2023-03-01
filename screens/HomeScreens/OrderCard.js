import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { GlobeEuropeAfricaIcon, ScaleIcon, } from 'react-native-heroicons/outline'

const OrderCard = (
    {
        id,
        imgurl,
        title,
        material,
        short_description,
        weight,
        long,
        lat,
        nav
    }
) => {
  return (
    <TouchableOpacity
        className="bg-white mt-4 mb-5 mx-4 rounded-lg"
        onPress={() => {nav.navigate("UserPost", {
            imgurl: imgurl,
            weight: weight,
            material: material,
            title: title,
            description: short_description,
            longitude: long,
            latitude: lat,
            uniqueid: id,
        })}}>
            
        <Image source={{uri:imgurl}} className="h-[200px] w-full rounded-md"/>
        <Text className="text-[#050505] font-bold text-lg pt-1 pl-4">{title}</Text>
        
        <View className='px-3 pb-2'>
            <View className='flex-row space-x-8 pt-1'>
                <View className='flex-row items-center space-x-1'>
                    <GlobeEuropeAfricaIcon color='#086b2e' opacity={0.5} size={22}/>
                    <Text className='text-gray-500 text-xs'>{material}</Text>
                </View>

                <View className='flex-row items-center space-x-1'>
                    <ScaleIcon color='#086b2e' opacity={0.5} size={22}/>
                    <Text className='text-gray-500 text-xs'>{weight}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default OrderCard