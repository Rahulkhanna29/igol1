// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image,Button } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import CustomTextinput from "./CustomTextinput";
import styles from "./StyleSheet";
import CustomButton from "./CustomButton";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
    webClientId:
      "292258466843-fbb5rd51mmccg65lc8gvhcq7ajmaim38.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   offlineAccess: true,
    });

// import auth from '@react-native-firebase/auth';
const LoginPage = ({ navigation }) => {
    const [loggedIn, setloggedIn] = useState(false)



    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '384657422468-fnd4eocft1696rsltgm0st1f1lp68j53.apps.googleusercontent.com',
    //         offlineAccess: true,
    //     });
    // }, []);


    // const navigationtosign = async () => {

    //     try {
    //         const { idToken } = await GoogleSignin.signIn();
    //         const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    //         const res = await auth().signInWithCredential(googleCredential);
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }
    
 const navigationtosign = async () => {
    console.log("UNDRRRRRRR--------" );
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("cATCGHHHHHHHH--1------" , userInfo);
    
    //   LoginUser("2", "1", userInfo.user.id, userInfo.user.email);
    } catch (error) {
      console.log(error);

      console.log("cATCGHHHHHHHH---2-----" , error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log("esle" , error.code);
        // some other error happened
      }
    }
  };

//  const   navigationtosign = async () => {
//     console.log("enter");  
//         try {
//           await GoogleSignin.hasPlayServices();
//           const {accessToken, idToken} = await GoogleSignin.signIn();
//           console.log("enter   try");
//           setloggedIn(true);
//         } catch (error) {
//             console.log("enter   catch",error);
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//             alert('Cancel');
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//             alert('Signin in progress');
//             // operation (f.e. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             alert('PLAY_SERVICES_NOT_AVAILABLE');
//             // play services not available or outdated
//           } else {
//             alert('else  p   '+error);
//             // some other error happened
//           }
//         }
//       };

  

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
          } catch (error) {
            console.error(error);
          }
    };


    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <View style={styles.LoginMainView}>
            <View>
                <View style={styles.LoginTextView}>
                    <Text style={styles.LoginText}>LOGIN</Text>
                </View>
                <CustomTextinput name='Email' ></CustomTextinput>
                <CustomTextinput name='Password' ></CustomTextinput>
                <View style={styles.Checkbox}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <TouchableOpacity>
                        <Text style={styles.Remember}>Remember me?</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton onButtonClick={() => navigationtosign()} name='LOGIN '></CustomButton>
                <View style={styles.forgetView}>
                    <TouchableOpacity>
                        <Text style={styles.ForgetText}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ImageView}>
                    <TouchableOpacity onPress={() => navigationtosign()} style={{ flexDirection: 'row' }}>
                        <Image resizeMode="contain" style={{ height: hp(20), width: wp(15) }} source={require('../assets/google.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onFacebookButtonPress()}>
                        <Image resizeMode="contain" style={{ height: hp(8), width: wp(15), marginLeft: 10 }} source={require('../assets/facebook.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => signOut()}>
                        <Image resizeMode="contain" style={{ height: hp(8), width: wp(15), marginLeft: 10 }} source={require('../assets/linkedin.png')}></Image>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={signOut}
                  title="LogOut"
                  color="red"></Button>
              )}
            </View> */}

                <View style={styles.AccountView}>
                    <Text style={{ marginTop: hp(.8), fontSize: 15 }}>Need an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signup}> SIGN UP</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
}
export default LoginPage;



