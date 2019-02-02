import React, { Component } from "react";
// import { Shaders, Node, GLSL } from "gl-react";
import { StyleSheet, Text, View, Slider, Image } from "react-native";
import { Surface } from "gl-react-expo";
import { connect } from "react-redux";
import GLImage from "gl-react-image";
import Saturate from "./saturate";

const mapStateToProps = state => {
  return { imagePath: state.image.path };
};

class ImageCanvas extends Component {
  state = {
    contrast: 1,
    saturation: 1,
    brightness: 1
  };

  render() {
    const { contrast, saturation, brightness, width, height } = this.state;
    const filter = {
      contrast,
      brightness,
      saturation
    };
    const { imagePath } = this.props;
    // console.log(`image width is ${width}`);
    return (
      <View>
        <Text style={styles.header}>Image Filter</Text>
        <View style={{ width: 300, height: 300 }}>
          {imagePath && (
            <Surface style={{ width: 300, height: 300 }}>
              <Saturate {...filter}>
                <GLImage source={{ uri: imagePath }} resizeMode="contain" />
              </Saturate>
            </Surface>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.slider}>
            <Text>Contrast</Text>
            <Slider
              minimumValue={0}
              maximumValue={4}
              step={0.01}
              value={contrast}
              onValueChange={contrast => this.setState({ contrast })}
            />
          </View>
          <View style={styles.slider}>
            <Text>Saturation</Text>
            <Slider
              minimumValue={0}
              maximumValue={4}
              step={0.01}
              value={saturation}
              onValueChange={saturation => this.setState({ saturation })}
            />
          </View>
          <View style={styles.slider}>
            <Text>Brightness</Text>
            <Slider
              minimumValue={0}
              maximumValue={4}
              step={0.01}
              value={brightness}
              onValueChange={brightness => this.setState({ brightness })}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textAlign: "center",
    padding: 10
  },
  slider: {
    width: 300
  },
  container: {
    // flex: 1,
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(ImageCanvas);
