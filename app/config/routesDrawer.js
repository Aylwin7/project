import {DrawerNavigator} from 'react-navigation';

import Login from '../screens/Login'
import Home from '../screens/Home'
import REDUX from '../screens/Redux'
import Profile from '../screens/Profile'
import Messages from '../screens/Messages'
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
    Fcm_App:{
        screen:Messages,
    },
    
},{
    drawerPosition:'left',
    drawerBackgroundColor:'#ffffff',
    initialRouteName:'Home',
    drawerWidth:200,
}


);
