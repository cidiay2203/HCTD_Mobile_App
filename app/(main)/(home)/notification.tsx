import { StyleSheet, View } from "react-native";
import { ListItem, Button, Icon } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS } from "@/constants";

export default function NotificationScreen() {
  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => reset()}
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => reset()}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
    >
      <AntDesign size={20} color={COLORS.PRIMARY} name="notification" />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: FONTS.POPPINS_BOLD, color: "gray" }}>Hello Swiper</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}

const styles = StyleSheet.create({
  
});