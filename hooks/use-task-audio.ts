import { useRef, useEffect } from "react";

export const useTaskAudio = () => {
  // Create audio refs that persist across renders
  const completedTaskAudioRef = useRef<HTMLAudioElement | null>(null);
  const incompletedTaskAudioRef = useRef<HTMLAudioElement | null>(null);
  const deleteTaskAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio objects once when component mounts
  useEffect(() => {
    try {
      completedTaskAudioRef.current = new Audio("/assets/sounds/task-complete.mp3");
      incompletedTaskAudioRef.current = new Audio("/assets/sounds/task-incomplete.mp3");
      deleteTaskAudioRef.current = new Audio("/assets/sounds/task-delete.mp3");
      
      // Preload the audio files
      completedTaskAudioRef.current.load();
      incompletedTaskAudioRef.current.load();
      deleteTaskAudioRef.current.load();
    } catch (error) {
      console.warn("Failed to initialize audio:", error);
    }
  }, []);

  const playCompletedSound = async () => {
    try {
      if (completedTaskAudioRef.current) {
        completedTaskAudioRef.current.currentTime = 0;
        await completedTaskAudioRef.current.play();
      }
    } catch (error) {
      console.warn("Failed to play completion audio:", error);
    }
  };

  const playIncompletedSound = async () => {
    try {
      if (incompletedTaskAudioRef.current) {
        incompletedTaskAudioRef.current.currentTime = 0;
        await incompletedTaskAudioRef.current.play();
      }
    } catch (error) {
      console.warn("Failed to play incompletion audio:", error);
    }
  };

  const playDeleteSound = async () => {
    try {
      if (deleteTaskAudioRef.current) {
        deleteTaskAudioRef.current.currentTime = 0;
        await deleteTaskAudioRef.current.play();
      }
    } catch (error) {
      console.warn("Failed to play delete audio:", error);
    }
  };

  return {
    playCompletedSound,
    playIncompletedSound,
    playDeleteSound,
  };
};
