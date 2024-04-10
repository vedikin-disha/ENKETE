import { StyleSheet, Image, View, Text, ScrollView, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { Modalize } from 'react-native-modalize';
import { Button, IconButton } from 'react-native-paper'
import { theme } from '../core/theme'
import Container from '../components/Container'
import Row from '../components/Row'
import ImageUploadCard from '../components/ImageUploadCard'
import { getData, getObjectData, storeData, storeDataObject } from '../helpers'
import { ref, set, update } from "firebase/database";
import { db } from "../config/firebase";
import uuid from 'react-native-uuid';

const home_pic_upload = require('../assets/home_pic_upload.png');
const DEFAULT_IMAGE = Image.resolveAssetSource(home_pic_upload).uri;

const ImagesUploadScreen = ({ navigation }) => {

  const modalizeRef = useRef(null);
  const modalizeViewPicRef = useRef(null);

  const [currentPictureModal, setCurrentPictureModal] = React.useState(0);
  const [currentViewPicture, setCurrentViewPicture] = React.useState('');

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const [cameraPhoto, setCameraPhoto] = React.useState([
    {
      picture: {
        base64: "",
        mime: ""
      },
      caption: "Structure Profile Picture",
      required: "Y"
    },
    {
      picture: {
        base64: "",
        mime: ""
      },
      caption: "",
      required: "Y"
    },
    {
      picture: {
        base64: "",
        mime: ""
      },
      caption: "",
      required: "Y"
    },
    {
      picture: {
        base64: "",
        mime: ""
      },
      caption: "",
      required: "Y"
    },
    {
      picture: {
        base64: "",
        mime: ""
      },
      caption: "",
      required: "Y"
    },
  ]);

  const handleUploadImage = (param) => {
    modalizeRef.current?.open();
    setCurrentPictureModal(param);
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

  const openCamera = async (param) => {

    const hasPermission = await hasCameraPermission();
    if (!hasPermission) {
      return;
    }

    ImagePicker.openCamera({
      backgroundColor:'#4b89df',
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(image => {
      // console.log(image);
      handleFormChange(param, 'picture', image)
    }).catch(err => {
      console.log(err);
    })

    modalizeRef.current?.close();

  }

  const openGallery = async (param) => {

    const hasPermission = await hasCameraPermission();
    if (!hasPermission) {
      return;
    }

    ImagePicker.openPicker({
      backgroundColor:'#4b89df',
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(image => {
      // console.log(image);
      handleFormChange(param, 'picture', image)
    }).catch(err => {
      console.log(err);
    })

    modalizeRef.current?.close();

  }

  const openPicture = (param) => {
    modalizeViewPicRef.current?.open();
    // console.log(cameraPhoto[param])
    setCurrentViewPicture(cameraPhoto[param]["picture"]["base64"])
  }

  //call when geoInfo value change
  useEffect(() => {

    // console.log('cameraPhoto 1:', cameraPhoto)

    let error = 0;
    cameraPhoto.map((val, index) => {
      if (cameraPhoto[index].required === "Y" && cameraPhoto[index]["picture"]["base64"] === "" && cameraPhoto[index].caption === "") {
        error++;
      }
    })

    if (error === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

  }, [cameraPhoto]);

  const handleFormChange = (index, type, value) => {
    let currentCameraPhoto = [...cameraPhoto];
    if (type === 'picture') {
      currentCameraPhoto[index][type]['base64'] = value.data;
      currentCameraPhoto[index][type]['mime'] = value.mime;
    } else {
      currentCameraPhoto[index][type] = value;
    }

    // console.log('currentCameraPhoto', currentCameraPhoto);

    setCameraPhoto(currentCameraPhoto);
  }

  // const updatefirebase = (userId, surveyId) => {
  //   const updates = {};
  //   updates['/survey/' + userId + "/" + surveyId + "/building_images"] = cameraPhoto;

  //   update(ref(db), updates).then((result) => {
  //     console.log('success');
  //     ToastAndroid.show('Image Uploaded successfully', ToastAndroid.SHORT);
  //     navigation.navigate('QuestionsView');
  //     setIsDisabled(true);
  //     setSubmitLoader(true);
  //   }).catch((err) => {
  //     console.log(err);
  //     setIsDisabled(true);
  //     setSubmitLoader(true);
  //   });
  // }

  const saveAndContinue = async () => {
    console.log("Upload and Submit" , saveAndContinue)
    navigation.navigate('QuestionsView')

    // setIsDisabled(true);
    // setSubmitLoader(true);

    // var userId;
    // const user_id = await getData('@userId');
    // if (user_id) {
    //   userId = user_id;
    // } else {
    //   const guestUserId = await getData('@guestUserId');
    //   userId = guestUserId;
    // }

    // const surveyId = await getData('@surveyId');
    // if (surveyId && userId) {
    //   await storeDataObject(cameraPhoto, '@cameraPhoto');
    //   updatefirebase(userId, surveyId);
    // }
  }

  return (
    <Container style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <ImageUploadCard
           style={{  backgroundColor:"lightgray" }}
            label='Upload Structure Profile Picture'
            onUpload={() => handleUploadImage(0)}
            imgSrc={cameraPhoto[0]["picture"]["base64"] ? `data:"image/jpeg";base64,${cameraPhoto[0]["picture"]["base64"]}` : ""}
          />
          <Row style={{ marginHorizontal: 0, marginTop: 25 }}>
            <ImageUploadCard
              label='Image Caption...'
              style={{ width: '49%', backgroundColor:"lightgray" }}
              isTextInput={true}
              onChange={(text) => handleFormChange(1, 'caption', text)}
              onUpload={() => handleUploadImage(1)}
              imgSrc={cameraPhoto[1]["picture"]["base64"] ? `data:"image/jpeg";base64,${cameraPhoto[1]["picture"]["base64"]}` : ""}
            />
            <ImageUploadCard
              label='Image Caption...'
              style={{ width: '49%', backgroundColor:'lightgray', color:'black' }}
              isTextInput={true}
              onChange={(text) => handleFormChange(2, 'caption', text)}
              onUpload={() => handleUploadImage(2)}
              imgSrc={cameraPhoto[2]["picture"]["base64"] ? `data:"image/jpeg";base64,${cameraPhoto[2]["picture"]["base64"]}` : ""}
            />
          </Row>
          <Row style={{ marginHorizontal: 0, marginTop: 25 }}>
            <ImageUploadCard
              label='Image Caption...'
              style={{ width: '49%' ,  backgroundColor:"lightgray"}}
              isTextInput={true}
              onChange={(text) => handleFormChange(3, 'caption', text)}
              onUpload={() => handleUploadImage(3)}
              imgSrc={cameraPhoto[3]["picture"]["base64"] ? `data:"image/jpeg";base64,${cameraPhoto[3]["picture"]["base64"]}` : ""}
            />
            <ImageUploadCard
              label='Image Caption...'
              style={{ width: '49%', backgroundColor:"lightgray"}}
              isTextInput={true}
              onChange={(text) => handleFormChange(4, 'caption', text)}
              onUpload={() => handleUploadImage(4)}
              imgSrc={cameraPhoto[4]["picture"]["base64"] ? `data:"image/jpeg";base64,${cameraPhoto[4]["picture"]["base64"]}` : ""}
            />
          </Row>
        </View>
        <View style={styles.form}>
          <Button
            color='#4b89df'
            mode='contained'
            contentStyle={{ height: 45 }}
            labelStyle={{ fontSize: 18 }}
            uppercase={false}
            loading={submitLoader}
            disabled={isDisabled}
            onPress={() => saveAndContinue()}
          >
            {/* {!submitLoader ? 'Upload & Continue' : 'Submitting ...'} */}
            <Text style={{fontWeight:'bold', color:'white', backgroundColor:' #4b89df'}}> {!submitLoader ? 'Upload & Continue' : 'Submitting ...'}</Text>
          </Button>
        </View>
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
          {cameraPhoto[currentPictureModal]["picture"]["base64"] !== "" &&
            <Button
              icon="file-image"
              mode="outlined"
              uppercase={false}
              onPress={() => openPicture(currentPictureModal)}
            >
              View Picture
            </Button>
          }
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
              color='#d1dbe9'
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
              uri: `data:"image/jpeg";base64,${currentViewPicture}`,
            }}
          />
        </View>
      </Modalize>
    </Container>
  )
}

export default ImagesUploadScreen

const styles = StyleSheet.create({
  container: {
    color:'white',
    backgroundColor:'#d1dbe9',
    justifyContent: 'flex-start',
  },
  form: {
    color:'black',
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 30
  },
})