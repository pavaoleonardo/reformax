import { View, Text, Image } from 'react-native';

import { Project } from '@/types/type';
import { icons } from '@/constants';

const ProjectCard = ({
  project: {
    name,
    project_id,
    budget,
    address,
    created_at,
    user_id,
    address_latitude,
    address_longitude,
  },
}: {
  project: Project;
}) => {
  return (
    <View className='flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3'>
      <View className='flex flex-row items-start justify-center p-3'>
        <View className='flex flex-row items-center justify-between'>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${address_longitude},${address_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className='w-[80px] h-[90px] rounded-lg'
          />

          <View className='flex flex-col mx-5 gap-y-5 flex-1'>
            <View className='flex flex-row items-center gap-x-2'>
              <Text className='text-md font-JakartaBold' numberOfLines={1}>
                Project: {name}
              </Text>
            </View>

            <View className='flex flex-row items-center gap-x-2'>
              <Image source={icons.to} className='w-5 h-5' />
              <Text className='text-md font-JakartaMedium' numberOfLines={1}>
                {address}
              </Text>
            </View>

            <View className='flex flex-row items-center gap-x-2'>
              <Image source={icons.dollar} className='w-5 h-5' />
              <Text className='text-md font-JakartaMedium' numberOfLines={1}>
                {budget}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProjectCard;
