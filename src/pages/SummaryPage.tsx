import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

const SummaryPage = () => {
  return (
    <View style={styles.container}>
      <Header leftComponent={<Icon name="menu" onPress={props => console.log(props)} />} />
      <ScrollView maximumZoomScale={1} minimumZoomScale={1}>
        <Text style={styles.title}>D&D Character Manager</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
});

export default SummaryPage;
