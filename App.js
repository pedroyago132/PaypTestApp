
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



import Menu from './components/Menu.js';

import HomeProfessor from './components/Professores/HomeProfessor/HomeProfessor.js';
import FinanceiroProfessor from './components/Professores/HomeProfessor/FinanceiroProfessor.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Configurar from './components/Professores/HomeProfessor/Configurar';
import ProfessoresList from './components/Professores/AcheUmProfessor/ProfessoresList';
import PaginadoProfessor from './components/Professores/AcheUmProfessor/PaginaDoProfessor'
import EntrarTurma from './components/Professores/AcheUmProfessor/EntrarTurma.js';
import TurmaDoDia from './components/Professores/HomeProfessor/TurmaDoDia.js';
import CriarTurma from './components/Professores/HomeProfessor/CriarTurma.js';
import TurmaSelecionada from './components/Professores/HomeProfessor/TurmaSelecionada.js';
import HorariosDiponiveis from './components/Professores/AcheUmProfessor/HorariosDisponiveis.js';
import PaginaAluno from './components/PaginaAluno.js';
import JogosLista from './components/EcontreJogos/JogosLista.js';
import AdicionarComentario from './components/Professores/HomeProfessor/AdicionarComentario.js';
import AlterarNivel from './components/Professores/HomeProfessor/AlterarNivel.js';
import MembroNovo from './components/Cadastro/MembroNovo.js';
import TelaDePassagem from './components/TelaDePassagem.js';
import Login from './components/Login.js';
import Menutabnaviation from './components/TabNavigation.js';
import TabNavigationuser from './components/TabNavigationUser.js';
import EncontreDupla from './components/Dupla/EncontreDupla.js';
import TurmasAluno from './components/Aluno/Turmas.js';
import InfoAlunoTurma from './components/Aluno/InfoAlunoTurma.js';
import EditarPagina from './components/Professores/HomeProfessor/EditarPagina.js';
import ConfirmarEdiçao from './components/Professores/HomeProfessor/ConfirmarEdiçao.js';
import MinhaTurma from './components/Aluno/MinhaTurma.js';
import PerfilOuContaBancaria from './components/Professores/HomeProfessor/PerfilOuContaBancaria.js';
import ExcluirTurma from './components/Professores/HomeProfessor/ExcluirTurma.js';
import Comprovantes from './components/Comprovantes/Comprovantes';
import Relatorios from './components/Professores/HomeProfessor/Relatorios.js';
import RelatorioDoMes from './components/Professores/HomeProfessor/RelatorioDoMes.js';
import ReservarHorario from './components/Professores/AcheUmProfessor/ReservarHorario';
import AdicionarItemServ from './components/Professores/HomeProfessor/AdicionarItemServ.js';
import Funcionario from './components/Professores/HomeProfessor/Funcionario.js';
import VerificarItens from './components/Professores/AcheUmProfessor/VerificarItens.js';
import VerificarFuncionarios from './components/Professores/AcheUmProfessor/VerificarFuncionarios.js';
import ConfirmarHorario from './components/Professores/AcheUmProfessor/ConfirmarHorario.js';
import AdicionarItem from './components/Professores/HomeProfessor/adicionarItem.js';
import AdicionarFuncionario from './components/Professores/HomeProfessor/AdicionarFuncionario.js';
import ConfigurarHorario from './components/Professores/HomeProfessor/configurarHorario.js';
import AdicionarHorario from './components/Professores/HomeProfessor/AdicionarHorario.js';
import ConfirmarPagamento from './components/Professores/HomeProfessor/ConfirmarPagamento.js';
import infoServiço from './components/Professores/HomeProfessor/infoServiço.js';
import ExcluirServiço from './components/Professores/HomeProfessor/excluirServiço.js';
import ExcluirFuncionario from './components/Professores/HomeProfessor/ExcluirFuncionario.js';
import infoFuncionario from './components/Professores/HomeProfessor/informaçõesFunconario.js';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen({ navigation }) {
  return <Login navigation={navigation} />
}

// You can import from local files


const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="HomeProfessor" component={Menutabnaviation} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Financeiro" component={FinanceiroProfessor} />
        <Stack.Screen name="ProfessoresList" component={ProfessoresList} options={{ title: 'Nossa Rede' }} />
        <Stack.Screen name="PaginaDoProfessor" component={PaginadoProfessor} options={{ title: 'Parceiro PyBeeT', headerTintColor: "purple" }} />
        <Stack.Screen name="EntrarTurma" component={EntrarTurma} options={{ title: 'Assinar Plataforma' }} />
        <Stack.Screen name="TurmaDoDia" component={TurmaDoDia} />
        <Stack.Screen name="CriarTurma" component={CriarTurma} />
        <Stack.Screen name="TurmaSelecionada" component={TurmaSelecionada} />
        <Stack.Screen name="HorariosDisponiveis" component={HorariosDiponiveis}  />
        <Stack.Screen name="PaginaAluno" component={PaginaAluno} />
        <Stack.Screen name="JogosLista" component={JogosLista} />
        <Stack.Screen name="Comentario" component={AdicionarComentario} />
        <Stack.Screen name="AlterarNivel" component={AlterarNivel} />
        <Stack.Screen name="MembroNovo" component={MembroNovo} options={{ title: 'Membro Novo', headerTintColor: "#AC08A4", headerStyle: { backgroundColor: 'black' } }} />
        <Stack.Screen name="TelaDePassagem" component={TelaDePassagem} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="MenuTabnavigation" component={Menutabnaviation} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="MenuTabnavigationUser" component={TabNavigationuser} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="EncontreDupla" component={EncontreDupla} options={{ title: 'Encontre a sua dupla' }} />
        <Stack.Screen name="TurmasAluno" component={TurmasAluno} />
        <Stack.Screen name="infoAlunoTurma" component={InfoAlunoTurma} />
        <Stack.Screen name="EditarPagina" component={EditarPagina} options={{ title: 'Editar página' }} />
        <Stack.Screen name="ConfirmarEdiçao" component={ConfirmarEdiçao} />
        <Stack.Screen name="MinhaTurma" component={MinhaTurma} />
        <Stack.Screen name="PerfilOuContaBancaria" component={PerfilOuContaBancaria} />
        <Stack.Screen name="ExcluirTurma" component={ExcluirTurma} />
        <Stack.Screen name="Comprovantes" component={Comprovantes} options={{ title: 'Comprovantes' }} />
        <Stack.Screen name="Relatorios" component={Relatorios} options={{ title: 'Relatórios' }} />
        <Stack.Screen name="RelatorioDoMes" component={RelatorioDoMes} options={{ title: 'Relatório dop mês' }} />
        <Stack.Screen name="ReservarHorario" component={ReservarHorario} options={{ title: 'Reservar horário' }} />
        <Stack.Screen name="AdicionarItemServ" component={AdicionarItemServ} options={{ title: 'Adicionar serviço' }} />
        <Stack.Screen name="Funcionario" component={Funcionario} options={{ title: 'Funcionários' }} />
        <Stack.Screen name="VerificarItens" component={VerificarItens} options={{ title: 'Selecionar serviços' }} />
        <Stack.Screen name="VerificarFuncionarios" component={VerificarFuncionarios} options={{ title: 'Selecionar funcionário' }} />
        <Stack.Screen name="ConfirmarHorario" component={ConfirmarHorario} options={{ title: 'Confirmar horário' }} />
        <Stack.Screen name="AdicionarItem" component={AdicionarItem} options={{ title: 'Adicionar serviço' }} />
        <Stack.Screen name="AdicionarFuncionario" component={AdicionarFuncionario} options={{ title: 'Adicionar funcionário' }} />
        <Stack.Screen name="ConfigurarHorario" component={ConfigurarHorario} />
        <Stack.Screen name="AdicionarHorario" component={AdicionarHorario}  />
        <Stack.Screen name="ConfirmarPagamento" component={ConfirmarPagamento} options={{ title: 'Confirmar pagamento' }} />
        <Stack.Screen name="InfoServiço" component={infoServiço} options={{ title: 'Informações sobre o serviço' }} />
        <Stack.Screen name="ExcluirServiço" component={ExcluirServiço} options={{ title: 'Excluir serviço' }} />
        <Stack.Screen name="ExcluirFuncionario" component={ExcluirFuncionario} options={{ title: 'Excluir funcionário' }} />
        <Stack.Screen name="InformacaoFuncionario" component={infoFuncionario} options={{ title: 'Informações funcionário' }}  />







      </Stack.Navigator>

    </NavigationContainer>

  );
}

export default App;
