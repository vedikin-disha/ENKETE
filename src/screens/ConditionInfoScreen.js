import { StyleSheet, Image, View, TextInput, ScrollView, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { theme } from '../core/theme'
import Container from '../components/Container'
import { IconButton, Button, ActivityIndicator, Caption } from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker';
import { Modalize } from 'react-native-modalize';
import QuestionFooter from './questionScreen/QuestionFooter'
import ChildForm from './conditionInfo/childForm'
import { getData, getObjectData, removeFew, storeData, storeDataObject } from '../helpers'
import { ref, set, update } from "firebase/database";
import { db } from "../config/firebase";
import axios from 'axios';
import { pdfApi } from '../api/cortexSurveyApi'
import ScrollableAddNewScreen from './conditionInfo/AddNewScreen'
import AddNewScreen from './conditionInfo/AddNewScreen'

const defaultImageObj = { pic0: "", pic1: "", pic2: "", pic3: "" };
const schemaObj = {
  "condition_survey": "",
  "distress_pattern_0": "",
  "pic_0": {
    "base64": "",
    "mime": ""
  },
  "pic_1": {
    "base64": "",
    "mime": ""
  },
  "sdli_draing_ref_0": "",
  "sdli_draing_ref_1": "",
  "structural_member_0": "",
  "structural_member_1": "",
  "urgency_of_repair_0": "",
  "damage_scale_0": "",
  "surrounding_env_0": "",
  "vulnerability_indices_0": "",
  "distress_pattern_1": "",
  "pic_2": {
    "base64": "",
    "mime": ""
  },
  "pic_3": {
    "base64": "",
    "mime": ""
  },
  "sdli_draing_ref_2": "",
  "sdli_draing_ref_3": "",
  "structural_member_2": "",
  "structural_member_3": "",
  "urgency_of_repair_1": "",
  "damage_scale_1": "",
  "surrounding_env_1": "",
  "vulnerability_indices_1": "",
  "root_couse_analysis": "",
  "restoration_strategy": "",
  "conclusive_remark": ""
};

const PDF_URL = "http://cortexsolutions.in/surveyfirebase/public/api/survey";

const ConditionInfoScreen = ({ navigation }) => {

  /*** States and hooks */

  const modalizeRef = useRef(null);
  const modalizeViewPicRef = useRef(null);

  const [activeLoader, setActiveLoader] = React.useState(false);

  const [disabledFinalSubmit, setDisabledFinalSubmit] = React.useState(true);
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const [currentPictureModal, setCurrentPictureModal] = React.useState({
    'path': '',
    'index': null
  });
  const [currentViewPicture, setCurrentViewPicture] = React.useState('');
  const [cameraPhoto, setCameraPhoto] = React.useState([defaultImageObj]);

  const [inputFields, setInputFields] = React.useState([schemaObj]);

  useEffect(() => {
    let error = 0;
    inputFields.map((el, i) => {
      // console.log('inputFields[i]', inputFields[i]);
      Object.entries(inputFields[i]).map(([key, value], index) => {
        console.log(index, key);
        if (value === '' || value["base64"] === "") {
          error++;
        }
      });
    });

    console.log(error);

    if (error === 0) {
      setDisabledFinalSubmit(false);
    } else {
      setDisabledFinalSubmit(true);
    }
  }, [inputFields])


  /*** Functions */

  const handleUploadImage = (param, index) => {
    modalizeRef.current?.open();
    setCurrentPictureModal({
      'path': param,
      'index': index
    });
  }

  const hasCameraPermission = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }
  }

  const openCamera = async ({ path, index }) => {

    const hasPermission = await hasCameraPermission();
    if (!hasPermission) {
      return;
    }

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(image => {
      // console.log(image);
      // handleFormChange(index, path, image.path)
      handleFromFieldChange(image, path, index)
    }).catch(err => {
      console.log(err);
    })

    modalizeRef.current?.close();

  }

  const openGallery = async ({ path, index }) => {

    const hasPermission = await hasCameraPermission();
    if (!hasPermission) {
      return;
    }

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(image => {
      // console.log(image);
      // handleFormChange(index, path, image.path)
      handleFromFieldChange(image, path, index)
    }).catch(err => {
      console.log(err);
    })

    modalizeRef.current?.close();

  }

  const openPicture = ({ path, index }) => {
    modalizeViewPicRef.current?.open();
    // console.log(cameraPhoto[index][path])
    setCurrentViewPicture(cameraPhoto[index][path])
  }

  // const handleFormChange = (index, type, value) => {
  //   let currentCameraPhoto = [...cameraPhoto];
  //   currentCameraPhoto[index][type] = value;
  //   setCameraPhoto(currentCameraPhoto);
  // }

  const handleFromFieldChange = (value, key, index) => {
    let currentInputFields = [...inputFields];

    if (Array.isArray(key)) {
      currentInputFields[index][key[0]] = value;
    } else {
      // console.log('no')
      currentInputFields[index][key]['base64'] = value.data;
      currentInputFields[index][key]['mime'] = value.mime;
    }
    setInputFields(currentInputFields);
    // console.log("inputFields", inputFields[index]);
  }

  const addMoreForm = (index) => {
    if (index <= 9) {
      setInputFields([...inputFields, schemaObj])
    }
  }

  const removeForm = (index) => {
    const values = [...inputFields];
    if (values.length > 1) {
      values.splice(index, 1);
    }
    setInputFields(values);
  }

  const generatePDF = (userId, surveyId) => {
    axios.post(pdfApi, {
      surveyId: surveyId,
      userId: userId,
    }).then(function (response) {
      if(response.data){
        storeDataObject(response.data.data, '@pdfLink').then((res) => {
          setDisabledFinalSubmit(true);
          setSubmitLoader(true);
          ToastAndroid.show('Data saved successfull', ToastAndroid.SHORT);
          setActiveLoader(false);
          navigation.navigate('ReportDownload');
        }).catch((error) => {
          console.log(error);
        });
      }
    }).catch(function (error) {
      console.log(error);
      ToastAndroid.show("Server Not Responding, please try letter", ToastAndroid.LONG);
      setActiveLoader(false);
      setDisabledFinalSubmit(false);
        setSubmitLoader(false);
    });
  }

  const updatefirebase = (userId, surveyId) => {
    const updates = {};
    updates['/survey/' + userId + "/" + surveyId + "/condition_survey"] = inputFields;
    update(ref(db), updates).then(() => {
      //genarate pdf
      generatePDF(userId, surveyId);
    }).catch((err) => {
      console.log(err);
    });
  }

  /** Final Submit Survey into Database */
  const finalSubmit = async () => {

    setDisabledFinalSubmit(true);
    setSubmitLoader(true);

    var userId;
    const user_id = await getData('@userId');
    
    if (user_id) {
      userId = user_id;
    } else {
      const guestUserId = await getData('@guestUserId');
      userId = guestUserId;
    }

    const surveyId = await getData('@surveyId');
    if (surveyId && userId) {
      await storeDataObject(inputFields, '@conditionSurvey');
      setActiveLoader(true);
      //update survey data in firebase
      updatefirebase(userId, surveyId);
    }
  }

  return (
    <>
      {!activeLoader ?
        <Container style={styles.container}>

          <ScrollView>
          {inputFields.map((value, index) => (
  <>
    {/* <AddNewScreen
      key={`addNewScreen_${index}`}
      addMoreForm={() => addMoreForm(index)}
      removeForm={() => removeForm(index)}
      imageSource={inputFields[index]}
      onHandleFromFieldChange={(value, key) => handleFromFieldChange(value, key, index)}
      onHandleUploadImage={(para) => handleUploadImage(para, index)}
    /> */}
    <ChildForm
      key={`childForm_${index}`}
      addMoreForm={() => addMoreForm(index)}
      removeForm={() => removeForm(index)}
      imageSource={inputFields[index]}
      onHandleFromFieldChange={(value, key) => handleFromFieldChange(value, key, index)}
      onHandleUploadImage={(para) => handleUploadImage(para, index)}
    />
    
  </>
))}

            <QuestionFooter
              continueBtnPress={() => finalSubmit()}
              backBtnPress={() => navigation.navigate('Home')}
              disabledContinue={disabledFinalSubmit}
              loadingSubmit={submitLoader}
              btnLeftText='exit'
              btnRightText={!submitLoader ? 'Finish Survey' : 'Finishing ...'}
            />
          </ScrollView>

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
                icon="file-image"
                mode="outlined"
                uppercase={false}
                onPress={() => openPicture(currentPictureModal)}
              >
                View Picture
              </Button>
              <Button
                icon="camera"
                mode="outlined"
                uppercase={false}
                onPress={() => openCamera(currentPictureModal)}
              >
                Open Camera
              </Button>
              <Button
                icon="image-album"
                mode="outlined"
                uppercase={false}
                onPress={() => openGallery(currentPictureModal)}
              >
                Select from Gallery
              </Button>
            </View>
          </Modalize>

          <Modalize
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            // snapPoint={250}
            HeaderComponent={
              <View style={{ alignItems: 'flex-end' }}>
                <IconButton
                  icon="close"
                  color={theme.colors.backgroundDark}
                  size={30}
                  onPress={() => modalizeViewPicRef.current?.close()}
                />
              </View>
            }
            withHandle={false}
            ref={modalizeViewPicRef}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 300,
                  height: 400,
                }}
                source={{
                  uri: currentViewPicture,
                }}
              />
            </View>
          </Modalize>

        </Container>
        :
        <Container>
          <ActivityIndicator
            animating={true}
            color={theme.colors.blue}
            style={styles.loader}
            size="large"
          />
          <Caption style={{ textAlign: 'center' }}>Please wait, Saving the data ...</Caption>
        </Container>
      }
    </>
  )
}

export default ConditionInfoScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5
  },
})