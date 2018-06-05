import PropTypes from 'prop-types';
import React from 'react';
import {Text, View, TouchableOpacity,Image,  } from 'react-native';
import { Header, Body, Button,Title, Content, Left, Icon, Right } from 'native-base'
import styles from './styles';
import {DrawerNavigator, navigation } from 'react-navigation';
// static propTypes={
  
const Head = (props) => ( 
  
<View  >
        <Header style={{backgroundColor:props.col}}>
                <Left>
                <Button transparent onPress={props.fun}>
                    <Icon name={props.iconleft} />
                 </Button>
                   {/* onPress={() => navigation.navigation('drawerOpen') } /> */}
                </Left>
                <Body>
                    <Title>{props.title}</Title>
                </Body>
                <Right transparent >
                <Button transparent  onPress={props.fun1}>
                  <Icon name={props.iconright} />
                  </Button>
                </Right >
        </Header>
</View>

);
Head.propTypes = {
  title: PropTypes.string,    
  iconleft: PropTypes.string,
  iconright: PropTypes.string,
  fun:PropTypes.func,
};

export default Head;