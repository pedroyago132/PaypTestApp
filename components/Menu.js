import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';

// You can import from local files

// or any pure javascript modules available in npm


export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate('JogosLista')} style={{ flex: 1, borderBottomWidth: 2, borderColor: 'white' }}>
        <ImageBackground style={{ flex: 1 }} source={require('../assets/encontrejogos.jpg')}>
          <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }} >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, padding: 20, borderWidth: 2, borderColor: 'white' }}> Jogos
            </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate('ProfessoresList')} style={{ flex: 1, borderBottomWidth: 2, borderColor: 'white' }}>
        <ImageBackground style={{ flex: 1 }} source={require('../assets/futvolei.jpg')}>
          <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }} >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, padding: 20, borderWidth: 2, borderColor: 'white' }}> Professores </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate('EncontreDupla')} style={{ flex: 1, borderBottomWidth: 2, borderColor: 'white' }}>
        <ImageBackground style={{ flex: 1 }} source={require('../assets/duplabeach.jpg')}>
          <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }} >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, padding: 20, borderWidth: 2, borderColor: 'white' }}> Duplas </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
