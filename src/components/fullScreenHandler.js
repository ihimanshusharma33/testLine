import React, { useEffect } from "react";

const FullScreenHandler = ({ handleQuizSubmit }) => {
  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err) => console.error("Fullscreen error:", err));
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen().catch((err) => console.error("Fullscreen error:", err));
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen().catch((err) => console.error("Fullscreen error:", err));
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen().catch((err) => console.error("Fullscreen error:", err));
    }
  };

  useEffect(() => {
    const handleExitAttempt = () => {
      if (!document.fullscreenElement) {
        // 🔴 Avoid `window.confirm` to prevent pausing the timer
        console.warn("User exited fullscreen! Submitting quiz.");
        handleQuizSubmit();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault(); // Prevent immediate fullscreen exit

        // ✅ Instead of `window.confirm`, directly submit the quiz
        console.warn("Escape key pressed! Submitting quiz.");
        handleQuizSubmit();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.warn("Tab switching detected! Submitting quiz.");
        handleQuizSubmit();
      }
    };

    document.addEventListener("fullscreenchange", handleExitAttempt);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleExitAttempt);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleQuizSubmit]);

  return null;
};

export default FullScreenHandler;
