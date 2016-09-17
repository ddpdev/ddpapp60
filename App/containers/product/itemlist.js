/**
 * Created by leesy on 2016-09-08.
 */
"use strict";

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

var MOCKED_IMAGE_DATA = [
        {title: 'Title', year: '2015', item: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
    ];

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
    }

    render() {
        var image = MOCKED_IMAGE_DATA[0];
        console.log("MOCK_IMAGE:"+image.item.thumbnail);

        return (
            <View style={styles.container}>
                <Image
                    source={{uri: image.item.thumbnail}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{image.title}</Text>
                    <Text style={styles.year}>{image.year}</Text>
                </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
    },
    rightContainer:{
        flex:1,
    },
    thumbnail:{
        width:53,
        height:81,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
});

