import EStyleSheet from 'react-native-extended-stylesheet'


import { Dimensions } from 'react-native';
const textwidth = Dimensions.get('window').width ;

export default EStyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '$buttonLog',
        borderRadius: 100,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 0,       
      },
     
      text: {
        color: '$white',
        fontSize: 23,
        letterSpacing: 5,
        fontWeight: '500',
      },
});

