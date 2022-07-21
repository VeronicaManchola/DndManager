import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, FAB, Icon, Text } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import { CharactersContext } from '../contexts/characters.context';
import { useEffect } from 'react';

const SummaryPage = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { characters, getData } = useContext(CharactersContext);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView style={{ marginBottom: 15 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text style={styles.title}>D&D Character Manager</Text>
        </View>
        {Object.keys(characters).length > 0 ? (
          Object.keys(characters).map(id => (
            <TouchableOpacity
              key={`${id}Card`}
              onPress={() => {
                navigation.navigate('Home', {
                  screen: 'Character',
                  title: 'Edit Character',
                  params: { action: 'edit', values: characters[id], id: id },
                });
              }}>
              <Card>
                <View>
                  <Card.Title>
                    <View style={styles.textIcon}>
                      <Icon name="user" type="feather" style={styles.iconPosition} />
                      <Text>{characters[id].name}</Text>
                    </View>
                  </Card.Title>
                  <Card.Divider />
                  <View style={styles.textIcon}>
                    <Icon name="tag" type="feather" style={styles.iconPosition} />
                    <Text>{characters[id].race}</Text>
                  </View>
                  <View style={styles.textIcon}>
                    <Icon name="star" type="feather" style={styles.iconPosition} />
                    <Text>{characters[id].class}</Text>
                  </View>
                  <View style={styles.textIcon}>
                    <Icon name="chevrons-up" type="feather" style={styles.iconPosition} />
                    <Text>{characters[id].level}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <></>
        )}
      </ScrollView>
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
            screen: 'Character',
            action: 'create',
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
  textIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconPosition: {
    paddingRight: 5,
  },
});

export default SummaryPage;
