import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { StyleSheet, Text, View, Slider, Image } from "react-native";
import { Surface } from "gl-react-expo";
import { connect } from "react-redux";
import GLImage from "gl-react-image";

const mapStateToProps = state => {
  return { imagePath: state.image.path };
};
const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
  precision highp float;
  varying vec2 uv;
  uniform sampler2D t;
  uniform float contrast, saturation, brightness;
  const vec3 L = vec3(0.2125, 0.7154, 0.0721);
  void main() {
    vec4 c = texture2D(t, uv);
    vec3 brt = c.rgb * brightness;
    gl_FragColor = vec4(mix(
      vec3(0.5),
      mix(vec3(dot(brt, L)), brt, saturation),
      contrast), c.a);
  }
  `
  }
});

export const Saturate = ({ contrast, saturation, brightness, children }) => (
  <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: children }}
  />
);

class ImageTest extends Component {
  state = {
    contrast: 1,
    saturation: 1,
    brightness: 1
  };

  // componentDidUpdate() {
  //   console.log("ComponentDidmount is called!!!");
  //   const { imagePath } = this.props;

  //   if (imagePath) {
  //     Image.getSize(imagePath, (width, height) => {
  //       if (this.state.width != width || this.state.height != height) {
  //         console.log(`width is ${width} and height is ${height}`);
  //         if (this.props.width && !this.props.height) {
  //           this.setState({
  //             width: this.props.width,
  //             height: height * (this.props.width / width)
  //           });
  //         } else if (!this.props.width && this.props.height) {
  //           this.setState({
  //             width: width * (this.props.height / height),
  //             height: this.props.height
  //           });
  //         } else {
  //           this.setState({ width: width, height: height });
  //           console.log("it worked");
  //         }
  //       }
  //     });
  //   } else {
  //     console.log("its failed");
  //     console.log(`imagepath is ${imagePath}`);
  //   }
  // }

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

export default connect(mapStateToProps)(ImageTest);
