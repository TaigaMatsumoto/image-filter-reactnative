import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import { updateImagePath } from "../actions/actions";
import { ImagePicker, Permissions } from "expo";

const mapDispatchToProps = dispatch => ({
  updateImagePath: path => dispatch(updateImagePath(path))
});

class CameraButton extends Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
  }

  async takePhoto() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { updateImagePath } = this.props;
    if (status == "granted") {
      try {
        // const data = await this.camera.takePictureAsync();
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true
          // rotation: 270
          // aspect: [4, 3]
        });
        console.log(result);
        if (!result.cancelled) {
          this.setState({ imageSource: result.uri });
          updateImagePath(result.uri);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return <Button title="Take Photo" onPress={this.takePhoto} />;
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CameraButton);
