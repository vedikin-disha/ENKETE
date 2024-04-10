import { FlatList, StyleSheet, View, StatusBar, PermissionsAndroid, Alert, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { getData, getObjectData } from "../helpers";
import { ref, onValue } from "firebase/database";
import { db } from "../config/firebase";
import Container from '../components/Container';
import { theme } from '../core/theme';
import { Text, Card, Button, ActivityIndicator, Caption } from 'react-native-paper';
import Row from '../components/Row';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SurveyListItem from '../components/SurveyListItem';
import RNFetchBlob from 'rn-fetch-blob'

// const Item = ({ title }) => (
//   <Card style={styles.item}>
//     <Card.Content style={{ padding: 10 }}>
//       <Row>
//         <View style={{ flex: 0.3 }}><Text>Survey-ID:</Text></View>
//         <View style={{ flex: 0.7 }}><Text>{title}</Text></View>
//       </Row>
//     </Card.Content>
//     <Card.Actions style={{ backgroundColor: theme.colors.text }}>
//       <Row>
//         <View style={{ flex: 0.49 }}>
//           <Button
//             icon="file-eye"
//             mode="outlined"
//             onPress={() => console.log('Pressed')}
//           >
//             View
//           </Button>
//         </View>
//         <View style={{ flex: 0.49 }}>
//           <Button
//             icon="file-download"
//             mode="outlined"
//             onPress={() => download()}
//           >
//             Download
//           </Button>
//         </View>
//       </Row>
//     </Card.Actions>
//   </Card>

// );

const SurveyListScreen = ({ navigation }) => {

  const [tempGuestId, setTempGuestId] = React.useState();
  const [surveyData, setSurveyData] = React.useState([]);
  const [activeLoader, setActiveLoader] = React.useState(true);

  useEffect(() => {
    getObjectData('@userdata').then((res) => {

      if (res.temp_guest_id === null) {
        var starCountRef = ref(db, 'survey/' + res.id);
      } else {
        var starCountRef = ref(db, 'survey/' + res.temp_guest_id);
      }

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log('@data', data)
        if (data !== null) {
          getSurveyList(data);
        }else{
          setActiveLoader(false);
        }
      });

    }).catch(err => {
      console.log(err);
    });
  }, []);

  const getSurveyList = (data) => {
    const sData = Object.keys(data).map((element, i) => {
      return {
        surveyId: element
      }
    })

    setSurveyData(sData);

    setActiveLoader(false);
  }

  const viewReport = async (surveyID) => {

    var userId;
    var userinfo = await getObjectData('@userdata');
    if (userinfo && userinfo.temp_guest_id !== null) {
      userId = userinfo.temp_guest_id;
    } else {
      userId = userinfo.id;
    }

    navigation.navigate('ReportView', {
      surveyId: surveyID,
      userID: userId
    });
  }

  console.log('surveyData', surveyData);

  const renderItem = ({ item }) => (
    <SurveyListItem
      data={item}
      onDownload={(val) => handleDownload(val)}
      onView={(val) => viewReport(val)}
    />
  );

  const renderEmptyItem = () => (
    <View style={{ marginTop: 50 }}>
      <Text style={{ textAlign: 'center' }}>No Survey Available</Text>
    </View>
  )

  const actualDownload = async (surveyId) => {

    var userData = await getObjectData('@userdata');

    var userId = userData.temp_guest_id === null ? userData.id : userData.temp_guest_id;

    const pdfFileName = 'report-' + userId + '-' + surveyId + '.pdf';

    const d = new Date();
    let time = d.getTime();

    const downloadFileName = 'report-' + userId + '-' + surveyId + '-' + time + '.pdf';

    console.log('downloadFileName', downloadFileName);

    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'Survey Report',
        path: `${dirs.DownloadDir}/` + downloadFileName,
      },
    })
      .fetch('GET', 'https://cortexsolutions.in/surveyfirebase/public/reports/' + pdfFileName, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
        ToastAndroid.show('The file saved to ' + res.path(), ToastAndroid.CENTER);
      })
      .catch((e) => {
        console.log(e)
      });
  }

  const handleDownload = async (val) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await actualDownload(val);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <>
      {!activeLoader ?
        <Container>
          <FlatList
            data={surveyData}
            renderItem={renderItem}
            keyExtractor={item => item.surveyId}
            ListEmptyComponent={renderEmptyItem}
          />
        </Container>
        :
        <Container>
          <ActivityIndicator
            animating={true}
            color={theme.colors.blue}
            style={styles.loader}
            size="large"
          />
          <Caption style={{ textAlign: 'center' }}>Please wait, while we fetching data ...</Caption>
        </Container>
      }
    </>
  )
}

export default SurveyListScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4b89df',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})