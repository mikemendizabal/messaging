import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component {
  loading = false;
  cursor = null;

  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  state = {
    images: this.getPhotos(),
  };

  getPhotos() {
    var photos = [];
    while (photos.push({
      uri: 'https://picsum.photos/600/600?image=' + (photos.length + 1) * 10
    }) < 108);
    return photos;
  }

  componentDidMount() {
    this.getImages();
  }

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  getImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const { onPressImage } = this.props;

    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
      
    );
  };

  render() {
    const { images } = this.state;

    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        onEndReached={this.getNextImages}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
