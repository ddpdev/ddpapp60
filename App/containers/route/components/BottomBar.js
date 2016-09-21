/**
 * Created by ms.kim2 on 2016-09-18.
 */
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
} from 'react-native';
import StatusBar from 'StatusBar';
import {Actions} from 'react-native-router-flux'
import { SocialIcon, Button  } from 'react-native-elements'


class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
    }
    console.log("BottomBar:", this.props, this.state);
  };

  render() {
    const imagePicker = () => Actions.imagePicker();
    const cameraRollPicker = () => Actions.pageCameraRollPicker({ groupTypes: 'All', assetType: 'Photos' });
    return(
            <View style={styles.bottomContainer}>
              {/*<StatusBar*/}
                {/*translucent={true}*/}
                {/*backgroundColor="rgba(0, 0, 0, 0.2)"*/}
                {/*barStyle="light-content"*/}
              {/*/>*/}
              <SocialIcon
                type='google-plus-official'
              />
              <Button
                small
                iconRight
                icon={{name: 'add-a-photo'}}
                title='photo'
                onPress={imagePicker}
              />
              <Button
                small
                iconRight
                icon={{name: 'photo-library'}}
                title='gallery'
                onPress={cameraRollPicker}
              />
              <SocialIcon
                title='Sign In With Facebook'
                type='facebook'
              />
            </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection:'row',
    paddingTop:60,
    height: (Dimensions.get('window').height)-60,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0e68c' //khaki
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    //flexDirection:'row',
    height: (Dimensions.get('window').height) - 120,
    width: Dimensions.get('window').width,
    backgroundColor: '#90ee90' // lightgreen
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection:'row',
    height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width,
    backgroundColor: '#add8e6' // lightblue
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  button: {
    padding: 10,
    width: Dimensions.get('window').width/3,
    height:25,
    borderRadius:5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default BottomBar;