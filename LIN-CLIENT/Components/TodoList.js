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
    Dimensions,
    TouchableOpacity,
    Animated
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        axios.get('http://xenia.kr:8080/api/v1/todos/')
        .then(res => {
            this.setState({
                data: res.data,
                isLoading: false,
                selectedIds: [],
            });
        })
    }

    onRemove = (index) => {
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
    
            <TouchableOpacity style={styles.removeArea} onPress={() => this.onRemove(item.index)}>
                <MaterialCommunityIcons style={styles.remove}
                    name="close-circle"
                    color="#A593E0"
                />
            </TouchableOpacity>
        </View>
    )

    render() {
        if (this.state.isLoading) {
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <ScrollView contentContainerStyle={styles.listContainer} keyboardShouldPersistTaps='always'>
                <FlatList
                    data={this.state.data.data}
                    extraData={this.state.selectedIds}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
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
    }
})
