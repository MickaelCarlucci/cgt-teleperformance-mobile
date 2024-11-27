import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { fetchWithToken } from "../../utils/fetchWithToken"; // Adaptez cette méthode pour React Native
import { API_URL } from "@env";
import {s} from "./Contact.style"
import Loader from "../../components/Loader/Loader" // Adaptez votre composant Loader pour React Native

export default function Page() {
  const { user, loading } = useSelector((state) => state.auth);
  const [centers, setCenters] = useState([]);
  const [filteredElected, setFilteredElected] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");



  const fetchData = async (url, setter, errorMsg) => {
    try {
      const response = await fetchWithToken(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      setError(errorMsg);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(
        `${API_URL}/api/admin/elected`,
        setFilteredElected,
        "Erreur lors de la récupération des utilisateurs"
      );
      fetchData(
        `${API_URL}/api/admin/roles`,
        setRolesData,
        "Erreur lors de la récupération des rôles"
      );
      fetchData(
        `${API_URL}/api/admin/centers`,
        setCenters,
        "Erreur lors de la récupération des centres"
      );
    }
  }, [user]);

  const listElectedByCenter = async (centerId) => {
    setSelectedCenter(centerId);
    fetchData(
      `${API_URL}/api/admin/elected/${centerId}`,
      setFilteredElected,
      "Erreur lors de la récupération des utilisateurs par centre."
    );
  };

  const listElectedByRole = async (roleId) => {
    setSelectedRole(roleId);
    fetchData(
      `${API_URL}/api/admin/electedRole/${roleId}`,
      setFilteredElected,
      "Erreur lors de la récupération des utilisateurs par rôle."
    );
  };

  const resetFilters = async () => {
    setSelectedCenter(null);
    setSelectedRole(null);
    fetchData(
      `${API_URL}/api/admin/elected`,
      setFilteredElected,
      "Erreur lors de la récupération des utilisateurs."
    );
  };

  if (loading) return <Loader />;

  return (
    <View style={s.container}>
        <>
          <Text style={s.title}>Liste des élus CGT</Text>
          <TouchableOpacity style={s.button} onPress={resetFilters}>
            <Text style={s.buttonText}>Tous vos élu(e)s</Text>
          </TouchableOpacity>
          {error ? <Text style={s.error}>{error}</Text> : null}
          <Text style={s.subtitle}>Filtres:</Text>
          <View style={s.filters}>
            <FlatList
              data={centers.filter((center) => center.id !== 14 && center.id !== 15)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.filterButton}
                  onPress={() => listElectedByCenter(item.id)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <FlatList
              data={rolesData.filter((role) => [4, 5, 6, 7].includes(role.id))}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.filterButton}
                  onPress={() => listElectedByRole(item.id)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <FlatList
            data={filteredElected}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={s.electedCard}>
                <Text style={s.electedName}>
                  {item.lastname} {item.firstname}
                </Text>
                {item.phone && (
                  <Text>Numéro de téléphone: {item.phone}</Text>
                )}
                <Text>Adresse mail: {item.mail}</Text>
                <Text>Mandat(s): {item.roles}</Text>
                <Text>Centre: {item.center_name}</Text>
              </View>
            )}
          />
        </>

    </View>
  );
}