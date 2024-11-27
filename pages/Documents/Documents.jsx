import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader"; 
import * as Linking from "expo-linking";
import {s} from "./Documents.style";
import { API_URL } from "@env";

export default function Documents() {
  const [pdfs, setPdfs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [cseDocuments, setCseDocuments] = useState([]);
  const [RPDocuments, setRPDocuments] = useState([]);
  const [CSSCTDocuments, setCSSCTDocuments] = useState([]);
  const [utilsDocuments, setUtilsDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const { user, loading } = useSelector((state) => state.auth);


  useEffect(() => {
    if (user) {
      const fetchAllDocuments = async () => {
        try {
          const [pdfRes, docRes, cseRes, rpRes, cssctRes, utilsRes] =
            await Promise.all([
              fetch(`${API_URL}/api/pdf/views/1`),
              fetch(`${API_URL}/api/pdf/views/2`),
              fetch(`${API_URL}/api/pdf/views/3`),
              fetch(`${API_URL}/api/pdf/views/4`),
              fetch(`${API_URL}/api/pdf/views/5`),
              fetch(`${API_URL}/api/pdf/views/10`),
            ]);

          const [pdfData, docData, cseData, rpData, cssctData, utilsData] =
            await Promise.all([
              pdfRes.json(),
              docRes.json(),
              cseRes.json(),
              rpRes.json(),
              cssctRes.json(),
              utilsRes.json(),
            ]);

          setPdfs(pdfData);
          setDocuments(docData);
          setCseDocuments(cseData);
          setRPDocuments(rpData);
          setCSSCTDocuments(cssctData);
          setUtilsDocuments(utilsData);
          setError(null);
        } catch (err) {
          setError("Erreur lors de la récupération des documents");
          console.error("Erreur lors de la récupération des documents:", err);
        }
      };

      fetchAllDocuments();
    }
  }, [user]);

  const toggleSection = (sectionName) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  const openDocument = (url) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      Alert.alert("Erreur", "Impossible d'ouvrir le document");
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={s.container}>
        <>
          <Text style={s.title}>Documents relatifs à l&apos;entreprise</Text>
          <Text style={s.subtitle}>
            (Cliquez sur le document de votre choix pour le télécharger)
          </Text>
          {error && <Text style={s.error}>Erreur : {error}</Text>}

          <Section
            title="Documents utiles"
            documents={utilsDocuments}
            activeSection={activeSection}
            toggleSection={toggleSection}
            sectionName="utils"
            openDocument={openDocument}
          />

          <Section
            title="Liste des accords d&apos;entreprise"
            documents={pdfs}
            activeSection={activeSection}
            toggleSection={toggleSection}
            sectionName="accords"
            openDocument={openDocument}
          />

          <Section
            title="Liste des tracts"
            documents={documents}
            activeSection={activeSection}
            toggleSection={toggleSection}
            sectionName="tracts"
            openDocument={openDocument}
          />

          <Section
            title="Documents relatifs au Comité Social et Economique"
            documents={cseDocuments}
            activeSection={activeSection}
            toggleSection={toggleSection}
            sectionName="cse"
            openDocument={openDocument}
          />

          <Section
            title="Documents relatifs aux Représentants de Proximité"
            documents={RPDocuments}
            activeSection={activeSection}
            toggleSection={toggleSection}
            sectionName="rp"
            openDocument={openDocument}
          />

          <Section
            title="Documents relatifs à la Commission Santé, Sécurité et Conditions de Travail"
            documents={CSSCTDocuments}
            activeSection={activeSection}
            toggleSection={toggleSection}
            sectionName="cssct"
            openDocument={openDocument}
          />
        </>
    </View>
  );
}

const Section = ({
  title,
  documents,
  activeSection,
  toggleSection,
  sectionName,
  openDocument,
}) => (
  <View style={s.section}>
    <TouchableOpacity onPress={() => toggleSection(sectionName)}>
      <Text style={s.sectionTitle}>
        {title} {activeSection === sectionName ? "▲" : "▼"}
      </Text>
    </TouchableOpacity>
    {activeSection === sectionName && (
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.documentItem}
            onPress={() =>
              openDocument(
                `${API_URL}/api/pdf/download/${item.pdf_url
                  .split("/")
                  .pop()}`
              )
            }
          >
            <Text style={s.documentText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
);