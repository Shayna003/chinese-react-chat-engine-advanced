import { Properties } from 'csstype';

export interface PhotosSettingsStyles {
  style?: Properties;
  imageWrapperStyle?: Properties;
  imagePaddingStyle?: Properties;
  imageStyle?: Properties;
}

export const styles: PhotosSettingsStyles = {
  style: {},
  imageWrapperStyle: {
    position: 'relative',
    width: '33.3%',
    display: 'inline-block',
    cursor: 'pointer',
  },
  imagePaddingStyle: { paddingTop: '100%' },
  imageStyle: {
    top: '0px',
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover',
    padding: '0px',
    borderRadius: '0px',
  },
};
