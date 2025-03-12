import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styleadmin = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: width * 0.05,
    justifyContent: 'flex-start',
  },
  headerLogo: {
    width: width * 0.4,
    height: height * 0.1,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  headingadmin: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.03,
    borderRadius: 12,
    marginRight: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    fontSize: width * 0.04,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  userListItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: width * 0.05,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#5271ff',
  },
  userImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#5271ff',
  },
  userInfoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  userName: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  userDepartment: {
    fontSize: width * 0.035,
    color: '#777',
    marginBottom: 5,
  },
  userPosition: {
    fontSize: width * 0.035,
    color: '#777',
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  noUsersText: {
    textAlign: 'center',
    color: '#888',
    fontSize: width * 0.045,
    marginTop: 30,
    fontWeight: '500',
  },
  loaderContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageNumber: {
    fontSize: width * 0.04,
    fontWeight: '600',
    marginHorizontal: 15,
  },
  paginationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  paginationText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#5271ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  modeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 15,
  },
  modeSwitchText: {
    fontSize: width * 0.04,
    marginRight: 12,
    color: '#333',
  },
  userStatus: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: 6,
  },
  activeStatus: {
    color: 'green',
  },
  inactiveStatus: {
    color: 'red',
  },
  blockedStatus: {
    color: 'black',
  },
});
