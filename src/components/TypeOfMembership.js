import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from './Row';
import { Text, Checkbox } from 'react-native-paper';
import { theme } from '../core/theme';


const TypeOfMembership = (props) => {

    return (
        <View style={{ flexDirection: 'column', marginVertical: 10 }}>
            <Row style={{
                marginHorizontal: 0,
                backgroundColor: "#9fbae8"
            }}>
                <View style={{ padding: 5, color:'black' }}>
                    <Text style={{ fontSize: 14 , color:'black'}}>{props.title}</Text>
                </View>
                <View style={{color:'black'}}>
                    <Checkbox
                        status={props.checkStatus}
                        onPress={() => props.onChange()}
                        color="#4b89df"
                        backgroundColor='black'
                    />
                </View>
            </Row>
            <Row style={{
                marginHorizontal: 0,
                backgroundColor: props.color,
                paddingVertical: 5
            }}>
                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 12 , color:'black',fontWeight:'bold'}}>Admission{'\n'}Fees</Text>
                </View>
                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 12, color:'black', right:20,fontWeight:'bold'}}>Annual{'\n'}Membership</Text>
                </View>
                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 12 , color:'black', right:30 ,fontWeight:'bold'}}>Liftime{'\n'}Membership</Text>
                </View>
            </Row>
            <Row style={{
                marginHorizontal: 0,
                backgroundColor: 'white',
                color:'black'
            }}>
                <View style={{ flex: 1, borderEndWidth: 1, paddingStart: 5, paddingVertical: 10 }}>
                    <Text style={{color:'black'}}>Free</Text>
                </View>
                <View style={{ flex: 1, borderEndWidth: 1, paddingStart: 5, paddingVertical: 10 }}>
                    <Text style={{color:'black'}}>Free</Text>
                </View>
                <View style={{ flex: 1, paddingStart: 5, paddingVertical: 10, color:'black' }}>
                    <Text style={{color:'black'}}>Free</Text>
                </View>
            </Row>
        </View>
    )
}

export default TypeOfMembership

const styles = StyleSheet.create({})