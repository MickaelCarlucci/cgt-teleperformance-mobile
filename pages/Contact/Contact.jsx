import React from "react";
import { View, Text, ScrollView } from "react-native";
import {s} from "./Contact.style"


export const Contact = () => {
  const [centers, setCenters] = useState([]);
  const [filteredElected, setFilteredElected] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");
  
  return (
    <View style={s.container}>
      <Text style={s.text}>Bienvenue sur la page Profile</Text>
    </View>
  );
};