import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { API_URL } from "@env";
import { useSelector } from "react-redux";
import { fetchWithToken } from "../../utils/fetchWithToken"; 
import { s } from "./News.style"
import Loader from "../../components/Loader/Loader"; 

// Fonction pour convertir le contenu Draft.js brut en HTML (React Native affiche le texte brut ici)
const convertRawContentToText = (rawContent) => {
  try {
    const contentState = convertFromRaw(rawContent);
    return contentState.getPlainText();
  } catch {
    return "Erreur dans le contenu";
  }
};

const NewsList = ({
  items,
  selectedNewsId,
  setSelectedNewsId,
  title,
}) => {
  return (
    <View style={s.newsListContainer}>
      <Text style={s.newsListTitle}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={s.newsItem}>
            <TouchableOpacity
              onPress={() =>
                setSelectedNewsId(item.id === selectedNewsId ? null : item.id)
              }
            >
              <Text style={s.newsTitle}>{item.title}</Text>
            </TouchableOpacity>

            {selectedNewsId === item.id && (
              <View style={s.newsContent}>
                <Text>{convertRawContentToText(JSON.parse(item.contain))}</Text>
                {item.image_url && (
                  <Image
                    source={{
                      uri: `${API_URL}${item.image_url}`,
                    }}
                    style={s.newsImage}
                  />
                )}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default function News() {
  const { user, loading } = useSelector((state) => state.auth);
  const userId = user?.id;

  const [news, setNews] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [didYouKnow, setDidYouKnow] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    async function fetchData(apiPath, setData) {
      try {
        const response = await fetchWithToken(
          `${API_URL}/api/information/${apiPath}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setErrorMessage("Erreur lors de la récupération des informations.");
      }
    }

    if (user && userId) {
      fetchData("latestNews", setNews);
      fetchData("latestDidYouKnow", setDidYouKnow);
    }
  }, [user, userId]);


  if (loading) return <Loader />;

  return (
    <View style={s.container}>
        <>
          {errorMessage && <Text style={s.error}>{errorMessage}</Text>}
          <View style={s.splitContainer}>
            <NewsList
              items={news}
              roles={roles}
              handleDelete={handleDelete}
              selectedNewsId={selectedNewsId}
              setSelectedNewsId={setSelectedNewsId}
              title="Dernières news"
              type="news"
            />
            <NewsList
              items={didYouKnow}
              roles={roles}
              handleDelete={handleDelete}
              selectedNewsId={selectedNewsId}
              setSelectedNewsId={setSelectedNewsId}
              title="Le saviez-vous ?"
              type="didYouKnow"
            />
          </View>
        </>

    </View>
  );
}