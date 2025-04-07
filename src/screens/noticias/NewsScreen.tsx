import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewsItem } from '../../interfaces/api-bioauth';

const NewsScreen = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setRefreshing(true);
    // Simulación de carga de datos
    setTimeout(() => {
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Nueva actualización de la aplicación',
          summary: 'Hemos lanzado una nueva versión con mejoras de rendimiento y nuevas funciones.',
          date: '2023-05-15',
          image: 'https://via.placeholder.com/300x200?text=Actualización',
          content: 'La nueva versión 2.0 incluye un diseño renovado, mejoras en la seguridad y nuevas opciones de personalización.',
          isFeatured: true
        },
        {
          id: '2',
          title: 'Taller de seguridad digital',
          summary: 'Participa en nuestro taller gratuito sobre seguridad digital este viernes.',
          date: '2023-05-10',
          image: 'https://via.placeholder.com/300x200?text=Taller',
          content: 'Aprende las mejores prácticas para proteger tus datos y dispositivos en este taller interactivo.',
          isFeatured: false
        },
        {
          id: '3',
          title: 'Mantenimiento programado',
          summary: 'El sistema estará en mantenimiento el próximo domingo de 2:00 a 6:00 AM.',
          date: '2023-05-05',
          image: 'https://via.placeholder.com/300x200?text=Mantenimiento',
          content: 'Durante este periodo, el servicio podría presentar intermitencias. Agradecemos tu comprensión.',
          isFeatured: false
        },
        {
          id: '4',
          title: 'Encuesta de satisfacción',
          summary: 'Ayúdanos a mejorar respondiendo nuestra breve encuesta.',
          date: '2023-04-28',
          image: 'https://via.placeholder.com/300x200?text=Encuesta',
          content: 'Tu opinión es muy valiosa para nosotros. La encuesta solo tomará 2 minutos de tu tiempo.',
          isFeatured: false
        },
      ];
      setNews(mockNews);
      setRefreshing(false);
    }, 1500);
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity 
      style={styles.newsItem} 
      onPress={() => navigation.navigate('NewsDetail', { newsItem: item })}
    >
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsDate}>{item.date}</Text>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSummary}>{item.summary}</Text>
        {item.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Destacado</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Boletín Informativo</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={loadNews}
            colors={['#596dc6']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="newspaper-remove" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No hay noticias disponibles</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  newsItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsImage: {
    width: '100%',
    height: 150,
  },
  newsContent: {
    padding: 15,
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  newsSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 8,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default NewsScreen;