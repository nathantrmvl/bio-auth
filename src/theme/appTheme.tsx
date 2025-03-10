import { StyleSheet } from "react-native";

export const appTheme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  headingadmin: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  formContainer: {
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 10, 
    marginBottom: 15,
    borderColor: "#fff",
    borderWidth: 2,
  },
  loader: {
    marginVertical: 15,
  },
  errorMessage: {
    color: "#ff6b6b",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  loginButton: {
    height: 50,
    width: 180,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  footerLogo: {
    height: 190,
    width: 270,
    resizeMode: "contain",
    marginVertical: 2,
  },
  footerLogo2: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginVertical: 10,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  footerLinkText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
  footerLinkSeparator: {
    color: "#fff",
    marginHorizontal: 8,
  },
  optionsContainer: {
    marginTop: 1,
    alignItems: "center",
  },
  optionText: {
    color: "#ffffff",
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 1,
    textTransform: "capitalize",
  },
 
  containerGlobal: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingTop: 20,
      paddingHorizontal: 15,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
  },
  userListItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    width: "100%",
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  userName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      flex: 1,
  },
  noUsersText: {
      fontSize: 18,
      color: "#ff0000", // Color rojo para indicar error
      textAlign: "center",
      position: "absolute",
  },containerMarginGlobal: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
},
headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 20,
},
backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
},
headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
},
contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
welcomeMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
},
deleteButton: {
  backgroundColor: '#e63946',
  borderRadius: 15,
  paddingVertical: 12,
  paddingHorizontal: 25,
  marginBottom: 20,
  alignItems: 'center',
},
deleteButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
},nputContainer: {
  width: '100%',
  marginBottom: 20,
},
inputLabel: {
  color: '#333',
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
},
inputWrapper: {
  width: '45%',
  marginBottom: 20,
},
rowInput: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
inputWithIcon: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
  marginBottom: 15,
},
imageButton: {
  backgroundColor: '#007bff',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 25,
  marginTop: 20,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
},
imageButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
  textAlign: 'center',
},
imagePreview: {
  width: '50%',
  height: '25%',
  borderRadius: 5,
  marginTop: 20,
  borderWidth: 5,
  borderColor: '#ddd',
  marginBottom: 25,
},
headerLogo: {
  width: 160,
  height: 90,
  resizeMode: "contain",
  alignSelf: "center",
},
button: {
  paddingVertical: 15,
  borderRadius: 10,
  width: 100,
  alignItems: 'center',
  marginVertical: 15,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600',
},
title: {
  fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
},
label: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",  // Un color más oscuro para la legibilidad
  marginBottom: 5,  // Espaciado entre la etiqueta y el campo
},
buttonContainer: {
  marginTop: 20,
  flexDirection: "row",
  justifyContent: 'space-between',
  width: 'auto',
  alignItems: "center",  // Alineación centrada
},
scrollContainer: {
  flexGrow: 1,
  alignItems: 'center',
},
rowButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},

  headerLogoo: {
    width: 170,
    height: 110,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 10,
  },
  
  searchInput: {
    width: 250,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  userImage: {
    width: 110,
    height: 110,
    borderRadius: "50%", // Hace que sea completamente redondo
    marginRight: 12, // Un poco más de separación 
    objectFit: "cover", // Asegura que la imagen se vea bien ajustada
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Suaviza el diseño con una ligera sombra
  },  
  userInfoContainer: {
    flex: 1,
  },
  // Estilos para el contenedor del link de "Regístrate"
  registerLinkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,  // Puedes ajustar este margen si lo necesitas
  },

  // Estilos para el link de "Regístrate"
  registerLinkText: {
    color: "#fff",
    textAlign: "center",
  },


});
