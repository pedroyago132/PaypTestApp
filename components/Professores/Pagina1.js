import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';


// You can import from local files



export default function Pagina1({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/PLAY.png')} style={{ flex: 1, borderBottomWidth: 2, backgroundColor: '#0320E1', borderColor: 'white', alignItems: "center", justifyContent: 'center' }}>
        <Text onPress={() => navigation.navigate('PaginaLogin')} style={{ padding: 20, backgroundColor: 'white', borderEndWidth: 2, borderColor: 'black', fontWeight: 'bold', color: 'black', borderRadius: 60 }} > Sou Professor </Text>
      </ImageBackground>

      <ImageBackground source={require('../../assets/aulas.png')} style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: '#0320E1' }}>
        <Text onPress={() => navigation.navigate('ProfessoresList')} style={{ padding: 20, backgroundColor: 'white', borderEndWidth: 2, borderColor: 'black', fontWeight: 'bold', color: 'black', borderRadius: 60 }} > Ache um Professor </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
