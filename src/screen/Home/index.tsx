import { Button, Text, View } from 'native-base';

type Props = {
  navigation: any;
};

export default function Home({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Homssze</Text>
      <Button onPress={() => navigation.navigate('Detail')} />
    </View>
  );
}
