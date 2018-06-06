import React, { Component } from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes'
import Login from './screens/Login';
import {Provider} from 'react-redux';
import { store, persistor }  from './config/store';
import { PersistGate } from "redux-persist/integration/react";
import { Platform, AsyncStorage, AppState, BackHandler, } from 'react-native';

import FCM, {FCMEvent,RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";
import firebase from 'firebase'

import './reducers'

import { registerKilledListener, registerAppListener } from "./Listeners";
import firebaseClient from "./FirebaseClient";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  ScrollView,
  ToastAndroid
} from "react-native";
import { StackNavigator } from "react-navigation";


registerKilledListener();

EStyleSheet.build({
    $primaryBlue: '#1919ff',
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#9E768F',    
    $darkText: '#343434',
    $white: '#FFFFFF',
    $lightGray: '#F0F0F0',
    $border: '#979797',
    $inputText: '#797979',
    $buttonLog: '#08af16',
    // $outline: 1,
  });


var click = 0;
class MainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      token: "AAAAc9xgRKE:APA91bHHYArByG2rw0Oq4WtmPYqel7ImH1Ds9QOREYm7zYVl7JnSAj_0ilCkYp1fh5T-adEiP8oJ3tsqilSjFUzDNod6QmVPU1W8bbjZrCpSnnXRA_WDapyGBT8J7ocpkfxeXgnqDNge",
      tokenCopyFeedback: "AAAAc9xgRKE:APA91bHHYArByG2rw0Oq4WtmPYqel7ImH1Ds9QOREYm7zYVl7JnSAj_0ilCkYp1fh5T-adEiP8oJ3tsqilSjFUzDNod6QmVPU1W8bbjZrCpSnnXRA_WDapyGBT8J7ocpkfxeXgnqDNge"
    };
    this.handleBackButton.bind(this)
}

 
handleBackButton() {
  console.log('click ',click)
  if(click==0){
  ToastAndroid.show('Press Back Button again to exit', ToastAndroid.LONG);
  click++;
  setTimeout(() => {
     click=0;
    }, 500);
  }
  else{
      BackHandler.exitApp()
  }
  return true;
}
    
async componentDidMount(){    
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      
      console.log("app dijalankan")
      //FCM
       FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification fail'))
       registerAppListener(this.props.navigation);
       FCM.getInitialNotification().then(notif => {
        console.log('getInitialNotification')
        if(notif.opened_from_tray){
        console.log("notif.opened_from_tray")
        setTimeout(() => {
            this.setState({
              initNotif: notif
            });
            console.log('notif.targetScreen = '+notif.targetScreen)
            if (notif.targetScreen === "detail") {
               console.log('getInitialNotification')              
                console.log('pindah halaman')
                console.log('notif= '+ JSON.stringify(notif))
                this.props.navigation.navigate("Detail",{Message:JSON.stringify(notif._userText)});
            }
          }, 500);
            } 
      },
    ); 
    FCM.removeAllDeliveredNotifications();   
    }
componentWillUnmount(){
  console.log('keluar app')

  FCM.presentLocalNotification({
    title: "Connected",
    body: "",
    _userText: "Welcome Back",
    targetScreen: "detail",
    title: "Click to Open", // as FCM payload
    sound: "bell.mp3", // "default" or filename
    priority: "high", // as FCM payload
    ticker: "My Notification Ticker", // Android only
    auto_cancel: true, // Android only (default true)
    icon: "ic_launcher", // as FCM payload, you can relace this with custom icon you put in mipmap
    vibrate: 300, // Android only default: 300, no vibration if you pass 0
    wake_screen: true, // Android only, wake up screen when notification arrives
    ongoing: true, // Android only
    my_custom_data: "my_custom_field_value", // extra data you want to throw
    lights: true, // Android only, LED blinking (default false)
  });
}

    render() {
      let { token, tokenCopyFeedback } = this.state;
      return (
        <Provider store ={store}  persistor={persistor}>
          < Navigator/>
        </Provider>
    );
  }

}

class DetailPage extends Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{
        fontSize: 28,
        letterSpacing: -0.5,
        marginBottom: 15,
        fontWeight: '600',
      }}>
          {params.Message}
          </Text>
      </View>
    );
  }
}

export default StackNavigator(
  {
    Main: {
      screen: MainPage,
      navigationOptions:{ 
        header:()=>null  ,
      }
    },
    Detail: {
      screen: DetailPage,
      navigationOptions: {
        headerTitle: 'MESSAGE',
      },
    }
  },
  {
    initialRouteName: "Main"
  }
);