import { React, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import YellowButton from "./YellowButton";
import ModalStyles from "../styles/ModalStyles";
import { startImageRecognition } from "../utils/ImageRecognition";
import { ConstructEmptyItem } from "../utils/ConstructItem";

/**
 * The modal that appears after selecting "Donate an item" in the Home Screen's header.
 * This displays 3 options for providing information on the food item the user wishes to donate:
 * 1. Scan the item's barcode, 2. Take a picture, 3. Enter details manually.
 *
 * @param {*} param0
 * @returns the donation options modal
 */
const DonateModal = ({ visible, onClose, navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleImageRecognition = async () => {
    setLoading(true);
    const result = await startImageRecognition();

    //if a label has been successfully assigned, construct the item and pass to home screen
    if (result[1] !== null) {
      const scannedItem = JSON.parse(ConstructEmptyItem(result[0], result[1]));
      setLoading(false);
      navigation.navigate("Home", { scannedItem });
    }
  };

  return (
    <View style={ModalStyles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={ModalStyles.modalOverlay}>
          <View style={ModalStyles.modalContent}>
            <View style={ModalStyles.row}>
              <TouchableOpacity
                style={ModalStyles.closeModalButton}
                onPress={onClose}
              >
                <AntDesign name="closecircle" style={ModalStyles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={ModalStyles.modalTitleText}>Donate a food item</Text>
            <Text style={ModalStyles.modalText}>
              Choose one of the following options to provide us information
              about the food item:{" "}
            </Text>
            <MaterialCommunityIcons
              name="barcode-scan"
              style={ModalStyles.modalIcons}
            />
            <YellowButton
              title="Scan barcode"
              onPress={() => {
                //When the "Scan barcode " btn is pressed, close the modal and navigate to BarcodeScannerScreen
                onClose();
                navigation.navigate("BarcodeScanner");
              }}
            />
            <MaterialCommunityIcons
              name="camera"
              style={ModalStyles.modalIcons}
            />
            {loading ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <YellowButton
                title="Image recognition"
                onPress={handleImageRecognition}
              />
            )}
            <AntDesign name="form" style={ModalStyles.modalIcons} />
            <YellowButton
              title="Enter details"
              onPress={() => {
                /**
                 * When the "Enter" details btn is pressed, close the modal and pass an
                 * empty item into the home screen to activate the appropriate ItemInfoModal
                 */
                onClose();

                //uri for when product doesnt have an image
                const image = Image.resolveAssetSource(
                  require("../assets/images/no-image.png")
                ).uri;

                //constructs an empty item for the user to populate
                const scannedItem = JSON.parse(ConstructEmptyItem(image));
                navigation.navigate("Home", { scannedItem });
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DonateModal;
