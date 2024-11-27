import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
} from "react-native";
import { API_URL } from "@env";
import {styles} from "./ResultPoll.style"

const PollResult = ({ pollId }) => {
  const [results, setResults] = useState([]);
  const [animatedValues, setAnimatedValues] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch(
          `${API_URL}/api/poll/${pollId}/options`
        );
        const data = await response.json();
        setResults(data);

        // Initialiser les animations pour chaque résultat
        const initialAnimatedValues = data.map(() => new Animated.Value(0));
        setAnimatedValues(initialAnimatedValues);

        // Démarrer les animations après la récupération des résultats
        Animated.stagger(100, initialAnimatedValues.map((val, index) =>
          Animated.timing(val, {
            toValue: data[index].vote,
            duration: 1000,
            useNativeDriver: false,
          })
        )).start();
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des résultats du sondage:",
          error
        );
      }
    }

    fetchResults();
  }, [pollId]);

  const totalVotes = results.reduce((acc, result) => acc + result.vote, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats du sondage</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const percentage =
            totalVotes > 0 ? (item.vote / totalVotes) * 100 : 0;

          return (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>
                {item.option}: {item.vote} vote
                {item.vote > 1 ? "s" : ""} ({percentage.toFixed(2)}%)
              </Text>
              <View style={styles.barContainer}>
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      width: animatedValues[index]?.interpolate({
                        inputRange: [0, totalVotes],
                        outputRange: ["0%", `${percentage}%`],
                      }),
                    },
                  ]}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PollResult;