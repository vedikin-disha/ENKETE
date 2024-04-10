import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../core/theme'

const Row = (props) => {
  return (
    <View style={{...styles.row, ...props.style}}>
      {props.children}
    </View>
  )
}

export default Row

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 15
    },
})