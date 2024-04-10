import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const UserProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [edjucation, setEdjucation] = useState('')
    const [address,setAddress]= useState('')
  const [image, setImage] = useState(null);

  const ProfileScreen = () => {
    // Add your code here to update the user's data in your database or API.
    };
    const imagePath = require('../assets/user.png');

    

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePictureContainer}>
      <Image source={imagePath} style={styles.profilePicture} />
     
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Edjucation"
          value={edjucation}
          onChangeText={text => setEdjucation(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
      borderRadius: 50,
    backgroundColor:'grey'
  },
  editProfilePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
  },
  editProfilePictureText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfile;