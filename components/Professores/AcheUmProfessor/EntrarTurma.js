

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import config from '../../Config/index.json';
const PORT_SERVICE = require('react-native-dotenv')




export default function EntrarTurma({ route, navigation }) {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [paymentResult, setPaymentResult] = useState(null);
  const [mesData, setMesData] = useState();
  const [dataHorarioMes, setDataHorarioMes] = useState();


  const turma = route.params.dataTurma;
  const dataProfessor = route.params.dataProfessor;

  const k = 200
  const l = 200

  const q = 200

  let data = new Date().getDate();
  let mes = new Date().getMonth() + 1;
  let ano = new Date().getFullYear();
  let dataCompleta = new Date().toLocaleString();
  let date = new Date();

  useEffect(() => {
    if (user) {
      async function sendServer() {
        let response = await fetch(config.urlRoot, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            price: turma.valorAcobrar,
            nome: user.nome,
            email: user.email

          })
        });
        let json = await response.json();
        console.log(json)
      }
      sendServer();
    }

  }, [])

  useEffect(() => {

    if (mes == '1') {
      setMesData('Janeiro')
    }

    if (mes == '2') {
      setMesData('Fevereiro')
    }

    if (mes == '3') {
      setMesData('Março')
    }

    if (mes == '4') {
      setMesData('Abril')
    }

    if (mes == '5') {
      setMesData('Maio')
    }

    if (mes == '6') {
      setMesData('Junho')
    }

    if (mes == '7') {
      setMesData('Julho')
    }

    if (mes == '8') {
      setMesData('Agosto')
    }

    if (mes == '9') {
      setMesData('Setembro')
    }

    if (mes == '10') {
      setMesData('Outubro')
    }

    if (mes == '11') {
      setMesData('Novembro')
    }

    if (mes == '12') {
      setMesData('Dezembro')
    }
  }, [])

  useEffect(() => {
    if (user) {
      database().ref(`membros/${base64.encode(user.email)}/relatorioMeses/${mesData}`)
        .on('value', snapshot => {
          setDataHorarioMes(snapshot.val());
        });
    }

  }, [])


  function onAuthStateChanged(user) {
    if (user) {
      database().ref(`membros/${base64.encode(user.email)}`)
        .on('value', snapshot => {
          setUser(snapshot.val());
        });
      if (initializing) setInitializing(false);
    }

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [console.log(mesData)]);



  function pagamentoHorario() {

    database().ref(`membros/${base64.encode(user.email)}/horarios/`)
      .push({
        turmaID: turma.key, emailProfessor: turma.email,
        emailAluno: user.email, nomeProfessor: turma.nome,
        pagamento: 'aprovado', semana: turma.semana,
        mes: turma.mes, dia: turma.dia
      })

    database().ref(`membros/${base64.encode(turma.email)}`)
      .update({ valorDisponivel: k })

    database().ref(`membros/${base64.encode(turma.email)}/horarios/${turma.key}`)
      .update({
        turmaID: turma.key, emailProfessor: turma.email, disponivel: 'indisponivel',
        emailAluno: user.email, nomeProfessor: turma.nome, pagamento: 'aprovado', nomePagador: user.nome
      })

    database().ref(`membros/${base64.encode(user.email)}/relatorioMeses/${mesData}`)
      .update({ valorMes: l, quantidade: q })

    database().ref(`membros/${base64.encode(user.email)}/relatorioMeses/${mesData}`)
      .push({
        nomePagador: user.nome, dia, mes, semana
      })

    alert('Horario confirmado, cheque na aba "Horarios" no menu principal!')

  }


  return (

    <View style={styles.container}>
      <Text style={{ marginTop: '30%', fontSize: 20, fontWeight: 'bold' }}> Pronto para entrar pra turma jogador?</Text>
      <Text style={{ padding: 10 }}> Aqui você vai poder assinar seu pacote de aulas.</Text>
      <Text style={{ padding: 10, color: 'orange', fontWeight: 'bold' }}> Agora você pode pagar suas mensalidades de forma 100%
        automatica pelo cartão, sem se preucupar mais!</Text>

      <Text style={{ padding: 10 }}> Você pode cancelar a assinatura a hora que quiser.</Text>


      <TouchableOpacity onPress={() => pagamentoHorario()} style={{ marginTop: 50, width: '80%', borderWidth: 2, borderColor: 'green', height: 60, alignItems: 'center', justifyContent: 'center' }} >
        <Text style={{ color: 'green', fontWeight: 'bold' }} >Confirmar horario</Text>
      </TouchableOpacity>


    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'E0E0E0',
    justifyContent: 'center',
    alignItems: 'center'

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
