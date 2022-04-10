import { propConfig } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { View,Text,TextInput, TouchableOpacity } from "react-native";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const CustomButton=(prop)=>{
    return(
        <View>
             <TouchableOpacity onPress={prop.onButtonClick} style={{width:'80%',borderRadius:8,borderWidth:2,marginTop:8,height:hp(8),alignSelf:'center',backgroundColor:'#db355b',borderColor:'#db355b'}}>
           <View style={{alignSelf:'center',
            justifyContent:'center',width:wp(30),marginTop:hp(2),}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>
                {prop.name}
            </Text>
            </View>
       </TouchableOpacity>
       </View>
    );
}
export default CustomButton;