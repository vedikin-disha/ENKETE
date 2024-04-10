import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../core/theme'

const Column = (props) => {
  return (
    <View style={{...styles.column, ...props.style}}>
      {props.children}
    </View>
  )
}

export default Column

const styles = StyleSheet.create({
    column: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginHorizontal: 15
    },
})