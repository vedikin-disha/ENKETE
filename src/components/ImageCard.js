import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { theme } from './../core/theme';

const home_pic_upload = require('../assets/image_one.jpg');

const ImageCard = (props) => {

    // const image = props.imgSrc==="" ? home_pic_upload : props.imgSrc;

    return (
        <Card>
            <Card.Cover source={{ uri: props.picture }} />
            <Card.Actions style={{ justifyContent: 'center' }}>
                <Text style={styles.profiletext}>{props.title}</Text>
            </Card.Actions>
        </Card>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    profiletext: {
        fontSize: 13,
        padding: 3,
        color: theme.colors.background,
        textAlign: 'center',
    },
})