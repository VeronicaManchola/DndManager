import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const characterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3)
    .trim()
    .matches(/^[a-z]+$/)
    .required('Name is required')
    .label('Name'),
  race: Yup.string()
    .min(3)
    .trim()
    .matches(/^[a-z]+$/)
    .required('Race is required')
    .label('Race'),
  class: Yup.string()
    .min(3)
    .trim()
    .matches(/^[a-z]+$/)
    .required('Class is required')
    .label('Class'),
  level: Yup.string().min(1).max(2).required('Level is required').label('Level'),
});

const AddCharacterPage = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <Card containerStyle={styles.cardContainer}>
        <Formik
          initialValues={{ name: '', race: '', class: '', level: undefined }}
          validationSchema={characterValidationSchema}
          onSubmit={(values, { setSubmitting }) => {}}>
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
            isSubmitting,
          }) => (
            <View>
              <Card.Title>
                <Input
                  placeholder="Character Name"
                  leftIcon={{ type: 'feather', name: 'user' }}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errorMessage={errors.name ? errors.name : ''}
                />
              </Card.Title>
              <Card.Divider />
              <Input
                inputContainerStyle={styles.input}
                placeholder="Race"
                leftIcon={{ type: 'feather', name: 'tag' }}
                onChangeText={handleChange('race')}
                onBlur={handleBlur('race')}
                value={values.race}
                errorMessage={errors.race ? errors.race : ''}
              />
              <Input
                inputContainerStyle={styles.input}
                placeholder="Class"
                leftIcon={{ type: 'feather', name: 'star' }}
                onChangeText={handleChange('class')}
                onBlur={handleBlur('class')}
                value={values.class}
                errorMessage={errors.class ? errors.class : ''}
              />
              <Input
                inputContainerStyle={styles.input}
                placeholder="Level"
                leftIcon={{ type: 'feather', name: 'chevrons-up' }}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={text => setFieldValue('level', text.replace(/[^0-9]/g, ''))}
                value={values.level}
                errorMessage={errors.level ? errors.level : ''}
              />
              <Button
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                title="Save"
              />
            </View>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: { width: '90%' },
  input: {
    height: 40,
    fontSize: 16,
  },
});

export default AddCharacterPage;
