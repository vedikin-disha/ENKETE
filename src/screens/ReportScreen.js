import { BackHandler, StyleSheet, Text, View, Alert, ImageBackground, TextInput, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../components/Container'
import Row from '../components/Row'
import { IconButton } from 'react-native-paper'
import { theme } from '../core/theme'
import { getObjectData } from '../helpers'
import ImageCard from '../components/ImageCard'

const QUESTION_SEGMENT = [
    {
        id: '1558700990',
        title: 'General Information'
    },
    {
        id: '1558701475',
        title: 'Technical Information'
    },
    {
        id: '1558701502',
        title: 'Disaster Question'
    },
]

const ReportScreen = ({ navigation }) => {

    const [geoData, setGeoData] = React.useState({});
    const [imageData, setImageData] = React.useState([]);
    const [answersData, setAnswersData] = React.useState({});

    const backAction = () => {
        /* Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { 
                text: "YES", 
                onPress: () => navigation.navigate('ReportDownload') }
        ]); */
        navigation.navigate('ReportDownload')
    };

    const fetchData = async () => {
        const geoDataFetch = await getObjectData('@geoInfo')
        const imageDataFetch = await getObjectData('@cameraPhoto')
        const answersDataFetch = await getObjectData('@answerState')

        if (geoDataFetch !== null) {
            setGeoData(geoDataFetch);
        }
        if (imageDataFetch !== null) {
            setImageData(imageDataFetch);
        }
        if (answersDataFetch !== null) {
            setAnswersData(answersDataFetch);
        }
    }

    useEffect(() => {
        fetchData();

        console.log('geoData', geoData);
        console.log('imageData', imageData);
        console.log('answersData', answersData[0]);
    }, []);

    const renderRequired = () => {
        return QUESTION_SEGMENT.map((element, index) => {
            return Object.keys(answersData[index]).map((val, j) => {
                if (answersData[index][val].is_requied === "Y") {
                    return (
                        <Row style={{ minHeight: 30, marginHorizontal: 0 }}>
                            <View style={{ flex: 4, borderEndWidth: 1, borderBottomWidth: 1, fontSize: 7, backgroundColor: theme.colors.orange }}><Text style={styles.textFontSize2}>{answersData[index][val].question}</Text></View>
                            <View style={{ flex: 3, borderEndWidth: 1, borderBottomWidth: 1, fontSize: 7, backgroundColor: theme.colors.orange }}><Text style={styles.textFontSize2}>{answersData[index][val].value}</Text></View>
                            <View style={{ flex: 3, borderEndWidth: 1, borderBottomWidth: 1, fontSize: 7, backgroundColor: theme.colors.orange }}><Text style={styles.textFontSize2}></Text></View>
                        </Row>
                    )
                }
            })
        });
    }


    return (
        <Container style={{ ...styles.container, ... {} }}>
            <ScrollView>
                <ImageBackground
                    style={{
                        ...styles.tinyLogo, ...{
                            resizeMode: 'contain',
                            alignSelf: 'center',
                        }
                    }}
                    source={require('../assets/company_name.png')}
                >
                    <IconButton
                        icon="arrow-left"
                        iconColor={theme.colors.secondaryDark}
                        size={20}
                        onPress={() => backAction()}
                    />
                </ImageBackground>

                <Row style={{ marginHorizontal: 0 }}>
                    <View style={{ ...styles.columStyl2, ...{ flex: 5, } }}>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'contain',

                            }}
                            source={require('../assets/logoone.png')}
                        />
                        <Text style={styles.textFontSize}>Resileometer- A surveying tools</Text>

                    </View>
                    <View style={{ ...styles.columStyl2, ...{ flex: 6, } }}>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'contain'
                            }}
                            source={require('../assets/logotwo.png')}
                        />
                        <Text style={styles.textFontSize}>Technical Partners - IIT</Text>
                    </View>
                </Row>

                <Row style={{ marginHorizontal: 0 }}>
                    <View style={{ ...styles.columStyl, ...{ borderLeftWidth: 1, backgroundColor: theme.colors.warningYellow } }}>
                        <Text style={styles.textfontsizetwo}>RAPID VISUAL SCREENING OF BUILDINGS FOR POTENTIAL HAZARDS (Seismic -RVS)</Text>
                    </View>
                </Row>

                <Row style={{ marginHorizontal: 0 }}>
                    <View style={{ ...styles.columStyl2, ...{ flex: 5, backgroundColor: theme.colors.orange } }}>
                        <Text style={styles.textFontSize1}>Report No. – Resileo/B/SK/12/09/22/01</Text>
                        <Text style={styles.textFontSize1}>Building ID No: - Resileo/B/SK/12/09/22/01/ABC</Text>
                        <Text style={styles.textFontSize1}>Date of Survey – 12/09/22</Text>
                    </View>
                    <View style={{ ...styles.columStyl2, ...{ flex: 6, backgroundColor: theme.colors.orange } }}>
                        <Text style={styles.textFontSize1}>Name of Surveyor-</Text>
                        <Text style={styles.textFontSize1}>Resileometer Registration UID - </Text>
                        <Text style={styles.textFontSize1}>Level of Surveyor - </Text>
                    </View>
                </Row>

                <Row style={{ marginHorizontal: 0 }}>
                    <View style={{ ...styles.columStyl2, ...{ flex: 5, backgroundColor: theme.colors.purpel } }}>
                        {imageData?.map((value, index) => {
                            if (value.picture) {
                                return (
                                    <ImageCard
                                        title={value.caption}
                                        picture={value.picture.base64?`data:"image/jpeg";base64,${value.picture.base64}`:""}
                                    />
                                )
                            }
                        })}
                    </View>
                    <View style={{ ...styles.columStyl2, ...{ flex: 6, backgroundColor: theme.colors.blue } }}>
                        <Text style={styles.profiletexttwo}>Owner`s Information</Text>
                        <Row style={{ marginHorizontal: 0 }}>
                            <View style={{ ...styles.form_one, ...{ flex: 4, } }}>
                                <Text style={styles.textFontSize2}>Owne`s Name</Text>
                                <Text style={styles.textFontSize2}>Contact No</Text>
                                <Text style={styles.textFontSize2}>Aadhar (ID No)</Text>
                            </View>
                            <View style={{ ...styles.form_one, ...{ flex: 7, } }}>
                                <Text style={styles.textFontSize3}>{geoData.owner_name}</Text>
                                <Text style={styles.textFontSize3}>{geoData.owner_phone}</Text>
                                <Text style={styles.textFontSize3}>{geoData.owner_aadhar}</Text>
                            </View>
                        </Row>
                        <Text style={{ ...styles.profiletexttwo, ...{ marginTop: Platform.OS === 'ios' ? 6 : 6 } }}>Geographical information</Text>
                        <Row style={{ marginHorizontal: 0 }}>
                            <View style={{ ...styles.form_one, ...{ flex: 4, } }}>
                                <Text style={styles.textFontSize2}>Name of Building</Text>
                                <Text style={styles.textFontSize2}>Street Name</Text>
                                <Text style={styles.textFontSize2}>City/District</Text>
                                <Text style={styles.textFontSize2}>Pin code </Text>
                                <Text style={styles.textFontSize2}>Local Authority </Text>
                                <Text style={styles.textFontSize2}>Latitude</Text>
                                <Text style={styles.textFontSize2}>Longitude</Text>
                                <Text style={styles.textFontSize2}>Hazard Zone</Text>
                                <Text style={styles.textFontSize2}>Soil Type</Text>
                            </View>
                            <View style={{ ...styles.form_one, ...{ flex: 7, } }}>
                                <Text style={styles.textFontSize3}>{geoData.building_name}</Text>
                                <Text style={styles.textFontSize3}>{geoData.street_name}</Text>
                                <Text style={styles.textFontSize3}>{geoData.city}</Text>
                                <Text style={styles.textFontSize3}>{geoData.pincode}</Text>
                                <Text style={styles.textFontSize3}>{geoData.local_authority}</Text>
                                <Text style={styles.textFontSize3}>{geoData.lat}</Text>
                                <Text style={styles.textFontSize3}>{geoData.long}</Text>
                                <Text style={styles.textFontSize3}>{geoData.microzonation}</Text>
                                <Text style={styles.textFontSize3}>{geoData.soil}</Text>
                            </View>
                        </Row>


                        <Text style={{ ...styles.questioninfor, ...{ marginTop: Platform.OS === 'ios' ? 6 : 6, } }}>General Information</Text>

                        <View style={{ ...styles.info_quesbox, ...{} }}>
                            {Object.keys(answersData).length > 0 &&
                                Object.keys(answersData[0]).map((element, i) => {
                                    return (
                                        <Row style={{ marginHorizontal: 0, borderBottomWidth: 1, }}>
                                            <View style={{ ...styles.info_ques1, ...{ flex: 5, padding: 0, margin: 0, } }}>
                                                <Text style={styles.Generalqus1}>{answersData[0][element].question}</Text>
                                            </View>
                                            <View style={{ ...styles.info_ans1, ...{ flex: 5, padding: 0, margin: 0, } }}>
                                                <Text style={styles.Generalqus1}>{answersData[0][element].value}</Text>
                                            </View>
                                        </Row>
                                    )
                                })
                            }
                        </View>

                        <Text style={{ ...styles.questioninfor, ...{} }}>General Information</Text>

                        <View style={{ ...styles.info_quesbox, ...{} }}>
                            {Object.keys(answersData).length > 0 &&
                                Object.keys(answersData[1]).map((element, i) => {
                                    return (
                                        <Row style={{ marginHorizontal: 0, borderBottomWidth: 1, }}>
                                            <View style={{ ...styles.info_ques1, ...{ flex: 5, padding: 0, margin: 0, } }}>
                                                <Text style={styles.Generalqus1}>{answersData[1][element].question}</Text>
                                            </View>
                                            <View style={{ ...styles.info_ans1, ...{ flex: 5, padding: 0, margin: 0, } }}>
                                                <Text style={styles.Generalqus1}>{answersData[1][element].value}</Text>
                                            </View>
                                        </Row>
                                    )
                                })
                            }
                        </View>

                        <Text style={{ ...styles.questioninfor, ...{} }}>General Information</Text>

                        <View style={{ ...styles.info_quesbox, ...{} }}>
                            {Object.keys(answersData).length > 0 &&
                                Object.keys(answersData[2]).map((element, i) => {
                                    return (
                                        <Row style={{ marginHorizontal: 0, borderBottomWidth: 1, }}>
                                            <View style={{ ...styles.info_ques1, ...{ flex: 5, padding: 0, margin: 0, } }}>
                                                <Text style={styles.Generalqus1}>{answersData[2][element].question}</Text>
                                            </View>
                                            <View style={{ ...styles.info_ans1, ...{ flex: 5, padding: 0, margin: 0, } }}>
                                                <Text style={styles.Generalqus1}>{answersData[2][element].value}</Text>
                                            </View>
                                        </Row>
                                    )
                                })
                            }
                        </View>

                    </View>
                </Row>


                <Text style={styles.tabletext}>Special features available in the Structure </Text>
                <Row style={{ marginHorizontal: 0, borderLeftWidth: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Row style={{ minHeight: 10, marginHorizontal: 0, backgroundColor: theme.colors.warningYellow }}>
                            <View style={{ flex: 4, borderEndWidth: 1, borderBottomWidth: 1, fontSize: 7, backgroundColor: theme.colors.warningYellow }}><Text>Features</Text></View>
                            <View style={{ flex: 3, borderEndWidth: 1, borderBottomWidth: 1, fontSize: 7, backgroundColor: theme.colors.warningYellow }}><Text>Available</Text></View>
                            <View style={{ flex: 3, borderEndWidth: 1, borderBottomWidth: 1, fontSize: 7, backgroundColor: theme.colors.warningYellow }}><Text>Comment</Text></View>
                        </Row>
                        {Object.keys(answersData).length > 0 &&
                            renderRequired()
                        }
                    </View>
                </Row>
                <Text style={styles.description}>Major deficiencies Observed -      </Text>
                <Text style={styles.description}>Immediate Action required if any -       </Text>
                <Row style={{ ...styles.table_box, ...{ marginHorizontal: 0, backgroundColor: theme.colors.orange } }}>
                    <View style={{ ...styles.total, ...{ flex: 3, marginLeft: 3, } }}>
                        <Text style={styles.total_font}>Total score – 5</Text>
                        <Text style={styles.total_font}>Signature and Date</Text>
                        <Text style={styles.total_font}>Manish Bharti</Text>
                        <Text style={styles.total_font}>12/10/22</Text>
                        <Text style={styles.total_font}>UID-123DCX</Text>
                    </View>
                    <View style={{ ...styles.total, ...{ flex: 6, } }}>
                        <Text style={styles.total_font}>Further extensive assessment required: - Yes / NO</Text>
                    </View>
                </Row>
                <Text style={styles.description}>Expert Comment- </Text>
                <Text style={styles.tabletext}>Annexure – Condition Survey</Text>
                <Row style={{ ...styles.sectable_header, ...{ width: "100%", borderBottomWidth: 1, } }}>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern 1</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern 2</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern3</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern4</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern5</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern6</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern7</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern8</Text>
                        </View>
                    </View>
                </Row>
                <Row style={{ marginHorizontal: 0, marginTop: Platform.OS === 'ios' ? 6 : 0, }}>
                    <View style={{ ...styles.image_Section, ...{ borderRightWidth: 1, borderLeftWidth: 1, paddingTop: Platform.OS === 'ios' ? 6 : 5, flex: 5, } }}>
                        <Image
                            style={{
                                width: 140,
                                height: 150,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                padding: 10
                            }}
                            source={require('../assets/image_two.jpg')}
                        />
                    </View>
                    <View style={{ ...styles.image_Section, ...{ borderRightWidth: 1, paddingTop: Platform.OS === 'ios' ? 6 : 5, flex: 5, } }}>
                        <Image
                            style={{
                                width: 140,
                                height: 150,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                padding: 10
                            }}
                            source={require('../assets/image_three.jpg')}
                        />
                    </View>
                </Row>
                <Row style={styles.sectable}>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern 1</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern 2</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern3</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern4</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern5</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Distress Pattern6</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column' } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{} }}>Distress Pattern7</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{} }}>Distress Pattern8</Text>
                        </View>
                    </View>
                </Row>
                {/* <Row style={{ marginHorizontal: 0, marginTop: Platform.OS === 'ios' ? 6 : 0, }}>
                    <View style={{ ...styles.table_coloumtree, ...{ flex: 4, padding: 0, margin: 0, backgroundColor: theme.colors.orange } }}>
                        <Text style={{ ...styles.table_headtextthree, ...{ alignSelf: 'center', } }}>Root Cause Analysis</Text>
                    </View>
                    <View style={{ ...styles.table_coloumtree, ...{ flex: 6, padding: 0, margin: 0, } }}>
                        <Text style={{ ...styles.table_headtextthree, ...{ alignSelf: 'center', } }}>Column experiencing spalling of cover and bottom tiles due to bar size expansion</Text>
                    </View>
                </Row>
                <Row style={{ marginHorizontal: 0, marginTop: Platform.OS === 'ios' ? 6 : 0, }}>
                    <View style={{ ...styles.table_coloumtree, ...{ flex: 4, padding: 0, margin: 0, backgroundColor: theme.colors.orange } }}>
                        <Text style={{ ...styles.table_headtextthree, ...{ alignSelf: 'center', } }}>Restoration Strategy</Text>
                    </View>
                    <View style={{ ...styles.table_coloumtree, ...{ flex: 6, padding: 0, margin: 0, } }}>
                        <Text style={{ ...styles.table_headtextthree, ...{ alignSelf: 'center', } }}>Structural strengthening and patch repair at bottom should be done</Text>
                    </View>
                </Row> */}
                <Row style={{ ...styles.sectable_header, ...{ width: "100%", minHeight: 78, } }}>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column', flex: 1 } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, backgroundColor: theme.colors.orange }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Root Cause Analysis</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderRightWidth: 1, backgroundColor: theme.colors.orange, borderBottomWidth: 1, }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center', } }}>Restoration Strategy</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.table_columonetwo, ...{ flexDirection: 'column', flex: 1 } }}>
                        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}> Column experiencing spalling of cover and bottom tiles due to bar size expansion</Text>
                        </View>
                        <View style={{ alignItems: 'center', borderRightWidth: 1, borderBottomWidth: 1 }}>
                            <Text style={{ ...styles.table_headtexttwo, ...{ alignSelf: 'center' } }}>Structural strengthening and patch repair at bottom should be done</Text>
                        </View>
                    </View>

                </Row>
            </ScrollView>

        </Container>
    )
}

export default ReportScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: theme.colors.text,
        // minHeight: "auto",

    },
    tinyLogo: {
        width: "100%",
        height: 50,
        backgroundColor: theme.colors.placeholder,
    },
    info_ques1: {
        flex: 1,
        // padding: 5,
        borderRightWidth: 1,

    },
    info_ans1: {
        flex: 1,
        padding: 5,

    },
    Generalqus1: {
        fontSize: 11,
        paddingLeft: 2,
    },
    textFontSize: {
        fontSize: 11,
        paddingLeft: Platform.OS === 'ios' ? 7 : 5,
    },
    textFontSize1: {
        fontSize: 9,
        padding: 3,
        color: theme.colors.background,
    },
    textfontsizetwo: {
        fontSize: 9,
        color: theme.colors.textDark,
        alignSelf: 'center',

    },
    profiletext: {
        fontSize: 13,
        padding: 3,
        color: theme.colors.background,
        textAlign: 'center',
        // backgroundColor: theme.colors.primary,
    },
    questioninfor: {
        fontSize: 13,
        padding: 3,
        color: theme.colors.background,
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
    },
    textFontSize2: {
        // backgroundColor: theme.colors.error,
        fontSize: 10,
        // borderBottomWidth: 1,
        paddingTop: Platform.OS === 'ios' ? 7 : 5,
        paddingLeft: Platform.OS === 'ios' ? 7 : 4,
        color: theme.colors.background,
    },
    textFontSize3: {
        borderBottomWidth: 1,
        borderStyle: 'dotted',
    },
    profiletexttwo: {
        fontSize: 12,
        padding: 3,
        color: theme.colors.background,
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
    },
    input: {
        margin: 12,
        // borderWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 10,
        // backgroundColor: theme.colors.primary,
        paddingTop: Platform.OS === 'ios' ? 7 : 5,
        paddingBottom: Platform.OS === 'ios' ? 7 : 0,
        marginTop: Platform.OS === 'ios' ? 6 : 3,
        marginBottom: Platform.OS === 'ios' ? 6 : 0
    },
    columStyl2: {
        borderColor: theme.colors.textDark,
        flex: 1,
        borderWidth: 1,
        padding: 2,
    },
    columStyl: {
        borderColor: theme.colors.textDark,
        flex: 1,
        borderWidth: 1,
        padding: 2,
    },
    Generalqus: {
        borderBottomWidth: 1,
        fontSize: 10,
        color: theme.colors.background,
        paddingLeft: Platform.OS === 'ios' ? 7 : 2,
        minHeight: 30,
    },
    tabletext: {

        backgroundColor: theme.colors.primary,
        marginLeft: Platform.OS === 'ios' ? 7 : 0,
        marginTop: Platform.OS === 'ios' ? 6 : 5,
        borderWidth: 1,
        fontSize: 12,
        paddingLeft: Platform.OS === 'ios' ? 7 : 4,
    },
    table: {
        minWidth: "100%",
        // minHeight: 120,
        // backgroundColor: theme.colors.primary,
        marginLeft: Platform.OS === 'ios' ? 7 : 0,
        // borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    // tablesec: {
    //     width: 382,
    //     height: 80,
    //     // backgroundColor: theme.colors.primary,
    //     marginLeft:Platform.OS === 'ios' ? 7 : 0,
    //     borderBottomWidth: 1,
    //     borderLeftWidth: 1,
    //     borderRightWidth: 1,
    // },
    table_header: {
        // borderBottomWidth: 1,
        marginLeft: Platform.OS === 'ios' ? 6 : 0,

        // backgroundColor: theme.colors.error,
    },
    table_headtext: {
        fontSize: 10,
        flex: 1,

        borderRightWidth: 1,
        // backgroundColor: theme.colors.success,
        // borderBottomWidth: 1,
        paddingLeft: Platform.OS === 'ios' ? 7 : 3,
    },
    description: {
        minHeight: 100,
        marginTop: Platform.OS === 'ios' ? 6 : 4,
        borderWidth: 1,
        fontSize: 12,
        paddingLeft: Platform.OS === 'ios' ? 7 : 4,
        backgroundColor: theme.colors.orange,
    },
    total_font: {
        fontSize: 10,
    },
    table_box: {
        marginTop: Platform.OS === 'ios' ? 6 : 5,
        borderWidth: 1,
    },
    sectable_header: {
        // width: 382,
        // backgroundColor: theme.colors.success,
        marginLeft: Platform.OS === 'ios' ? 7 : 0,
        // borderBottomWidth: 1,
        borderLeftWidth: 1,

    },
    image_Section: {
        // backgroundColor: theme.colors.error, 
    },
    sectable: {
        minWidth: "100%",
        marginLeft: Platform.OS === 'ios' ? 7 : 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    // trdtable: {
    //     // backgroundColor: theme.colors.success,
    //     minHeight: 194,
    //     minWidth: "100%",
    //     borderWidth: 1,
    //     backgroundColor: theme.colors.success,
    // },
    fsttable: {

        // backgroundColor: theme.colors.success,

        marginLeft: Platform.OS === 'ios' ? 7 : 0,
        // borderWidth: 1,
    },

    table_columonetwo: {
        minWidth: 100,
    },
    table_headtexttwo: {
        fontSize: 8,
        // width: 95,
        minHeight: 38,
        color: theme.colors.background,
        // backgroundColor: theme.colors.success,
        // borderBottomWidth: 1,
        paddingLeft: Platform.OS === 'ios' ? 7 : 2,
    },
    // table_coloumtree: {
    //     borderBottomWidth: 1,
    //     borderLeftWidth: 1,
    //     borderRightWidth: 1,
    //     minHeight: 70,
    // },
    // table_headtextthree: {
    //     fontSize: 10,
    // }
    info_quesbox: {
        width: "100%",
        borderTopWidth: 1,
    }
})