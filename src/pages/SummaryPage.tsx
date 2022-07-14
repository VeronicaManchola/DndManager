import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Text } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';

const SummaryPage = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.title}>D&D Character Manager</Text>
      </View>
      <FAB
        icon={{
          name: 'pluscircle',
          type: 'antdesign',
          size: 15,
          color: 'white',
        }}
        color={colors.primary}
        title="Add"
        placement="right"
        onPress={() => {
          navigation.navigate('Home', {
            screen: 'Add New Character',
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
  },
  horizontalText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default SummaryPage;
