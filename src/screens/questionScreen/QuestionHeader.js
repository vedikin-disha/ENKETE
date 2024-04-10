import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../core/theme'
import { Button, Divider, Title } from 'react-native-paper'
import { CircularProgressBase } from 'react-native-circular-progress-indicator'
import Row from '../../components/Row'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

const circleStyle = {
    activeStrokeWidth: 4,
    inActiveStrokeWidth: 3,
    inActiveStrokeOpacity: 0.5,
    delay: 500,
};

const CircleTitle = ({ data, currentItem, totalQuestions, totalAnswers }) => (
    <View style={{ flex: 1, alignItems: 'center', color:'black' }}>
        <CircularProgressBase
            {...circleStyle}
            value={data.id==currentItem.id?100:0}
            radius={58}
            activeStrokeColor={'#6989d6'}
            inActiveStrokeColor={'#000'}
        >
            <View style={{ ...styles.childContainer, ...{ backgroundColor: data.id==currentItem.id?'#53a4fd':'' } }}>
                <Text style={styles.childText}>{totalAnswers} / {totalQuestions}</Text>
                <Text style={styles.childTextTwo}>Resiliometer</Text>
            </View>
        </CircularProgressBase>
        <Text style={styles.circleBottomTxt}>{data.title}</Text>
    </View>
);

const QuestionHeader = (props) => {

    const RenderCircles = () => {
        return props.data.map((element, index) => {
            return (
                <CircleTitle 
                    color='black'
                    data={element} 
                    currentItem={props.currentItem} 
                    key={index}
                    totalQuestions={props.totalQuestions[index].data.length}
                    totalAnswers={props.totalAnswers[index]}
                />
            );
        });
    };

    return (
        <View>
            <Row style={{ marginTop: 10 }}>
                <Title style={{color:'black', fontWeight:'bold'}}>{props.currentItem.title}</Title>
            </Row>
            <Row style={{ marginTop: 5 }}>
                <RenderCircles />
            </Row>
            <Divider style={{ marginTop: 20, backgroundColor: theme.colors.background, height: 1, marginHorizontal: 15 }} />
            <Row style={{ marginTop: 5 }}>
                <View style={{ alignItems: 'center' }}>
                    <Icon name='scale-balance' size={24} style={{ color: theme.colors.defaultBlue, paddingBottom: 5 }} />
                    <Text style={styles.midSignTxt}>Having resillance booster in structure</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Icon name='scale-unbalanced' size={24} style={{ color: theme.colors.defaultBlue, paddingBottom: 5 }} />
                    <Text style={styles.midSignTxt}>Having fragility factor in stucture</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Ionicons name='alert' size={24} style={{ color: theme.colors.danger, paddingBottom: 5 }} />
                    <Text style={styles.midSignTxt}>Mandatory</Text>
                </View>
            </Row>
        </View>
    )
}

export default QuestionHeader

const styles = StyleSheet.create({
    childContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    childText: {
        color: '#000',
        fontSize: 26,
        fontWeight: 'bold'
    },
    childTextTwo: {
        color: '#000',
        fontSize: 10,
    },
    circleBottomTxt: {
        color: '#000',
        fontSize: 15,
        paddingTop: 10,
        textAlign: 'center'
    },
    midSignTxt: {
        fontSize: 9,
        color:'#000',
        fontWeight: 'bold'
    },
})