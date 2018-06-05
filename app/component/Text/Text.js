import PropTypes from 'prop-types';
import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './styles';


const Text = (props) => (
    <View style={styles.container}>
      <TextInput style={styles.input}  textAlign={'center'} 
      underlineColorAndroid="transparent" 
      placeholder={props.text}
      secureTextEntry={props.pass}
      {...props}

      />
    </View>
  );
  Text.propTypes = {    
    text: PropTypes.string,
    pass: PropTypes.bool,    
  };
export default Text;