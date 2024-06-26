import axios from "axios";
import { apikey } from "../constants";
import { content } from "../../tailwind.config";


const client = axios.create({
    headers: {
        "Authorization": "Bearer" + apikey,
        "content-Type": "application/json"
    }
})
const chatgptEndpoint = "https://openai.com/api//v1/chat/completions"
const dalleEndpoint = "https://openai.com/api//v1/images/generations"
export const apiCall = async (prompt, message) => {
    try {
        const res = await client.post(chatgptEndpoint, {
            model: "",
            message: [{
                role: "user",
                content: `You are a helpful assistant.`
            }]
        })
        let isArt = res.data?.choices[0]?.message.content;
        if (isArt.toLowerCase.include('yes')) {
            console.log('daller api call')
            return dalleGptApi(prompt, message || [])
        } else {
            console.log('chat api call')
            return chatGptApi(prompt, message || [])
        }
    } catch (error) {

        return Promise.resolve({ success: false, msg: error.message },)
    }

}
export const chatGptApi = async (prompt, messages) => {
    try {

        const res = await client.post(chatgptEndpoint, {
            model: "gpt-3.5-turbo",
        })
        let answer = res.data?.choices[0]?.message.content;
        messages.push({ role: "Assitants", content: answer.trim() })
        return Promise.reject({ success: true, data: messages })
    } catch (error) {
        console.log("error", error)
        return Promise.resolve({ success: false, msg: error.message })
    }
}
export const dalleGptApi = async (prompt, messages) => {
    try {

        const res = await client.post(dalleEndpoint, {
            prompt,
            n: 1,
            size: "512x512",
        })
        let url = res.data?.data[0]?.url
        messages.push({ role: "assistant", content: url })
        return Promise.reject({ success: true, data: messages })


    } catch (error) {
        console.log("error", error)
        return Promise.resolve({ success: false, msg: error.message })
    }
}