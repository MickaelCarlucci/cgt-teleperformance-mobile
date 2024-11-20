import React, { useEffect, useState } from "react";
import { API_URL } from "@env";
import {
  Animated,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import { s } from "./Home.style";

export function Home({ scrollY }) {
  const [documents, setDocuments] = useState([]); // Stocke les résultats de la requête
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupération des documents
    async function fetchDocuments() {
      try {
        const response = await fetch(`${API_URL}/api/information/news`);
        console.log("API_URL:", API_URL);
        const data = await response.json();
        console.log("Data received:", data);
        setDocuments(data);
        setError(null);
      } catch (error) {
        setError("Erreur lors de la récupération des documents");
        console.error(error);
      }
    }
    fetchDocuments();
  }, []);

  const parseContent = (content) => {
    if (typeof content === "string") {
      try {
        return JSON.parse(content);
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    }
    return content;
  };

  const renderDocument = ({ item: doc }) => {
    return (
      <View style={s.card} key={doc.id}>
        <Text style={s.title}>{doc.title}</Text>

        {doc.source === "information" ? (
          <View style={s.informationContainer}>
            {doc.contain ? (
              (() => {
                const parsedContent = parseContent(doc.contain);
                if (parsedContent && parsedContent.blocks) {
                  return (
                    <Text style={s.contentText}>
                      {/* Transformez le contenu brut en texte adapté */}
                      {convertRawContentToPlainText(parsedContent)}
                    </Text>
                  );
                } else {
                  return <Text>Le contenu n'est pas disponible ou mal formaté.</Text>;
                }
              })()
            ) : (
              <Text>Le contenu n'est pas disponible</Text>
            )}

            {doc.image_url && (
              <View style={s.imageWrapper}>
                <Image
                  source={{
                    uri: `${API_URL}${doc.image_url}`,
                  }}
                  style={s.image}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        ) : (
          <View>
            {doc.pdf_url ? (
              <>
                <View style={s.pdfContainer}>
                 <WebView
  source={{
    uri: `https://docs.google.com/gview?embedded=true&url=${API_URL}${doc.pdf_url}`,
  }}
  style={s.webView}
  onError={(error) =>
    console.error("Erreur lors du chargement du PDF :", error)
  }
/>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `${API_URL}/api/pdf/download/${doc.pdf_url.split("/").pop()}`
                    );
                  }}
                  style={s.downloadButton}
                >
                  <Text style={s.downloadButtonText}>Télécharger le PDF</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>PDF non disponible</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={s.container}>
      <Text style={s.header}>
        Bienvenue sur le site de la CGT Teleperformance France
      </Text>
      {error && <Text style={s.error}>{error}</Text>}

      <FlatList
        data={documents}
        renderItem={renderDocument}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={s.list}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={10}
      />
    </View>
  );
}
