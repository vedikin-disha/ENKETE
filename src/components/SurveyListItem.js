import { StyleSheet, View } from 'react-native'
import React from 'react'
import { theme } from '../core/theme';
import { Text, Card, Button } from 'react-native-paper';
import Row from './Row';

const SurveyListItem = (props) => {

    return (
        <Card style={styles.item}>
            <Card.Content style={{ padding: 10 }}>
                <Row>
                    <View style={{ flex: 0.3 }}><Text>Survey-ID:</Text></View>
                    <View style={{ flex: 0.7 }}><Text>{props.data.surveyId}</Text></View>
                </Row>
            </Card.Content>
            <Card.Actions style={{ backgroundColor: theme.colors.text }}>
                <Row>
                    <View style={{ flex: 0.49 }}>
                        <Button
                            icon="file-eye"
                            mode="outlined"
                            onPress={() => props.onView(props.data.surveyId)}
                        >
                            View
                        </Button>
                    </View>
                    <View style={{ flex: 0.49 }}>
                        <Button
                            icon="file-download"
                            mode="outlined"
                            onPress={() => props.onDownload(props.data.surveyId)}
                        >
                            Download
                        </Button>
                    </View>
                </Row>
            </Card.Actions>
        </Card>
    )
}

export default SurveyListItem

const styles = StyleSheet.create({
    item: {
        backgroundColor: theme.colors.background,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})