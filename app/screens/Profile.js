import React, { Component } from 'react';
import { StyleSheet,StatusBar, KeyboardAvoidingView ,View,Text,Image} from 'react-native';
import { Head } from '../component/Header';
import { Dimensions } from 'react-native';
const height = Dimensions.get('window').height ;
const width = Dimensions.get('window').width ;
// import { Provider } from 'react-redux';
// import store from '../config/store';

import { Tombol } from '../component/Tombol';
import { connect } from 'react-redux';
import { Logout } from '../actions/Login';
// import { changeStatus } from '../actions/contohRedux';

class Profile extends Component{
    constructor(props) {
        super(props)
    }
    handlePress=()=>{
        console.log(Logout())
        this.props.dispatch(Logout());
        this.props.navigation.navigate('Login');
    }
    render() {
        return ( 
            <View style={{backgroundColor:this.props.backColor, height:height}}>  
                <Head col={this.props.primaryColor}  title={'PROFILE'} iconleft={'menu'} iconright={'settings'} fun={(navigation)=>{this.props.navigation.navigate('DrawerOpen')}}
                  fun1={(navigation) => this.props.navigation.navigate('Themes')} />
                <View style={{width:width,alignItems:'center',backgroundColor:this.props.backColor }} >
                                 <Image style={{width:width/2,height:height/3,marginTop:30, tintColor: '#ffffff',}}   source={require('./Businessman-512.png')} />
                </View >
                        <View style={{alignItems:'center'}}>
                        <View style={{width:width-30, backgroundColor:this.props.backColor}} >
                                {/* <Image style={{width:5,height:5}}   source={require('./Businessman-512.png')} style={{width:width/2}}/> */}
                            <View style={{flexDirection:'row',paddingTop:15}}>
                                <Text style={{fontSize: 25, width:80,alignItems:'center',fontWeight: '200', color: '#ffffff'}}>{"Nama "}</Text>
                                <Text style={{fontSize: 25,marginLeft:10, color: '#ffffff'}}>{this.props.nama}</Text>
                            </View>
                            <View style={{flexDirection:'row',paddingTop:15}}>
                                <Text style={{fontSize: 25, width:80,alignItems:'center',fontWeight: '200',color: '#ffffff'}}>{"NoTelp "}</Text>
                                <Text style={{fontSize: 25,marginLeft:10, color: '#ffffff'}}>{this.props.NoTelp}</Text>
                            </View>
                            <View style={{flexDirection:'row',paddingTop:15}}>
                                <Text style={{fontSize: 25, width:80,alignItems:'center',fontWeight: '200',color: '#ffffff'}}>{"email "}</Text>                                
                                <Text style={{fontSize: 25, marginLeft:10, color: '#ffffff'}}>{this.props.email}</Text>
                            </View>
                         </View>
                         <View style={{justifyContent: 'center',paddingTop:15,  alignItems:'center', width:width,backgroundColor:this.props.backColor}}> 
                                <View style={{width:width/2, }}>  
                                    <Tombol text='LOGOUT' dis={false}  fungsi={this.handlePress}/>
                                </View>
                            </View>
                        </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    // const status =state.contohRedux.status
    const nama = state.Login.nama
    const NoTelp = state.Login.NoTelp
    const email = state.Login.email
    const primaryColor = state.Themes.primaryColor 
    const backColor = state.contohRedux.backColor
    return {
        nama,NoTelp,email,primaryColor,backColor
    }
}
export default connect(mapStateToProps)(Profile);