import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const DressItem = ({item}) => {
  return (
    <View style={{backgroundColor:'white', margin:10, borderRadius: 7}}> 
      <Pressable
        style={{
          backgroundColor: "#f8f8f8f",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
        </View>
        <Pressable style={{width:80}}>
            <Text style={{borderColor:"gray", borderWidth: 0.8, marginVertical:10, color:'#088f8f', textAlign:'center', padding:5, borderRadius:6}}>Add</Text>
        </Pressable>
      </Pressable>
    </View>
  );
}

export default DressItem

const styles = StyleSheet.create({})