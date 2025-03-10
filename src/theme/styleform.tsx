import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Área segura para la pantalla
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  // Contenedor principal para los elementos
  container: {
    padding: 20,
    alignItems: 'center',
  },

  // Título del formulario
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  horizontalButtonsContainer: {
    flexDirection: 'row',  // Alinea los botones horizontalmente
    justifyContent: 'space-between',  // Espacio entre los botones
    width: '100%',  // Asegura que ocupe todo el ancho disponible
    marginVertical: 10,  // Margen vertical para dar espacio
  },
  
  // Si lo deseas, también puedes definir un estilo específico para los botones dentro de esta fila:
  horizontalButton: {
    flex: 1,  // Hace que los botones ocupen el mismo ancho
    marginHorizontal: 5,  // Espacio horizontal entre los botones
  },  
  // Estilos para los campos de entrada de texto
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
  },

  // Estilo para el campo de entrada cuando tiene valor
  inputFocus: {
    borderColor: '#007AFF', // Borde azul cuando el campo tiene valor
  },

  // Vista previa de la imagen seleccionada
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    resizeMode: 'cover',
  },

  // Contenedor para los botones
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },

  // Mensaje de éxito cuando se guarda el formulario
  successMessage: {
    marginTop: 20,
    color: '#28a745',
    textAlign: 'center',
  },

  // Estilo para el mensaje de error
  errorMessage: {
    marginTop: 20,
    color: '#dc3545',
    textAlign: 'center',
  },

  // Estilos para los botones
  btn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF', // Color por defecto de los botones
  },

  // Estilo de texto dentro de los botones
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilo del botón de eliminación
  btnDelete: {
    backgroundColor: '#FF4F4F',
  },

  // Estilo del botón para regresar
  btnBack: {
    backgroundColor: '#FF6F00',
  },

  // Estilo cuando el botón está deshabilitado
  btnDisabled: {
    backgroundColor: '#D3D3D3', // Color cuando el botón está deshabilitado
  },

  // Estilo de campo de entrada con error
  inputError: {
    borderColor: '#FF4F4F', // Borde rojo cuando hay un error en el campo
  },

  // Contenedor para el tipo de usuario (campo de texto)
  inputTypeUser: {
    marginTop: 20,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
  },
});
