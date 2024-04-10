import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../core/theme'
import { Card, Paragraph, Title } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeCard = (props) => {
  return (
    <Card style={{...styles.card, ...props.style}}>
        <Card.Content>
            <Icon name={props.icon} size={props.icon_size} style={styles.card_icon}/>
            <Paragraph style={{...styles.card_para, ...props.paraStyle}}>{props.para}</Paragraph>
        </Card.Content>
    </Card>
  )
}

export default HomeCard

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: '#e9ecf2',
    },
    card_para: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '800',
        fontSize: 30
    },
    card_icon: {
        textAlign: 'center',
        color: 'black'
    }
})