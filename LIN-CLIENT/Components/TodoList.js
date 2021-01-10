import React, { Component } from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { 
    ScrollView,
    Text,
    Image,
    FlatList,
    StyleSheet, 
    View,
    ActivityIndicator,
    LogBox,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView, 
} from 'react-native';

var {width, height} = Dimensions.get('window');
const behavior = Platform.OS === "ios" ? "padding" : null
const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            isLoading: true,
            todoItem : "",
            isFetching: false,
            selectedIds: [],
            doneTodo: [],
            empty: true,
        };
    }

    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        this.getAllItem()
    }

    getAllItem = () => {
        axios.get('http://xenia.kr:8080/api/v1/todos/')
        .then(res => {
            if(res.status == 200) {
                this.setState({
                    data: res.data,
                    isLoading: false,
                    empty: false,
                });
            }
        }).catch(error => {
            this.setState({
                isLoading: false,
                empty: true,
            })
            return error
        })
    }

    renderItem = ({item}) => (
        <View style={this.state.selectedIds.includes(item.index) ? styles.containerRemove : styles.container}>
            <TouchableOpacity onPress={() => this.onToggle(item.index, item.title, item.completed)}>
                { item.completed ? (
                    <View style={styles.Completed_circle}>
                        <MaterialCommunityIcons
                            name="check"
                            color="#A593E0"
                            size={24}
                        />
                    </View>
                ) : (
                    <View style={styles.circle} />
                )}
            </TouchableOpacity>

            <Text style={item.completed ? styles.Complete_text : styles.text}>
                {item.title}
            </Text>
    
            <TouchableOpacity style={styles.removeArea} onPress={() => this.onRemoveItem(item, item.index)}>
                <MaterialCommunityIcons style={styles.remove}
                    name="close-circle"
                    color="#A593E0"
                />
            </TouchableOpacity>
        </View>
    )

    onToggle = (index, title, completed) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('completed', completed ? 0 : 1);

        axios({
            url: `http://xenia.kr:8080/api/v1/todos/${index}`,
            method: 'PUT',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(async res => {
            this.setState({
                isFetching: true,
            },() => {
                this.getAllItem();
                this.setState({
                    isFetching: false,
                })
            })

            const doneTodoList = [...this.state.doneTodo]
            if(doneTodoList.includes(index)){
                doneTodoList = doneTodoList.filter(_index => _index !== index)
            } else {
                doneTodoList.push(index)
                await this.setState({doneTodoList})
            }
        })
    }

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
    
    onRemoveItem = (item, index) => {
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
                {this.state.empty ? (
                    <View style={styles.emptyContainer} keyboardShouldPersistTaps='always'>
                        <Image
                            style={styles.bgImage}
                            source={require('../web/bg-nothing.png')}
                        />
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.listContainer} keyboardShouldPersistTaps='always'>
                        <FlatList
                            data={this.state.data.data}
                            extraData={this.state.selectedIds}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onRefresh={this.onAddItem | this.onToggle}
                            refreshing={this.state.isFetching}
                            ListEmptyComponent={this._listEmptyComponent}
                        />
                    </ScrollView>
                )}
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    Complete_text: {
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 20,
        width: 100,
        color: 'gray',
        textDecorationLine: 'line-through'
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
    Completed_circle: {
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
    },
    bgImage: {
        width: '50%',
        height: '50%',
    }
})
