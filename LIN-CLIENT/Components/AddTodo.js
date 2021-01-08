import * as React from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions ,
    KeyboardAvoidingView,
} from 'react-native';

const behavior = Platform.OS === "ios" ? "padding" : null
const keyboardVerticalOffset = Platform.OS === 'ios' ? 86 : 0
var {width, height} = Dimensions.get('window');

export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItem : ""
        };
    }

    onPressHandler = () => {
        if(this.state.todoItem.length === 0){
            return
        }
        console.log(this.state.todoItem)
        
        const data = {
            title: this.state.todoItem,
            completed: 0
        }

        axios.post('http://xenia.kr:8080/api/v1/todos/', { data })
        .then(res => {
            console.log(res)
        })
    }
    
    render() {
        return (
            <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={styles.inputArea}>
                    <View style={{flex:5}}>
                        <TextInput                    
                            style={styles.input}
                            placeholder="Aa"
                            placeholderTextColor={'#999'}
                            autoCorrect={false}
                            contextMenuHidden={true}
                            selectionColor={'#A593E0'}
                            underlineColorAndroid='transparent'
                            onChangeText={(todoItem) => this.setState({todoItem})}
                        />
                    </View>
                    <View style={{flex:2}}>
                        <TouchableOpacity style={styles.button} onPress={this.onPressHandler}>
                            <MaterialCommunityIcons style={styles.submitText}
                                name="arrow-up-drop-circle"
                                color="#A593E0"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
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
        paddingHorizontal: 6,
        textAlign: 'left',
        alignSelf: 'flex-start',
        backgroundColor: '#ececec',
        width: width-60,
        fontSize: 28,
    },
    button: {
        paddingTop: 2,
        marginRight: 15,
        alignSelf: 'flex-end',
        textAlign: 'center',
    },
    submitText: {
        fontSize: 28,
    }
})
