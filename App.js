
// import React from "react";
// import {stylesheet,Text,View,Image,TouchableOpacity} from 'react-native';
// import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import CustomTextinput from './Components/CustomTextinput';
// import styles from './Components/StyleSheet';
// import CustomButton from './Components/CustomButton';


// GoogleSignin.configure({
//   webClientId: '124722040029-7apaiausifqjqfqeuqfmh41gq55lmj17.apps.googleusercontent.com',
//   offlineAccess:true
// });



//   const googlesignin= async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//     // ("success:" + JSON.stringify(userInfo));
//       console.log(userInfo);
//     //  SocialLogin(userInfo)
//     } catch (error) {
//         console.log("errrroooorrrrrr", error)
     
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // operation (e.g. sign in) is in progress already
//       // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         // play services not available or outdated
//       } else {
//         console.log("niiiiiiiiiiiiiiii", error, error.code)
//         // some other error happened
       
//       }
//     }
//   };

// const App=()=>{
// return(
//   // <View style={{flex:1,backgroundColor:'pink',alignItems:'center',justifyContent:'center'}}>

    

//   //  <TouchableOpacity onPress={()=> googlesignin()}>
//   //   <Image style={{marginLeft:5}} source={require('./Assets/google.png')}/>
//   //   </TouchableOpacity>
//   //   {/* <TouchableOpacity>
//   //   <Image style={{marginTop:10}} source={require('./Assets/facebook.png')}/>
//   //  </TouchableOpacity> */}
//   // </View>

//   <View style={styles.LoginMainView}>
//   <View>
//       <View style={styles.LoginTextView}>
//           <Text style={styles.LoginText}>LOGIN</Text>
//       </View>
//       <CustomTextinput name='Email' ></CustomTextinput>
//       <CustomTextinput name='Password' ></CustomTextinput>
//       <CustomButton onButtonClick={() => navigationtosign()} name='LOGIN '></CustomButton>
//       <View style={styles.forgetView}>
//           <TouchableOpacity>
//               <Text style={styles.ForgetText}>Forget Password?</Text>
//           </TouchableOpacity>
//       </View>

//       <View style={styles.ImageView}>
//           <TouchableOpacity onPress={() => navigationtosign()} style={{ flexDirection: 'row' }}>
//               <Image resizeMode="contain" style={{ height: hp(20), width: wp(15) }} source={require('./Assets/google.png')}></Image>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => onFacebookButtonPress()}>
//               <Image resizeMode="contain" style={{ height: hp(8), width: wp(15), marginLeft: 10 }} source={require('./Assets/facebook.png')}></Image>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => signOut()}>
//               <Image resizeMode="contain" style={{ height: hp(8), width: wp(15), marginLeft: 10 }} source={require('./Assets/linkedin.png')}></Image>
//           </TouchableOpacity>
//       </View>
//       {/* <View style={styles.buttonContainer}>
//     {!loggedIn && <Text>You are currently logged out</Text>}
//     {loggedIn && (
//       <Button
//         onPress={signOut}
//         title="LogOut"
//         color="red"></Button>
//     )}
//   </View> */}

//       <View style={styles.AccountView}>
//           <Text style={{ marginTop: hp(.8), fontSize: 15 }}>Need an account?</Text>
//           <TouchableOpacity>
//               <Text style={styles.signup}> SIGN UP</Text>
//           </TouchableOpacity>
//       </View>


//   </View>
// </View>

// )
// } 
// export default App;


import React, {useState, useEffect} from 'react';


import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';


import { GoogleSignin ,
GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
 
    GoogleSignin.configure({
   
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '124722040029-7apaiausifqjqfqeuqfmh41gq55lmj17.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.container}>
            {userInfo !== null ? (
              <>
              <Text style={styles.text}>
                Thanks For Signing In!!
              </Text>
                <Image
                  source={{uri: userInfo.user.photo}}
                  style={styles.imageStyle}
                />
                <Text style={styles.text}>
                  Name: {userInfo.user.name}
                </Text>
                <Text style={styles.text}>
                  Email: {userInfo.user.email}
                </Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={_signOut}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  text:{
    fontWeight:'bold',
    fontSize:20
  }
});