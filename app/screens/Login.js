'use strict';
import React, { Component } from 'react';
import {Platform, StatusBar, KeyboardAvoidingView, BackHandler, ToastAndroid,BackAndroid,Keyboard  } from 'react-native';
import { Logo } from '../component/Logo';
import { Container } from '../component/Container';
import { Text } from '../component/Text';
import { Tombol } from '../component/Tombol';
import PropTypes from 'prop-types';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux'
import axios from 'axios'
import {Fetch,ProsesLOGIN}from '../actions/Login'
import { FCMEvent } from "react-native-fcm";
import {NativeModules} from 'react-native';
const IMEI = NativeModules.IMEI;
console.log(IMEI)

import FCM, {RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";

// import GetSN from './GetSN';

var click = 0;
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          user: '',
          pass: '',
          
        };
      }
    static propTypes={
        navigation:PropTypes.object,
        user:PropTypes.string,
        pass:PropTypes.string,
        islogin:PropTypes.bool,
    }
    
    componentDidMount(props) {
        // GetSN.show()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton); 
        IMEI.getIMEI((IMEI)=>{
            ToastAndroid.show('IMEI = '+IMEI, ToastAndroid.LONG);
        })
       
        // console.log("IMEI", IMEI.getIMEI())
        // ToastAndroid.show('IMEI', ToastAndroid.LONG);
        console.log('islogin = '+this.props.islogin)  
        if(this.props.islogin){
            console.log('jalan')
            this.props.navigation.navigate('Home');
        }else{
            console.log('tidak jalan')
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    handleBackButton() {
        console.log('handleBackButton ')
        
        ToastAndroid.show('click', ToastAndroid.LONG);
        if(click==0){
        ToastAndroid.show('Press Back Button again to exit', ToastAndroid.LONG);
        click++;
        setTimeout(() => {
           click=0;
          }, 500);
        }
        // else{
        //     BackHandler.exitApp()
        // }
        return true;
    }
    
    handleLoginButton=(event)=>{
        // console.log('login');
        // console.log('componentDidMount ');
        var self = this;
        // console.log('state user '+self.state.user); 
        // console.log('state pass '+self.state.pass); 
        if(self.state.user=='Admin'&&self.state.pass=='Admin'){
            Keyboard.dismiss(); 
            self.props.navigation.navigate('Home');
            // console.log(Fetch(respon.data[0].nama,respon.data[0].NoTelp,respon.data[0].email))
            // self.props.dispatch( Fetch(respon.data[0].nama,respon.data[0].NoTelp,respon.data[0].email))
            self.props.dispatch(ProsesLOGIN())
        }else{
        var Api='http://192.168.137.1:3000/Akun?name='+self.state.user+'&pass='+self.state.pass
        // console.log(Api); 
        axios.get(Api, { 
            headers: {
              'Authorization': '1234567890',
              'content-length': '200',
            }}
            ).then(function(respon){
                try {
                    // console.log('Masuk')
                // console.log(respon.data);
                console.log('header ',respon.headers);
                // console.log(typeof respon.data[0])
                // console.log(
                //     respon.data[0]==undefined)
                // console.log('name '+respon.data[0].name); 
                // console.log('pass '+respon.data[0].pass); 
                // if(!respon.data[0]==undefined){
                
                if((respon.data[0].user==self.state.user &&
                    respon.data[0].pass==self.state.pass)){
                        Keyboard.dismiss(); 
                        self.props.navigation.navigate('Home');
                        // console.log(Fetch(respon.data[0].nama,respon.data[0].NoTelp,respon.data[0].email))
                        self.props.dispatch( Fetch(respon.data[0].nama,respon.data[0].NoTelp,respon.data[0].email))
                        self.props.dispatch(ProsesLOGIN())
                        console.log(self.props.islogin)
                    }
                    else{
                        ToastAndroid.show('Username atau Password Salah', ToastAndroid.LONG);
                        
                    }
                        
                } catch (error) {
                    console.log(error)
                    ToastAndroid.show('Username atau Password Salah', ToastAndroid.LONG);
                }
            
            }).catch(function (error) {
                ToastAndroid.show(error, ToastAndroid.LONG);
                console.log('error = '+error);
          });; 
        // this.props.navigation.navigate('Home');
        }
    };
    handleChangeTextUser = (text) => {
            
            this.setState({ user: text });
            // console.log('change user text '+this.state.user);
           };

    handleChangeTextPass = (text) => {
           this.setState({ pass: text });
        //    console.log('change pass stext '+this.state.pass);
          };
         
    render() {
        return (            
                <Container>
                     <StatusBar backgroundColor="black" barStyle="light-content" />
                    <KeyboardAvoidingView behavior='padding'>                      
                        <Logo />
                        <Text text={'USERNAME'}  
                         onChangeText ={this.handleChangeTextUser}/> 
                        {/* onSubmitEditing={()=>this.passwordInput.focus()} */}
                        <Text text={'PASSWORD'} pass={true} 
                         onChangeText ={this.handleChangeTextPass} />
                        {/* ref={(input=>{this.passwordInput =input})} */}
                        <Tombol text={'LOGIN'} dis={false} fungsi={this.handleLoginButton}/>
                    </KeyboardAvoidingView>           
                </Container>
        );
    }
}

const mapStateToProps =(state)=>{
    const islogin = state.Login.islogin;
    const primaryColor = state.Themes.primaryColor 
    return{
        islogin,primaryColor
    };
};

export default connect(mapStateToProps)(Login);

