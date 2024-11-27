import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { API_URL } from "@env";
import { useSelector } from "react-redux";
import { fetchWithToken } from "../../utils/fetchWithToken";
import Loader from "../../components/Loader/Loader";
import OptionPoll from "../../components/OptionPoll/OptionPoll";
import PollResults from "../../components/ResultPoll/ResultPoll";
import {s} from "./Polls.style"

export default function Polls() {
  const { user, loading } = useSelector((state) => state.auth);
  const userId = user?.id;

  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voteStatuses, setVoteStatuses] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const checkUserVote = useCallback(
    async (pollId) => {
      try {
        const response = await fetch(
          `${API_URL}/api/poll/${pollId}/vote-status/${userId}`
        );
        if (!response.ok)
          throw new Error("Erreur lors de la vérification du vote");
        const data = await response.json();

        setVoteStatuses((prev) => ({
          ...prev,
          [pollId]: data || { voted: false, optionId: null },
        }));
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du vote utilisateur:",
          error
        );
        setErrorMessage("Erreur lors de la vérification du vote.");
      }
    },
    [userId]
  );

  useEffect(() => {
    async function fetchPolls() {
      try {
        const response = await fetch(
          `${API_URL}/api/poll/latest`
        );
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des sondages");
        const data = await response.json();
        setPolls(data);

        if (data.length > 0) {
          setSelectedPoll(data[0].id);
        }

        if (userId) {
          data.forEach((poll) => {
            if (!voteStatuses[poll.id]) {
              checkUserVote(poll.id);
            }
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des sondages:", error);
        setErrorMessage("Erreur lors de la récupération des sondages.");
      }
    }

    if (user && userId) {
      fetchPolls();
    }
  }, [userId, checkUserVote, user, voteStatuses]);

  const handleVote = async (pollId, optionId) => {
    try {
      const response = await fetchWithToken(
        `${API_URL}/api/poll/vote/${pollId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ optionId }),
        }
      );
      if (!response.ok) throw new Error("Erreur lors du vote");
      const data = await response.json();

      setVoteStatuses((prev) => ({
        ...prev,
        [pollId]: { voted: true, optionId: data.optionId },
      }));
    } catch (error) {
      setErrorMessage(
        "Une erreur est survenue lors du vote. Veuillez réessayer."
      );
      console.error("Erreur lors du vote:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={s.container}>
        <>
          <Text style={s.title}>Derniers Sondages</Text>
          {errorMessage && <Text style={s.error}>{errorMessage}</Text>}
          <FlatList
            data={polls}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: poll }) => (
              <View style={s.pollContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedPoll(poll.id === selectedPoll ? null : poll.id)
                  }
                >
                  <Text style={s.pollQuestion}>{poll.question}</Text>
                </TouchableOpacity>

                {selectedPoll === poll.id &&
                  voteStatuses[poll.id]?.voted === false && (
                    <OptionPoll pollId={poll.id} onVote={handleVote} />
                  )}

                {selectedPoll === poll.id &&
                  voteStatuses[poll.id]?.voted === true && (
                    <PollResults
                      pollId={poll.id}
                      optionId={voteStatuses[poll.id].optionId}
                    />
                  )}
              </View>
            )}
          />
        </>
    </View>
  );
}