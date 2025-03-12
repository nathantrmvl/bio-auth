import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  container: {
    padding: width * 0.05, // Ajuste dinámico del padding
    alignItems: 'center',
  },

  title: {
    fontSize: width * 0.06, // Escalado según el ancho de la pantalla
    fontWeight: 'bold',
    color: '#333',
    marginBottom: width * 0.05,
  },

  horizontalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: width * 0.025,
  },

  horizontalButton: {
    flex: 1,
    marginHorizontal: width * 0.02,
  },

  input: {
    width: '100%',
    height: height * 0.06, // Escalado en función de la altura
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.015,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: width * 0.045,
  },

  inputFocus: {
    borderColor: '#007AFF',
  },

  imagePreview: {
    width: width * 0.5,
    height: width * 0.5,
    marginTop: width * 0.05,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    resizeMode: 'cover',
  },

  buttonContainer: {
    marginTop: width * 0.05,
    width: '100%',
  },

  successMessage: {
    marginTop: width * 0.05,
    color: '#28a745',
    textAlign: 'center',
  },

  errorMessage: {
    marginTop: width * 0.05,
    color: '#dc3545',
    textAlign: 'center',
  },

  btn: {
    width: '100%',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.015,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },

  btnText: {
    color: '#FFF',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },

  btnDelete: {
    backgroundColor: '#FF4F4F',
  },

  btnBack: {
    backgroundColor: '#FF6F00',
  },

  btnDisabled: {
    backgroundColor: '#D3D3D3',
  },

  inputError: {
    borderColor: '#FF4F4F',
  },

  inputTypeUser: {
    marginTop: width * 0.05,
    width: '100%',
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: width * 0.045,
  },
});
