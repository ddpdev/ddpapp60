/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


 class PageTwo extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
              {/*Rest of App come ABOVE the action button component!*/}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="등록" onPress={() => alert("등록 tapped!")}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="전송" onPress={() => console.log("전송 tapped!")}>
              <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="저장" onPress={() => console.log("저장 tapped!")}>
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            </ActionButton>
        </View>
        );
    }
 }

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default connect()(PageTwo);