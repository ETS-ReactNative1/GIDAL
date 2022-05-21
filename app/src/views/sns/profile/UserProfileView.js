import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Box, Button, HStack } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigationState } from '@react-navigation/native';
import BackButton from '../../../components/common/BackButton';
import { Ionicons } from "@expo/vector-icons";

// 이걸로 통합 예정


export default function UserProfileView(props) {


  const isFocused = useIsFocused();

  // console.log('UserProfileView');

  const [date, setSelectedDate] = React.useState(props.selectedDate);
  const [profileImg, setProfileImg] = useState();
  const [user_Id, setUserId] = useState('loading');
  const [currentId, setCurrentId] = useState('헤헤');
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowerNum, setuserFollowerNum] = useState(0);
  const [userFollowingNum, setuserFollowingNum] = useState(0);
  const [followText, setFollowText] = useState('loading');

  const [isLoaded, setIsLoaded] = React.useState(false);
  const new_routes = useNavigationState(state => state.routes);

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    //초기 프로필 아이디 수신부
    if (isFocused) {
      try {

        // console.log('other profile!');
        const idx = new_routes.findIndex(r => r.name === "UserProfile")
        if (idx != -1 && new_routes[idx].params != undefined) {
          setUserId(new_routes[idx].params.user_id);
        }
        if (new_routes[idx].params == undefined) {
          try {
            console.log('my profile!')
            AsyncStorage.getItem('userInfo')
              .then(value => {
                if (value != null) {
                  const UserInfo = JSON.parse(value);
                  setUserId(UserInfo[0].user_id);
                }
              }
              )

          }
          catch (e) {
            // console.log(e);
          }
        }
        // console.log('this is ' + user_Id + 's page');
      } catch (error) {
        // console.log(error);
      }
    }
  }, [isFocused]);

  React.useEffect(() => {
    getUserData(user_Id);
  }, [user_Id]);

  const getUserData = (user_Id) => {
    axios.post(config.ip + ':5000/usersRouter/findOne', {
      data: {
        user_id: user_Id,
      }
    })
      .then((response) => {
        const following = response.data[0].following;
        const follower = response.data[0].follower;
        // console.log('****following****')
        // console.log(following);
        // console.log('****follower****')
        // console.log(follower);
        setUserFollowing(following);
        setUserFollower(follower);
        setuserFollowingNum(following.length)
        setuserFollowerNum(follower.length)
      }).catch(function (error) {
        // console.log(error);
      });
  };

  React.useEffect(() => {
    let objectFollowing = Object.values(userFollower).map(item => item.user_id)
    // console.log("objectFollowing : " + objectFollowing);
    // console.log(currentId);
    if (objectFollowing.includes(currentId)) {
      // console.log("이미 팔로우 되어있음")
      setFollowText(<Ionicons name="person-remove" size={15} color="red" />)

    } else {
      // console.log("아직 팔로우 안되어있음")
      setFollowText(<Ionicons name="person-add" size={15} color="green" />)
    }
  }, [userFollower])


  React.useEffect(() => {
    // console.log('123');
  }, [userFollowerNum, userFollowingNum])

  const follow = () => {
    const data = {
      user_id: currentId,
      following_user_id: user_Id,
      img: ""
    }
    let objectFollowing = Object.values(userFollower).map(item => item.user_id)
    console.log("follow : " + objectFollowing);
    if (objectFollowing.includes(currentId)) {
      // Alert.alert('팔로우 끊기 axios가 나와야 함')      
      axios.post(config.ip + ':5000/usersRouter/userFollowingDelete', {
        data: data
      })
      axios.post(config.ip + ':5000/usersRouter/userFollowerDelete', {
        data: data
      })
        .then((response) => {
          setFollowText(<Ionicons name="person-add" size={15} color="green" />)
          getUserData(user_Id);
        }).catch(function (error) {
          console.log(error);
        });
    } else {
      // Alert.alert('팔로우 걸기 axios가 나와야 함')
      axios.post(config.ip + ':5000/usersRouter/userFollowing', {
        data: data
      })
      axios.post(config.ip + ':5000/usersRouter/userFollower', {
        data: data
      })
        .then((response) => {
          setFollowText(<Ionicons name="person-remove" size={15} color="red" />)
          getUserData(user_Id);
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  const ProfileActionView = () => {
    //접속자가 나인지만 검사
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setCurrentId(UserInfo[0].user_id);
          }
        }
        )

    }
    catch (e) {
      console.log(e);
    }

    return (
      <View>{
        (currentId == user_Id)
          ?
          (<MyPageActionView />)
          :
          (<OtherPageActionView />)
      }
      </View>
    )
  }

  const MyPageActionView = () => {
    return (
      // <Text>정보 수정</Text>
      <Box></Box>
    )
  }



  const OtherPageActionView = () => {
    //만약에 팔로우가 되어있다면 팔로우 해제 버튼과 디엠 보내기만 보여주고,
    //팔로우가 되어있지 않다면 팔로우만 보여준다.
    return (
      <Button mt="3" mr="3" onPress={() => follow()} colorScheme="yellow" style={styles.followButton}>
        <Text>{followText}</Text>
      </Button>
    )
  }


  const ProfileHeader = () => {
    return (
      <View style={styles.header}>
        <BackButton navigation={props.navigation} />
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={{ uri: profileImg }} />
          <Text style={styles.name}>{user_Id}</Text>
          <ProfileActionView />
          <HStack alignItems="center" my="1">
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={
                  () => props.navigation.navigate('Profile', {
                    screen: 'FollowList',
                    params: {
                      screen: 'Follower',
                      user_id: user_Id,
                      // init_page: 'Follower',
                    }
                  })
                }
              >
                <Text style={styles.followText}>팔로워</Text>
                <Text style={styles.followText}>{userFollowerNum}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={
                  () => props.navigation.navigate('Profile', {
                    screen: 'FollowList',
                    params: {
                      screen: 'Following',
                      user_id: user_Id,
                      // init_page: 'Following',
                    }
                  })
                }
              >
                <Text style={styles.followText}>팔로잉</Text>
                <Text style={styles.followText}>{userFollowingNum}</Text>
              </TouchableOpacity>
            </View>
          </HStack>
        </View>
      </View>
    )
  }

  return (
    <>
      <ProfileHeader />
      <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} type={'profile'} items={items} setItems={setItems} />
    </>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    width: 50,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    //backgroundColor: 'blue'
  },
  header: {
    // 헤더  색상
    backgroundColor: "#336600",
  },
  headerContent: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    position: 'absolute',
    top: 10, left: 20
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    padding: 30,
    backgroundColor: "#E6E6FA",
    marginBottom: 20
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  username: {
    color: "#20B2AA",
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  },
  followText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  followButton: {
    position: 'absolute',
    left: "25%"
  }
});