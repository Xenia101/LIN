import * as React from 'react';
import { 
    TextInput,
    View,
    Button,
    StyleSheet,
    Dimensions ,
    KeyboardAvoidingView 
} from 'react-native';

const behavior = Platform.OS === "ios" ? "padding" : null
const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0

var {width, height} = Dimensions.get('window');

const AddTodo = () => {
    return (
        <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={styles.inputArea}>
                <TextInput                    
                    style={styles.input}
                    placeholder="Add ToDo"
                    placeholderTextColor={'#999'}
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                />
                <Button title="Submit" />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A593E0',
        width: width,
        flexDirection: 'row',
        height: 10
    },
    input: {
        width: width-20,
        backgroundColor: '#A593E0',
        fontSize: 24,
    }
})

export default AddTodo;