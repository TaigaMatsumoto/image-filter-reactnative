import React, { Component } from "react";
import { StyleSheet, View, Button, Text, Platform } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { connect } from "react-redux";
import { updateImagePath } from "../actions/actions";
// import ImageCanvas from "./imageCanvas.js";
// import RNFetchBlob from 'rn-fetch-blob';
import ImageCanvas from "./imageCanvas";
import CameraButton from "./cameraButton";
import GalleryButton from "./galleryButton";
// const mapDispatchToProps = dispatch => ({
//   updateImagePath: path => dispatch(updateImagePath(path))
// });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null
    };
  }

  render() {
    // let { imageSource } = this.state;
    return (
      <View style={styles.container}>
        <CameraButton />
        <GalleryButton />
        <ImageCanvas />
        {/* <ImageTest /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  photoButton: {},
  galleryButton: {}
});

export default Main;
