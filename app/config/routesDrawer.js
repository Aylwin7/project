import {DrawerNavigator} from 'react-navigation';

import Login from '../screens/Login'
import Home from '../screens/Home'
import REDUX from '../screens/Redux'
import Profile from '../screens/Profile'
// import Camera from '../screens/Camera'

import routesTheme from './routesTheme'


export default DrawerNavigator({
   
    Home:{
        screen:routesTheme,
    },
     
    Profile:{
        screen:Profile,
    },
    REDUX:{
        screen:REDUX,
    },
    // Camera:{
    //     screen:Camera,
    // },
    
},{
    drawerPosition:'left',
    drawerBackgroundColor:'#ffffff',
    initialRouteName:'Home',
    drawerWidth:200,
}


);
