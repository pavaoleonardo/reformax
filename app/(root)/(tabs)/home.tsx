import ProjectCard from '@/components/ProjectCard';
import { useUser, useAuth } from '@clerk/clerk-expo';

import { icons } from '@/constants';
import { router } from 'expo-router';

import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { images } from '@/constants';

const recentProjects = [
  {
    project_id: '1',
    name: 'Lenguas',
    address: 'Calle Lenguas, 6 Madrid',
    budget: '24200',
    user_id: '1',
    created_at: '2024-08-12 05:19:20.620007',
    address_latitude: '27.717245',
    address_longitude: '85.323961',
  },
  {
    project_id: '2',
    name: 'Fuencarral',
    address: 'Calle Fuencarral, 45 Madrid',
    budget: '15000',
    user_id: '1',
    created_at: '2024-09-07 05:19:20.620007',
    address_latitude: '34.693725',
    address_longitude: '135.502254',
  },
  {
    project_id: '3',
    name: 'Alcala',
    address: 'Calle Alcala, 205 Madrid',
    budget: '30000',
    user_id: '1',
    created_at: '2024-01-11 05:19:20.620007',
    address_latitude: '45.815011',
    address_longitude: '15.981919',
  },
];

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const loading = false;

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className='bg-general-500'>
      <FlatList
        data={recentProjects?.slice(0, 5)}
        renderItem={({ item }) => <ProjectCard project={item} />}
        className='px-5'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className='flex flex-col items-center justify-center'>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className='w-40 h-40'
                  alt='No recent projects found'
                  resizeMode='contain'
                />
                <Text className='text-sm'>No recent projects found</Text>
              </>
            ) : (
              <ActivityIndicator size='small' color='#000' />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className='flex flex-row items-center justify-between my-5'>
              <Text className='text-1xl font-JakartaExtraBold'>
                Welcome {user?.emailAddresses[0].emailAddress.split('@')[0]} 👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className='justify-center items-center w-10 h-10 rounded-full bg-white'
              >
                <Image source={icons.out} className='w-4 h-4' />
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}
