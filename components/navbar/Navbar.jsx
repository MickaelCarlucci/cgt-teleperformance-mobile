import { View, TouchableOpacity  } from "react-native";
import {s} from "./Navbar.style";

export default function Navbar() {
  return (
    <>
      <View style={s.navView}>
        <TouchableOpacity style={s.navButton}> </TouchableOpacity>
      </View>
    </>
  )
}
