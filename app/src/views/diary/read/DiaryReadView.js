import { Box, Input, Text, TextArea, Stack, Button, HStack, Badge, Spacer, Avatar, Divider, ScrollView } from 'native-base';
import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { config } from '../../../../config'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient'

const DiaryReadView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);    
    const { width } = useWindowDimensions();
    // const item = props.navigation.getState().routes[1].params;
    const diary = props.navigation.getState().routes[1].params.diary;
    console.log(diary);
    // console.log(item.itemId);
    const deleteDiary = () => {
        console.log("l", diary._id);
        axios.post(config.ip + ':5000/diariesRouter/delete/', {
            data: {
                // id: item.itemId,
                id: diary._id,
            }
        }).then((response) => {
            props.navigation.pop();
        }).catch(function (error) {
            console.log(error);
        })
    }

    const source = {
        html: diary.content,
    };


    return (
        <ScrollView style={styles.scroll}>
            <LinearGradient style={styles.header} colors={['#A6A6A6', 'black']} />
            <View style={styles.background}>
                <View style={styles.container}>
                    <HStack alignItems="center">
                        <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그명(카테고리)
                        </Badge>
                        <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            {diary.disclosure}
                        </Badge>
                        <Spacer />
                        <Button size="md"  onPress={
                            () => props.navigation.replace('DiaryModify', {
                                diary : diary,
                            })
                        }>
                            수정
                        </Button>
                        <Button size="md" onPress={() => deleteDiary()} >
                            삭제
                        </Button>
                    </HStack>
                    <Text color="coolGray.800" mt="3" fontWeight="bold" fontSize="4xl">
                        {diary.title}
                    </Text>
                    <Text fontSize="sm" color="coolGray.700" my="1">
                        {diary.date}
                    </Text>
                    <TouchableOpacity onPress={
                            () => props.navigation.navigate('OtherUsersProfile', {
                                user_id: diary.user_id
                            })
                        }>
                    <HStack alignItems="center" my="1">
                        <Avatar bg="green.500" alignSelf="center" size="sm" source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}>
                            AJ
                        </Avatar>
                        <Text mx={2} fontSize="md" color="coolGray.700">
                            {diary.user_id}
                        </Text>
                        <Spacer />
                    </HStack>
                    </TouchableOpacity>
                    <Divider my="2" />
                    <RenderHtml
                        contentWidth={width}
                        source={source}
                    />
                    <Divider my="5"/>
                    <HStack alignItems="center">
                        <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그1
                        </Badge>
                        <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그2
                        </Badge>
                        <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그3
                        </Badge>
                    </HStack>
                </View>
            </View>
        </ScrollView>
    )
}

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container : {
        margin: 20,
    },
    background : {
        backgroundColor: "white",
        // flex:1,
        minHeight:windowHeight-49,
        // flex:1,
        // justifyContent: 'center',
    },
    header : {
        height:windowHeight*0.5,
        // backgroundColor: "black",
        // textAlign: "center",
        // justifyContent: 'center',
        // color: "white",
    },
    scroll : {
        flex:1.0,
    },
})

export default DiaryReadView;