import React, { Component } from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { 
    ScrollView,
    Text,
    FlatList,
    StyleSheet, 
    View,
    ActivityIndicator,
    LogBox,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    RefreshControl 
} from 'react-native';

var {width, height} = Dimensions.get('window');
const behavior = Platform.OS === "ios" ? "padding" : null
const keyboardVerticalOffset = Platform.OS === 'ios' ? 86 : 0

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            isLoading: true,
            todoItem : "",
            isFetching: false,
            selectedIds: [],
        };
    }

    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        this.getAllItem()
    }

    getAllItem = () => {
        axios.get('http://xenia.kr:8080/api/v1/todos/')
        .then(res => {
            this.setState({
                data: res.data,
                isLoading: false,
            });
        })
    }

    onRemoveItem = (index) => {
        axios.delete(`http://xenia.kr:8080/api/v1/todos/${index}`)
        .then(async res => {
            if(res.status == 200){
                const selectedIds = [...this.state.selectedIds]
                if(selectedIds.includes(index)){
                    selectedIds = selectedIds.filter(_index => _index !== index)
                } else {
                    selectedIds.push(index)
                    await this.setState({selectedIds})
                }
            }
        })
    }

    renderItem = ({item}) => (
        <View style={this.state.selectedIds.includes(item.index) ? styles.containerRemove : styles.container}>
            <TouchableOpacity>
                <View style={styles.circle} />
            </TouchableOpacity>

            <Text style={styles.text}>{item.title}</Text>
    
            <TouchableOpacity style={styles.removeArea} onPress={() => this.onRemoveItem(item.index)}>
                <MaterialCommunityIcons style={styles.remove}
                    name="close-circle"
                    color="#A593E0"
                />
            </TouchableOpacity>
        </View>
    )

    onAddItem = () => {
        if(this.state.todoItem.length === 0){
            return
        }

        const formData = new FormData();
        formData.append('title', this.state.todoItem);
        formData.append('completed', 0);

        axios({
            url: 'http://xenia.kr:8080/api/v1/todos/',
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            this.setState({
                todoItem: '',
                isFetching: true,
            },() => {
                this.getAllItem();
                this.setState({
                    isFetching: false,
                })
            });
            this.textInput.clear();
        })
    } 

    render() {
        if (this.state.isLoading) {
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <>
                <ScrollView contentContainerStyle={styles.listContainer} keyboardShouldPersistTaps='always'>
                    <FlatList
                        data={this.state.data.data}
                        extraData={this.state.selectedIds}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onRefresh={this.onAddItem}
                        refreshing={this.state.isFetching}
                    />
                </ScrollView>
                <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <View style={styles.inputArea}>
                        <View style={{flex:5}}>
                            <TextInput    
                                ref={input => { this.textInput = input }}                 
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
                            <TouchableOpacity style={styles.button} onPress={this.onAddItem}>
                                <MaterialCommunityIcons style={styles.submitText}
                                    name="arrow-up-drop-circle"
                                    color="#A593E0"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        marginBottom: 5,
        paddingLeft: 2,
        paddingRight: 2,
        width: width-10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',

        // border
        borderWidth: 1,
        borderColor: '#ececec',
        borderRadius: 10,
        
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.00,

        elevation: 0.2,
    },
    containerRemove: {
        display: 'none'
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 20,
        width: 100,
    },
    circle: {
        width: 28,
        height: 28,
        marginRight: 20,
        marginLeft: 20,

        // border
        borderRadius: 15,
        borderColor: '#A593E0',
        borderWidth: 2,
    },
    removeArea: {
        marginRight: 10,
        marginLeft: 'auto'
    },
    remove: {
        width: 30,
        height: 30,
        fontSize: 25,
    },
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
