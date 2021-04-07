import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 



import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';




const EditProfileScreen = () => {
    const [image, setImage] = useState('https://scontent-kut2-2.xx.fbcdn.net/v/t1.0-9/40988449_1834038813349729_5605873670737100800_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFXc29QDG1UCiW0g0ql-x7cUTd7g8kgIDZRN3uDySAgNqaVxBym65UMo13hRetcLL-Y6Iuw3bgyhj-Q-fj4BbeN&_nc_ohc=DkALHlu9BFQAX97Pm65&_nc_ht=scontent-kut2-2.xx&oh=2a4e55406a5129d00bffd7eb2b67dc89&oe=607EA50B');
      
        const pickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setImage(result.uri)
            this.bs.current.snapTo(1);
          }
        };

        const Camera = async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              
            });
        
            console.log(result);
        
            if (!result.cancelled) {
              setImage(result.uri)
              this.bs.current.snapTo(1);
            }
        //its granted.
    
 
          };
      
       
     
   
    
    renderInner = () => (
          
        <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>อัพโหลดรูปภาพ</Text>
        <Text style={styles.panelSubtitle}>เลือกรูปประจำตัว</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage} >
        <Text style={styles.panelButtonTitle}>เลือกรูปจากคลัง</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>ยกเลิก</Text>
      </TouchableOpacity>
    </View>
      );
    
      renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );

    bs = React.createRef();
    fall = new Animated.Value(1)
    return(
    <View style={styles.container}>
         <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
        
        <View style={{margin: 20}}>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                    uri: image,
                  }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                    <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
            </TouchableOpacity>
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}> ช่าง มาร์ช </Text>


            <View style={styles.action}>
            <FontAwesome name="user-o"  size={20} />

          <TextInput
            placeholder="ชื่อ"
            placeholderTextColor="#666666"
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
            <FontAwesome name="user-o"  size={20} />

          <TextInput
            placeholder="นามสกุล"
            placeholderTextColor="#666666"
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
            <FontAwesome name="phone"  size={20} />

          <TextInput
            placeholder="โทรศัพท์"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
        <Entypo name="shop" size={24} size={20} />

          <TextInput
            placeholder="ชื่อร้าน"
            placeholderTextColor="#666666"
            style={styles.textInput}
          />
        </View>
        
        
            </View>
            <View style={styles.action}>
          <Icon name="map-marker-outline" size={20} />
          <TextInput
            placeholder="ที่อยู่"
            placeholderTextColor="#666666"
            autoCorrect={false}
           
          />
        </View>
            <TouchableOpacity style={styles.commandButton} onPress={() => {"Profile"}}>
          <Text style={styles.panelButtonTitle}>บันทึก</Text>
        </TouchableOpacity>
        </View>
    </View>

    );
}
export default EditProfileScreen;

  
 


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });
  