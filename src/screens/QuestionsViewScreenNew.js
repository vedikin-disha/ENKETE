// import { StyleSheet, View, Alert, ToastAndroid } from 'react-native'
// import React, { useState, useEffect, useMemo } from 'react'
// import { theme } from '../core/theme'
// import Container from '../components/Container'
// import QuestionHeader from './questionScreen/QuestionHeader'
// import QuestionFooter from './questionScreen/QuestionFooter'
// import QuestionItem from './questionScreen/QuestionItem'
// import { ScrollView } from 'react-native-gesture-handler'
// import { Snackbar, ActivityIndicator, Caption, Text } from 'react-native-paper'
// import { getData, getObjectData, removeFew, storeData, storeDataObject } from '../helpers'
// import { ref, set, update } from "firebase/database";
// import { db } from "../config/firebase";
// import uuid from 'react-native-uuid';
// import { cortexSurveyFirebaseApi } from "../api/cortexSurveyApi";
// import { Rect } from 'react-native-svg'
// import Row from './../components/Row';

// const QUESTION_SEGMENT = [
//     {
//         id: '1558700990',
//         title: 'General Information'
//     },
//     {
//         id: '1558701475',
//         title: 'Technical Information'
//     },
//     {
//         id: '1558701502',
//         title: 'Disaster Question'
//     },
// ];

// const QuestionsViewScreenNew = ({ navigation }) => {

//     const scrollRef = React.useRef();
//     const [index, setIndex] = useState(0);
//     const [questionData, setQuestionData] = React.useState([]);
//     const [activeLoader, setActiveLoader] = React.useState(true);
//     const [answerState, setAnswerState] = useState([]);
//     const [ansComplCount, setAnsComplCount] = useState([0, 0, 0]);
//     const [btnRightText, setBtnRightText] = useState('continue');
//     const [btnLeftText, setBtnLeftText] = useState('exit');
//     const [disabledContinue, setDisabledContinue] = useState(true);
//     const [submitLoader, setSubmitLoader] = React.useState(false);
//     const [visible, setVisible] = React.useState(false);
//     const onToggleSnackBar = () => setVisible(!visible);
//     const onDismissSnackBar = () => setVisible(false);

//     useEffect(() => {
//         console.log('QuestionScreen')
//         fetchQuestionData().then((result) => {

//             const myArray = result.map((element, i) => {
//                 let myObj = {};
//                 element.data.map((item, j) => {
//                     if (item.questionType === "radiobutton") {
//                         Object.assign(myObj, {
//                             [item.id]: {
//                                 value: item.answers[0] ? item.answers[0].answer : '',
//                                 is_requied: item.is_required,
//                                 question: item.question,
//                                 score: item.score
//                             }
//                         });
//                     } else {
//                         Object.assign(myObj, {
//                             [item.id]: {
//                                 value: '',
//                                 is_requied: item.is_required,
//                                 question: item.question,
//                                 score: item.score
//                             }
//                         });
//                     }
//                 });
//                 return myObj;
//             });

//             const complteObj = myArray.map((item, key) => {

//                 var answeredCount = 0;
//                 Object.keys(item).map((element, i) => {
//                     if (myArray[key][element].value !== '') {
//                         answeredCount++;
//                     }
//                 });

//                 console.log('answeredCount: ' + key, answeredCount);
//                 return answeredCount;
//             });

//             setAnsComplCount(complteObj);

//             setAnswerState(myArray);

//             setActiveLoader(false);
//         })
//     }, []);

//     const fetchQuestionData = async () => {

//         const questionFilters = await getObjectData('@questionFilters');

//         const obj0 = {
//             "question_segment": QUESTION_SEGMENT[0]['id'],
//             "disasterType": "Earthquake",
//             "assesment_method": "RCC",
//             "structure_type": 'FEMA1504'
//         };
//         console.log("obj 0",obj0)

    
//         const obj1 = {
//             "question_segment": QUESTION_SEGMENT[1]['id'],
//             "disasterType":'Earthquake',
//             "assesment_method": "RCC",
//             "structure_type": 'FEMA1504'
//         };
//         console.log('obj 1',obj1)

//         const obj2 = {
//             "question_segment": QUESTION_SEGMENT[2]['id'],
//             "disasterType": "Earthquake",
//             "assesment_method": 'RCC',
//             "structure_type": 'FEMA1504'
//         };
//         console.log('obj 2' , obj2)


//         let myQuestionData = [];

//         const data0 = await cortexSurveyFirebaseApi.post('questions', obj0);
//         console.log(data0)
//         myQuestionData.push(data0.data);


//         const data1 = await cortexSurveyFirebaseApi.post('questions', obj1);
//         console.log(data1)
//         myQuestionData.push(data1.data);

//         const data2 = await cortexSurveyFirebaseApi.post('questions', obj2);
//         console.log(data2)
//         myQuestionData.push(data2.data);

//         // console.log('myQuestionData: ', myQuestionData);
//         setQuestionData(myQuestionData);

//         return myQuestionData;
//     }

//     useMemo(() => {
//         console.log("answerState.length", answerState.length);

//         if (answerState.length !== 0) {

//             var errorCount = 0;
//             Object.keys(answerState[index]).map((element, i) => {
//                 if (answerState[index][element].is_requied === "Y" && answerState[index][element].value === '') {
//                     errorCount++;
//                 }
//             });

//             console.log('errorCount', errorCount)
//             if (errorCount === 0) {
//                 setDisabledContinue(false);
//             } else {
//                 setDisabledContinue(true);
//             }

//             var answeredCount = 0;
//             Object.keys(answerState[index]).map((element, i) => {
//                 if (answerState[index][element].value !== '') {
//                     answeredCount++;
//                 }
//             });

//             console.log('ansComplCount: ', ansComplCount);

//             let currentAnsComptCount = [...ansComplCount];
//             currentAnsComptCount[index] = answeredCount;
//             setAnsComplCount(currentAnsComptCount);
//         }
//     }, [answerState]);

//     const updatefirebase = (userId, surveyId) => {
//         const updates = {};
//         updates['/survey/' + userId + "/" + surveyId + "/survey_questions"] = answerState;

//         update(ref(db), updates).then(() => {
//             setDisabledContinue(false);
//             setSubmitLoader(false);

//             ToastAndroid.show('Data saved successfull', ToastAndroid.SHORT);
//             navigation.navigate('ConditionInfo');
//         }).catch((err) => {
//             console.log(err);
//         });
//     }

//     /** Final Submit Survey into Database */
//     const finalSubmit = async () => {

//         setDisabledContinue(true);
//         setSubmitLoader(true);

//         var userId;
//         const user_id = await getData('@userId');
//         if (user_id) {
//             userId = user_id;
//         } else {
//             const guestUserId = await getData('@guestUserId');
//             userId = guestUserId;
//         }

//         const surveyId = await getData('@surveyId');
//         if (surveyId && userId) {
//             await storeDataObject(answerState, '@answerState');
//             updatefirebase(userId, surveyId);
//         }
//     }
//     // const finalSubmit =() =>{
//     //     navigation.navigate("ConditionInfo")
//     // }

//     const onContinue = () => {
//         setIndex((prevIndex) => {
//             if (prevIndex >= 2)
//                 return 2
//             else
//                 return prevIndex + 1
//         });

//         if (index >= 2) {
//             finalSubmit()
//         } else {

//             if (index == 1) {
//                 setBtnRightText('Finish')
//             }
//             if (errorCount(1) > 0) {
//                 setDisabledContinue(true);
//             }

//             setBtnLeftText('back');
//             onToggleSnackBar()
//             scrollRef.current?.scrollTo({
//                 y: 0,
//                 animated: true,
//             });
//         }
//     }

//     const errorCount = (para) => {
//         let errorCount = 0;
//         let nextIndex = index + para;
//         Object.keys(answerState[nextIndex]).map((element, i) => {
//             if (answerState[nextIndex][element].is_requied === "Y" && answerState[nextIndex][element].value === '') {
//                 errorCount++;
//             }
//         });
//         return errorCount;
//     }

//     const onBack = () => {
//         setIndex((prevIndex) => {
//             // console.log(prevIndex)
//             if (prevIndex == 0)
//                 return 0
//             else
//                 return prevIndex - 1
//         })

//         if (index === 0) {
//             Alert.alert("Are you sure to exit?", "Do you want to save this Survey progress ?",
//                 [
//                     {
//                         text: "Cancel",
//                         onPress: () => console.log("Cancel Pressed"),
//                         style: "cancel"
//                     },
//                     {
//                         text: "No",
//                         onPress: () => console.log("No Pressed"),
//                     },
//                     {
//                         text: "Yes",
//                         onPress: () => console.log("OK Pressed")
//                     }
//                 ]
//             );
//         }

//         ToastAndroid.show(JSON.stringify(index), ToastAndroid.SHORT);

//         setDisabledContinue(false)
//         if (index === 1) {
//             setBtnLeftText('exit');
//         }
//         if (index > 1) {
//             setBtnLeftText('back');
//             setBtnRightText('continue');
//         }

//         onToggleSnackBar()
//         scrollRef.current?.scrollTo({
//             y: 0,
//             animated: true,
//         });
//     }

//     const handleText = (currentValue, itemID) => {
//         setAnswerState((prev) => {
//             return {
//                 ...prev,
//                 [index]: {
//                     ...prev[index],
//                     [itemID]: {
//                         ...prev[index][itemID],
//                         value: currentValue
//                     }
//                 }
//             }
//         });
//     }

//     return (
//         <>
//             {!activeLoader ?
//                 <Container style={styles.container}>
//                     <ScrollView ref={scrollRef}>
//                         <QuestionHeader
//                             currentItem={QUESTION_SEGMENT[index]}
//                             data={QUESTION_SEGMENT}
//                             totalQuestions={questionData}
//                             totalAnswers={ansComplCount}
//                         />
//                         <View>
//                             {questionData[index]['data'].map((item, i) => {
//                                 return (
//                                     <QuestionItem
//                                         key={i}
//                                         item={item}
//                                         answer={answerState[index][item.id]}
//                                         onChange={(text) => handleText(text, item.id)}
//                                     />
//                                 )
//                             })}
//                         </View>
//                         <QuestionFooter
//                             continueBtnPress={() => onContinue()}
//                             loadingSubmit={submitLoader}
//                             backBtnPress={() => onBack()}
//                             disabledContinue={disabledContinue}
//                             btnLeftText={btnLeftText}
//                             btnRightText={btnRightText}
//                         />
//                     </ScrollView>
//                 </Container>
//                 :
//                 <Container>
//                     <ActivityIndicator
//                         animating={true}
//                         color={theme.colors.blue}
//                         style={styles.loader}
//                         size="large"
//                     />
//                     <Caption style={{ textAlign: 'center' }}>Please wait, while we obtaining data ...</Caption>
//                 </Container>
//             }
//         </>
//     )
// }


// export default QuestionsViewScreenNew

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor:'#d1dbe9',
//         justifyContent: 'flex-start',
//     },
//     questionLabel: {
//         paddingTop: 10,
//         paddingBottom: 10,
//         backgroundColor: theme.colors.background,
//         flexDirection: 'row',
//     },
//     questionLabelTxt: {
//         flex: 1,
//         fontSize: 14,
//         paddingLeft: 10,
//         fontWeight: 'bold',
//     },
//     questionInput: {
//         backgroundColor: theme.colors.backgroundLight,
//         borderRadius: 0,
//         borderWidth: 1,
//         borderColor: theme.colors.background,
//         paddingLeft: 20,
//         marginHorizontal: 0.5
//     },
//     item: {
//         padding: 5,
//         marginVertical: 8,
//         marginHorizontal: 15,
//     },
//     dropdown1BtnStyle: {
//         width: '100%',
//         marginHorizontal: 0.2,
//         backgroundColor: theme.colors.backgroundLight,
//         borderRadius: 0,
//         borderWidth: 1,
//         borderColor: theme.colors.background,
//     },
//     dropdown1BtnTxtStyle: {
//         color: theme.colors.primary,
//         textAlign: 'left'
//     },
//     dropdown1DropdownStyle: {
//         backgroundColor: theme.colors.backgroundLight,
//         color: theme.colors.primary
//     },
//     dropdown1RowStyle: {
//         backgroundColor: theme.colors.backgroundLight,
//         borderBottomColor: '#C5C5C5',
//         color: theme.colors.primary
//     },
//     dropdown1RowTxtStyle: {
//         color: theme.colors.primary,
//         textAlign: 'left'
//     },
//     questionInlineRadioBtn: {
//         flexDirection: 'row',
//         backgroundColor: theme.colors.backgroundLight,
//         borderRadius: 0,
//         borderWidth: 1,
//         borderColor: theme.colors.background,
//         padding: 5,
//         marginHorizontal: 0.5
//     }
// })

import React from 'react';
import { StyleSheet, View, ScrollView,Text } from 'react-native';
import { color } from 'react-native-reanimated';
import { theme } from '../core/theme';
import Container from '../components/Container'
import QuestionHeader from './questionScreen/QuestionHeader'
import QuestionFooter from './questionScreen/QuestionFooter'
import QuestionItem from './questionScreen/QuestionItem'


const QuestionsViewScreenNew = ({  }) => {
    const [activeLoader, setActiveLoader] = React.useState(true);

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
        ];

    const obj0 = {
                    "question_segment": QUESTION_SEGMENT[0]['id'],
                    "disasterType": "Earthquake",
                    "assesment_method": "RCC",
                    "structure_type": 'FEMA1504'
                };
                console.log("obj 0",obj0)
        
            
                const obj1 = {
                    "question_segment": QUESTION_SEGMENT[1]['id'],
                    "disasterType":'Earthquake',
                    "assesment_method": "RCC",
                    "structure_type": 'FEMA1504'
                };
                console.log('obj 1',obj1)
        
                const obj2 = {
                    "question_segment": QUESTION_SEGMENT[2]['id'],
                    "disasterType": "Earthquake",
                    "assesment_method": 'RCC',
                    "structure_type": 'FEMA1504'
                };
                console.log('obj 2' , obj2)
        
    return (
                <>
                    {!activeLoader ?
                        <Container style={styles.container}>
                            <ScrollView ref={scrollRef}>
                                <QuestionHeader
                                    currentItem={QUESTION_SEGMENT[index]}
                                    data={QUESTION_SEGMENT}
                                    totalQuestions={questionData}
                                    totalAnswers={ansComplCount}
                                />
                                <View>
                                    {questionData[index]['data'].map((item, i) => {
                                        return (
                                            <QuestionItem
                                                key={i}
                                                item={item}
                                                answer={answerState[index][item.id]}
                                                onChange={(text) => handleText(text, item.id)}
                                            />
                                        )
                                    })}
                                </View>
                                <QuestionFooter
                                    continueBtnPress={() => onContinue()}
                                    loadingSubmit={submitLoader}
                                    backBtnPress={() => onBack()}
                                    disabledContinue={disabledContinue}
                                    btnLeftText={btnLeftText}
                                    btnRightText={btnRightText}
                                />
                            </ScrollView>
                        </Container>
                        :
                        <Container>
                            <ActivityIndicator
                                animating={true}
                                color={theme.colors.blue}
                                style={styles.loader}
                                size="large"
                            />
                            <Caption style={{ textAlign: 'center' }}>Please wait, while we obtaining data ...</Caption>
                        </Container>
                    }
                </>
            )
        }
        
        
        export default QuestionsViewScreenNew
        
        const styles = StyleSheet.create({
            container: {
                backgroundColor:'#d1dbe9',
                justifyContent: 'flex-start',
            },
            questionLabel: {
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: theme.colors.background,
                flexDirection: 'row',
            },
            questionLabelTxt: {
                flex: 1,
                fontSize: 14,
                paddingLeft: 10,
                fontWeight: 'bold',
            },
            questionInput: {
                backgroundColor: theme.colors.backgroundLight,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: theme.colors.background,
                paddingLeft: 20,
                marginHorizontal: 0.5
            },
            item: {
                padding: 5,
                marginVertical: 8,
                marginHorizontal: 15,
            },
            dropdown1BtnStyle: {
                width: '100%',
                marginHorizontal: 0.2,
                backgroundColor: theme.colors.backgroundLight,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: theme.colors.background,
            },
            dropdown1BtnTxtStyle: {
                color: theme.colors.primary,
                textAlign: 'left'
            },
            dropdown1DropdownStyle: {
                backgroundColor: theme.colors.backgroundLight,
                color: theme.colors.primary
            },
            dropdown1RowStyle: {
                backgroundColor: theme.colors.backgroundLight,
                borderBottomColor: '#C5C5C5',
                color: theme.colors.primary
            },
            dropdown1RowTxtStyle: {
                color: theme.colors.primary,
                textAlign: 'left'
            },
            questionInlineRadioBtn: {
                flexDirection: 'row',
                backgroundColor: theme.colors.backgroundLight,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: theme.colors.background,
                padding: 5,
                marginHorizontal: 0.5
            }
        })
