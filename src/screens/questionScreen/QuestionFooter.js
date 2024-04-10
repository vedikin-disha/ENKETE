import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Row from '../../components/Row'
import { Button } from 'react-native-paper'

const QuestionFooter = (props) => {
    return (
        <Row style={{ marginTop: 20, paddingBottom: 20 }}>
            <View style={{ flex: 0.3 }}>
                <Button
               
                color='#3371cb'
                    mode='contained'
                    size={20}
                    onPress={() => props.backBtnPress()}>
                    {props.btnLeftText}
                </Button>
            </View>
            <View style={{ flex: 0.4 }}>
                <Button
                     color='#3371cb'
                    mode='contained'
                    disabled={props.disabledContinue}
                    loading={props.loadingSubmit}
                    onPress={() => props.continueBtnPress()}
                    uppercase={props.uppercase?props.uppercase:false}
                >
                    {props.btnRightText}
                </Button>
            </View>
        </Row>
    )
}

export default QuestionFooter

const styles = StyleSheet.create({})