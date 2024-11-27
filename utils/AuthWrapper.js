import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../pages/Home/Home";
import { Contact } from "../pages/Contact/Contact";
import { Signin } from "../pages/Signin/Signin";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { setUser, clearUser, setLoading } from "./authSlice";
import { firebaseAuth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { API_URL } from "@env";
import Loader from "../components/Loader/Loader";
import News from "../pages/News/News";
import Polls from "../pages/Polls/Polls";
import Documents from "../pages/Documents/Documents";

const Stack = createStackNavigator();

function AuthWrapper() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      dispatch(setLoading(true));

      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const token = await firebaseUser.getIdToken();
              const response = await fetch(
                `${API_URL}/api/users/verify-token`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ token }),
                }
              );
              const data = await response.json();

              if (!response.ok) throw new Error(data.error);

              dispatch(setUser(data.user));
            } catch (error) {
              console.error("Erreur de validation du token :", error);
              dispatch(clearUser());
            }
          } else {
            dispatch(clearUser());
          }
        }
      );

      return () => unsubscribe(); // Nettoyer l'abonnement Firebase Auth
    };

    initializeAuth();
  }, [dispatch]);

  const withMainLayout = (Component) => () => (
    <MainLayout>
      <Component />
    </MainLayout>
  );

  if (loading) return <Loader />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!user ? (
      <Stack.Screen name="Signin" component={Signin} />
    ) : (
      <>
        <Stack.Screen name="Home" component={withMainLayout(Home)} />
        <Stack.Screen name="News" component={withMainLayout(News)} />
        <Stack.Screen name="Polls" component={withMainLayout(Polls)} />
        <Stack.Screen name="Documents" component={withMainLayout(Documents)} />
        <Stack.Screen name="Contact" component={withMainLayout(Contact)} />
      </>
    )}
  </Stack.Navigator>
  );
}

export default React.memo(AuthWrapper);
