import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Orange Background */}
      <View style={styles.background}>
        {/* Glowing edges effect */}
        <View style={styles.glowContainer}>
          <View style={[styles.glow, styles.glowTop]} />
          <View style={[styles.glow, styles.glowBottom]} />
          <View style={[styles.glow, styles.glowLeft]} />
          <View style={[styles.glow, styles.glowRight]} />
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Logo from assets */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/img/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* App Name - Minimal Text */}
          <Text style={styles.appName}>SportSphere</Text>
        </View>

        {/* Curved Waves at Bottom */}
        <View style={styles.wavesContainer}>
          <Svg
            width={width}
            height={200}
            viewBox={`0 0 ${width} 200`}
            style={styles.waves}
            preserveAspectRatio="none"
          >
            {/* Wave 1 - Largest */}
            <Path
              d={`M 0 100 Q ${width * 0.25} 60 ${width * 0.5} 100 T ${width} 100 L ${width} 200 L 0 200 Z`}
              fill="#FFFFFF"
              opacity="0.15"
            />
            {/* Wave 2 - Medium */}
            <Path
              d={`M 0 120 Q ${width * 0.3} 80 ${width * 0.6} 120 T ${width} 120 L ${width} 200 L 0 200 Z`}
              fill="#FFFFFF"
              opacity="0.1"
            />
            {/* Wave 3 - Smallest - Motion effect */}
            <Path
              d={`M 0 140 Q ${width * 0.2} 100 ${width * 0.4} 140 T ${width * 0.8} 140 T ${width} 140 L ${width} 200 L 0 200 Z`}
              fill="#FFFFFF"
              opacity="0.08"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#E9622b",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E9622b",
  },
  glowContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  glow: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 50,
  },
  glowTop: {
    top: -100,
    left: width / 2 - 150,
    width: 300,
    height: 200,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  glowBottom: {
    bottom: -100,
    left: width / 2 - 150,
    width: 300,
    height: 200,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  glowLeft: {
    left: -100,
    top: height / 2 - 150,
    width: 200,
    height: 300,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
  },
  glowRight: {
    right: -100,
    top: height / 2 - 150,
    width: 200,
    height: 300,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 5,
    overflow: "hidden",
  },
  waves: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default SplashScreen;

