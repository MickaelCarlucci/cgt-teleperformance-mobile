import { firebaseAuth } from "../../../firebaseConfig"; // Assurez-vous que Firebase est correctement configuré

export const fetchWithToken = async (url, options = {}) => {
  const currentUser = firebaseAuth.currentUser;

  if (!currentUser) {
    console.error("Aucun utilisateur connecté.");
    return null;
  }

  try {
    // Récupérer le token d'accès Firebase
    const idToken = await currentUser.getIdToken(true);

    // Ajouter le token dans l'en-tête Authorization
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${idToken}`,
    };

    // Effectuer la requête API avec le token
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      console.error("Erreur API:", response.status, response.statusText);
    }

    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération du token Firebase:", error);
    return null;
  }
};
