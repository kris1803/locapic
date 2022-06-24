import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { ListItem } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


function PoiScreen(props) {
   const [pois, setPois] = useState([]);

   useEffect(() => {
      setPois(props.pois);
   }, [props.pois])

   return (
      <SafeAreaView style={{flex:1}}>
         <ScrollView style={{ flex:1 }} >
            {pois.map((poi, i) => (
               <ListItem key={i} bottomDivider style={styles.listItem}>
                  <View style={styles.listItem}>
                     <ListItem.Title style={{ textAlign: 'center' }}>{poi.title}</ListItem.Title>
                     <Text>{poi.description}</Text>
                     <Text style={{ fontSize: 11 }}>
                        Latitude: {poi.latitude}
                     </Text>
                     <Text style={{ fontSize: 11 }}>
                        Longitude: {poi.longitude}
                     </Text>
                  </View>
               </ListItem>
            ))}
         </ScrollView>
         <StatusBar style="auto" />
      </SafeAreaView>
   );
}

let styles = StyleSheet.create({
   listItem: { 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%' 
   }
});

function mapStateToProps(state) {
   return {
      user: state.user,
      pois: state.pois
   }
}
export default connect(mapStateToProps, null)(PoiScreen);