import { firestore } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as Device from "expo-device";
import { Alert } from "react-native";

/**
 * Adds a new user(device) to the users database.
 * Checks for existing user.
 */
export default async function AddNewUser() {
  try {
    const userId = Device.osBuildId; //get unique device identifier
    const userRef = doc(firestore, "users", userId); //get user reference from database
    const userDoc = await getDoc(userRef);

    //if user/device doesn't exist, add it to the database with default settings
    if (!userDoc.exists()) {
      const defaultSettings = {
        notificationsEnabled: false,
        campusNotificationsEnabled: false,
        isOnCampus: false,
        notificationTimesEnabled: false,
        notifyFoodsEnabled: false,
        notificationTimes: [],
        notifyFoods: [],
        allergens: [],
        pushToken: "",
      };

      await setDoc(userRef, defaultSettings);

      //welcomes the user
      Alert.alert(
        "Welcome 👋",
        "Please check out the 'About' and 'How to use' pages to get started!"
      );
    } else {
      console.log("user already exists");
    }
  } catch (error) {
    console.error("Couldn't add user: ", error);
  }
}
