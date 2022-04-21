import { View, Text ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { Divider } from 'react-native-elements'


export const bottomTabIcons  =[
  {
    name: 'Home',
    active:'https://img.icons8.com/material/344/home--v5.png',
    inactive:'https://img.icons8.com/material-outlined/344/home--v2.png',
  },

  {
    name: 'Search',
    active:'https://img.icons8.com/material-outlined/344/search--v1.png',
    inactive:'https://img.icons8.com/material/344/search--v1.png',
  },

  {
    name:'reels',
    active:'https://img.icons8.com/fluency/344/cinema-.png',
    inactive:'https://img.icons8.com/material-outlined/344/cinema-.png',

  },

  {
    name:'profile',
    active:'https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg',
    inactive:'https://img.icons8.com/ios/344/user-male-circle.png',
  }


]

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home')


  const Icon = ({ icon }) => (
     
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image source={{uri: activeTab == icon.name ? icon.active : icon.inactive}} style={styles.Tabicon} 
   
   // We can give custom css to only one any specific icon writing below code 
   //   style={[
   //     styles.icon,
   //   icon.name == 'profile' ? styles.profilePic : null, ]}   

      />   
    </TouchableOpacity>
    
  )

  return (
    <View style={styles.wrappper}>  
    <Divider width={2}  orientation='vertical' />
    <View style={styles.Tabcontainer}>
      {icons.map((icon, index) => (
        <Icon key={index} icon={icon} />
      ))}
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
 wrappper:{
     position:'absolute',
     width:'100%',
     bottom:'20%',
     zIndex:999,

 },

  Tabicon: {
    width: 40,
    height: 40,
  
    
  },
  Tabcontainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'yellow',
    padding:10,
  },

})

export default BottomTabs;