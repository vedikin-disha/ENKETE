import { StyleSheet, Text, View, Image, Pressable, Modal, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {  Title, Button, Card, Paragraph } from 'react-native-paper'
import { theme } from '../core/theme'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const home_pic_upload = require('../assets/home_pic_upload.png');
const DEFAULT_IMAGE = Image.resolveAssetSource(home_pic_upload).uri;

const ImageUploadCard = (props) => {

    const image = props.imgSrc==="" ? DEFAULT_IMAGE : props.imgSrc;
    const [currentValue, setCurrentValue] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const handleSubmit = () =>{

    }

    return (
        <>
            <Card style={{ ...styles.card, ...props.style }}>
                <Card.Content style={styles.cardContent}>
                    <Pressable onPress={() => props.onUpload()}>
                        <Image
                            style={styles.homePicUpload}
                            source={{ uri: image }}
                        />
                    </Pressable>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                    {props.isTextInput ?
                 
                        <TextInput
                            placeholder={props.label}
                            style={styles.cardInput}
                            onChangeText={(text) => setCurrentValue(text)}
                            onEndEditing={() => props.onChange(currentValue)}
                            value={currentValue}
                        />
                        :
                        <>
                            <Pressable onPress={toggleModal}>
                                <Icon name={props.icon} size={24} color="black" style={styles.icon} />
                            </Pressable>
                            <Text style={styles.cardText}>{props.label}</Text>
                        </>
                    }
                </Card.Actions>
            </Card>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'black', left: 20, fontSize: 20, fontWeight: 'bold' }}>Setting</Text>
                        <TouchableOpacity style={styles.close} onPress={toggleModal}>
                            <Text style={styles.closeText}>&times;</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            <Title style={styles.title}>Select camera type</Title>
                            <TextInput
                                style={[styles.inputTxt, { color: 'black' }]}
                                mode='outlined'
                            />
                            <Title style={styles.title}>Select image click condition</Title>
                            <TextInput
                                keyboardType="numeric"
                                label="Aadhar Number"
                                style={styles.inputTxt}
                                mode='outlined'
                            />
                            <Title style={styles.title}>Capturing image</Title>
                            <TextInput
                                label="Phone Number"
                                style={styles.inputTxt}
                                mode='outlined'
                            />
                            <Button
                                style={styles.btn_large}
                                mode="contained"
                                contentStyle={{ height: 45 }}
                                labelStyle={{ fontSize: 15 }}
                                value="Submit"
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </Button>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ImageUploadCard

const styles = StyleSheet.create({
    
    card: {
        backgroundColor: '#a9b5d4',
        borderRadius: 0,
    },
    cardContent: {
        alignItems: 'center'
    },
    homePicUpload: {
        color:'#a9b5d4',
        width: 100,
        height: 100,
    },
    cardActions: {
        color:'gray',
        top: 15,
        backgroundColor: 'gray',
        justifyContent: 'center'
    },
    cardText: {
        fontWeight: '800',
        fontSize: 16,
    },
    cardInput: {
        width: '100%',
        height: 35,
        borderRadius: 0,
        fontSize: 12
    },
    btn_large: {
        top:40,
        alignSelf:'center',
        width:"85%",
        color:'white',
        backgroundColor:'#3371cb',
        marginTop: 150,
        marginBottom: 70,
        borderRadius: 10,
        justifyContent: 'center',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
    },
      inputTxt: {
        left:40,
        padding:-10,
        margin:-10,
        color:'white',
        // backgroundColor:'black',
        width: '80%',
        // height: 50,
        borderWidth:1
      },
      button: {
        padding: 10,
        backgroundColor: '#d1dbe9',
        // marginBottom: 10,
        color:'black'
      },
      title: {
        fontSize:15,
        left:30,
        fontWeight:'bold',
        color:'black',
        paddingTop: 50,
        paddingBottom: 10
      },
      form: {
        backgroundColor:'black'
        // marginTop: 5,
        // paddingHorizontal: 15,
        // paddingBottom: 10
      },
      closeText: {
        color:'black',
        fontSize: 50,
        right:20,
      },
    
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      modalContent: {
        backgroundColor: '#fefefe',
        // padding: 80,
        paddingTop:30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
        width: '80%',
        height: '80%',
        marginBottom:10,
      
      },
      close: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      icon:{
        color:'white',
        right:10
      }
});
