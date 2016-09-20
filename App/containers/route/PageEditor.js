/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// import Editor from 'draft-js-plugins-editor';
// import createHashtagPlugin from 'draft-js-hashtag-plugin';
// import createLinkifyPlugin from 'draft-js-linkify-plugin';
// // import createStickerPlugin from 'draft-js-sticker-plugin';
// import { EditorState } from 'draft-js';
//
// const hashtagPlugin = createHashtagPlugin();
// const linkifyPlugin = createLinkifyPlugin();

// const stickers = fromJS({
//     data: {
//         'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b': {
//             id: 'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b',
//             url: '../images/unicorn-4.png',
//         },
//         'adec3f13-823c-47c3-b4d1-be4f68dd9d6d': {
//             id: 'adec3f13-823c-47c3-b4d1-be4f68dd9d6d',
//             url: '../images/unicorn-1.png',
//         },
//     },
// });

// const stickerPlugin = createStickerPlugin({ stickers });

// const plugins = [
//     hashtagPlugin,
//     linkifyPlugin,
//     // stickerPlugin,
// ];

class pageEditor extends Component {

    // state = {
    //     editorState: EditorState.createEmpty(),
    // };

    // onChange = (editorState) => {
    //     this.setState({
    //         editorState,
    //     });
    // };

    render() {
        return (
            // <Editor
            //     editorState={this.state.editorState}
            //     onChange={this.onChange}
            //     plugins={plugins}
            // />
           <Text>Editor</Text>
        );
    }
}

export default connect()(pageEditor);