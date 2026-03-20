import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar} >
        <Image style={styles.image} source={{uri:"https://portugues.ucg.org/sites/default/files/public/styles/fp_widescreen_768x432/public/image/article/2019/09/23/como-sera-o-paraiso-na-terra.jpg.webp?h=34e43602&itok=mnRuMOgp"}}/>
      </View>
      <Text style={styles.name}>Ashish kapoor</Text>
      <Text style={styles.email}>Kapoorashish714@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f2c6a0",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    color: "#777",
    marginTop: 4,
  },
  image:{
    width:"100%",
    height:"100%",
    borderRadius:100
  }
});