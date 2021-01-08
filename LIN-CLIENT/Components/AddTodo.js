import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    TextInput,
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions ,
    KeyboardAvoidingView,
} from 'react-native';

const behavior = Platform.OS === "ios" ? "padding" : null
const keyboardVerticalOffset = Platform.OS === 'ios' ? 86 : 0
var {width, height} = Dimensions.get('window');

const AddTodo = () => {
    return (
        <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={styles.inputArea}>
                <View style={{flex:5}}>
                    <TextInput                    
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor={'#999'}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={{flex:2}}>
                    <TouchableHighlight style={styles.button}>
                        <MaterialCommunityIcons style={styles.submitText}
                            name="arrow-up-drop-circle"
                            color="#A593E0"
                        />
                    </TouchableHighlight>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputArea: {
        width: width,
        flexDirection:"row",
        padding: 4,
        backgroundColor: '#fff',
    },
    input: {
        borderRadius: 10,
        textAlign: 'left',
        alignSelf: 'flex-start',
        backgroundColor: '#ececec',
        width: width-60,
        fontSize: 24,
    },
    button: {
        paddingTop: 2,
        marginRight: 15,
        alignSelf: 'flex-end',
        textAlign: 'center',
    },
    submitText: {
        fontSize: 24,
    }
})

export default AddTodo;