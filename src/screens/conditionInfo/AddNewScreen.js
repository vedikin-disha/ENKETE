import { StyleSheet, ScrollView, View, Image, PermissionsAndroid, TouchableOpacity,Modal, TextInput ,Alert } from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Title, Text, Button, Divider } from 'react-native-paper'
import Row from '../../components/Row'
import Dropdown from '../../components/Dropdown'
import ImageUploadCard from '../../components/ImageUploadCard'
import CustomTextInput from '../../components/CustomTextInput'
import { theme } from './../../core/theme';
import { color } from 'react-native-reanimated'
import QuestionFooter from '../questionScreen/QuestionFooter'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const selectArray = ["Pre Disaster Survey", "Post Disaster Survey"];
const distressPattern = ["1", "2"];
const urgencyOfRepair = [
  "Immediate Repair",
  "Immediate Load restriction",
  "Immediate external support",
  "No",
  "Immediate demolition",
];
const surroundingEnv = [
  "Moist",
  "Dry",
  "Mild corrosive environment",
  "Severe corrosive enviroment",
  "Exposed to direct weathering effects"
];
const damageScale = [
  "Low",
  "Nil",
  "Mild",
  "Severe",
  "Imminent Failure Condition",
  "Demolition",
];
const vulnerabilityIndices = [
  "Non-structural failure",
  "Structural failure",
  "Durability issue",
  "Poor maintenance issue",
  "Lack of periodic monitoring",
];
const structureCoponent = [
  "Steel Column",
  "RCC Column",
  "Heel",
  "Toe",
  "Gallary",
  "Sluice Way",
  "Crest",
  "Parapet Wall",
  "Wing Wall",
  "Column",
  "Ring Beam",
  "Tie Beam",
  "Wall",
  "Floor Slab",
  "Roof Dome Slab",
  "Steel Column",
  "Steel Girder",
  "Cross Bracing",
  "Tie Beam",
  "Roof Purlin",
  "Steel Section",
  "Channel Section",
  "Steel Girder",
  "Butt Welding",
  "RCC Slab",
  "Vertical Bracing",
  "Diagonal Bracingl",
  "Lateral Bracing",
  "Steel Stiffner",
  "Base Plate",
  "Splice Plate",
  "Deck Slab",
  "Steel Pier",
  "Steel Pier Cap",
  "Steel Box Girder",
  "Steel Pedestal",
  "Steel Box Web",
  "Steel Box Soffit",
  "Steel I Web",
  "Steel I Flange",
  "Steel I Girder",
  "Steel I Transverse Girder",
  "Steel I Cross End Girder",
  "RCC Beam",
  "RCC Column",
  "RCC Slab",
  "RCC Flat Slab",
  "RCC Retaining Wall",
  "RCC Shear Wall",
  "RCC Shaft Wall",
  "RCC Foundation",
  "RCC Raft Foundation",
  "RCC Footing",
  "RCC Plinth Beam",
  "RCC Lintel Beam",
  "RCC Stiffner",
  "RCC Tie Beam",
  "RCC Pedestal",
  "RCC Wall",
  "RCC Pier",
  "RCC Box Girder",
  "PSC Girder",
  "RCC Pier Cap",
  "RCC Pedestal",
  "RCC I Girder",
  "PSC I Girder",
  "Pile",
  "Pile Cap",
  "RCC Transverse Girder",
  "Cross End Girder",
  "RCC Deck Slab",
  "RCC Soffit Slab",
  "RCC Box Soffit",
  "RCC Box Web",
  "RCC I Web",
  "RCC I Flange",
  "Masonry wall",
  "Stone slab",
  "RBC slab",
  "Jack Slab",
  "Arch Vault",
];

const AddNewScreen = (props) => {
  const imgSrc0 = props.imageSource && props.imageSource['pic_0'] ? `data:` + props.imageSource['pic_0']["mime"] + `;base64,${props.imageSource['pic_0']["base64"]}` : "";
  const imgSrc1 = props.imageSource && props.imageSource['pic_1'] ? `data:` + props.imageSource['pic_1']["mime"] + `;base64,${props.imageSource['pic_1']["base64"]}` : "";
  const imgSrc2 = props.imageSource && props.imageSource['pic_2'] ? `data:` + props.imageSource['pic_2']["mime"] + `;base64,${props.imageSource['pic_2']["base64"]}` : "";
  const imgSrc3 = props.imageSource && props.imageSource['pic_3'] ? `data:` + props.imageSource['pic_3']["mime"] + `;base64,${props.imageSource['pic_3']["base64"]}` : "";


  const [disabledFinalSubmit, setDisabledFinalSubmit] = React.useState(true);
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const navigation = useNavigation();

  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleSubmit = () => {

  }

  
  return (
    <ScrollView>
    <View key={props.index} style={{backgroundColor:'#d1dbe'}}>
    
  
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style = {{color:'black', fontWeight:'bold'}}>Default Image Setting</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{color:'black', left:40,fontSize:20,  fontWeight:'bold'}}>Setting</Text>
          <TouchableOpacity style={styles.close} onPress={toggleModal}>
              
              <Text style={styles.closeText}>&times;</Text>
            </TouchableOpacity>
            {/* <Text style = {{color:'black'}}>Some text in the Modal..</Text> */}

            <ScrollView>
              
                  <Title style={styles.title}>select camera type</Title>
                  <TextInput
                  style={[styles.inputTxt, { color: 'black' }]}
                  mode='outlined'
                  />
                  <Title style ={styles.title}>selcet image click condition</Title>
                    <TextInput
                      keyboardType="numeric"
                      label="Aadhar Number"
                      style={styles.inputTxt}
                      mode='outlined'
                      // onChangeText={handleChange('owner_aadhar')}
                
                    />
                  <Title style ={styles.title}>Capturing image</Title>
              
                    <TextInput
                     
                      label="Phone Number"
                      style={styles.inputTxt}
                      mode='outlined'
                      // onChangeText={handleChange('owner_phone')}
                      // value={values.owner_phone}
                     
                    />

<Button
                            
                            style={styles.btn_large}
                            mode="contained"
                            contentStyle={{ height: 45 }}
                            labelStyle={{ fontSize: 15 }}
                            value="Submit"
                            onPress={handleSubmit}
                            
                        >
                            <Text style={{color:'white'}}>
                            submit
                            </Text>
                        </Button>

                    
                      </ScrollView>
                    
                   
                
               
          </View>
        </View>
      </Modal>
 

      
      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          labelStyle={{ color: 'black' }}
          data={selectArray}
          is_title={true}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Condition Survey</Text>}
          defaultText={'Pre-Post'}
          flex={1}
          onChange={(item) => props.onHandleFromFieldChange(item, ['condition_survey'])} />
      </Row>

      {/* distress pattern 1 */}
      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          data={distressPattern}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Distress Pattern</Text>}
          defaultText={"None"}
          flex={1}
          onChange={(item) => props.onHandleFromFieldChange(item, ['distress_pattern_0'])} />
      </Row>

      {/* image row 1 */}
      <Row style={{ marginVertical: 5, color:'black' }}>
      <ImageUploadCard
          label='Upload Image 1'
          // <Icon name="home" size={24} color="black" style={{marginLeft:10}} />
          style={{ width: '49%' , backgroundColor:'#a9b5d4' }}
          onUpload={() => props.onHandleUploadImage('pic_1')}
          imgSrc={imgSrc0}
          icon="menu"
        />
     
        <ImageUploadCard
          label='Upload Image 2'
          // <Icon name="home" size={24} color="black" style={{marginLeft:10}} />
          style={{ width: '49%' , backgroundColor:'#a9b5d4' }}
          onUpload={() => props.onHandleUploadImage('pic_1')}
          imgSrc={imgSrc1}
          icon="menu"
        />
      </Row>

      <Row style={{ marginTop: 15, marginBottom: 5 }}>
        <CustomTextInput
          flex={0.49}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Similar Distress Location Image & Drawing Reference</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['sdli_draing_ref_0'])} 
        />
        <CustomTextInput
          flex={0.49}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Similar Distress Location Image & Drawing Reference</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['sdli_draing_ref_1'])} 
        />
      </Row>

      {/* Structural Member */}
      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          data={structureCoponent}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Structural Member</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['structural_member_0'])}  />
        <Dropdown
          data={structureCoponent}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Structural Member</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['structural_member_1'])} />
      </Row>
      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          data={urgencyOfRepair}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Urgency of Repair</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['urgency_of_repair_0'])} />
        <Dropdown
          data={damageScale}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Damage Scale</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['damage_scale_0'])} />
      </Row>
      <Row style={{ marginVertical: 15 }}>
        <Dropdown
          data={surroundingEnv}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Surrounding Environment</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['surrounding_env_0'])} />

        <Dropdown
          data={vulnerabilityIndices}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Vulnerability indices</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['vulnerability_indices_0'])} />
      </Row>

      <Divider style={styles.divider} />

      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          data={distressPattern}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Distress Pattern</Text>}
          defaultText={"None"}
          flex={1}
          onChange={(item) => props.onHandleFromFieldChange(item, ['distress_pattern_0'])} />
      </Row>
        <Row style={{ marginVertical: 15 }}>
        <ImageUploadCard
          label='Upload Image 3'
          style={{ width: '49%',  backgroundColor:'#a9b5d4' }}
          onUpload={() => props.onHandleUploadImage('pic_2')}
          imgSrc={imgSrc2}
          icon='menu'
        />
        <ImageUploadCard
          label='Upload Image 4'
          style={{ width: '49%' ,  backgroundColor:'#a9b5d4'}}
          onUpload={() => props.onHandleUploadImage('pic_3')}
          imgSrc={imgSrc3}
          icon='menu'
        />
      </Row>

      
      <Row style={{ marginTop: 15, marginBottom: 5 }}>
        <CustomTextInput
          flex={0.49}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Similar Distress Location Image & Drawing Reference</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['sdli_draing_ref_0'])} 
        />
        <CustomTextInput
          flex={0.49}
          title={<Text style={{ color: 'black', fontWeight:'bold' }}>Similar Distress Location Image & Drawing Reference</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['sdli_draing_ref_1'])} 
        />
      </Row>
      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          data={structureCoponent}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Structural Member</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['structural_member_0'])}  />
        <Dropdown
          data={structureCoponent}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Structural Member</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['structural_member_1'])} />
      </Row>

      <Row style={{ marginVertical: 15 }}>
        <Dropdown
          data={surroundingEnv}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Surrounding Environment</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['surrounding_env_1'])} />

        <Dropdown
          data={vulnerabilityIndices}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Vulnerability indices</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['vulnerability_indices_1'])} />
      </Row>

      <Row style={{ marginVertical: 5 }}>
        <Dropdown
          data={urgencyOfRepair}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Urgency of Repair</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['urgency_of_repair_1'])} />
        <Dropdown
          data={damageScale}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Damage Scale</Text>}
          defaultText={'None'}
          flex={0.49}
          onChange={(item) => props.onHandleFromFieldChange(item, ['damage_scale_1'])} />
      </Row>

      <Row style={{ marginVertical: 5 }}>
        <CustomTextInput
          flex={1}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Root Couse Analysis</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['root_couse_analysis'])}
        />
      </Row>
      <Row style={{ marginVertical: 5 }}>
        <CustomTextInput
          flex={1}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Restoration Strategy</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['restoration_strategy'])}
        />
      </Row>
      <Row style={{ marginVertical: 5 }}>
        <CustomTextInput
          flex={1}
          title= {<Text style={{ color: 'black', fontWeight:'bold' }}>Conclusive Remark</Text>}
          onChange={(item) => props.onHandleFromFieldChange(item, ['conclusive_remark'])}
        />
      </Row>



      {/* Continue with other components and rows... */}

      {/* Footer Buttons */}
      {/* <Row style={{ marginVertical: 5 }}>
        <Button
          labelStyle={{ color: "#4da191" }}
          icon="shape-circle-plus"
          compact={true}
          uppercase={false}
          accessibilityHint="Add More Form Like This"
          onPress={() => props.addMoreForm()}
        >
          Add More
        </Button>
        <Button
          labelStyle={{ color: "#f44336" }}
          icon="delete"
          compact={true}
          uppercase={false}
          accessibilityHint="Add More Form Like This"
          onPress={() => props.removeForm()}
        >
          Remove Section
        </Button>
      </Row> */}
      
      <QuestionFooter
              continueBtnPress={() => finalSubmit()}
              backBtnPress={() => navigation.navigate('Home')}
              disabledContinue={disabledFinalSubmit}
              loadingSubmit={submitLoader}
              btnLeftText='exit'
              btnRightText={!submitLoader ? 'Finish Survey' : 'Finishing ...'}
            />
   

      
      {/* Footer Buttons */}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#a9b5d4',
    flexGrow: 1,
  },
  divider: {
    backgroundColor: '#a9b5d4',
    padding: 1,
    marginVertical: 10
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  btn_large: {
    top:40,
    alignSelf:'center',
    width:"85%",
    color:'white',
    backgroundColor:'#3371cb',
    marginTop: 150,
    marginBottom: 70,
    borderRadius: 10,
    justifyContent: 'center',
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
},
  inputTxt: {
    left:40,
    padding:-10,
    margin:-10,
    color:'white',
    // backgroundColor:'black',
    width: '80%',
    // height: 50,
    borderWidth:1
  },
  button: {
    padding: 10,
    // backgroundColor: '#d1dbe9',
    // marginBottom: 10,
    color:'#d1dbe0'
  },
  title: {
    fontSize:15,
    left:30,
    fontWeight:'bold',
    color:'black',
    paddingTop: 50,
    paddingBottom: 10
  },
  form: {
    backgroundColor:'black'
    // marginTop: 5,
    // paddingHorizontal: 15,
    // paddingBottom: 10
  },
  closeText: {
    color:'black',
    fontSize: 50,
    right:20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    // padding: 80,
    paddingTop:30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    width: '80%',
    height: '80%',
    marginBottom:10,
  
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});



export default AddNewScreen;
