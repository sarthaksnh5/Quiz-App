import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextArea from '../../component/TextArea';
import Dropdown from '../../component/Dropdown';
import Button from '../../component/Button';
import {primaryColor} from '../../constants/colors';
import {font_Bold} from '../../constants/fonts';
import {getAsyncData} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {StoreUser, url} from '../../constants/constants';

const AddQuestion = ({setShowSnack, setContent, goBack}) => {
  const [question, setQuestion] = useState('');
  const options = [
    {label: 'Yes', value: '1'},
    {label: 'No', value: '0'},
  ];
  const subjectsOption = [
    {label: 'Science', value: 'Science'},
    {label: 'General Knowledge', value: 'General'},
    {label: 'Mathematics', value: 'Mathematics'},
    {label: 'English', value: 'English'},
  ];
  const [subjects, setSubjects] = useState('Science');
  const [anonymous, setAnonymous] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const setSingleQuestion = async () => {
    if (question.length > 0) {
      setIsLoading(true);
      try {
        const {token, email} = JSON.parse(await getAsyncData(StoreUser));
        const hitURL = `${url}forum/question/set`;
        const headers = {
          Authorization: `TOKEN ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        const data = {
          user: email,
          question: question.trim(),
          subject: subjects,
          anonymous,
        };

        const resp = await fetch(hitURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: headers,
        });

        if (resp.status == 201) {
          setContent('Question Submitted');
          setShowSnack(true);
          setTimeout(() => {
            goBack();
          }, 2000);
        } else {
          setContent('Server Error! Please try again later!');
          setShowSnack(true);
        }
      } catch (e) {
        setContent('Network Error');
        setShowSnack(true);
        console.log(e);
      }
      setIsLoading(false);
    } else {
      setContent('Please fill all fields');
      setShowSnack(true);
    }
  };

  return (
    <ScrollView style={{width: '90%'}} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add a Question</Text>
      <TextArea
        label={'Question'}
        value={question}
        onChangeText={setQuestion}
        icon="account"
      />
      <Text>Anonymous</Text>
      <Dropdown inputs={options} value={anonymous} setValue={setAnonymous} />
      <Text>Subject</Text>
      <Dropdown
        inputs={subjectsOption}
        value={subjects}
        setValue={setSubjects}
      />
      <Button
        text={'Submit'}
        isLoading={isLoading}
        onPress={setSingleQuestion}
      />
    </ScrollView>
  );
};

export default AddQuestion;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    padding: 10,
  },
  heading: {
    color: primaryColor,
    fontFamily: font_Bold,
    alignSelf: 'center',
    fontSize: 18,
  },
});
