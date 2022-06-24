import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem, Button, Input } from '@rneui/themed';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import socketIOClient from "socket.io-client";

import backend from '../backend.config.json';
const BACKEND_URL = backend.url;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    msgContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc',
    },
    sendContainer: {
        margin: '2%',
    }
});

function ChatScreen(props) {
    let socket = socketIOClient(BACKEND_URL);
    const [currentMessage, setCurrentMessage] = useState('');
    const [listMessage, setListMessage] = useState([]);

    let handleButtonPress = () => {
        if (currentMessage.length === 0) {
            return;
        }
        let msg = {
            content: currentMessage,
            user: props.user.pseudo,
        }
        socket.emit('sendMessage', msg);
        setCurrentMessage('');
    }
    useEffect(() => {
        socket.on('sendMessageToAll', function(message) {
            if(!message) {
                return;
            }
            let mymsg = {
                content: message.content,
                user: message.user,
            }
            let index = mymsg.content.indexOf(':)') 
            if (index != -1) {
                mymsg = mymsg.content.replace(':)', '...');
                console.log(mymsg.content);
            }
            
            setListMessage([...listMessage, mymsg]);
      
            console.log('message received from back!')
        });  
    }, [] );

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <ScrollView style={styles.msgContainer}>
                    {listMessage.map((l, i) => (
                        <ListItem key={i} bottomDivider style={{ flexDirection: 'column' }}>
                            <ListItem.Title style={{ fontWeight: 'bold' }} >{l.user}</ListItem.Title>
                            <ListItem.Subtitle>{l.content}</ListItem.Subtitle>
                            
                        </ListItem>
                    ))}
                    {listMessage.length === 0 && (<Text style={{ textAlign: 'center', fontSize: 18, marginTop: '4%' }}>Messages will appear here...</Text>)}
                </ScrollView>
                <View style={styles.sendContainer} >
                    <Input placeholder={'Message...'} style={{ padding:0 }} value={currentMessage} onChangeText={(text) => setCurrentMessage(text)} />
                    <Button buttonStyle={{ backgroundColor: '#eb4d4b' }} title={'Send'} onPress={() => handleButtonPress()} />
                </View>
            </View>
        </SafeAreaView>
    );
}


function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps, null)(ChatScreen);