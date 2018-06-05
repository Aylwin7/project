import PropTypes from 'prop-types';
import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';


const Tombol = ({text,fungsi,dis}) => (    
    <TouchableOpacity style={styles.container} onPress={fungsi}>        
        <Text style={styles.text}>{text}</Text>        
  </TouchableOpacity>

  );
  Tombol.propTypes = {    
    text: PropTypes.string,
    dis: PropTypes.bool,
    fungsi:PropTypes.func,    
  };

export default Tombol;