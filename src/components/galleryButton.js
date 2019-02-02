import React, { Component } from "react";
import { StyleSheet, View, Button, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { updateImagePath } from "../actions/actions";
import { ImagePicker, Permissions } from "expo";

const mapDispatchToProps = dispatch => ({
  updateImagePath: path => dispatch(updateImagePath(path))
});

class GalleryButton extends Component {
  constructor(props) {
    super(props);
    this.getFromGallary = this.getFromGallary.bind(this);
  }

  async getFromGallary() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("you failed");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      height: 480,
      isVertical: true,
      originalRotation: 0,
      width: 640
    });
    if (!result.cancelled) {
      console.log(result);
      this.setState({ imageSource: result.uri });
      this.props.updateImagePath(result.uri);
    }
  }

  render() {
    return <Button title="Get from gallery" onPress={this.getFromGallary} />;
  }
}

export default connect(
  null,
  mapDispatchToProps
)(GalleryButton);
