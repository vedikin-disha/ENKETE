import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { theme } from '../core/theme'

const STYLES = ['default', 'dark-content', 'light-content'];

const Container = (props) => {
  return (
    <SafeAreaView style={{...styles.container, ...props.style}}>
            <StatusBar
                backgroundColor="#4b89df"
                barStyle={STYLES[0]} />
            {props.children}
    </SafeAreaView>
  )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        // backgroundColor: theme.colors.backgroundLight
        backgroundColor: "#d1dbe9",
    },
})