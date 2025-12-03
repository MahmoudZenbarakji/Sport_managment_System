// GymSectionGrid.jsx
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function GymSectionGrid() {
  const router = useRouter();

  const gyms = [
    {
      id: "g1",
      image: require("../assets/img/gym1.png"),
      name: "Power Gym Amsterdam",
      description: "Fully equipped, 24/7 access, includes sauna & shower.",
    },
    {
      id: "g2",
      image: require("../assets/img/gym2.png"),
      name: "StrongFit Rotterdam",
      description: "CrossFit, weightlifting platforms and group classes.",
    },
    {
      id: "g3",
      image: require("../assets/img/gym3.jpg"),
      name: "Healthy Life Utrecht",
      description: "Yoga, cardio machines and personal training sessions.",
    },
    {
      id: "g4",
      image: require("../assets/img/gym4.jpg"),
      name: "Shape Up Den Haag",
      description: "Cardio, weights and group fitness classes.",
    },
  ];

  const handlePress = (gymId) => {
    router.push(`/gyms/${gymId}`);
  };

  return (
    <SafeAreaProvider>
        <Text style={styles.headerText}>Gym </Text>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.grid}>
          {gyms.map((gym) => (
            <View style={styles.gridItem} key={gym.id}>
              <View style={styles.card}>
                <Image
                  source={gym.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{gym.name}</Text>
                  <Text style={styles.description}>{gym.description}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePress(gym.id)}
                  >
                    <Text style={styles.buttonText}>See Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 16 * 2 - 16) / 2;
// Accounting for page padding (16 each side) + gap between items

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000",
  },
    headerText: {
    color: "#E9622b",
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: ITEM_WIDTH,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 8,
    overflow: "hidden",
    // shadow / elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 140,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#E9622b",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
