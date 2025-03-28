import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";
import { FoodsList } from "../components/FoodsList";
import TimePicker from "../components/TimePicker";
import handleSettingChange from "../utils/UpdateSettings";
import ReadSettings from "../utils/ReadSettings";
import { startLocationCheck, stopLocationCheck } from "../utils/TrackLocation";
import { getNotificationPermissions } from "../utils/NotificationsSetup";

/**
 * Displays the users notification settings.
 *
 */
export default function SettingsScreen() {
  //default values for user settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [campusNotificationsEnabled, setCampusNotificationsEnabled] =
    useState(false);
  const [notificationTimesEnabled, setNotificationTimesEnabled] =
    useState(false);
  const [notificationTimes, setNotificationTimes] = useState([]);
  const [notifyFoodsEnabled, setNotifyFoodsEnabled] = useState(false);
  const [notifyFoods, setNotifyFoods] = useState([]);

  //every time page is rendered, get user settings and display on screen
  useEffect(() => {
    const getSettings = async () => {
      const notificationsEnabled = await ReadSettings("notificationsEnabled");
      const campusEnabled = await ReadSettings("campusNotificationsEnabled");
      const timesEnabled = await ReadSettings("notificationTimesEnabled");
      const times = await ReadSettings("notificationTimes");
      const foodsEnabled = await ReadSettings("notifyFoodsEnabled");
      const foods = await ReadSettings("notifyFoods");

      if (notificationsEnabled !== null) {
        setNotificationsEnabled(notificationsEnabled);
      }
      if (campusEnabled !== null) {
        setCampusNotificationsEnabled(campusEnabled);
      }
      if (timesEnabled !== null) {
        setNotificationTimesEnabled(timesEnabled);
        setNotificationTimes(times);
      }
      if (foodsEnabled !== null) {
        setNotifyFoodsEnabled(foodsEnabled);
        setNotifyFoods(foods);
      }
    };
    getSettings();
  }, []);

  return (
    <View style={DefaultPageStyle.body}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Setting
          text="Enabled"
          value={notificationsEnabled}
          onValueChange={(newValue) => {
            setNotificationsEnabled(newValue);
            handleSettingChange("notificationsEnabled", newValue);

            //get permissions to notify when enabled
            if (newValue === true) {
              getNotificationPermissions();
            }
          }}
        />
        {notificationsEnabled && (
          <>
            <Text style={styles.titleText}>Notify me...</Text>
            <Setting
              text="Only when on campus"
              value={campusNotificationsEnabled}
              onValueChange={(newValue) => {
                setCampusNotificationsEnabled(newValue);
                handleSettingChange("campusNotificationsEnabled", newValue);
                //if user has enabled option, start tracking their location
                newValue === true ? startLocationCheck() : stopLocationCheck();
              }}
            />
            <Setting
              text="Only between certain hours"
              value={notificationTimesEnabled}
              onValueChange={(newValue) => {
                setNotificationTimesEnabled(newValue);
                handleSettingChange("notificationTimesEnabled", newValue);
              }}
            />
            {notificationTimesEnabled && (
              <TimePicker
                notificationTimesEnabled={notificationTimesEnabled}
                notificationTimes={notificationTimes}
              />
            )}
            <Setting
              text="Only for certain items"
              value={notifyFoodsEnabled}
              onValueChange={(newValue) => {
                setNotifyFoodsEnabled(newValue);
                handleSettingChange("notifyFoodsEnabled", newValue);
              }}
            />
            {notifyFoodsEnabled && (
              <FoodsList
                notifyFoodsEnabled={notifyFoodsEnabled}
                foods={notifyFoods}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
/**
 * Represents a setting to be rended. Each setting has text, a value, and
 * a function that is called when its value changes.
 * As the settings involve switches, therefore boolean values, the value change will
 * change to the opposite of the value.
 */
const Setting = ({ text, value, onValueChange }) => {
  return (
    <View style={styles.settingContainer}>
      <Text style={TextStyles.bodyMain}>{text}</Text>
      <Switch value={value} onValueChange={() => onValueChange(!value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    margin: 20,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  titleText: {
    padding: 25,
    paddingBottom: 0,
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 5,
    color: "green",
  },
});
