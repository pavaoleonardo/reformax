import { useState, useCallback } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Image, ScrollView, View, Text } from 'react-native';
import { images, icons } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[200px]'>
          <Image
            source={images.signUpReforma}
            className='z-0 w-full h-[200px] opacity-40 bg-cover'
          />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-0 left-5'>
            Welcome 👋
          </Text>
        </View>

        <View className='p-5'>
          <InputField
            label='Name'
            placeholder='Enter your emal'
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label='Password'
            placeholder='Enter your password'
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title='Sign In'
            onPress={onSignInPress}
            className='mt-6'
          />

          <OAuth />

          <Link
            href='/sign-up'
            className='text-lg text-center text-general-200 mt-10'
          >
            Don't have an account?{' '}
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
