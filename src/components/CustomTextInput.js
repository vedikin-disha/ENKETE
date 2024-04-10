import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import { theme } from '../core/theme'
import { Text } from 'react-native-paper'

const CustomTextInput = (props) => {

    const [currentValue, setCurrentValue] = React.useState('');

    return (
        <View style={{ flex: props.flex, flexDirection: 'column' }}>
            <Text style={{ fontSize: 12, paddingBottom: 5 }}>{props.title}</Text>
            <TextInput
                style={styles.questionInput}
                placeholder={props.placeholder}
                onChangeText={(text) => setCurrentValue(text)}
                onEndEditing={() => props.onChange(currentValue)}
                value={currentValue}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    questionInput: {
        backgroundColor: theme.colors.backgroundLight,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        paddingLeft: 20,
        marginHorizontal: 0.5
    },
})