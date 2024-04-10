import { StyleSheet, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SelectDropdown from 'react-native-select-dropdown'
import { theme } from '../core/theme'
import { Title, Text } from 'react-native-paper'

const Dropdown = (props) => {

    const width = props.width ? props.width + '%' : '100%';
    const height = props.height ? props.height : 30;

    return (
        <View style={{ flex: props.flex, flexDirection: 'column' }}>
            {props.is_title ? 
                <Title style={{ paddingBottom: 5 }}>{props.title}</Title>
                :
                <Text style={{ fontSize: 12, paddingBottom: 5 }}>{props.title}</Text>
            }
            <SelectDropdown
                data={props.data}
                onSelect={(selectedItem, index) => {
                    props.onChange(selectedItem)
                }}
                defaultButtonText={props.defaultText}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={{
                    ...styles.dropdown1BtnStyle,
                    ...{ width: width, height: height, marginHorizontal: 5 }
                }}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />
        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        backgroundColor: theme.colors.backgroundLight,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        start: -5
    },
    dropdown1BtnTxtStyle: {
        color: theme.colors.primary,
        fontSize: 12,
        textAlign: 'left',
        start: 10
    },
    dropdown1DropdownStyle: {
        backgroundColor: theme.colors.backgroundLight,
        color: theme.colors.primary
    },
    dropdown1RowStyle: {
        backgroundColor: theme.colors.backgroundLight,
        borderBottomColor: '#C5C5C5',
        color: theme.colors.primary,
    },
    dropdown1RowTxtStyle: {
        color: theme.colors.primary,
        textAlign: 'left'
    },
})