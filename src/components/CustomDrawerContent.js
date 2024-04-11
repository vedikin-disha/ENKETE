import React, { useContext } from "react";
import { View, StyleSheet, Button, StatusBar, Alert } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Context } from "../context/AuthContext";
import Row from './Row';
import { theme } from "../core/theme";
import { getObjectData } from "../helpers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export function CustomDrawerContent(props) {

  const { state, signout } = useContext(Context);
  const [userData, setUserData] = React.useState({});

  if (state.isSignedIn) {
    getObjectData('@userdata').then((data) => {
      setUserData(data);
    }).catch((err) => {
      console.log(err)
    })
  }
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // Perform logout actions here, such as clearing user session or navigating to the login screen
            props.navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop:0 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection }>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                {state.isSignedIn ?
                  <Avatar.Image

                    source={{
                      uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                    }}
                    size={60}
                  />
                  :
                  <Avatar.Text size={60} label="GU" />
                }
               {state.isSignedIn ?
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Title style={styles.title}>{ userData.first_name } { userData.last_name }</Title>
                  <Caption>Professional Surveyor</Caption>
                </View>
                :
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems:'center' }}>
                  <Title style={styles.title}>Guest User</Title>
                </View>
              }
              </View>
              {/* {state.isSignedIn ?
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Title style={styles.title}>{ userData.first_name } { userData.last_name }</Title>
                  <Caption>Professional Surveyor</Caption>
                </View>
                :
                <View style={{ flex: 0.7, justifyContent: 'center' }}>
                  <Title style={styles.title}>Guest User</Title>
                </View>
              } */}
            </View>
            <View>


            </View>
          </View>


          <View style={styles.btns}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              props.navigation.navigate("Home");
            }}
            >
            <Icon name="home" size={24} color="black" style={{marginLeft:10}} />
              <Text style={styles.home_btn}
              >Home</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.btns}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {
              props.navigation.navigate("Profile");
            }}>
            <Icon name="account" size={24} color="black"  style={{marginLeft:10}} />
              <Text style={styles.home_btn}
              >Profile</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.btns}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
             onPress={() => {
              props.navigation.navigate("NewSurvey");
            }}>
            <Icon name="menu" size={24} color="black" style={{ marginLeft: 10 }} />
              <Text style={styles.home_btn}                
              >New Survey</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.btns}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
             onPress={() => {
              props.navigation.navigate("ConditionInfo");
            }}>
            <Icon name="menu" size={24} color="black" style={{ marginLeft: 10 }} />
              <Text style={styles.home_btn}
               icon="clock-outline"
              >My Survey List</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}  onPress={handleLogout}
            >
            <Icon name="logout" size={24} color="black" style={{ marginLeft: 10 }} />
              <Text style={styles.home_btn}
                icon="logout  "
              >Logout</Text>
          </TouchableOpacity>
          </View>
          

          {state.isSignedIn &&
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={theme.colors.text} size={size} />
                )}

                label="Home"
                labelStyle={{ color: theme.colors.text }}
                activeBackgroundColor={theme.colors.text}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-outline" color={theme.colors.text} size={size} />
                )}
                label="Profile"
                labelStyle={{ color: theme.colors.text }}
                onPress={() => {
                  // props.navigation.navigate("Account");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="format-list-bulleted" color={theme.colors.text} size={size} />
                )}
                label="My Survey List"
                labelStyle={{ color: theme.colors.text }}
                onPress={() => {
                  props.navigation.navigate("SurveyList");
                }}
              />
            </Drawer.Section>
          }
        </View>
      </DrawerContentScrollView>
      {state.isSignedIn &&
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label={({ color }) => (
              <Text>Log Out</Text>
            )}
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={theme.colors.text} size={size} />
            )}
            onPress={signout}
          />
        </Drawer.Section>
      }
    </View>
    
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    flexDirection: 'row',
    paddingTop: 30,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#74B9FF',
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius:9
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom:20,
    marginTop:2,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    fontWeight: "bold",
    color: 'black',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  drawerItem: {
    color: theme.colors.text
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btn: {
    backgroundColor: '#000',
    color: 'black'
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  // btnProfile: {
  //   marginTop:5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderBottomColor: 'grey',
  //   borderColor: 'grey',
  //   borderBottomWidth: 1,
  // },
  // btnNewSurvey: {
  //   marginTop:5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderBottomColor: 'grey',
  //   borderColor: 'grey',
  //   borderBottomWidth: 1,
  // },
  home_btn: {
    color: 'black',

    paddingBottom: 5,

    paddingLeft: 20,
    paddingBottom: 24,
    alignItems: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '800'
  }
});
