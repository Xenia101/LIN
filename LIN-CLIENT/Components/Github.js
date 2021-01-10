import React, { Component, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Text,
    View,
    Linking,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

// import Notification from './Notification';

const supportedURL = "https://github.com/xenia101";

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <TouchableOpacity onPress={handlePress}>
            <MaterialCommunityIcons 
                name="github"
                color="#A593E0"
                size={100}
            />
        </TouchableOpacity>
    )
};

export default class Github extends Component {
    render() {
        return (
            <View style={styles.container}>
                <OpenURLButton url={supportedURL}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})