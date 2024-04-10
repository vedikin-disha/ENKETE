import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { Title, Avatar, Text, TextInput, Subheading, Button } from 'react-native-paper'
import { theme } from '../core/theme'
import Container from '../components/Container'
import Row from '../components/Row'
import InlineRadioButton from '../components/InlineRadioButton'
import SelectDropdown from 'react-native-select-dropdown'
import { getYears } from '../helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { black } from 'react-native-paper/lib/typescript/styles/colors'

const PrefixData = ["Mr.", "Mrs.", "Ms."];
const industryData = ["Agriculture and Allied Industries", "Auto Components", "Automobiles", "Aviation", "Banking", "Biotechnology", "Cement", "Chemicals", "Consumer Durables", "Defence Manufacturing", "E-Commerce", "Education and Training", "Electronics System Design & Manufacturing", "Engineering and Capital Goods", "Financial Services", "FMCG", "Gems and Jewellery", "Healthcare", "Infrastructure", "Insurance", "IT & BPM", "Manufacturing", "Media and Entertainment", "Medical Devices", "Metals and Mining", "MSME", "Oil and Gas", "Pharmaceuticals", "Ports", "Power", "Railways", "Real Estate", "Renewable Energy", "Retail", "Roads", "Science and Technology", "Services", "Steel", "Telecommunications", "Textiles", "Tourism and Hospitality"];
const qulificationData = ["Bachelor of Architecture - B.Arch", "Bachelor of Arts - B.A.", "Bachelor of Ayurvedic Medicine & Surgery - B.A.M.S.", "Bachelor of Business Administration - B.B.A.", "Bachelor of Commerce - B.Com.", "Bachelor of Computer Applications - B.C.A.", "Bachelor of Dental Surgery - B.D.S.", "Bachelor of Design - B.Des. / B.D.", "Bachelor of Education - B.Ed.", "Bachelor of Engineering / Bachelor of Technology - B.E./B.Tech.", "Bachelor of Fine Arts - BFA / BVA", "Bachelor of Fisheries Science - B.F.Sc./ B.Sc. (Fisheries).", "Bachelor of Homoeopathic Medicine and Surgery - B.H.M.S.", "Bachelor of Laws - L.L.B.", "Bachelor of Library Science - B.Lib. / B.Lib.Sc.", "Bachelor of Mass Communications - B.M.C. / B.M.M.", "Bachelor of Medicine and Bachelor of Surgery - M.B.B.S.", "Bachelor of Nursing", "Bachelor of Pharmacy - B.Pharm / B.Pharma.", "Bachelor of Physical Education - B.P.Ed.", "Bachelor of Physiotherapy - B.P.T.", "Bachelor of Science - B.Sc.", "Bachelor of Social Work - BSW / B.A. (SW)", "Bachelor of Veterinary Science & Animal Husbandry - B.V.Sc. & A.H. / B.V.Sc", "Doctor of Medicine - M.D.", "Doctor of Medicine in Homoeopathy - M.D. (Homoeopathy)", "Doctor of Pharmacy - Pharm.D", "Doctor of Philosophy - Ph.D.", "Doctorate of Medicine - D.M.", "Master of Architecture - M.Arch.", "Master of Arts - M.A.", "Master of Business Administration - M.B.A.", "Master of Chirurgiae - M.Ch.", "Master of Commerce - M.Com.", "Master of Computer Applications - M.C.A.", "Master of Dental Surgery - M.D.S.", "Master of Design - M.Des./ M.Design.", "Master of Education - M.Ed.", "Master of Engineering / Master of Technology - M.E./ M.Tech.", "Master of Fine Arts - MFA / MVA", "Master of Laws - L.L.M.", "Master of Library Science - M.Lib./ M.Lib.Sc.", "Master of Mass Communications / Mass Media - M.M.C / M.M.M.", "Master of Pharmacy - M.Pharm", "Master of Philosophy - M.Phil.", "Master of Physical Education M.P.Ed. / M.P.E.", "Master of Physiotherapy - M.P.T.", "Master of Science - M.Sc.", "Master of Social Work / Master of Arts in Social Work - M.S.W. / M.A. (SW)", "Master of Science in Agriculture - M.Sc. (Agriculture)", "Master of Surgery - M.S.", "Master of Veterinary Science - M.V.Sc."];
const yearsData = getYears('cu', 1970);

const initialValues = {
    prefix: PrefixData[0],
    firstName: "",
    midName: "",
    lastName: "",
    organization: "",
    industryType: "",
    postalAddress: "",
    street: "",
    state: "",
    country: "",
    pincode: "",
    highestQualification: "",
    yearOfPassing: "",
}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First Name is Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last Name is Required'),
});

const SignupScreen = ({ navigation }) => {

    const handleSubmit = (values) => {
        navigation.navigate('SignupTwo', values);
    }

    return (
        <Container>
            <ScrollView>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={values => onContinue(values)}
                >
                    {({ handleChange, setFieldValue,  values, errors, touched }) => (
                        <View style={styles.form}>
                            {/* <Title style={styles.title}>Register as a New Surveyor</Title> */}
                            <Row style={{ marginHorizontal: 0,color: 'black' }}>
                               
                                <InlineRadioButton
                                   style={styles.data}
                                    title={
                                        <Text style={{ color: 'black', fontWeight:'bold' }}>Prefix</Text> 
                                    }
                                    data={PrefixData}
                                    onPress={handleChange('prefix')}
                                    currentValue={values.prefix}
                                />
                              
                                {/* <Avatar.Text
                                    size={100}
                                    label="Upload Photo"
                                    color={theme.colors.backgroundDark}
                                    style={styles.avatarStyle}
                                    labelStyle={styles.avatarLabelStyle}
                                /> */}
                            </Row>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="First Name"
                                    left={<TextInput.Icon name="account" color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',  }}
                                    onChangeText={handleChange('firstName')}
                                    value={values.firstName}
                                    // error={errors.firstName?true:false}
                                />
                                {/* {errors.firstName && touched.firstName ? (
                                    <Text>{errors.firstName}</Text>
                                ) : null} */}
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Middle Name"
                                    left={<TextInput.Icon name="account"color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('midName')}
                                    value={values.midName}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Last Name"
                                    left={<TextInput.Icon name="account"color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('lastName')}
                                    value={values.lastName}
                                    // error={errors.lastName?true:false}
                                />
                                {/* {errors.lastName && touched.lastName ? (
                                    <Text>{errors.lastName}</Text>
                                ) : null} */}
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Organization"
                                    left={<TextInput.Icon name="office-building" color="black"/>}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('organization')}
                                    value={values.organization}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <SelectDropdown
                                    data={industryData}
                                    onSelect={(selectedItem, index) => {
                                        setFieldValue('industryType', selectedItem)
                                    }}
                                    defaultValue={values.industryType}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                    buttonStyle={{ ...styles.dropdown3BtnStyle, ...{ width: '100%', marginVertical: 2, paddingHorizontal: 5, backgroundColor:'white' } }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                                    }}
                                    renderCustomizedButtonChild={(selectedItem, index) => {
                                        return (
                                            <View style={styles.dropdown3BtnChildStyle}>
                                                <Icon name="office-building" color="black" size={25} />
                                                <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Industry Type'}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Postal Address"
                                    left={<TextInput.Icon name="map-marker-radius" color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('postalAddress')}
                                    value={values.postalAddress}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Street"
                                    left={<TextInput.Icon name="map-marker-radius" color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('street')}
                                    value={values.street}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="State"
                                    left={<TextInput.Icon name="map-marker-radius" color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('state')}
                                    value={values.state}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Country"
                                    left={<TextInput.Icon name="map-marker-radius"color="black" />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('country')}
                                    value={values.country}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                  theme={{ colors: { text: 'black' } }}
                                    label="Pin Code"
                                    left={<TextInput.Icon name="map-marker-radius"  color="black"/>}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white',borderRadius:15 }}
                                    onChangeText={handleChange('pincode')}
                                    value={values.pincode}
                                />
                            </View>

                            <Subheading style={{ marginTop: 15 ,color:'black', fontWeight:'bold'}}>Qualification Details</Subheading>
                            <View style={{ marginTop: 5 }}>
                                <SelectDropdown
                                    data={qulificationData}
                                    onSelect={(selectedItem, index) => {
                                        setFieldValue('highestQualification', selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                    defaultValue={values.highestQualification}
                                    buttonStyle={{ ...styles.dropdown3BtnStyle, ...{ width: '100%', marginVertical: 2, paddingHorizontal: 5 , backgroundColor:'white'} }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                                    }}
                                    renderCustomizedButtonChild={(selectedItem, index) => {
                                        return (
                                            <View style={styles.dropdown3BtnChildStyle}>
                                                
                                                <Icon name="school" color="black" size={27} />
                                                {/* <Text>Highest Qualification</Text> */}
                                                <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Highest Qualification'} </Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <SelectDropdown
                                    data={yearsData}
                                    onSelect={(selectedItem, index) => {
                                        setFieldValue('yearOfPassing', selectedItem)
                                    }}
                                    defaultValue={values.yearOfPassing}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                    buttonStyle={{ ...styles.dropdown3BtnStyle, ...{ width: '100%', marginVertical: 2, paddingHorizontal: 5, backgroundColor:'white' } }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                                    }}
                                    renderCustomizedButtonChild={(selectedItem, index) => {
                                        return (
                                            <View style={styles.dropdown3BtnChildStyle}>
                                                <Icon name="school"color="black" size={27} />
                                                <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Year of Passing'}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Button
                                    mode='contained'
                                    
                                    color='#4b89df'
                                    uppercase={false}
                                    onPress={handleSubmit}
                                >
                                    <Text style={{fontWeight:'bold', color:'white'}}>
                                    Continue
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </Container>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        color:'black',
        backgroundColor: theme.colors.backgroundLight,
        justifyContent: 'flex-start',
    },
    data:{
        color:'black',
        justifyContent:'space-between',
        color:'black',
    },
    title: {
        color:'black',
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 18
    },
    form: {
        color:'black',
        marginTop: 5,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    avatarStyle: {
        backgroundColor:'black',
        padding: 1
    },
    avatarLabelStyle: {
        fontSize: 16,
        color:'black'
    },
    dropdown3BtnStyle: {
        height: 60,
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 0,
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#444',
    },
    dropdown3BtnChildStyle: {
        backgroundColor:'white',
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    dropdown3BtnTxt: {
        color: 'lightgray',
        textAlign: 'center',
        fontSize: theme.fontsizes.mid,
        marginHorizontal: 5,
        fontSize: 16,
    },
})