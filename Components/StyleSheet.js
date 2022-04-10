import React from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles=StyleSheet.create({
Splash:{
    flex:1,
     backgroundColor:'#ffffff',
     justifyContent:'center'
    },

     LoginMainView:{
        flex:1,
        backgroundColor:'#ffffff',
     },
    LoginTextView: {width:wp('80%'),alignSelf:'center',marginLeft:20,marginTop:hp('20%')},
LoginText:{fontSize:20,fontWeight:'bold',color:'black',marginLeft:wp(2)},
Checkbox:{marginLeft:wp('15%'),flexDirection:'row',marginTop:hp(1)},
Remember:{ marginTop: hp(.8), fontSize: 15 },
forgetView:{ alignSelf: 'flex-end', marginRight: wp(10) },
ForgetText:{ marginTop: hp(.8), fontSize: 15 },
ImageView:{ flexDirection: 'row', alignSelf: 'center', marginTop: wp(20) },
AccountView:{ alignSelf: 'center', marginRight: wp(10), flexDirection: 'row', marginTop: hp(2), marginLeft: wp(12) },
signup:{ marginTop: hp(.8), fontSize: 15, borderBottomWidth: 1,  }
});

export default styles;