import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


export default function PaginaDoProfessor({ route, navigation }) {
  const dataEstabelecimento = route.params.dataEstabelecimento

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [infoProfessor, setInfoProfessor] = useState();
  const [userR, setUserR] = useState();
  const [urlImage, setUrlImage] = useState();

  function onAuthStateChanged(user) {

    if (user) {

      database()
        .ref(`membros/${base64.encode(user.email)}`)
        .on('value', snapshot => {
          setUser(snapshot.val()) /* <<<<<<<<<< Esse setUser puxa dados salvo no banco de dodos */
        });

    }
    if (initializing) setInitializing(false);
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {

  }, [console.log(dataEstabelecimento)]);


  if (!dataEstabelecimento) return null

  return (

    <View style={styles.container}>
      <ScrollView  >
        <ImageBackground blurRadius={1} source={{ uri: dataEstabelecimento.fotoPerfil }} style={{ width: '100%', height: 400 }}>

          <View style={{ height: 80, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', opacity: 0.8, borderTopWidth: 2, borderColor: 'white', borderBottomWidth: 2 }} >


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} > {dataEstabelecimento.nome} </Text>
            </View>


          </View>

          <View style={{ height: 400, width: '100%', backgroundColor: "black", alignItems: "center", opacity: 0.8 }}>


            <Text style={{ fontWeight: '300', color: 'white', marginTop: 40, fontSize: 15, padding: 5 }} >{dataEstabelecimento.cidade} </Text>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, padding: 5 }} >Endereço:</Text>
            <Text style={{ color: 'white', fontSize: 15, padding: 5 }} > - {dataEstabelecimento.endereco}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('ReservarHorario', { dataEstabelecimento })} style={{
              height: 60, marginTop: 20, padding: 5, borderColor: 'black',
              borderWidth: 1, borderRadius: 80, width: '70%', backgroundColor: 'white',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }} > Agendar horário </ Text>
            </TouchableOpacity>

          </View>

        </ImageBackground>
        <ImageBackground source={require('../../../assets/descriçao.jpg')} style={{ borderTopWidth: 2, borderColor: 'white', width: '100%', height: 300 }}>
          <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.8, alignItems: "center", justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 30 }}>Aqui você encontra:</Text>


            <View style={{ flex: 5, justifyContent: "center", alignItems: 'center' }} >
              <Text style={{ color: 'white', padding: 5, marginTop: 10 }} >-{dataEstabelecimento.historia} </Text>
            </View>
          </View>

        </ImageBackground>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'black', padding: 5, fontSize: 22 }}>Depoimentos </Text>
        </View>
      </ScrollView>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'E0E0E0',


  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
