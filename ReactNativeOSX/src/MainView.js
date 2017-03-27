/**
 * Sample React Native macOS App
 * https://github.com/ptmt/react-native-macos
 */
import React from 'react';
import ReactNative from 'react-native-macos';
var {
  AppRegistry,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = ReactNative;

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // opacity 0
    };
  }
  componentDidMount() {
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 1,        // Target
        duration: 2000,    // Configuration
      },
    ).start();             // Don't forget start!
  }
  render() {
    return (
      <Animated.View   // Special animatable View
        style={{
          opacity: this.state.fadeAnim,  // Binds
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const ReactNativeOSX = React.createClass({
  getInitialState() {
    return {show: false};
  },

  render() {
    this.anims = this.anims || [1,2,3].map(
      () => new Animated.Value(0)
    );
    return (
      <View >
        <Text style={styles.welcome}>
          Welcome React Poznań!!!
        </Text>
        <TouchableHighlight
          onPress={() => {
            this.setState((state) => (
              {show: !state.show}
            ));
          }} 
          style={styles.button}
          underlayColor="grey">
          <Text>
            Press to {this.state.show ?
              'Hide' : 'Show'}
          </Text>
        </TouchableHighlight>
        {this.state.show && <FadeInView>
          <View style={styles.content}>
            <Text>FadeInView</Text>
          </View>
        </FadeInView>}
        <TouchableHighlight 
          onPress={() => {
            var timing = Animated.timing;
            Animated.sequence([ // One after the other
              timing(this.anims[0], {
                toValue: 200,
                easing: Easing.linear,
              }),
              Animated.delay(400), // Use with sequence
              timing(this.anims[0], {
                toValue: 0,
                easing: Easing.elastic(2), // Springy
              }),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(
                  anim, {toValue: 200}
                )).concat(
                this.anims.map((anim) => timing(
                  anim, {toValue: 0}
                ))),
              ),
              Animated.delay(400),
              Animated.parallel([
                Easing.inOut(Easing.quad), // Symmetric
                Easing.back(1.5),  // Goes backwards first
                Easing.ease        // Default bezier
              ].map((easing, ii) => (
                timing(this.anims[ii], {
                  toValue: 320, easing, duration: 3000,
                })
              ))),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(anim, {
                  toValue: 0,
                  easing: Easing.bounce, // Like a ball
                  duration: 2000,
                })),
              ),
            ]).start(); }}
            style={styles.button}
            underlayColor="grey"  
          >
            <Text>
              Press to Animate
            </Text>
          </TouchableHighlight>
          {['Composite', 'Easing', 'Animations!'].map(
            (text, ii) => (
              <Animated.View
                key={text}
                style={[styles.content, {
                  left: this.anims[ii]
                }]}>
                <Text>{text}</Text>
              </Animated.View>
            )
          )}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },  
  button: {
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
});

AppRegistry.registerComponent('ReactNativeOSX', () => ReactNativeOSX);
