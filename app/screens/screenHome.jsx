import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../firebase-config'; // Firebase auth import
import { onAuthStateChanged } from 'firebase/auth'; // Import to listen auth changes

const ScreenHome = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.replace('../screens/screenMain'); // Redirect to Main Screen if logged in
      } else {
        router.replace('../screens/screenTutorial'); // Redirect to Tutorial if not logged in
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <View />;
};

export default ScreenHome;