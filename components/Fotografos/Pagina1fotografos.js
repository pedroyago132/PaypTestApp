import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';

export default function Pagina1fotografos({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, borderBottomWidth: 2, backgroundColor: '#0320E1', borderColor: 'white', alignItems: "center", justifyContent: 'center' }}>
        <Text onPress={() => navigation.navigate('PaginaLogin')} style={{ padding: 20, backgroundColor: 'white', borderEndWidth: 2, borderColor: 'black', fontWeight: 'bold', color: 'black', borderRadius: 60 }} > Sou Fotografo </Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: '#0320E1' }}>
        <Text style={{ padding: 20, backgroundColor: 'white', borderEndWidth: 2, borderColor: 'black', fontWeight: 'bold', color: 'black', borderRadius: 60 }} > Ache um Fotografo </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
