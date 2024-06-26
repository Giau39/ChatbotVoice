import { Image, Text, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function Features =() => {
    return (
        <View style={{ height: hp(60) }} className="space-y-4">
            <Text style={{ fontSize: wp(6.5) }} className="font-semibold text-gray-700">Feature</Text>
            <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assests/images')} style={{ height: hp(4), width: wp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700"> Chat GPT</Text>
                </View>
                <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
                    ChatGPT can provide you with instant and knowledgeablle responses,assist you with creative ideas on a wide range of topics
                </Text>
            </View>
            <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assests/images')} style={{ height: hp(4), width: wp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700"> DALL-E</Text>
                </View>
                <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">

                </Text>
            </View>
            <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assests/images')} style={{ height: hp(4), width: wp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700"> Smart AI</Text>
                </View>
                <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">

                </Text>
            </View>
        </View>
    )
}