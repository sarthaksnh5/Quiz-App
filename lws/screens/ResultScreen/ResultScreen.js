import React, {useState} from 'react';
import GoodHeader from './GoodHeader';
import Background from '../../component/Background';
import ResultPercent from './ResultPercent';
import ResultDetails from './ResultDetails';
import {useFocusEffect} from '@react-navigation/native';
import FullScreenLoading from '../../component/FullScreenLoading';

const ResultScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [skip, setSkip] = useState(0);
  const [uanswers, setUanswers] = useState([]);

  const getData = () => {
    try {
      const {answers, ucorrect, uincorrect, uskip} = route.params;

      setUanswers(answers);
      setCorrect(ucorrect);
      setIncorrect(uincorrect);
      setSkip(uskip);
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {
        setIsLoading(true);
      };
    }, []),
  );

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Background>
      <GoodHeader />
      <ResultPercent percentage={correct / 10} />
      <ResultDetails
        data={uanswers}
        correct={correct}
        incorrect={incorrect}
        skip={skip}
        onPress={() => {
          navigation.replace('Tab');
        }}
      />
    </Background>
  );
};

export default ResultScreen;
