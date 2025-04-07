import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  container: {
    padding: width * 0.01,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: width * 0.05,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: height * 0.06,
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
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: width * 0.05,
    width: '100%',
    gap: 2, // Espacio entre botones
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
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  pickerFocus: {
    borderColor: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#000',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
  },
  button: {
    flex: 1, // Para que los botones ocupen el mismo espacio
    marginHorizontal: 5,
    backgroundColor: "#000"
     // Espacio entre botones
  },
  buttonSpacer: {
    width: 1, // Espacio entre botones
  },
  typeUserButton: {
    width: '100%',
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.015,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
});