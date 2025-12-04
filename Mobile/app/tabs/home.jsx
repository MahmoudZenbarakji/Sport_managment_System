import React from "react";
import { ScrollView, View, Text, StatusBar, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ImageSlider from "../../Components/ImageSlider";
import NavBar from "../../Components/NavBar";
import GymSection from "../../Components/Gymsection";
import SportsCategory from "../../Components/SportsCategory";
import CoachesSection from "../../Components/CoachesSection";

export default function Home() {
  const router = useRouter();

  const handlePressSport = (sport) => {
    console.log("eeee");
    
    router.push(`/categories/${sport.id}`);
  };

  return (
    <View style={styles.container}>
      {/* ensure status bar also matches dark background */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sliderWrapper}>
          <ImageSlider />
        </View>

        <View style={styles.categoriesWrapper}>
          <SportsCategory onPressSport={handlePressSport} />
          <GymSection />
          <CoachesSection />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 8,
  },
  scrollContent: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  sliderWrapper: {
    paddingHorizontal: 16,
    backgroundColor: "#000",
    marginBottom: 8,
  },
  categoriesWrapper: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
});
