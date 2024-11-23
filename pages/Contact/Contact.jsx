import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import {s} from "./Contact.style"


export const Contact = () => {
  const [centers, setCenters] = useState([]);
  const [filteredElected, setFilteredElected] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  
  return (
   user ? (
    <View style={s.container}>
      <Text style={s.text}>Bienvenue sur la page Profile</Text>
    </View>
   ) : (
    <View>
    <Text> 
      Vous devez vous connecter</Text>
      </View>
   )
  );
};