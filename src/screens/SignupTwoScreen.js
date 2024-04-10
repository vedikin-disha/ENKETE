import { ScrollView, StyleSheet, View, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import InlineRadioButton from '../components/InlineRadioButton'
import Row from '../components/Row';
import { Checkbox, Title, Text, TextInput, Button } from 'react-native-paper';
import { theme } from './../core/theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import TypeOfMembership from '../components/TypeOfMembership';
import { cortexSurveyFirebaseApi } from "../api/cortexSurveyApi";
import { getData } from '../helpers'

const userGradeData = ['Surveyor', 'Surveyor Reviewer'];
const typeOfMemberData = ['Non-Professional Surveyor', 'Professional Surveyor', 'Certified Surveyor'];

const initialValues = {
    userGrade: userGradeData[0],
    typeOfMembership: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
};

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .email()
        .required('Email is Required'),
    phone: Yup.string()
        // .phone("IN", "Please enter a valid phone number")
        .required(" phone number is required"),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is Required'),
    password_confirmation: Yup.string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const SignupTwoScreen = ({ route, navigation }) => {

    const registrationFirstData = route.params;

    console.log('registrationFirstData', registrationFirstData);

    const [checked, setChecked] = React.useState([true, false, false]);
    const [typeOfMember, setTypeOfMember] = React.useState(typeOfMemberData[0]);

    const onChange = (index) => {
        const valCheked = [...checked];
        valCheked.map((val, i) => {
            if (i == index) {
                valCheked[index] = !checked[index];
                setTypeOfMember(typeOfMemberData[index]);
            } else {
                valCheked[i] = false;
            }
        })
        setChecked(valCheked);
    }

    const onSubmitHandle = async (values) => {

        let mergeObject = { ...registrationFirstData, ...values };

        console.log("MERGEObject", mergeObject)

        var temp_guest_id = await getData('@userId');
        if (temp_guest_id) {
            mergeObject = { ...mergeObject, 'temp_guest_id': temp_guest_id }
        } else {
            mergeObject = { ...mergeObject, 'temp_guest_id': "" }
        }
        
        cortexSurveyFirebaseApi.post('/registration', mergeObject)
        .then(function(res) {
            console.log(res.data);
            if (res.data.error === 0) {
                Alert.alert(
                    'Successfull',
                    res.data.message,
                    [
                        { text: 'OK', onPress: () => navigation.navigate('Login') },
                    ],
                    { cancelable: false },
                );
            }else{
                ToastAndroid.show(res.data.message, ToastAndroid.CENTER);
            }
        })
        .catch(function(err) {
            console.log(err)
        })

    }

    return (
        <Container>
            <ScrollView>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={values => onSubmitHandle(values)}
                >
                    {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>

                        <View style={{ marginVertical: 5 }}>
                            <InlineRadioButton
                                style={{ color: 'black', fontSize:20 }}
                                data={userGradeData} 
                                title={<Text style={{ color: 'black', fontWeight:'bold' }}>User Grade</Text>}
                                onPress={handleChange('userGrade')}
                                currentValue={values.userGrade}
                            />
                        </View>

                            <Title style={{ marginTop: 10 , color:'black'}}>Type of Membership</Title>

                            <TypeOfMembership
                                title={typeOfMemberData[0]}
                                color={theme.colors.defaultBlue}
                                checkStatus={checked[0] ? 'checked' : 'unchecked'}
                                onChange={() => onChange(0)}
                            />

                            <TypeOfMembership
                                title={typeOfMemberData[1]}
                                color='#22edcf'
                                checkStatus={checked[1] ? 'checked' : 'unchecked'}
                                onChange={() => onChange(1)}
                            />

                            <TypeOfMembership
                                title={typeOfMemberData[2]}
                                color="#e97b4f"
                                checkStatus={checked[2] ? 'checked' : 'unchecked'}
                                onChange={() => onChange(2)}
                            />

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 10 , color:'black'}}>Note: Annual Membership Renewal Fees for each year in full and shall be paid in advance on or before 31st March of the preceeding year.</Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    label="Enter Your Email"
                                    left={<TextInput.Icon name="email" color='black' />}
                                    mode="outlined"
                                    style={{ flex: 1, backgroundColor:'white', color:'black' }}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    error={errors.email ? true : false}
                                />
                                {errors.email && touched.email ? (
                                    <Text style={{color:'black'}}>{errors.email}</Text>
                                ) : null}
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    keyboardType="numeric"
                                    label="Phone Number"
                                    left={<TextInput.Icon name="phone"  color='black' />}
                                    mode="outlined"
                                    style={{ flex: 1 , backgroundColor:'white', color:'black' }}
                                    onChangeText={handleChange('phone')}
                                    value={values.phone}
                                    error={errors.phone ? true : false}
                                />
                                {errors.phone && touched.phone ? (
                                    <Text style={{color:'black'}}>{errors.phone}</Text>
                                ) : null}
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                               
                                theme={{ colors: { text: 'black' } }}
                                    secureTextEntry
                                    label="Password"
                                    left={<TextInput.Icon name="lock-outline"  color='black' />}
                                    mode="outlined"
                                    style={{ flex: 1 , backgroundColor:'white', color:'black' }}
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    error={errors.password ? true : false}
                                />
                                {errors.password && touched.password ? (
                                    <Text style={{color:'black'}}>{errors.password}</Text>
                                ) : null}
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TextInput
                                theme={{ colors: { text: 'black' } }}
                                    secureTextEntry
                                    label="Confirm Password"
                                    left={<TextInput.Icon name="lock" color='black' />}
                                    mode="outlined"
                                    style={{ flex: 1 , backgroundColor:'white', color:'black' }}
                                    onChangeText={handleChange('password_confirmation')}
                                    value={values.password_confirmation}
                                    error={errors.password_confirmation ? true : false}
                                />
                                {errors.password_confirmation && touched.password_confirmation ? (
                                    <Text style={{color:'black'}}>{errors.password_confirmation}</Text>
                                ) : null}
                            </View>
                            <View style={{ marginVertical: 15 }}>
                                <Button
                                    mode='contained'
                                    color="#4b89df"
                                    uppercase={false}
                                    onPress={handleSubmit}
                                >
                                   <Text style={{fontWeight:'bold', color:'white'}}>Continue</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </Container>
    )
}

export default SignupTwoScreen

const styles = StyleSheet.create({
    form: {
        marginTop: 5,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
})