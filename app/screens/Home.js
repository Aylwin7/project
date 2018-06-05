import React, { Component } from 'react';
import { StyleSheet, Button, TextInput,StatusBar, KeyboardAvoidingView,BackAndroid,BackHandler,  ToastAndroid,View, Keyboard} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux'
import {HouseLogo} from '../component/HouseLogo'
import { Container } from '../component/Container';
import { Dimensions, Actions } from 'react-native';
import {DrawerNavigator, navigation } from 'react-navigation';
import PropTypes from 'prop-types';

const height = Dimensions.get('window').height ;
const width = Dimensions.get('window').width ;

import axios from 'axios'

import { Head } from '../component/Header';
var click = 0;
class Home extends Component{

  static propTypes = {
    // navigation: PropTypes.object,
    primaryColor: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };
  }
    static navigationOptions = {
        title: 'HOME',
      };
      componentDidMount(props) {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }
    
    handleBackButton() {
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
    
    _onSearchTextChanged = (event) => {
        // console.log('_onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        // console.log(this.state.searchString);
      };

      _executeQuery = (query) => {
        // console.log(query);          
          fetch(query)
          .then(response => response.json())
          // .then(json => json
          .then(json => this._handleResponse(json.response))
          .catch(error =>
            // console.log('error = '+error),
            ToastAndroid.show(error, ToastAndroid.LONG)
          );
    // var self=this
    // axios.get(query)
    //         .then(function(respon){                
    //             // console.log(respon.data.listings); 
    //             // console.log(respon.status);
    //             console.log(respon)
    //             console.log( respon.request)
    //             respon.data
    //         })
    //         .then(function(data){                
    //           // console.log(respon.data.listings); 
    //           // console.log(respon.status);
    //           console.log(typeof data.response)
    //           self._handleResponse(data.response) 
    //       })
    //         .catch(function (error) {
    //             console.log('error = '+error);
    //       });; 
      };
      _onSearchPressed = () => {
        // const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        Keyboard.dismiss(); 
        const query = 'https://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name='+this.state.searchString
        console.log('_onSearchPressed' )
        console.log('_onSearchPressed'+query )
        this._executeQuery(query);
      };
  
      _handleResponse = (response) => {
         // this.setState({ isLoading: false , message: '' });
        // console.log(response);
        if (response.application_response_code.substr(0, 1) === "1") {
          // console.log(response.listings);
          this.props.navigation.navigate(         
            'Results', {listings: response.listings});
        } else {
          ToastAndroid.show('Location not recognized; please try again.', ToastAndroid.LONG)
          // console.log ({ message: 'Location not recognized; please try again.'});
        }
      };
    render() {
      var self=this;
        return (    
            <View>  
            <Head col={this.props.primaryColor}  title={'HOME'} iconleft={'menu'} iconright={'settings'} fun={(navigation)=>{self.props.navigation.navigate('DrawerOpen')}}
                  fun1={(navigation) => self.props.navigation.navigate('Themes')} />
            {/* self.props.navigation.navigate('Home'); */}
           <View style={{
                    // flex:2,
                    height:height,
                    // justifyContent:'center',
                    backgroundColor:this.props.backColor,
                }} >
            {/* fun={Actions.drawerOpen()} */}
                <View style={{
                    // flex:2,
                    // height:height,
                    justifyContent:'center',
                    backgroundColor:this.props.backColor,
                }} >
                 <View style={styles.flowRight} >
                    <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.searchInput}
                    onChange={this._onSearchTextChanged}
                    placeholder='Search via name or postcode'/>

                    <Button
                        onPress={this._onSearchPressed}
                        color='#48BBEC'
                        title='Go' />                
                  </View>
                    <HouseLogo  title={'PROPERTY FINDER'}text1={'Search for houses to buy!'} text2 ={'Search by place-name or postcode.'}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      padding: 30,
      alignItems: 'center',
      
    },
    flowRight: {
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: width,
      },
      searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
        backgroundColor:'#ffffff',
        // marginBottom:100,
       
      },
      image: {
        width: 217,
        height: 138,
      },
  });
  const mapStateToProps = (state) => { 
    const primaryColor = state.Themes.primaryColor 
    const backColor = state.contohRedux.backColor
    return {
      primaryColor,backColor
    };
  };
  
export default connect(mapStateToProps)(Home);
