import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';
import {greyColor, primaryColor, textColor} from '../../constants/colors';
import Button from '../../component/Button';
import {LineChart} from 'react-native-chart-kit';

const ResultDetails = ({onPress, data, correct, incorrect, skip}) => {
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <View style={styles.container}>
      <View style={styles.chartDiv}>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
                color: (opacity = 1) => `rgba(106, 90, 223, ${opacity})`,
                strokeWidth: 3,
              },
            ],
          }}
          width={Dimensions.get('window').width - 80} // from react-native
          height={100}
          chartConfig={{
            backgroundColor: primaryColor,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(106, 90, 223, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(106, 90, 223, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
              stroke: primaryColor,
            },
            propsForHorizontalLabels: {
              fontFamily: font_Bold,
            },
          }}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.answerDiv}>
        <View style={styles.answer}>
          <Text style={styles.key}>Correct Answer</Text>
          <Text style={styles.value}>{correct} Questions</Text>
        </View>
        <View style={styles.answer}>
          <Text style={styles.key}>Completion</Text>
          <Text style={styles.value}>{correct * 10} %</Text>
        </View>
      </View>
      <View style={styles.answerDiv}>
        <View style={styles.answer}>
          <Text style={styles.key}>Skipped</Text>
          <Text style={styles.value}>{skip} Questions</Text>
        </View>
        <View style={styles.answer}>
          <Text style={styles.key}>Incorrect Answer</Text>
          <Text style={styles.value}>{incorrect}</Text>
        </View>
      </View>
      <View style={styles.navigationDiv}>
        {/* <Button text={'check answer'} mode={'outlined'} /> */}
        <Button text={'Done'} onPress={onPress} />
      </View>
    </View>
  );
};

export default ResultDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  chartDiv: {
    width: '100%',
    marginBottom: 10,
  },
  answerDiv: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  answer: {
    width: '50%',
    padding: 10,
    alignItems: 'flex-start',
  },
  key: {
    fontFamily: font_Bold,
    color: greyColor,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: font_Bold,
    color: textColor,
    fontSize: 18,
    marginTop: 10,
  },
  navigationDiv: {
    width: '100%',
  },
});
