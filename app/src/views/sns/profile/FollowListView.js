import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, Modal, Pressable, ImageBackground, FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from 'axios'
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Center } from 'native-base';

const following = [
  { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username: "gidal1" },
  { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar2.png", username: "gidal2" },
  { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", username: "gidal3" },
  { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar4.png", username: "gidal4" },
  { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar1.png", username: "gidal5" },
  { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username: "gidal6" },
]
const followers = [
  { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username: "gidal2" },
  { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar2.png", username: "gidal3" },
  { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", username: "gidal4" },
  { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar4.png", username: "gidal5" },
  { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar1.png", username: "gidal6" },
  { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username: "gidal7" },
]

export default function FollowListView(props) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [user_Id, setUserId] = React.useState('');
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [data, setData] = useState(followings)

  React.useEffect(() => {
    // getData();
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo.user_id);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    axios.post(config.ip + ':5000/usersRouter/findOne/', {
      data: {
        user_id: user_Id,
      }
    })
      .then((response) => {
        console.log(response.data);
        setFollowings(response.data.following);
        setFollowers(response.data.follower);
      }).catch(function (error) {
        console.log(error);
      });
  }, [user_Id]);


  useEffect(() => {
    setFilteredDataSource(followings);
    setMasterDataSource(followings);
  }, [followings, followers]);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const Followings = (props) => {
    return <View style={styles.container} >
      {/* <FeedSearchView/> */}
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilter(text)}
        onClear={(text) => searchFilter('')}
        placeholder="search Here..."
        value={search}
      />
      <View style={styles.body} >
        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={filteredDataSource}
          keyExtractor={(item) => {
            return item.user_id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => props.navigation.navigate('DmRead', {
                userName: item.name
              })} >
                <View style={styles.box} >
                  <Image style={styles.image} source={{ uri: item.img }} />
                  <Text style={styles.username}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    </View>
  }

  //     const [following, setFollowing] = useState();
  //     const [profileImg, setProfileImg] = useState();
  //     const [date, setSelectedDate] = React.useState(props.selectedDate);    

  //     const callback = (data) => {
  //       setFollowing(data.following);
  //       setProfileImg(data.profile_image)
  //     }

  //     useEffect(()=>{
  //       axios.get(config.ip+':5000/usersRouter/findOne/',{
  //         params: {
  //           user_id: config.user[0].user_id,
  //         }
  //       })
  //     .then((response) => {
  //       callback(response.data);
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  //   },[])
  return (
    <View style={styles.container} >
      <Button onPress={() => {setFilteredDataSource(followings); setMasterDataSource(followings);}}>following</Button>
      <Button onPress={() => {setFilteredDataSource(followers); setMasterDataSource(followers);}}>follower</Button>
      <Followings navigation={props.navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0abde3",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 10,
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
  flatListStyle: {
    // backgroundColor: '#fff',
    margin: 20,
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
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: 'white'
  }
});