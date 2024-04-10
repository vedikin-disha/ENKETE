import { StyleSheet, View } from 'react-native'
import React from 'react'
import { theme } from '../core/theme'
import { RadioButton, Text } from 'react-native-paper'

const InlineRadioButton = (props) => {

    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        if (props.currentValue === '') {
            setValue(props.data[0]);
        } else {
            setValue(props.currentValue);
        }

    }, []);

    return (
        <View style={{ flexDirection: 'column' }}>
            {props.title &&
                <Text>{props.title}</Text>
            }
            <View style={{...styles.questionInlineRadioBtn, ...props.style}}>
                {props.data.map((element, i) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center',color:'black' }} key={i}>
                       <RadioButton
        color="black"
        value={element}
        status={value === element ? 'checked' : 'unchecked' }
        onPress={() => {
        setValue(element);
        props.onPress(element);
    }}
/>
                        <Text style={{ fontSize: 12, color:'black', fontWeight:'bold' }}>{element}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default InlineRadioButton

const styles = StyleSheet.create({
    questionInlineRadioBtn: {
       
        flexDirection: 'row',
        // backgroundColor: theme.colors.backgroundLight
        backgroundColor: "#d1dbe9",
        
    },
})