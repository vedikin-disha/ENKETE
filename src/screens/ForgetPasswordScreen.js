import { Image, StyleSheet, View, BackHandler, ScrollView } from 'react-native'
import React, { useRef, useEffect } from 'react'
import Container from '../components/Container'
import { theme } from '../core/theme'
import Row from '../components/Row'
import { IconButton, Button, TextInput, Title, Text } from 'react-native-paper'
import OTPTextView from 'react-native-otp-textinput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { cortexSurveyApi } from '../api/cortexSurveyApi'

const initialValues = {
  email: "",
  otp: "",
}

const forgetPassSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is Required'),
  otp: Yup.number()
});

const ForgetPasswordScreen = ({ navigation }) => {

  const otpInput = useRef(null);

  const [submitLoader, setSubmitLoader] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [otp, setOtp] = React.useState('');

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  const saveAndContinue = async (values, { setErrors }) => {

    console.log(otp, values.otp);

    setSubmitLoader(true);
    setIsDisabled(true);

    if (!otp && otp === '') {
      const data = { email: values.email }
      try {
        const result = await cortexSurveyApi.post('forget-password', data);
        console.log(result);
        if (result.data.success) {
          const Otp = result.data.success.code;
          setOtp(Otp);
          setShowOTP(true);
        }
      } catch (e) {
        if (e.response && e.response.status === 422) {
          setErrors({ email: 'This email is not registered with us' });
        }
        console.log('error: ', e.response.data);
      }
    }

    if (otp && otp === values.otp) {
      console.log("Otp matched!!!");
      navigation.navigate('ChangeNewPassword', {
        otp: otp,
        email: values.email
      });
    }
    
    if (otp && otp !== values.otp) {
      console.log("Otp is not match!");
      setErrors({ otp: 'Otp is not match' });
    }

    setSubmitLoader(false);
    setIsDisabled(false);

  }

  return (
    <Container style={styles.container}>
      <IconButton
        icon="arrow-left"
        color={theme.colors.primary}
        size={26}
        animated={true}
        style={{ backgroundColor: theme.colors.backgroundLight }}
        onPress={handleBackButtonClick}
      />
      <Image
        style={styles.imgIcon}
        source={require('../assets/forget_password.png')} />
      <Title style={{ textAlign: 'center', fontSize: 22 , color:'black'}}>Forget Your Password ?</Title>

      <Formik
        initialValues={initialValues}
        validationSchema={forgetPassSchema}
        onSubmit={saveAndContinue}
      >
        {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => (
          <ScrollView>
            <View style={styles.formGroup}>
              {!showOTP &&
                <TextInput
                  label="Enter Email"
                  placeholder="Enter email"
                  style={styles.textField}
                  outlineColor={errors.email ? theme.colors.danger : theme.colors.primary}
                  left={<TextInput.Icon name="email-outline" color = "black" />}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email ? true : false}
                />
              }
              {errors.email && touched.email ? (
                <Text style={{ padding: 2 }}>{errors.email}</Text>
              ) : null}
              {showOTP &&
                <View style={styles.formChildGroup}>
                  <Text>Please, check your mail and Enter 6 digit OTP</Text>
                  <OTPTextView
                    ref={otpInput.current}
                    containerStyle={styles.textInputContainer}
                    handleTextChange={(text) => setFieldValue('otp', text)}
                    inputCount={6}
                    keyboardType="numeric"
                  />
                </View>
              }
              {errors.otp && touched.otp ? (
                <Text style={{ padding: 2 }}>{errors.otp}</Text>
              ) : null}
              <Button
                style={styles.btn_large}
                mode="contained"
                contentStyle={{ height: 45 }}
                labelStyle={{ fontSize: 15 }}
                onPress={handleSubmit}
                // onPress={() => navigation.navigate('ChangeNewPassword', {
                //   otp: 45668,
                //   email: 'monishsaha0211@gmail.com'
                // })}
                disabled={isDisabled}
                loading={submitLoader}
                uppercase={false}
              >
                Submit
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </Container>
  )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d1dbe9",
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingHorizontal: 10
  },
  imgIcon: {
    width: '90%',
    height: '40%',
    alignSelf: 'center'
  },
  formGroup: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  formChildGroup: {
    paddingTop: 20,
    justifyContent: 'center',
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: 0,
    color:'black'
  },
  btn_large: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor:'#3371cb',
  },
})