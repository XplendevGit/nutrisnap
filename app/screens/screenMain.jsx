import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Dimensions, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Iconos de hamburguesa y demás
import { auth } from '../../firebase-config'; // Importa Firebase auth
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Importa la función signOut y onAuthStateChanged de Firebase
import { useRouter } from 'expo-router'; // Para la navegación

const ScreenMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para almacenar el usuario logueado
  const slideAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0]; // Animación de deslizar
  const router = useRouter(); // Para la navegación

  useEffect(() => {
    // Verifica si el usuario está logueado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Limpia la suscripción cuando se desmonta el componente
    return unsubscribe;
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      // Cerrar menú
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuOpen(false));
    } else {
      // Abrir menú
      setMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada correctamente');
        router.replace('./screenLogin'); // Redirigir a la pantalla de login después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Botón de hamburguesa */}
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
        <AntDesign name="bars" size={28} color="#388E3C" />
      </TouchableOpacity>

      <Text style={styles.title}>Bienvenido a NutriSnap</Text>

      {/* Menú deslizante */}
      {menuOpen && (
        <Pressable style={styles.overlay} onPress={toggleMenu} />
      )}

<Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
  <View style={styles.header}>
    {/* Verificación para mostrar la imagen y detalles del usuario */}
    {user && (
      <>
        <Image
          source={{
            uri: user.photoURL || 'https://via.placeholder.com/80', // Imagen predeterminada
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.displayName || 'Usuario'}</Text>
        <Text style={styles.email}>{user.email || 'Sin correo electrónico'}</Text>
      </>
    )}
  </View>

  {/* Contenedor de los ítems del menú */}
  <View style={styles.menuItems}>
    <TouchableOpacity 
    style={styles.menuItem}
    onPress={() => router.push('./screenProfile')}
    >
      <AntDesign name="profile" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Mi Perfil</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <AntDesign name="enviromento" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Delivery Address</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <AntDesign name="creditcard" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Métodos de Pago</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <AntDesign name="customerservice" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Contáctanos</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <AntDesign name="setting" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Configuración</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <AntDesign name="questioncircleo" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Ayuda & FAQs</Text>
    </TouchableOpacity>

    {/* Botón de Log Out */}
    <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
      <AntDesign name="logout" size={24} color="#fff" />
      <Text style={styles.menuItemText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  </View>
</Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  hamburger: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 24,
    color: '#388E3C',
    fontWeight: 'bold',
  },
  drawer: {
    position: 'absolute',
    width: '75%',
    height: '100%',
    backgroundColor: '#388E3C',
    top: 0,
    left: 0,
    padding: 20,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#fff',
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    color: '#fff',
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
  },
  notLoggedInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  notLoggedInTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  notLoggedInSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#81C784',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ScreenMain;
