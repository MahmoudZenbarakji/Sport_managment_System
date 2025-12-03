import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { ENDPOINTS, API_BASE, createBooking } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${API_BASE}${imagePath}`;
};

// Time slots (you can customize these)
const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00"
];

// Format date to YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date for display
const formatDateDisplay = (dateString) => {
  if (!dateString) return "Select Date";
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function GymDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [stadium, setStadium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const res = await axios.get(`${ENDPOINTS.Stadium}/${id}`);
        setStadium(res.data);
      } catch (err) {
        console.log("Error fetching stadium:", err);
        Alert.alert("Error", "Failed to load stadium details");
      } finally {
        setLoading(false);
      }
    };
    fetchStadium();
  }, [id]);

  const handleBookStadium = async () => {
    if (!user) {
      Alert.alert("Login Required", "Please login to book a stadium");
      router.push("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      Alert.alert("Missing Information", "Please select both date and time");
      return;
    }

    setBookingLoading(true);
    try {
      const dateString = formatDate(selectedDate);
      await createBooking(stadium._id, dateString, selectedTime);
      // Close booking modal first
      setBookingModalVisible(false);
      // Show success modal
      setShowSuccessModal(true);
      // Reset form
      setSelectedDate(new Date());
      setSelectedTime("");
    } catch (error) {
      Alert.alert(
        "Booking Failed",
        error.response?.data?.message || "Failed to create booking. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const onDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E9622b" />
        <Text style={styles.loadingText}>Loading stadium details...</Text>
      </View>
    );
  }

  if (!stadium) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#E9622b" />
        <Text style={styles.errorText}>Stadium not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        {stadium.Image && (
          <Image
            source={{ uri: getImageUrl(stadium.Image) }}
            style={styles.stadiumImage}
          />
        )}
        <View style={styles.imageOverlay} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{stadium.name}</Text>
          {stadium.category && (
            <View style={styles.categoryBadge}>
              <Ionicons name="football" size={16} color="#E9622b" />
              <Text style={styles.categoryText}>
                {stadium.category.name || "N/A"}
              </Text>
            </View>
          )}
        </View>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price per hour</Text>
            <Text style={styles.price}>${stadium.Price}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{stadium.description}</Text>
        </View>

        {/* Owner Section */}
        {stadium.owner && (
          <View style={styles.section}>
            <View style={styles.infoRow}>
              <Ionicons name="person-circle-outline" size={20} color="#E9622b" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Owner</Text>
                <Text style={styles.infoValue}>
                  {stadium.owner.name || stadium.owner.email}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Book Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => {
            if (!user) {
              Alert.alert("Login Required", "Please login to book a stadium");
              router.push("/login");
            } else {
              setBookingModalVisible(true);
            }
          }}
        >
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Text style={styles.bookButtonText}>Book This Stadium</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <Modal
        visible={bookingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBookingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Stadium</Text>
              <TouchableOpacity
                onPress={() => {
                  setBookingModalVisible(false);
                  setSelectedDate(new Date());
                  setSelectedTime("");
                }}
              >
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>{stadium.name}</Text>

            {/* Date Picker Section */}
            <View style={styles.pickerSection}>
              <View style={styles.labelContainer}>
                <Ionicons name="calendar-outline" size={18} color="#E9622b" />
                <Text style={styles.label}>Select Date</Text>
              </View>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar" size={20} color="#E9622b" />
                <Text style={styles.datePickerText}>
                  {formatDateDisplay(formatDate(selectedDate))}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Time Selection Section */}
            <View style={styles.pickerSection}>
              <View style={styles.labelContainer}>
                <Ionicons name="time-outline" size={18} color="#E9622b" />
                <Text style={styles.label}>Select Time</Text>
              </View>
              <ScrollView 
                style={styles.timeSlotsContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.timeSlotsGrid}>
                  {TIME_SLOTS.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        selectedTime === time && styles.timeSlotSelected
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text
                        style={[
                          styles.timeSlotText,
                          selectedTime === time && styles.timeSlotTextSelected
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Summary */}
            {selectedDate && selectedTime && (
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Booking Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Date:</Text>
                  <Text style={styles.summaryValue}>
                    {formatDateDisplay(formatDate(selectedDate))}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Time:</Text>
                  <Text style={styles.summaryValue}>{selectedTime}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total:</Text>
                  <Text style={styles.summaryTotal}>${stadium.Price}</Text>
                </View>
              </View>
            )}

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setBookingModalVisible(false);
                  setSelectedDate(new Date());
                  setSelectedTime("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  (!selectedDate || !selectedTime) && styles.confirmButtonDisabled
                ]}
                onPress={handleBookStadium}
                disabled={bookingLoading || !selectedDate || !selectedTime}
              >
                {bookingLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          minimumDate={new Date()}
          style={Platform.OS === 'ios' ? styles.datePickerIOS : {}}
        />
      )}
      {Platform.OS === 'ios' && showDatePicker && (
        <View style={styles.iosPickerContainer}>
          <TouchableOpacity
            style={styles.iosPickerButton}
            onPress={() => setShowDatePicker(false)}
          >
            <Text style={styles.iosPickerButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
            </View>
            <Text style={styles.successTitle}>Booking is done</Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  stadiumImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  headerSection: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(233, 98, 43, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 14,
    color: "#E9622b",
    marginLeft: 6,
    fontWeight: "600",
  },
  priceSection: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: "#999",
  },
  price: {
    fontSize: 32,
    color: "#E9622b",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  bookButton: {
    backgroundColor: "#E9622b",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
    shadowColor: "#E9622b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#111",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#E9622b",
    marginBottom: 24,
  },
  pickerSection: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
  datePickerButton: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePickerText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  timeSlotsContainer: {
    maxHeight: 200,
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeSlot: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: "30%",
    alignItems: "center",
    marginBottom: 8,
  },
  timeSlotSelected: {
    backgroundColor: "#E9622b",
  },
  timeSlotText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  timeSlotTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  summaryBox: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#999",
  },
  summaryValue: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  summaryTotal: {
    fontSize: 18,
    color: "#E9622b",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#333",
  },
  confirmButton: {
    backgroundColor: "#E9622b",
  },
  confirmButtonDisabled: {
    backgroundColor: "#666",
    opacity: 0.5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  datePickerIOS: {
    backgroundColor: "#111",
    height: 200,
  },
  iosPickerContainer: {
    backgroundColor: "#111",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  iosPickerButton: {
    backgroundColor: "#E9622b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  iosPickerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Success Modal styles
  successModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  successModalContent: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "80%",
    maxWidth: 400,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 24,
  },
  successButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  successButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
