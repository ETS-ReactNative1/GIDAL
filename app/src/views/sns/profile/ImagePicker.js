import React, { useState, useEffect } from 'react';
import { Image, View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Modal, Button, Radio, Avatar, Center, Box, HStack } from "native-base"
import axios from 'axios';
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img } from './profileImg'
import Icon from 'react-native-vector-icons/AntDesign';

const PickModal = ({user_Id, changeProfile}) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/1/1247.png");

  console.log(user_Id);
  const pressImg = (uri) => {
    setImage(uri)
  }

  const saveProfile = () => {
    axios.post(config.ip + ':5000/usersRouter/updateProfile', {
      data: {
        user_id: user_Id,
        uri: image
      }
    }).then((response) => {
      if (response.data.status === 'success') {
        console.log('save profile');
      }
    }).catch(function (error) {
      console.log(error);
    })
    changeProfile(image)
    setShowModal(false);

  }

  return <Center>
  {/* <TouchableOpacity onPress={() => setShowModal(true)}> */}
  {/* <Image style={styles.avatar} source={{ uri: image }} /> */}
  {/* <Button title="프로필 수정"  onPress={() => setShowModal(true)}>프로필 수정</Button> */}
  <TouchableOpacity onPress={() => setShowModal(true)}>
    <Text>
        <Icon name="edit" size={20} color="black" />
    </Text>
      </TouchableOpacity>
  {/* </TouchableOpacity> */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="450px">
          <Modal.CloseButton />
          <Modal.Body>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatarPick} source={{ uri: image }} /> 
            {/* <Avatar bg="green.500" style={styles.avatar} mr={1} source={{uri: image}} textAlign=""></Avatar>  */}
            <Text style={styles.selected}>선택된 프로필</Text>
          </View>
          <ScrollView horizontal={true}>
          <HStack>
          
          {img.map( profile => (
            <TouchableOpacity onPress={profile.uri !=="" ? () => pressImg(profile.uri) : null}>
                <Avatar bg="green.500" mr={1} source={profile.uri !=="" ? {uri: profile.uri} : null} key={profile.id}></Avatar> 
              </TouchableOpacity>
      ))}
          </HStack>
          
          </ScrollView>
          
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="green" onPress={() => {
              setShowModal(false);
            }}>
                취소
              </Button>
              <Button colorScheme="green" onPress={() => {
              saveProfile();
            }}>
                저장
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
};

export default function ImagePicker({user_Id, changeProfile}) {
  return (
    <PickModal user_Id={user_Id} changeProfile={changeProfile}/>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    position: 'absolute',
    top: 50, right :100
  },
  avatarPick: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#27ae60",
    position: 'center',
    marginBottom: 5
    // top: 50, right :100
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#27ae60",
    marginBottom: 10
  },
  selected: {
    fontSize: 16,
    fontWeight: '600',
  },
});