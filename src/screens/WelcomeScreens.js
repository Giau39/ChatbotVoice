import { useNavigation } from "@react-navigation/native";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function WelcomeScreen() {
    const navigation = useNavigation()
    return (
        <SafeAreaView className="flex-1 flex justify-around bg-white">
            <View className="space-y-2">
                <Text style={{ fontSize: wp(10) }} className="font-bold text-gray-700 text-center ">
                    Jarvis
                </Text>
                <Text style={{ fontSize: wp(4) }} className="text-center text-gray-600 font-semibold tracking-wider">
                    The Future is here, powered by AI
                </Text>

            </View>
            <View className="flex-row justify-center">
                <Image source={require('../../assests/images')} style={{ width: wp(75), height: wp(75) }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-emerald-600 mx-5 p-4 rounded-2xl ">
                <Text className="text-center font-bold text-white text-2xl">
                    Get Started
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}