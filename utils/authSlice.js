import { createSlice } from "@reduxjs/toolkit";
import { firebaseAuth } from "../utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { API_URL } from "@env";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

// Action asynchrone pour la connexion utilisateur
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);

    const response = await fetch(`${API_URL}/api/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    dispatch(setUser(data.user));
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    dispatch(setError("Erreur lors de la connexion"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Récupérer l'état utilisateur existant via Firebase
export const checkAuthState = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        const token = await getIdToken(currentUser);

        const response = await fetch(`${API_URL}/api/users/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        dispatch(setUser(data.user));
      } else {
        dispatch(clearUser());
      }
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'état utilisateur :",
      error
    );
    dispatch(setError("Erreur lors de la récupération de l'utilisateur"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Action asynchrone pour la déconnexion utilisateur
export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await signOut(firebaseAuth);
    dispatch(clearUser());
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    dispatch(setError("Erreur lors de la déconnexion"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
