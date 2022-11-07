import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, ActivityIndicator, ImageBackground } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';
import storage from '@react-native-firebase/storage';


export default function HomeProfessor({ navigation }) {

  const [agendamentos, setAgendamentos] = useState();
  const screenWidth = Dimensions.get("window").width;
  const [user, setUser] = useState();
  const [urlImage, setUrlImage] = useState();

  const [nomeMes, setInfoNomeMes] = useState();
  const [estabelecimentoNome, setEstabelecimentoNome] = useState();
  const [mesValores, setInfoMesValores] = useState();
  const d = new Date;
  const month = d.getMonth() + 1;

  function renderNomeMes() {

    if (month == 1) {
      setInfoNomeMes('Janeiro')
    }

    if (month == 2) {
      setInfoNomeMes('Fevereiro')
    }

    if (month == 3) {
      setInfoNomeMes('Março')
    }

    if (month == 4) {
      setInfoNomeMes('Maio')
    }

    if (month == 5) {
      setInfoNomeMes('Abril')
    }

    if (month == 6) {
      setInfoNomeMes('Junho')
    }

    if (month == 7) {
      setInfoNomeMes('Julho')
    }

    if (month == 8) {
      setInfoNomeMes('Agosto')
    }

    if (month == 9) {
      setInfoNomeMes('Setembro')
    }

    if (month == 10) {
      setInfoNomeMes('Outubro')
    }

    if (month == 11) {
      setInfoNomeMes('Novembro')
    }

    if (month == 12) {
      setInfoNomeMes('Dezembro')
    }

  }

  useEffect(() => {
    renderNomeMes()
  }, [])

  function onAuthStateChanged(user) {
    if (user) {
      setUser(user)
      database()
        .ref(`estabelecimento/${base64.encode(user.email)}`)
        .on('value', snapshot => {
          setEstabelecimentoNome(snapshot.val().nome)
        });

    }
  }  /* carregar informações do professor no banco de dados */



  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [console.log(mesValores)]);



  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => navigation.navigate('Comprovantes', { infoComprovante: item, infoEstabelecimento })} key={item.key} style={{ marginTop: 7, borderTopWidth: 2, borderColor: 'white', backgroundColor: 'center' }}>
      <ImageBackground source={require('../../../assets/payment.png')} style={{ width: '100%', height: 200, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'black', flexDirection: 'row', opacity: 0.8 }}>


          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ padding: 2, fontSize: 17, color: 'white', fontWeight: 'bold' }} > <Text>Cliente:</Text>  {item.nomePagador}</Text>
            <Text style={{ padding: 2, fontSize: 17, color: "white", fontWeight: 'bold' }} >{item.nomeItem}</Text>
            <Text style={{ padding: 2, fontSize: 17, color: "#00FF6E", fontWeight: 'bold' }} >R$ {item.valorItemServ}</Text>
          </View>

          <View style={{ flex: 1, borderColor: 'white', alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: 'white', fontSize: 13 }} >Data do</Text>
            <Text style={{ color: 'white', fontSize: 13 }} >agendamento:</Text>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 6, fontWeight: 'bold' }} >{item.dia} de {item.mesNome}</Text>
            <Text style={{ color: 'white', fontSize: 14, marginTop: 7 }} >Profissional: <Text style={{ fontWeight: 'bold', color: "#FA35F1" }} >{item.nomeProfissional}</Text></Text>


          </View>
        </View>

      </ImageBackground>

    </TouchableOpacity>
  )

  const renderValores = () => {
    setTimeout(() => {

      const valorRepassadoDespesa = parseInt(mesValores.valorRepassadoMes) + parseInt(mesValores.despesas)
      const lucro = parseInt(mesValores.valorMovimentadoMes) - parseInt(valorRepassadoDespesa)
      return <View  >
        <Text style={{ color: 'white', fontSize: 17, padding: 7 }} >Valor Movimentado em {nomeMes}:</Text>
        <Text style={{ fontSize: 25, color: 'green', fontWeight: 'bold', padding: 7 }} >R$ {mesValores.valorMovimentadoMes},00</Text>

        <Text style={{ color: 'white', fontSize: 17, padding: 7 }} >Despesas :</Text>
        <Text style={{ fontSize: 25, color: 'red', fontWeight: 'bold', padding: 7 }} >R$ {mesValores.despesas},00</Text>

        <Text style={{ color: 'white', fontSize: 17, padding: 7 }} >Valor repassado aos funcionários:</Text>
        <Text style={{ fontSize: 25, color: 'grey', fontWeight: 'bold', padding: 7 }} >R$ {mesValores.valorRepassadoMes},00</Text>

        <Text style={{ color: 'white', fontSize: 17, padding: 7 }} >Total de Lucro:</Text>
        <Text style={{ fontSize: 25, color: '#37E196', fontWeight: 'bold', padding: 7 }} >R$ {lucro},00</Text>

      </View>

    }, 1000);

  }

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


  if (!estabelecimentoNome) return (<View style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'black' }}>
    <ActivityIndicator color='purple' style={{ height: 80, width: 80 }} />
  </View>)

  return (

    <View style={styles.container}>

      <View style={{ flex: 1, width: '100%', backgroundColor: "white", flexDirection: 'row' }} >

        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>

          <TouchableOpacity onPress={() => null}>
            <Text style={{ color: "black", fontSize: 16, fontWeight: '500', padding: 18 }} >{estabelecimentoNome}</Text>

          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ color: "purple", fontWeight: 'bold', fontSize: 25, padding: 18 }} >PyBeeT</Text>

        </View>
      </View>
      <View style={{ flex: 6, width: '100%', backgroundColor: '#0D002A' }}>




        <TouchableOpacity onPress={() => navigation.navigate('Relatorios')} style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground source={require('../../../assets/agenda.jpg')} style={{ height: '100%', width: '100%' }}>
            <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ color: 'white', fontWeight: 'bold', padding: 20, borderWidth: 2, borderColor: 'white' }}>Agendamentos</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AdicionarItemServ')} style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground source={require('../../../assets/servico.jpg')} style={{ height: '100%', width: '100%' }}>
            <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ color: 'white', fontWeight: 'bold', padding: 20, borderWidth: 2, borderColor: 'white' }}>Serviços</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Funcionario', { emailEstabelecimento: user.email })} style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground source={require('../../../assets/funcionarios.jpg')} style={{ height: '100%', width: '100%' }}>
            <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ color: 'white', fontWeight: 'bold', padding: 20, borderWidth: 2, borderColor: 'white' }}>Funcionários</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditarPagina')} style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground source={require('../../../assets/editarPerfil.jpg')} style={{ height: '100%', width: '100%' }}>
            <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ color: 'white', fontWeight: 'bold', padding: 20, borderWidth: 2, borderColor: 'white' }}>Informações Gerais</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => sair()} style={{ flex: 0.5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'purple' }}>

          <Text style={{ color: 'black', fontWeight: 'bold' }} > Deslogar </Text>
        </TouchableOpacity>




      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D002A",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
