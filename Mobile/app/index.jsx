import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import * as SplashScreenAPI from "expo-splash-screen";
import SplashScreen from "./components/SplashScreen";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Hide the native splash screen once our custom splash is ready
        await SplashScreenAPI.hideAsync();
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && !loading) {
      // Show custom splash for at least 2 seconds
      const timer = setTimeout(() => {
        if (user) {
          router.replace("/tabs");
        } else {
          router.replace("/login");
        }
      }, 2000); // Show splash for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [appIsReady, user, loading, router]);

  // Show custom splash screen immediately
  return <SplashScreen />;
}
