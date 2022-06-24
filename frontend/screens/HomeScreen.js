import { View, Text, StyleSheet, StatusBar, ImageBackground, Alert } from 'react-native';
import { Button, Input } from '@rneui/base';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   backgroundImg: {
      height: '100%',
      width: '100%'
   },
   textInput: {
      color: '#fff',
      height: 50,
      backgroundColor: '#555',
      opacity: 0.7,
      padding: 5,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5
   }
});

function HomeScreen(props) {
   const [pseudo, setPseudo] = useState('');
   const [alreadyLogin, setAlreadyLogin] = useState(false);
   const mounted = useIsFocused();


   useEffect(() => {
      AsyncStorage.getItem('user').then(user => {
         if (user) {
            setPseudo(JSON.parse(user).pseudo);
            setAlreadyLogin(true);
            props.setUser(JSON.parse(user));
         } else {
            setAlreadyLogin(false);
         }
      }).catch((err) => {
         console.log(err);
      });

      return () => {
         
      }
   }, [] );

   async function buttonHandlePress() {
      if (pseudo.length > 1 && mounted) {
         // mettre en localstorage le user
         await AsyncStorage.setItem('user', JSON.stringify({ pseudo }));
         props.setUser({ pseudo });
         props.navigation.navigate('Login');
      } else {
         Alert.alert('Error.','Please enter username.');
      }
   }

   if (!alreadyLogin) {
   return (
      <ImageBackground source={require('../assets/home.jpg')} style={styles.backgroundImg} >
         <View style={styles.container}>
            <Input placeholder={'Enter username...'} inputStyle={styles.textInput} value={pseudo} onChangeText={(value) => setPseudo(value)} />
            <Button onPress={() => buttonHandlePress()} title={' Next '} icon={<Ionicons name="enter" size={24} color={"white"} />} iconRight />

            <StatusBar style="auto" />
         </View>
      </ImageBackground>
   );
   } else {
      return (
         <ImageBackground source={require('../assets/home.jpg')} style={styles.backgroundImg} >
            <View style={styles.container}>
               <Text style={{ fontSize: 20, marginBottom:'5%', backgroundColor: '#eee', padding: 5, borderRadius:5 }} >Welcome, {pseudo}</Text>
               <Button onPress={() => props.navigation.navigate('Login')} title={' Next '} icon={<Ionicons name="enter" size={24} color={"white"} />} iconRight />
            
            <StatusBar style="auto" />
            </View>
         </ImageBackground>
      )
   }
}

function mapStateToProps(state) {
   return {
      user: state.user
   }
}
function mapDispatchToProps(dispatch) {
   return {
      setUser: (user) => dispatch({ type: 'SET_USER', user })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);