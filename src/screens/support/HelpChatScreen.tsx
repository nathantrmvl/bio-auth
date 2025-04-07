import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Image
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  read?: boolean;
};

const HelpChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Datos iniciales del chat
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        text: '¡Hola! ¿En qué puedo ayudarte hoy?',
        sender: 'support',
        time: '10:00 AM',
        read: true
      },
      {
        id: '2',
        text: 'Estoy teniendo problemas para acceder a mi cuenta.',
        sender: 'user',
        time: '10:02 AM'
      },
      {
        id: '3',
        text: 'Entiendo. ¿Podrías decirme qué mensaje de error recibes?',
        sender: 'support',
        time: '10:03 AM',
        read: true
      }
    ];
    setMessages(initialMessages);
  }, []);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simular respuesta del soporte
    setIsTyping(true);
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        sender: 'support',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getRandomResponse = () => {
    const responses = [
      "Gracias por compartir esa información. Estoy revisando tu caso.",
      "Entiendo el problema. ¿Has intentado reiniciar la aplicación?",
      "Voy a transferirte con un especialista que puede ayudarte mejor con esto.",
      "Ese es un problema conocido. Estamos trabajando en una solución.",
      "Para ayudarte mejor, ¿podrías enviar una captura de pantalla del error?",
      "Por motivos de seguridad, necesitaré verificar algunos datos contigo."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.supportMessage
    ]}>
      {item.sender === 'support' && (
        <Image 
          source={{ uri: 'https://via.placeholder.com/40?text=S' }} 
          style={styles.avatar} 
        />
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.supportBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.messageTimeContainer}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {item.sender === 'user' && (
            <Ionicons 
              name={item.read ? 'checkmark-done' : 'checkmark'} 
              size={14} 
              color={item.read ? '#596dc6' : '#999'} 
              style={styles.readIcon} 
            />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.supportInfo}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40?text=S' }} 
            style={styles.supportAvatar} 
          />
          <View>
            <Text style={styles.supportName}>Soporte Técnico</Text>
            <Text style={styles.supportStatus}>
              {isTyping ? 'Escribiendo...' : 'En línea'}
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={
            isTyping ? (
              <View style={[styles.messageContainer, styles.supportMessage]}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/40?text=S' }} 
                  style={styles.avatar} 
                />
                <View style={[styles.messageBubble, styles.supportBubble]}>
                  <View style={styles.typingIndicator}>
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                  </View>
                </View>
              </View>
            ) : null
          }
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachmentButton}>
            <MaterialCommunityIcons name="paperclip" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={newMessage.trim() === ''}
          >
            <MaterialCommunityIcons 
              name="send" 
              size={24} 
              color={newMessage.trim() === '' ? '#ccc' : '#596dc6'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: 'white',
  },
  supportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  supportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  supportStatus: {
    fontSize: 12,
    color: '#666',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 15,
    paddingBottom: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  supportMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: '#1938',
    borderBottomRightRadius: 2,
  },
  supportBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  supportText: {
    color: '#333',
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
  },
  userTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  supportTime: {
    color: '#666',
  },
  readIcon: {
    marginLeft: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    padding: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    fontSize: 15,
    color: '#333',
    marginHorizontal: 5,
  },
  attachmentButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
});

export default HelpChatScreen;