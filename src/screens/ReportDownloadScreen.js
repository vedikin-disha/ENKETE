import { Image, StyleSheet, Text, View, PermissionsAndroid, Alert } from 'react-native'
import React, { useRef, useEffect, useContext } from 'react'
import Container from '../components/Container'
import { Button, Headline, IconButton } from 'react-native-paper'
import { theme } from '../core/theme'
import QuestionFooter from './questionScreen/QuestionFooter'
import { Modalize } from 'react-native-modalize';
import RNFetchBlob from 'rn-fetch-blob'
import { getData, getObjectData, removeFew } from '../helpers'
import { Context } from "../context/AuthContext";

const ReportDownloadScreen = ({ navigation }) => {

    const { state } = useContext(Context);

    const modalizeRef = useRef(null);
    const [pdfLink, setPdfLink] = React.useState('');
    const [pdfFileName, setPdfFileName] = React.useState('');

    useEffect(() => {
        getData('@pdfLink').then((res) => {
            let pdf_res = res.replace(/^"|"$/g, '');
            let pdf_path = pdf_res.split("/");
            let pdf_file = pdf_path[2];
            setPdfFileName(pdf_file)
            setPdfLink(pdf_res)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    console.log(pdfLink);


    const reportOptionBtn = () => {
        modalizeRef.current?.open();
    }

    const actualDownload = () => {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: pdfFileName,
                path: `${dirs.DownloadDir}/` + pdfFileName,
            },
        })
            .fetch('GET', 'https://cortexsolutions.in/surveyfirebase/' + pdfLink, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const downloadPdf = async () => {

        if (!state.isSignedIn) {

            navigation.navigate('Login');

        } else {

            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    actualDownload();
                } else {
                    Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const viewReport = async () => {

        // var userId;
        // var userinfo = await getObjectData('@userdata');

        // if (userinfo && userinfo.temp_guest_id !== null) {
        //     userId = userinfo.temp_guest_id;
        // }
        // if(userinfo && userinfo.temp_guest_id == null){
        //     userId = userinfo.id;
        // }
        // if(!userinfo){
        //     userId = await getData('@userId');
        // }
        var userId;
        const user_id = await getData('@userId');
        if (user_id) {
            userId = user_id;
        } else {
            const guestUserId = await getData('@guestUserId');
            userId = guestUserId;
        }
        const surveyID = await getData('@surveyId');
        if (surveyID !== null && userId !== null) {
            navigation.navigate('ReportView', {
                surveyId: surveyID,
                userID: userId
            });
        }
    }

    const clearAllData = () => {
        removeFew(['@surveyId', '@geoInfo', '@cameraPhoto', '@answerState', '@conditionSurvey']).then((result) => {
            navigation.navigate('Home');
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <Container>
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/check.png')}
                        style={styles.successIcon}
                    />
                    <Headline>Survey Complted Successfully!</Headline>
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Button
                        mode='contained'
                        color={theme.colors.backgroundDark}
                        uppercase={false}
                        style={styles.blueBtn}
                        onPress={() => reportOptionBtn()}
                    >
                        Download Survey
                    </Button>
                </View>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.textStyle}>
                        If you want your survey report to be reviewed by our expert
                    </Text>
                    <Button
                        mode='contained'
                        color={theme.colors.defaultBlue}
                        uppercase={false}
                        style={styles.blueBtn}
                    >
                        Contact Our Expert
                    </Button>
                </View>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.textStyle}>
                        If you want your survey report to be reviewed by External expert
                    </Text>
                    <Button
                        mode='contained'
                        color={theme.colors.defaultBlue}
                        uppercase={false}
                        style={styles.blueBtn}
                    >
                        Share With Reviewer
                    </Button>
                    <Button
                        mode='contained'
                        color={theme.colors.defaultBlue}
                        uppercase={false}
                        style={styles.blueBtn}
                    >
                        Email
                    </Button>
                </View>
                <View style={{ marginTop: 50, marginHorizontal: 50 }}>
                    <Button
                        mode='contained'
                        // color={theme.colors.danger}
                        onPress={() => clearAllData()}>
                        New Survey
                    </Button>
                </View>
            </View>

            <Modalize
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                snapPoint={250}
                HeaderComponent={
                    <View style={{ alignItems: 'center' }}>
                        <IconButton
                            icon="close-circle"
                            color={theme.colors.backgroundDark}
                            size={30}
                            onPress={() => modalizeRef.current?.close()}
                        />
                    </View>
                }
                withHandle={false}
                ref={modalizeRef}
            >
                <View>
                    <Button
                        icon="camera"
                        mode="outlined"
                        uppercase={false}
                        onPress={viewReport}
                    >
                        View Report
                    </Button>
                    <Button
                        icon="image-album"
                        mode="outlined"
                        uppercase={false}
                        onPress={() => downloadPdf()}
                    >
                        Download Report
                    </Button>
                </View>
            </Modalize>
        </Container>
    )
}

export default ReportDownloadScreen

const styles = StyleSheet.create({
    successIcon: {
        width: 100,
        height: 100,
    },
    textStyle: {
        color: theme.colors.primary,
        fontWeight: '900',
    },
    blueBtn: {
        marginVertical: 5,
        width: 200
    }
})