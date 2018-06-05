import {StackNavigator,Icon, Text, Header,Headerleft,View,TouchableHighlight,TouchableOpacity} from 'react-navigation';
import React from 'react'
import Login from '../screens/Login'
import Home from '../screens/Home'
import routesDrawer from './routesDrawer'
import SearchResult from '../screens/SearchResult';
// import  Header from '../component/Header'

export default StackNavigator({
   
    Login:{
        screen:Login,
        navigationOptions:{
            header:()=>null,
        },
    },
    Home:{
        screen:routesDrawer,
        navigationOptions:{ 
            header:()=>null  ,
          }
    },
    Results: { screen: SearchResult },  
    
});
