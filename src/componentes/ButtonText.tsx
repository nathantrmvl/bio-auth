import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  action: () => void;
  title: string;
}

export const ButtonText = ({ action, title }: Props) => {
  return (
    <TouchableOpacity onPress={action} style={styles.btn}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    elevation: 3, // Sombra sutil para dar profundidad
    marginTop: 5,
    transition: "all 0.2s ease-in-out", // Transición suave
  },
  btnText: {
    color: "#000000", // Contraste claro
    fontSize: 16,
    fontWeight: "600", // Acentúa el texto
    textTransform: "uppercase", // Estilo moderno y claro
  },
  // Efecto hover (en dispositivos que lo soporten)
  btnActive: {
    transform: [{ scale: 0.98 }],
    elevation: 5, // Aumento de sombra al presionar
  },
});
