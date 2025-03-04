
import React, { useState } from "react";
import {View, TextInput, Text, TouchableOpacity} from 'react-native'
import styled from "styled-components";

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState("");

  const addData = () => {
    setValue(submitHandler(value));
  }

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <ComponentContainer>
    <InputContainer>
      <Input placeholder="할 일을 입력하세요" value={value} onChangeText={onChangeText} />
    </InputContainer>
    <SubmitButton onPress={() => addData()}>
      <Text>+</Text>
    </SubmitButton>
  </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  padding:10px;
  justify-content: center;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 8px;
  border: 1px;
  width: 320px;
  height: 50px;
  margin-bottom: 5px;
  border-color:gray;

`;

const Input = styled.TextInput`
  font-size: 15px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 5px;
  margin-left: 5px;
  border-radius: 8px;
  background-color:#27ae60;

`;