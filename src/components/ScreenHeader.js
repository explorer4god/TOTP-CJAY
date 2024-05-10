import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../assets/svg/BackArrow";
import { colors } from "../utils/colors";

const ScreenHeader = ({ noBackButton }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {noBackButton ? (
        <View style={styles.space} />
      ) : (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: 30,
    backgroundColor: colors.white
  },
  space: {
    marginBottom: 30,
  },
});