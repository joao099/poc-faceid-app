import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()

  async function handleLogout() {
    signOut()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }} >
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default Dashboard;