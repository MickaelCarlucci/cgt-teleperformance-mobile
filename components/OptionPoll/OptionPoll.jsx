import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { API_URL } from "@env";
import {styles} from "./OptionPoll.style"

const OptionPoll = ({ pollId, onVote }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch(
          `${API_URL}/api/poll/${pollId}/options`
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des options:", error);
      }
    }

    fetchOptions();
  }, [pollId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options de vote</Text>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => onVote(pollId, item.id)}
          >
            <Text style={styles.optionText}>{item.option}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OptionPoll;