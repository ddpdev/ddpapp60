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
    ListView,
} from 'react-native';

var MOCKED_IMAGE_DATA = [
        {title: 'Title', year: '2015', item: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
    ];

var REQUEST_URL = 'http://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //items: null,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1,row2) => row1 !== row2,
            }),
            loaded:false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("FETCH_DATA");
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded:true,
                });
                //console.log("item[0]:"+this.state.items[0]);
            })
            .done(console.log("FETCH_DONE"));
    }

    render() {
        //var image = MOCKED_IMAGE_DATA[0];
        //console.log("MOCK_IMAGE:" + image.item.thumbnail);
        console.log("Render Start");
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        //var item = this.state.items[0];
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                style={styles.listView}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>Loading Items...</Text>
            </View>
        );
    }

    renderItem(image) {
        console.log("Image:"+ image.title);
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: image.posters.thumbnail}}
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
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 5,
        textAlign: 'left',
    },
    year: {
        fontSize: 10,
        marginLeft: 5,
        textAlign: 'left',
    },
    listView: {
        paddingTop:20,
        backgroundColor:'#F5FCFF',
    },
});

