import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile, API_BASE } from "../api/api";
import { Ionicons } from "@expo/vector-icons";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_BASE}${imagePath}`;
};

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
      });
      if (user.profilePicture) {
        setImageUri(getImageUrl(user.profilePicture));
      }
    }
  }, [user]);

  const requestImagePermission = async () => {
    if (Platform.OS !== "web") {
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need access to your photos to update your profile picture."
        );
        return false;
      }
    }
    return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== "web") {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need access to your camera to take a photo."
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestImagePermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error("Image picker error:", error);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
      console.error("Camera error:", error);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Update Profile Picture",
      "Choose an option",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: takePhoto },
        { text: "Choose from Library", onPress: pickImage },
      ]
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!user || !user._id) {
      Alert.alert("Error", "User information not available");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Add text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add image if a new one was selected
      if (imageUri && imageUri.startsWith("file://")) {
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formDataToSend.append("profilePicture", {
          uri: imageUri,
          name: filename,
          type: type,
        });
      }

      const updatedUser = await updateUserProfile(user._id, formDataToSend);
      
      // Update user in context
      await updateUser(updatedUser);
      
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
      });
      if (user.profilePicture) {
        setImageUri(getImageUrl(user.profilePicture));
      } else {
        setImageUri(null);
      }
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  if (!user) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E9622b" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          {!isEditing && (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            >
              <Ionicons name="pencil" size={20} color="#E9622b" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Picture Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {isEditing ? (
              <TouchableOpacity
                onPress={showImageOptions}
                activeOpacity={0.8}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={50} color="#666" />
                    <View style={styles.editOverlay}>
                      <Ionicons name="camera" size={30} color="#fff" />
                      <Text style={styles.editOverlayText}>Tap to add photo</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={50} color="#666" />
                  </View>
                )}
              </>
            )}
            {isEditing && imageUri && (
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={showImageOptions}
              >
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          {/* Email - Read Only */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.readOnlyValue}>{user.email}</Text>
          </View>

          {/* Role - Read Only */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.readOnlyValue}>
              {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
            </Text>
          </View>

          {/* Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                placeholder="Enter your name"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{user.name || "Not provided"}</Text>
            )}
          </View>

          {/* Bio */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bio</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.bio}
                onChangeText={(value) => handleInputChange("bio", value)}
                placeholder="Tell us about yourself"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.value}>{user.bio || "Not provided"}</Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(value) => handleInputChange("phoneNumber", value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>
                {user.phoneNumber || "Not provided"}
              </Text>
            )}
          </View>

          {/* Address */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(value) => handleInputChange("address", value)}
                placeholder="Enter your address"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{user.address || "Not provided"}</Text>
            )}
          </View>

          {/* City */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>City</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.city}
                onChangeText={(value) => handleInputChange("city", value)}
                placeholder="Enter your city"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{user.city || "Not provided"}</Text>
            )}
          </View>

          {/* State */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>State</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.state}
                onChangeText={(value) => handleInputChange("state", value)}
                placeholder="Enter your state"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.value}>{user.state || "Not provided"}</Text>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000000",
    minHeight: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9622b",
  },
  editButtonText: {
    color: "#E9622b",
    fontSize: 16,
    fontWeight: "600",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    position: "relative",
    borderWidth: 2,
    borderColor: "#E9622b",
    borderRadius: 65,
    padding: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#333",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  editOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  editOverlayText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E9622b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
  },
  infoSection: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#0a0a0a",
  },
  fieldContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#111",
  },
  label: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
  },
  readOnlyValue: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1.5,
    borderColor: "#E9622b",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#E9622b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#E9622b",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
