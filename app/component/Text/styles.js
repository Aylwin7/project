import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const textwidth = Dimensions.get('window').width ;

export default EStyleSheet.create({
    input: {
      height: 48,
      borderRadius: 10,
      width: textwidth-30,
      backgroundColor: '$lightGray',
      color: '$inputText',
      marginBottom: 10,
      alignItems: 'center',
      fontSize: 18,
      },
});