/**
 * Created by leesy on 2016-09-08.
 */
"use strict";

import React, {Component} from 'react';
import {
    NetInfo,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';
//import fetch from 'isomorphic-fetch';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { PricingCard } from 'react-native-elements';



//https://ddpimage01.s3.ap-northeast-2.amazonaws.com/thumb/BJYGFdiU_thm.png
var MOCKED_IMAGE_DATA = [
    {"itemlist":[
        {"item_id":33,"item_type":"img","last_date":"2016-07-09T11:58:18.000Z","item_value":"{\"bucket\":\"ddpimage01\",\"uploadfilename\":\"Screenshot_20160709-205537.png\",\"filesize\":102275,\"imagefilename\":\"ByQ1wwRI_img.png\",\"imagekey\":\"image/ByQ1wwRI_img.png\",\"thumbfilename\":\"ByQ1wwRI_thm.png\",\"thumbkey\":\"thumb/ByQ1wwRI_thm.png\"}","item_status":"Y"}
        ]
    }
    ];

//var REQUEST_URL = 'http://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var REQUEST_URL = 'http://app.ddpstyle.com/json/get/itemlist';


// function renderProductItemDetail(itemfilename) {
//
//     console.log("itemfilename:",itemfilename);
//     // if (!itemfilename) {
//     //   return alert("props:"+itemfilename);
//     // }
//     return (
//         render()   {
//             return (
//                 <ProductDetail ProductItemTitle={itemfilename} ProductItemPrice={'만원'}/>
//             );
//         }
//     );
// }


// function _onPressItem(rowData) {
//   console.log(rowData+" pressed");
//   let itemPrice = "만원";
//
//   return (
//     <ProductDetail ProductItemTitle={rowData} ProductItemPrice={itemPrice}/>
//   );
// }

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //items: null,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1,row2) => row1 !== row2,
            }),
            loaded:false,
        };
        console.log("Product:",props);
    }

    componentDidMount() {
      NetInfo.isConnected.fetch().then(isConnected => {
        console.log('First, is ' + (isConnected ? 'online' : 'offline'));

        if(isConnected) {
          this.fetchData();
        }

      })
      .catch(error => {
          console.error(error);
      });

    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("FETCH_DATA");
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.itemlist),
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
        //console.log("image.item_value:"+ image.item_value );
        //console.log("image.item_value:"+ JSON.parse(image.item_value ));
        // String --> Json Type Parsing --> Object --> Use
        let itemInfo = JSON.parse(image.item_value );
        let imageUri = "https://ddpimage01.s3.ap-northeast-2.amazonaws.com/" + itemInfo.thumbkey;
        let uploadfilename = itemInfo.uploadfilename;
        let itemPrice = '만원';
        console.log("Image Url:", imageUri );

        //var itemDetail = (<ProductDetail ProductItemTitle={uploadfilename} ProductItemPrice={itemPrice}/>);
        const gotoDetail = () => Actions.productDetail({ProductItemTitle:uploadfilename, ProductItemPrice:itemPrice, ProductItemURL:imageUri});

        return (
            <TouchableHighlight
              underlayColor={'#eee'} style={{padding: 2, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
              onPress={gotoDetail}
            >
            <View style={styles.container} >
                <Image
                    source={{uri: imageUri}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>[{image.item_id}] {itemInfo.uploadfilename}</Text>
                    <Text style={styles.year}>filesize:{itemInfo.filesize},date:{image.last_date}</Text>
                </View>
            </View>
          </TouchableHighlight>
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
        width:81,
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

export default connect()(Product);