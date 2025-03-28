import React, { useState, useRef } from "react";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa"; // Import microphone icon

const user = JSON.parse(localStorage.getItem("user"));

const VoiceAssistant = () => {
    const [isExpanded, setIsExpanded] = useState(false); // State to toggle expansion
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: "audio/webm",
                });
                audioChunksRef.current = []; // Clear chunks

                // Send the recorded audio to the server
                const formData = new FormData();
                formData.append("file", audioBlob); // Append the audio file
                formData.append(
                    "data",
                    JSON.stringify({
                        farmerId: user.id, // Append the JSON object
                    })
                );

                try {
                    const response = await axios.post(
                        "https://famerequipmentrental-springboot-production.up.railway.app/voice-assistant/audio",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            responseType: "blob", // Ensure the response is treated as a binary blob
                        }
                    );

                    // Create a URL for the audio blob
                    const audioBlob = new Blob([response.data], {
                        type: "audio/mpeg",
                    });
                    const audioUrl = URL.createObjectURL(audioBlob);

                    // Play the audio
                    const audio = new Audio(audioUrl);
                    audio.play();

                    alert("Audio uploaded and response played successfully!");
                    console.log("Response:", response.data);
                } catch (error) {
                    console.error("Error uploading audio:", error);
                    alert("Failed to upload audio. Please try again.");
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert(
                "Failed to access microphone. Please check your permissions."
            );
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                zIndex: 1000,
            }}
        >
            {/* Voice Assistant Icon */}
            {!isExpanded ? (
                <button
                    onClick={toggleExpansion}
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                    }}
                >
                    <FaMicrophone size={24} />
                </button>
            ) : (
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        width: "250px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "16px",
                                color: "#333",
                            }}
                        >
                            {isRecording ? "Recording..." : "Voice Assistant"}
                        </h3>
                        <button
                            onClick={toggleExpansion}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer",
                                color: "#333",
                            }}
                        >
                            ✖
                        </button>
                    </div>
                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {!isRecording ? (
                            <button
                                onClick={startRecording}
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <FaMicrophone size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={stopRecording}
                                style={{
                                    backgroundColor: "#FF0000",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                ✖
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceAssistant;
