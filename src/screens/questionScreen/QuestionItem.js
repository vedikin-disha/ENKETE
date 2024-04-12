

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import { theme } from '../../core/theme';

// const QuestionItem = ({ questions,questionID  }) => {
//     const [question, setQuestion] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchQuestionData();
//     }, []);

//     const fetchQuestionData = async () => {
//         try {
//             const url = 'http://192.168.1.100:6000/questions';
//             const requestBody = {
//                 auth_key: "ltnfvh18zxItOhP2qzrtynnVvbyniu",
//                 question_id: questionID, 
//                 disasterType: "1558514385",
//                 assessment_method: "1558701090",
//                 structure_type: "1558701137"
//             };
    
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             const data = await response.json();
//             console.log(data.question);
//             if (response.ok && Array.isArray(data.questions) && data.questions.length > 0 && data.is_successful === "1") {
//                 setQuestion(data.questions[0].question);
//                 console.log(data.questions[0].question); 
                
//             } else {
//                 Alert.alert('Error', 'No questions found.');
//             }
//         } catch (error) {
//             console.error('API Error:', error);
//             Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     if (loading) {
//         return (
//             <View style={styles.container}>
//                 <Text>Loading...</Text>
//             </View>
//         );
//     }
    
//     if (!question) {
//         return (
//             <View style={styles.container}>
//                 <Text>Error fetching question.</Text>
//             </View>
//         );
//     }
    
//     return (
//         <View style={styles.container}>
//             <Text style={styles.questionText}>{question}</Text> {/* Use 'question' variable here */}
//         </View>
//     );
    

//     if (loading) {
//         return (
//             <View style={styles.container}>
//                 <Text>Loading...</Text>
//             </View>
//         );
//     }

//     if (!question) {
//         return (
//             <View style={styles.container}>
//                 <Text>Error fetching question.</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.questionText}>{questions.question}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: theme.colors.border,
//     },
//     questionText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default QuestionItem;



import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { theme } from '../../core/theme'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SelectDropdown from 'react-native-select-dropdown'
import { RadioButton } from 'react-native-paper'
import InlineRadioButton from '../../components/InlineRadioButton'

const QuestionItem = (props) => {

    const ConditionalRender = ({ answers, questionType }) => {

        const [currentValue, setCurrentValue] = React.useState(props.answer.value);

        let ansArray = [];
        ansArray = answers.map((data) => data.answer);

        switch (questionType) {
            case 'dropdown':
                return (
                    <SelectDropdown
                        data={ansArray}
                        onSelect={(selectedItem, index) => {
                            props.onChange(selectedItem)
                        }}
                        defaultButtonText={'Choose Your Answer'}
                        defaultValue={currentValue}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                )
            case 'RadioButton':
                return (
                    <InlineRadioButton
                        data={ansArray}
                        style={styles.questionInlineRadioBtn}
                        onPress={(value) => {
                            props.onChange(value);
                            setCurrentValue(value);
                        }}
                        currentValue={currentValue}
                    />
                )
            default:
                return (
                    <TextInput
                        theme={{ colors: { text: 'white' } }}
                        style={styles.questionInput}
                        placeholder="Enter Answer here..."
                        onChangeText={(text) => setCurrentValue(text)}
                        onEndEditing={() => props.onChange(currentValue)}
                        value={currentValue}
                    />
                )
        }
    }

    return (
        <View style={styles.item}>
            <View style={styles.questionLabel}>
                <Text style={styles.questionLabelTxt}>
                    {props.item.question}
                </Text>
                {props.item.is_required == 'Y' &&
                    <Ionicons
                        name='alert'
                        size={20}
                        style={{ color: theme.colors.danger }}
                    />
                }
            </View>
            {props.item.answers &&
                <ConditionalRender
                    answers={props.item.answers}
                    questionType={props.item.questionType}
                />
            }
        </View>
    )
}

export default QuestionItem

const styles = StyleSheet.create({
    questionLabel: {

        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    questionLabelTxt: {
        color:'black',
        // backgroundColor:'white',
        flex: 1,
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    questionInput: {
        color:'white',
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
        borderRadius: 0,
        borderWidth: 1,
        borderColor: theme.colors.background,
        padding: 5,
        marginHorizontal: 0.5
    }

})



// QuestionItem.js