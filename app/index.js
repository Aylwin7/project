import React, { Component } from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes'
import Login from './screens/Login';
import {Provider} from 'react-redux';
import { store, persistor }  from './config/store';
import { PersistGate } from "redux-persist/integration/react";
// import IncrementView from "./src/view/increment";
import { Platform, AsyncStorage, AppState, BackHandler, } from 'react-native';

import FCM, {FCMEvent,RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";
import firebase from 'firebase'
// import {Permissions,Notifications} from 'expo';

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
            if (notif && notif.targetScreen === "detail") {
               console.log('getInitialNotification')              
                console.log('pindah halaman')
                console.log('notif._userText = '+ JSON.stringify(notif))
                this.props.navigation.navigate("Detail",{Message:JSON.stringify(notif._userText)});
            }}, 500);
            } 
      },
    );    
    }
componentWillUnmount(){
  console.log('keluar app')
  // this.sendRemoteData(token)

FCM.presentLocalNotification({
  title: "Connected",
    body: "touch to Open",
    priority: "high",
      click_action: "ACTION",
      badge: 10,
      number: 10,
    show_in_foreground: true,
    click_action: "com.myidentifi.fcm.text", // for ios
    targetScreen: "detail",
    auto_cancel: true,
    wake_screen: true,
    _userText:'WELCOME BACK',
    extra1: { a: 1 },
    extra2: 1,
    large_icon: "ic_launcher",
    
});
}

showLocalNotification() {
  FCM.presentLocalNotification({
      id: "UNIQ_ID_STRING",
      title: "My Notification Title",
      body: "My Notification Message",
      sound: "default",
      priority: "high",
      click_action: "ACTION",
      badge: 10,
      number: 10,
      ticker: "My Notification Ticker",
      auto_cancel: true,
      large_icon: "ic_launcher",
      icon: "ic_launcher",
      big_text: "Show when notification is expanded",
      sub_text: "This is a subText",
      color: "red",
      vibrate: 500,
      tag: 'some_tag',
      group: "group",
      my_custom_data:'my_custom_field_value',
      lights: true,
      show_in_foreground: true,
      targetScreen: "Login"
  });
}

scheduleLocalNotification() {
  FCM.scheduleLocalNotification({
    id: "testnotif",
    fire_date: new Date().getTime() + 5000,
    vibrate: 500,
    title: "Hello",
    body: "Test Scheduled Notification",
    sub_text: "sub text",
    priority: "high",
    large_icon:
      "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
    show_in_foreground: true,
    picture:
      "https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png",
    wake_screen: true,
    extra1: { a: 1 },
    extra2: 1
  });
}

sendRemoteNotification(token) {
  let body;

  if (Platform.OS === "android") {
    body = {
      to: token,
      data: {
        custom_notification: {
          title: "Simple FCM Client",
          body: "Click me to go to detail",
          sound: "default",
          priority: "high",
          show_in_foreground: true,
          targetScreen: "detail"
        }
      },
      priority: 10
    };
  } else {
    body = {
      to: token,
      notification: {
        title: "Simple FCM Client",
        body: "Click me to go to detail",
        sound: "default"
      },
      data: {
        targetScreen: "detail"
      },
      priority: 10
    };
  }

  firebaseClient.send(JSON.stringify(body), "notification");
}

sendRemoteData(token) {
  let body = {
    to: token,
    data: {
      title: "Simple FCM Client",
      body: "This is a notification with only DATA.",
      sound: "default"
    },
    priority: "normal"
  };

  firebaseClient.send(JSON.stringify(body), "data");
}

showLocalNotificationWithAction() {
  FCM.presentLocalNotification({
    title: "Test Notification with action",
    body: "Force touch to reply",
    priority: "high",
    show_in_foreground: true,
    click_action: "com.myidentifi.fcm.text", // for ios
    android_actions: JSON.stringify([
      {
        id: "view",
        title: "view"
      },
      {
        id: "dismiss",
        title: "dismiss"
      }
    ]) // for android, take syntax similar to ios's. only buttons are supported
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
// // import FCM, {FCMEvent, NotificationActionType } from "react-native-fcm";

// firebase.messaging().requestPermissions(); 
// firebase.messaging().getToken() .then((token) => { console.log('Device FCM Token: ', token); }); 
// firebase.messaging().onMessage((notif) => { console.log('message', notif) } );

// FCM.requestPermissions();
// FCM.getFCMToken();
// console.log(FCM.getFCMToken());
// // FCM.subscribeToTopic('notifications_' + userKey);
// this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
//   if (!notif.local_notification) {
//     FCM.presentLocalNotification({
//       id: "UNIQ_ID_STRING",
//       title: notif.aps.alert.title,
//       body: notif.aps.alert.body,
//       sound: "default",
//       priority: "high",
//       click_action: "ACTION",
//       icon: "ic_launcher",
//       show_in_foreground: true,
//     });
//   }
// });
// FCM.on(FCMEvent.RefreshToken, token => {
//   console.log('Token = '+token);
// });

//  function registerKilledListener(){
//   // these callback will be triggered even when app is killed
//   FCM.on(FCMEvent.Notification, notif => {
//     AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
//     if(notif.opened_from_tray){
//       setTimeout(()=>{
//         if(notif._actionIdentifier === 'reply'){
//           if(AppState.currentState !== 'background'){
//             console.log('User replied '+ JSON.stringify(notif._userText))
//             alert('User replied '+ JSON.stringify(notif._userText));
//           } else {
//             AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
//           }
//         }
//         if(notif._actionIdentifier === 'view'){
//           alert("User clicked View in App");
//         }
//         if(notif._actionIdentifier === 'dismiss'){
//           alert("User clicked Dismiss");
//         }
//       }, 1000)
//     }
//   });
// }
// registerKilledListener();


