import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../utils/authSlice";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { s } from "./Signin.style";

export function Signin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { user, error, loading } = useSelector((state) => state.auth); // Ajout du loading
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigation.navigate("Home"); // Rediriger l'utilisateur après connexion
    } else if (error) {
      Alert.alert("Erreur", error); // Affichage d'une alerte en cas d'erreur
    }
  }, [user, error]); // Supprimé `router`

  const handleLogin = async () => {
    if (!mail || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    dispatch(loginUser(mail, password))
    .unwrap()
    .then(() => {
      navigation.replace("Home"); // Redirection après connexion réussie
    })
    .catch(() => {
      Alert.alert("Erreur", "Connexion échouée.");
    });;
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Connexion</Text>

      <TextInput
        style={s.input}
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={s.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity style={s.button} onPress={handleLogin}>
          <Text style={s.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Mot de passe oublié",
            "Redirigez l'utilisateur ici."
          )
        }
      >
        <Text style={s.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
}
