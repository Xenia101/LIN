import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import React, { useState, useEffect, useRef, Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

const PUSH_REGISTRATION_ENDPOINT = '/token';
const MESSAGE_ENPOINT = '/message';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: null,
            messageText: ''
        }
    }

    componentDidMount() {
        this.registerForPushNotificationsAsync();
    }

    registerForPushNotificationsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        return fetch(PUSH_REGISTRATION_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                value: token,
                },
                user: {
                username: 'A', 
                name: 'A'   
                },
            }),
        });
    }
    
    handleNotification = (notification) => {
        this.setState({ notification });
    }

    handleChangeText = (text) => {
        this.setState({ messageText: text });
    }

    sendMessage = async () => {
        fetch(MESSAGE_ENPOINT, {
            method: 'POST',
            headers: {
                Accept: 
                    'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: this.state.messageText,
            }),
        });
        this.setState({ messageText: '' });
    }

    render() {
        return (
            <View>
                <TextInput
                value={this.state.messageText}
                onChangeText={this.handleChangeText}
                />
                <TouchableOpacity
                onPress={this.sendMessage}
                >
                    <Text>Send</Text>
                </TouchableOpacity>
                {this.state.notification ? this.renderNotification() : null}
            </View>
        ) 
    }
}

