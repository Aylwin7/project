import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const imageWidth = Dimensions.get('window').width ;


export default EStyleSheet.create({
    $smallContainerSize: imageWidth / 2,
    $smallImageSize: imageWidth / 4,
    $largeContainerSize: imageWidth*2,
    $largeImageSize: imageWidth,
    
      image: {
        width: 200,
        height: 138,
        
      },
      containerImageStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      title: {
        color: '$white',
        fontSize: 28,
        letterSpacing: -0.5,
        marginBottom: 15,
        fontWeight: '600',
      },
      text: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff'
      },
});