import { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity, Alert, Animated } from "react-native";
import Voice from "@react-native-community/voice"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Features from "../components/features";
import { dummyMessages } from "../constants";
import { content } from "../../tailwind.config";
import { apiCall } from "../api/chatgpt";
export default function HomeScreen() {
    const [messages, setMessges] = useState(dummyMessages)
    const [recording, setRecording] = useState(false)
    const [speaking, setSpeaking] = useState(true)
    const [result, setResult] = useState("")
    const ScrollViewRef = useRef()
    const clear = () => {
        setMessges([])
    }
    const stopSpeaking = () => {
        setSpeaking(false)
        console.log(" stop speaking")
    }
    const speechStartHandler = (e) => {
        console.log(" speech start handler ", e)
        const text = e.value[0]
        setResult(text)

    }
    const speechEndHandler = (e) => {
        setRecording(false)
        console.log("speech end handler")

    }
    const speechResultsHandler = (e) => {
        console.log('voice event', e)
    }
    const speechErrorHandler = (e) => {
        console.log("speech error handler", e)
    }
    const startRecording = async () => {
        setRecording(true)
        try {
            await Voice.start('en-GB')
        } catch (error) {
            console.log("error", error)
        }
    }
    const stopRecording = async () => {
        try {
            await Voice.stop()
            setRecording(false)
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData = () => {
        if (result.length > 0) {
            const newMess = [...messages]
            newMess.push({ role: "user", content: result.trim() })
            setMessges([...newMess])
            updateScrollView()
            apiCall(result.trim(), newMess).then(res => {
                if (res.success) {
                    setMessges([...res.data])
                    updateScrollView()
                    setResult("")
                } else {
                    Alert.alert("error")
                }
            })
        }
    }
    const updateScrollView = () => {
        setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({ animated: true })
        })
    }
    useEffect(() => {
        Voice.onSpeechEnd = speechEndHandler
        Voice.onSpeechError = speechErrorHandler
        Voice.onSpeechResults = speechResultsHandler
        Voice.onSpeechStart = speechStartHandler
    })
    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 mx-5">
                {/** bot icon */}
                <View className="flex-row justify-center">
                    <Image source={require('../../assests/images')} style={{ height: hp(15), width: wp(15) }} />
                </View>
                {/* feature , mess */}
                {
                    messages.length > 0 ? (
                        <View className="space-y-2 flex-1">
                            <Text className="text-gray-700 font-semibold ml-1">
                                Assistant
                            </Text>
                            <View
                                style={{ height: hp(58) }}
                                className="bg-neutral-200 rounded-3xl p-4"
                            >
                                <ScrollView
                                    ref={ScrollViewRef}
                                    bounces={false}
                                    className="space-y-4"
                                    showsVerticalScrollIndicator={false}
                                >
                                    {
                                        messages.map((message, index) => {
                                            if (message.role == 'assistant') {
                                                if (message.content.includes('https')) {
                                                    // its an ai image
                                                    return (
                                                        <View className="flex-row justify-start">
                                                            <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                                                <Image
                                                                    source={{ uri: message.content }}
                                                                    className="rounded-2xl"
                                                                    resizeMode="contain"
                                                                    style={{ height: hp(60), width: wp(60) }}
                                                                />
                                                            </View>
                                                        </View>
                                                    )


                                                } else {
                                                    // text response
                                                    return (

                                                        <View style={{ width: wp(70) }}
                                                            className="bg-emeral-100 rounded-xl p-2 rounded-tr-none">
                                                            <Text>
                                                                {message.content}
                                                            </Text>
                                                        </View>

                                                    )
                                                }
                                            } else {
                                                //user input
                                                <View className="flex-row justify-end" key={index}>
                                                    <View style={{ width: wp(70) }}
                                                        className="bg-white rounded-xl p-2 rounded-tr-none">
                                                        <Text>
                                                            {message.content}
                                                        </Text>
                                                    </View>
                                                </View>
                                            }
                                        })
                                    }


                                </ScrollView>

                            </View>
                        </View>
                    ) : (
                        <Features />
                    )

                }
                {/* recoding, clear and stop button */}
                <View className="flex justify-center items-center">
                    {recoding ? (
                        /* stop recording*/
                        <TouchableOpacity onPress={stopRecording}>
                            <Image
                                className="rounded-full"
                                source={require('../../assests/im')}
                                style={{ width: wp(10), height: hp(10) }}
                            />
                        </TouchableOpacity>
                    ) : (
                        /* start recording*/
                        <TouchableOpacity onPress={startRecording}>
                            <Image
                                className="rounded-full"
                                source={require('../../assests/im')}
                                style={{ width: wp(10), height: hp(10) }}
                            />
                        </TouchableOpacity>
                    )
                    }
                    {
                        message.length > 0 && (
                            <TouchableOpacity onPress={clear} className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
                                <Text className="text-white font-semibold">
                                    Clear
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    {

                        speaking && (<TouchableOpacity onPress={stopSpeaking} className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
                            <Text className="text-white font-semibold">
                                Stop
                            </Text>
                        </TouchableOpacity>)
                    }

                </View>
            </SafeAreaView>
        </View>
    )
}