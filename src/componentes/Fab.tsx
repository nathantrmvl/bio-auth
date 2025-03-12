import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from 'react-native-svg';

interface Props {
  title: string;
  position: 'button_right' | 'button_left';
  action: () => void;
}

export const Fab = ({ title, position, action }: Props) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={position === 'button_right' ? styles.fabLocationBR : styles.fabLocationBL}
      accessible={true}
      accessibilityLabel={title}  
    >
      <View style={styles.fab}>
        <Svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M3 12L21 12M3 12L12 3M3 12L12 21"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30, 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  fabLocationBR: {
    position: "absolute",
    bottom: 25,
    right: 25,
    zIndex: 1000, 
  },
  fabLocationBL: {
    position: "absolute",
    bottom: 25,
    left: 25,
    zIndex: 1000,
  },
});