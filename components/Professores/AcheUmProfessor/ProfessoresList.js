import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Image, FlatList, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import base64 from 'react-native-base64';



export default function ProfessoresList({ navigation }) {

  const [initializing, setInitializing] = useState(true);
  const [estabelecimento, setEstabelecimento] = useState();
  const [listProfessores, setListProfessores] = useState();

  function onAuthStateChanged(user) {

    if (user) {
      database()
        .ref('estabelecimento')
        .on('value', snapshot => {

          var li = [];

          snapshot.forEach((child) => {

            li.push({
              key: child._snapshot.key,
              nome: child.val().nome,
              cidade: child.val().cidade,
              tipoDeMembro: child.val().tipoDeMembro,
              emailEstabelecimento: child.val().email,
              fotoPerfil: child.val().fotoPerfil,
              endereco: child.val().endereco,
              horarios: child.val().horarios,
              valorDisponivel: child.val().valorDisponivel
            });
            setEstabelecimento(li)

          })
        })

    }

    if (initializing) setInitializing(false);
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [console.log(estabelecimento)]);

  const renderItem = ({ item }) => (

    <TouchableOpacity key={item.key} onPress={() => navigation.navigate('PaginaDoProfessor', { dataEstabelecimento: item })} style={{ height: 300, marginTop: 20, width: '100%', borderTopWidth: 1, borderColor: 'grey', backgroundColor: "black" }} >

      <ImageBackground style={{ flex: 1 }} source={{ uri: item.fotoPerfil }} >
        <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.8, alignItems: "center", justifyContent: 'center' }}>
          <Image style={{ height: 100, width: 100, borderWidth: 2, borderColor: 'white', borderRadius: 60 }} source={{ uri: item.fotoPerfil }} />
          <Text style={{ color: 'white', marginTop: 25, fontSize: 18, fontWeight: 'bold' }} >{item.nome}</Text>
          <Text style={{ color: 'white', marginTop: 5 }} > {item.endereco} {item.endereco} </Text>
          <Text style={{ color: 'white', marginTop: 5 }} >Cidade: {item.cidade}</Text>
        </View>

      </ImageBackground>


    </TouchableOpacity>
  )

  /*
  const filtro = () => {


    let filtroo = estabelecimento.filter(item => {
      return item.tipoDeMembro === 'Professor'
    }
    )

    return filtroo.map(item =>
      <TouchableOpacity key={item.key} onPress={() => navigation.navigate('PaginaDoProfessor', { dataEstabelecimento: item })} style={{ height: 300, width: '100%', backgroundColor: "black" }} >

        <ImageBackground style={{ flex: 1 }} source={{ uri: item.fotoPerfil }} >
          <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.9, alignItems: "center", justifyContent: 'center' }}>
            <Image style={{ height: 115, width: 115, borderWidth: 2, borderColor: 'white', borderRadius: 60 }} source={{ uri: item.fotoPerfil }} />
            <Text style={{ color: 'white', marginTop: 25, fontSize: 18, fontWeight: 'bold' }} >{item.nome}</Text>
            <Text style={{ color: 'white', marginTop: 5 }} >Modalidade: {item.esporteOuModalidade} </Text>
            <Text style={{ color: 'white', marginTop: 5 }} >Cidade: {item.cidade}</Text>
          </View>
        </ImageBackground>


      </TouchableOpacity>

    )

  }
  */

  if (!estabelecimento) return <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color='purple' style={{ height: 120, width: 120 }} />
  </View>

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{ padding: 8, fontSize: 20, color: 'grey' }} >Mais agilidade para cuidar</Text>
        <Text style={{ padding: 5, fontSize: 25, color: 'purple', fontWeight: 'bold' }} >da sua estética </Text>
      </View>

      <View style={{ flex: 5, backgroundColor: 'black' }}>
        <TextInput placeholder='Pesquisar estabelecimento na nossa rede....' placeholderTextColor={'white'} style={{ padding: 5, fontSize: 14, marginTop: 10, color: 'white', fontWeight: '220' }} />

        <FlatList
          data={estabelecimento}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
