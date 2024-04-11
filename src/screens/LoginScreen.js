import { Pressable, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useMemo } from 'react';
import { Text, Caption, TextInput, Button, Headline } from 'react-native-paper';
import { theme } from '../core/theme'
import Row from '../components/Row';
import Container from '../components/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import { Context } from "../context/AuthContext";

const initialValues = {
    email: "",
    password: "",
}

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Email is Required'),
    password: Yup.string()
        .required('Password is Required'),
});

const LoginScreen = ({ navigation }) => {

    const { state, signin, tryLocalSignin } = useContext(Context);

    const [submitLoader, setSubmitLoader] = React.useState(false);
    const [showHidePassword, setShowHidePassword] = React.useState({
        icon: 'eye',
        password: true
    });

    useMemo(() => setSubmitLoader(false), [state])

    useEffect(() => {
        SplashScreen.hide();
        tryLocalSignin();
    }, []);

    const showPassword = () => {
        setShowHidePassword(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            password: !prevState.password
        }))
        console.log("show password");
    }

    const handleSubmit = async (values) => {
        // try {
        //     const response = await axios.post('http://192.168.1.100:6000/login', {
        //         auth_key: "ltnfvh18zxItOhP2qzrtynnVvbyniu", 
        //         email: values.email,
        //         password: values.password
        //     });
        //     console.log('RESPONSE', response.data);
    
        //     // Check if login was successful based on response data
        //     if (response.data.success) {
        //         console.log('Login successful:', response.data);
    
                // Navigate to the Dashboard screen or perform any other actions
                navigation.navigate('Dashboard');
        //     } else {
        //         console.error('Login failed:', response.data.error);
        //         // Display an error message or take appropriate action
        //     }
        // } catch (error) {
        //     // Handle any errors that occurred during the API call
        //     console.error('Error:', error);
        //     // Display an error message or take appropriate action
        // } finally {
        //     // Reset the submit loader
        //     setSubmitLoader(false);
        // }
    }
    console.log(handleSubmit)
    
        


    return (

        <Container style ={{flex:1}} >
            <LinearGradient
    colors={['#9a4eaf', '#351b60']}
    start={{ x:1 , y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style= {{flex:1 , paddingTop:150}}
    
>
         <Headline style={styles.header_txt}>
                Log In
            </Headline>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    setSubmitLoader(true);
                    signin(values);
                }}
            >
                {({ handleChange,  values, errors, touched }) => (
                    <View style={styles.formGroup}>
                        <TextInput
                         style={[styles.textinput, {color: 'black', backgroundColor: 'white'}]}
                            label="Email"
                            left={<TextInput.Icon name="email-outline" color="black" />}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            value={values.email}
                            theme={{ colors: { text: 'black' } }}
                           
                            // error={errors.email ? true : false}
                        />
                        {errors.email && touched.email ? (
                            <Text>{errors.email}</Text>
                        ) : null}
                        <TextInput
                            style={styles.textinput}
                            label="Password"
                            secureTextEntry={showHidePassword.password}
                            left={<TextInput.Icon name="lock-outline" color="black" />}
                            right={<TextInput.Icon name={showHidePassword.icon} color='black' onPress={() => showPassword()} />}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            theme={{ colors: { text: 'black' } }}
                            // error={errors.password ? true : false}
                        />
                        {errors.password && touched.password ? (
                            <Text>{errors.password}</Text>
                        ) : null}

                        <Pressable onPress={() => navigation.navigate('ForgetPassword')}>
                            <Text style={styles.forget_pass}>Forgot Password?</Text>
                        </Pressable>
                        <Button
                            
                            style={styles.btn_large}
                            mode="contained"
                            contentStyle={{ height: 45 }}
                            labelStyle={{ fontSize: 15 }}
                            onPress={handleSubmit}
                            loading={submitLoader}
                        >
                            <Text style={{color:'white'}}>
                            Login
                            </Text>
                        </Button>
                       
                    </View>
                )}
            </Formik>
            <Row style={{ alignSelf: 'center'}}>
                <Text
                 
                 >
                 Or log in with your social media credentials.
                </Text>
            </Row>
            <Row style={{justifyContent:'center', margin:10}}>
              
                <Button
                    icon="google"
                    style={styles.google}
                    labelStyle={styles.social_label}
                    color="#ff4960"
                    dark={true}
                    mode='contained'>
                    {/* <Text style={{ fontSize: 10 }}>Google</Text> */}
                </Button>
               
                <Button
                    icon="facebook"
                    style={styles.facebook}
                    labelStyle={styles.social_label}
                    color="#4167b2"
                    mode='contained'>
                    {/* <Text style={{ fontSize: 10 }}>Facebook</Text> */}
                </Button>
              
            </Row>
            <View style={{ flexDirection: 'row', alignSelf: 'center', top: 120 }}>
            <Text style={{ fontSize: 15 }}>
            Don't have an account?{' '}
            <Pressable onPress={() => navigation.navigate('Signup')}>
            <View style ={{top:4}}>
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>Sign Up</Text>
            </View>
        </Pressable>
    </Text>
</View>
</LinearGradient>
        </Container>
       
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    header_txt: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    textinput:{
       
        fontWeight:'bold',
        backgroundColor:'white',
        margin:10,
        borderRadius: 10,
       color:'black',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
    },
    formGroup: {
        justifyContent: 'center',
        padding: 15,
    },
    btn_large: {
        color:'white',
        backgroundColor:'#3371cb',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: 'center',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
    },
    forget_pass: {
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'flex-end',
        top: 5,
      
    },
    facebook: {
        margin:3,
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    google: {
        margin:3,
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    social_label: {
        marginLeft: 2,
        fontSize: 25,
    },
})