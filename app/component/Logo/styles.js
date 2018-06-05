import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  $smallContainerSize: imageWidth / 2,
  $smallImageSize: imageWidth / 4,
  $largeContainerSize: imageWidth+50,
  $largeImageSize: imageWidth,
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$largeContainerSize',
    height: '$largeContainerSize',
  },
  logo: {
    width: '$largeImageSize',
    // tintColor: '$primaryBlue',
  },
});