/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';

class StatusModal extends Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      message: props.error,
      hide: props.hide,
    }
    // bind functions
    this.dismissModal = this.dismissModal.bind(this)
  }

  dismissModal() {
    this.setState({hide: true})
  }

  // show or hide Modal based on 'hide' prop
  render() {
    if(this.state.hide){
      return (
        <View>
        </View>
      )
    } else {
      return (
        <TouchableHighlight style={styles.mainContainer} onPress={this.dismissModal}>
          <Text style={styles.text}>{this.state.message}</Text>
        </TouchableHighlight>
      )
    }
  }
}

module.exports = StatusModal;
