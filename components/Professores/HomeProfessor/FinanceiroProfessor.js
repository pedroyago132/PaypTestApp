import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';


export default function FinanceiroProfessor({ navigation }) {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    if (user) {
      database().ref(`membros/${base64.encode(user.email)}`)
        .on('value', (snapshot) => {
          setUser(snapshot.val())
        });
      if (initializing) setInitializing(false);
    }

  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [console.log(user)]);

  const DadosPix = () => {
    if (!user.chavePIX) {
      return <Text> Cadastre sua chave PIX para efetuar seu saque pela plataforma </Text>
    } else {
      return <View>
        <Text style={{}} >Sua chave PIX: {user.chavePIX} </Text>
        <Text style={{ marginBottom: 15 }} >Sua chave PIX: {user.selectedChavePix} </Text>
      </View>
    }
  }

  if (!user) return null

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-start', justifyContent: 'center', height: 75, width: '100%', backgroundColor: 'black', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, padding: 10, marginLeft: 9 }} >GoToPay</Text>
      </View>

      <DadosPix />


      <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>


        <View style={{ height: 80, width: '100%', flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'black' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15 }} >Quantiadade de pagamentos no mês :</Text>
          </View>


          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }} >{user.quantidade}</Text>
          </View>

        </View>

        <View style={{ height: 80, width: '100%', flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'black' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15 }} >Total em pagamentos no mês :</Text>
          </View>


          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'green', fontWeight: 'bold' }} >{user.valorMes}</Text>
          </View>

        </View>

        <View style={{ height: 90, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'black' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: 'row' }}>
            <Text style={{ color: 'grey', fontSize: 10 }}>Tarifa para saque (2%): </Text>
            <Text style={{ fontSize: 12, color: 'red' }}>R$ 96,00</Text>
          </View>


          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: "bold" }}>Disponivel para saque: </Text>
            <Text style={{ fontWeight: "bold", color: 'green', padding: 10, fontSize: 17 }}>R$ {user.valorDisponivel},00</Text>
          </View>
        </View>

        <TouchableOpacity style={{ height: 85, width: 270, borderWidth: 2, borderColor: 'white', alignItems: 'center', marginTop: 30, borderRadius: 40, justifyContent: 'center', backgroundColor: '#00FF91' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }} >Realizar saque</Text>
        </TouchableOpacity>


      </View>


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
