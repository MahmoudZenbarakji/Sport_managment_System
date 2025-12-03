import { Image, Text, View } from "react-native";

const NavBar = () => {
  return (
    <View className="flex-row items-center px-4 py-3 bg-black shadow-md">
      {/* اللوجو */}
      {/* <Image
        source={require("../../assets/img/logo.png")} // ضع مسار اللوغو الصحيح
        className="w-10 h-10 rounded-full"
        resizeMode="contain"
      /> */}

      {/* اسم التطبيق */}
      <Text className="text-white text-xl font-bold ml-3">MySportsApp</Text>
    </View>
  );
};

export default NavBar;
