/**
 * Created by leesy on 2016-09-22.
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';
import CustomCallout from './CustomCallout';

const { width, height } = Dimensions.get('window');

    // latitude: 35.907757,
    // longitudeDelta: 10.0,
    // name: 'South Korea',
    // longitude: 127.766922,
    // latitudeDelta: 10.0,

const ASPECT_RATIO = width / height;
const LATITUDE = 35.907757;
const LONGITUDE = 127.766922;
const LATITUDE_DELTA = 10.0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class PageCalloutsMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [
                {
                    coordinate: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE + SPACE,
                    },
                },
                {
                    coordinate: {
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                    },
                },
                {
                    coordinate: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE - SPACE,
                    },
                },
            ],
        };

        console.log("Map", this.props, this.state);
    }

    show() {
        this.marker1.showCallout();
    }

    hide() {
        this.marker1.hideCallout();
    }

    render() {
        const { region, markers } = this.state;
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={region}
                >
                    <MapView.Marker
                        ref={ref => { this.marker1 = ref; }}
                        coordinate={markers[0].coordinate}
                        title="This is a title"
                        description="This is a description"
                    />
                    <MapView.Marker
                        coordinate={markers[1].coordinate}
                    >
                        <MapView.Callout>
                            <View>
                                <Text>This is a plain view</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                    <MapView.Marker
                        coordinate={markers[2].coordinate}
                        calloutOffset={{ x: -8, y: 28 }}
                        calloutAnchor={{ x: 0.5, y: 0.4 }}
                    >
                        <MapView.Callout tooltip>
                            <CustomCallout>
                                <Text style={{ color: '#fff' }}>This is a custom callout bubble view</Text>
                            </CustomCallout>
                        </MapView.Callout>
                    </MapView.Marker>
                </MapView>
                <View style={styles.buttonContainer}>
                    <View style={styles.bubble}>
                        <Text>Tap on markers to see different callouts</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.show()} style={[styles.bubble, styles.button]}>
                        <Text>Show</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.hide()} style={[styles.bubble, styles.button]}>
                        <Text>Hide</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

export default connect()(PageCalloutsMap);
