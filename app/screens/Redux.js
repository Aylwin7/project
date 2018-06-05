import React, { Component } from 'react';
import { StyleSheet,StatusBar, KeyboardAvoidingView ,View} from 'react-native';
import { Head } from '../component/Header';
import { Tombol } from '../component/Tombol';
import { Dimensions } from 'react-native';
const height = Dimensions.get('window').height ;
const width = Dimensions.get('window').width ;
import { Provider } from 'react-redux';
import store from '../config/store';
import { connect } from 'react-redux';
import { changeStatus } from '../actions/contohRedux';

class ContohRedux extends Component{
    
    constructor(props) {
        super(props)
    }

    handlePress=()=>{
        console.log(changeStatus())
        this.props.dispatch(changeStatus());
    }
    render() {
        return ( 
            // <Provider store={store}>  
            <View >  
            <Head col={this.props.primaryColor}  title={'TURN ON/OFF'} iconleft={'menu'} iconright={'settings'} fun={(navigation)=>{this.props.navigation.navigate('DrawerOpen')}}
                  fun1={(navigation) => this.props.navigation.navigate('Themes')} />
        
             <View style={{justifyContent: 'center', height:height , alignItems:'center', width:width, backgroundColor:this.props.backColor}}> 
                <View style={{width:width/2}}>  
                    <Tombol text={this.props.status} dis={false}  fungsi={this.handlePress}/>
                </View>
            </View>
            </View>
            // </Provider>
        );
    }
}


const mapStateToProps = (state) => {
    const status =state.contohRedux.status
    const primaryColor = state.Themes.primaryColor 
    const backColor = state.contohRedux.backColor
    return {
        status,primaryColor, backColor,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         handlePress: () => {
//         dispatch(changeStatus)
//       }
//     }
//   }
export default connect(mapStateToProps)(ContohRedux);