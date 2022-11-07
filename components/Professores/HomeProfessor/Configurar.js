import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';
import database from '@react-native-firebase/database';

export default function Configurar({ navigation }) {

  const [initializing, setInitializing] = useState(true);
  const [infoEstabelecimento, setInfoEstabelecimento] = useState();

  function onAuthStateChanged(user) {
    if (user) {
      database()
        .ref(`estabelecimento/${base64.encode(user.email)}`)
        .on('value', snapshot => {
          setInfoEstabelecimento(snapshot.val())
        });
    }

    if (initializing) setInitializing(false);
  }  /* carregar informações do professor no banco de dados */



  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function loggout() {
    setTimeout(() => {
      alert('Deslogado');
      navigation.navigate('Login');
    }, 500);

  }

  function sair() {
    auth()
      .signOut()
      .then(() => loggout())
      .catch(e => alert(e));
  }

  if (!infoEstabelecimento) return <View style={styles.container}>
    <Text>Não há conexão com a internet</Text>
  </View>

  return (
    <View style={styles.container}>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black' }} >{infoEstabelecimento.nome}</Text>

      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        <TouchableOpacity onPress={() => navigation.navigate('PerfilOuContaBancaria')} style={{ height: 60, width: '100%', backgroundColor: "white", borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Dados para depósito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ height: 60, width: '100%', backgroundColor: "white", marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Solicitações de saque</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditarPagina')} style={{ height: 60, marginTop: 5, width: '100%', backgroundColor: "white", borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Editar minha página</Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text onPress={() => sair()} style={{ marginTop: 30, padding: 20, backgroundColor: 'white', borderRadius: 60 }} > Sair </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
