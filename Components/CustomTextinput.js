import React from "react";
import { View,Text,  } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomTextinput=(prop)=>{
    return(
<View >
    <View style={{flexDirection:'column',backgroundColor:'white',width:wp('80%'),alignSelf:'center',height:80, marginTop:20}}>
        <Text style={{color:'#db355b',marginLeft:20,fontSize:16}}>{prop.name}</Text>
        <TextInput style={{width:'90%',borderRadius:8,borderWidth:2,marginLeft:20,marginTop:8}}></TextInput>
    </View>
</View>

    );
}
export default CustomTextinput;