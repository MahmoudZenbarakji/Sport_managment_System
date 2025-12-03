import { Dimensions, Image, View } from "react-native";
import Swiper from "react-native-swiper";

const screenWidth = Dimensions.get("window").width;

const image1 = require("../assets/img/1.jpg");
const image2 = require("../assets/img/2.jpg");
const image3 = require("../assets/img/3.jpg");
const image4 = require("../assets/img/4.jpg");

const ImageSlider = () => {
  const images = [image1, image2, image3, image4];

  return (
    <View
      style={{
        backgroundColor: "#000000",
        width: screenWidth * 0.9 ,
        height: 180,              // ارتفاع مناسب
        marginTop: 10,            // مسافة بسيطة من الأعلى
        marginLeft: 10,           // مسافة بسيطة من الحافة
        marginBottom: 10,         // مسافة أسفل السلايدر
      }}
    >
      <Swiper
        autoplay
        autoplayTimeout={3}
        loop
        showsPagination={false}
        showsButtons={false}
        scrollEnabled={false}
        fade
      >
        {images.map((img, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: "#E9622b",
            }}
          >
            <Image source={img} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSlider;
