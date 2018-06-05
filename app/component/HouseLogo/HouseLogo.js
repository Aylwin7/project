import PropTypes from 'prop-types';
import React from 'react';
import {Text, View, TouchableOpacity,Image } from 'react-native';
import styles from './styles';

const HouseLogo = (prop) => (   
  
        <View >
            <View style={styles.containerImageStyles}>
                    <Text style={styles.title}>
                      {prop.title}
                    </Text>
                    <Text style={styles.text}>
                      {prop.text1}
                    </Text>
                    <Text style={styles.text}>
                       {prop.text2}
                    </Text>
                    <Image  resizeMode="contain" source={require('./images/house.png')} style={styles.image}/>
            </View>
        </View>
)  
HouseLogo.propTypes = {
    title: PropTypes.string,    
    text1: PropTypes.string,
    text2: PropTypes.string,
  };

export default HouseLogo;