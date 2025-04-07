import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface UserImagePickerProps {
  image?: string;
  onImageSelected: (base64: string) => void;
  editable?: boolean;
}

export const UserImagePicker: React.FC<UserImagePickerProps> = ({ 
  image, 
  onImageSelected,
  editable = true,
}) => {
  const pickImage = async () => {
    if (!editable) return;
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      onImageSelected(result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={pickImage} 
        style={styles.imageContainer}
        disabled={!editable}
      >
        {image ? (
          <Image 
            source={{ uri: `data:image/jpeg;base64,${image}` }} 
            style={styles.image} 
          />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons 
              name="add-a-photo" 
              size={32} 
              color={editable ? '#555' : '#ccc'} 
            />
            {editable && (
              <Text style={styles.placeholderText}>Cambiar foto</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#555',
    fontSize: 12,
  },
});
