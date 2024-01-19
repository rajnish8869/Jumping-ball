// JumpingButton.js

import React, { useState, useRef, useEffect } from "react";
import "./JumpingButton.css"; // Import the CSS file

const JumpingButton = () => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  });
  const [radius, setRadius] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("easy"); // Default level is easy
  const [clickCount, setClickCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(60); // Default timer for easy level is 60 seconds
  const [totalGames, setTotalGames] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [screen, setScreen] = useState(1);
  const [powerUps, setPowerUps] = useState([]);
  const [powerUpTimers, setPowerUpTimers] = useState([]);

  const buttonRef = useRef(null);

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));

    return { x: randomX, y: randomY };
  };

  const getRandomPowerUpPosition = (level) => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const color = getRandomColor();
    const size = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random size between 50 and 100

    let timerDuration;

    switch (level) {
      case "easy":
        timerDuration = 60;
        break;
      case "medium":
        timerDuration = 45;
        break;
      case "hard":
        timerDuration = 30;
        break;
      default:
        timerDuration = 30; // Default to 30 seconds for custom level
    }

    return {
      x: randomX,
      y: randomY,
      color: color,
      size: size,
      timerDuration: timerDuration,
    };
  };

  const handleButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    const newPosition = getRandomPosition();
    setPosition(newPosition);

    // Check if the required number of clicks is reached for the current level
    if (clickCount >= getTargetClickCount()) {
      handleGameEnd(true); // Game won
    }
  };

  const handleGameEnd = (won) => {
    setTotalGames((prevTotalGames) => prevTotalGames + 1);

    if (won) {
      setTotalWins((prevTotalWins) => prevTotalWins + 1);
    } else {
      setTotalLosses((prevTotalLosses) => prevTotalLosses + 1);
    }

    setShowPopup(true);
    setGameStarted(false);
    resetTimer();
  };

  const resetGame = () => {
    setClickCount(0);
    setShowPopup(false);
  };

  const startNewGame = () => {
    resetGame();
    setGameStarted(true);
    resetTimer();
    setScreen(2);

    setPowerUps([]);
    setPowerUpTimers([]);

    // Set up a timer to generate power-ups at irregular intervals
    var generatePowerUp = () => {
      const newPowerUp = getRandomPowerUpPosition(level);
      setPowerUps((prevPowerUps) => [...prevPowerUps, newPowerUp]);
      setPowerUpTimers((prevPowerUpTimers) => [
        ...prevPowerUpTimers,
        Math.floor(Math.random() * 10) + 1,
      ]);

      const powerUpIndex = powerUps.length;
      hidePowerUpAfterDuration(powerUpIndex, 3000);
    };

    // Set up a timer to generate power-ups at irregular intervals
    const generatePowerUpAtRandomInterval = () => {
      if (Math.random() > 0.5) {
        generatePowerUp();
      }
      const minInterval = 10000; // Minimum interval between power-ups in milliseconds
      const maxInterval = 15000; // Maximum interval between power-ups in milliseconds

      const nextInterval =
        Math.floor(Math.random() * (maxInterval - minInterval + 1)) +
        minInterval;
      setTimeout(generatePowerUpAtRandomInterval, nextInterval);
    };

    generatePowerUpAtRandomInterval();
  };

  const resetTimer = () => {
    switch (level) {
      case "easy":
        setTimer(60);
        break;
      case "medium":
        setTimer(45);
        break;
      case "hard":
        setTimer(30);
        break;
      default:
        break;
    }
  };

  const getTargetClickCount = () => {
    switch (level) {
      case "easy":
        return 3;
      case "medium":
        return 5;
      case "hard":
        return 7;
      default:
        return 0;
    }
  };

  const handleMouseMove = (e) => {
    if (gameStarted) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distance = Math.sqrt(
        Math.pow(mouseX - (buttonRect.left + buttonRect.width / 2), 2) +
          Math.pow(mouseY - (buttonRect.top + buttonRect.height / 2), 2)
      );

      if (distance < radius) {
        const newPosition = getRandomPosition();
        setPosition(newPosition);
      }
    }
  };

  const handleRadiusChange = (e) => {
    setRadius(parseInt(e.target.value, 10));
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    // Validate name
    if (!newName.trim()) {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
    }
  };

  const handleStartGame = () => {
    // Validate name before starting the game
    if (!name.trim()) {
      setNameError("Please enter your name.");
      return;
    }

    setGameStarted(true);
    setShowPopup(false);
    resetGame();
    resetTimer();
    setScreen(2);

    setPowerUps([]);
    setPowerUpTimers([]);

    // Set up a timer to generate power-ups at irregular intervals
    var generatePowerUp = () => {
      const newPowerUp = getRandomPowerUpPosition(level);
      setPowerUps((prevPowerUps) => [...prevPowerUps, newPowerUp]);
      setPowerUpTimers((prevPowerUpTimers) => [
        ...prevPowerUpTimers,
        Math.floor(Math.random() * 10) + 1,
      ]);

      const powerUpIndex = powerUps.length;
      hidePowerUpAfterDuration(powerUpIndex, 3000);
    };

    const minInterval = 10000; // Minimum interval between power-ups in milliseconds
    const maxInterval = 15000; // Maximum interval between power-ups in milliseconds

    const generatePowerUpAtRandomInterval = () => {
      const minInterval = 10000; // Minimum interval between power-ups in milliseconds
      const maxInterval = 15000; // Maximum interval between power-ups in milliseconds
      if (Math.random() > 0.5) {
        generatePowerUp();
      }

      const nextInterval =
        Math.floor(Math.random() * (maxInterval - minInterval + 1)) +
        minInterval;
      setTimeout(generatePowerUpAtRandomInterval, nextInterval);
    };

    generatePowerUpAtRandomInterval();
  };

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
    resetGame();
    resetTimer();
  };

  const handlePowerUpClick = (index) => {
    // Remove the clicked power-up from the state
    const updatedPowerUps = [...powerUps];
    updatedPowerUps.splice(index, 1);
    setPowerUps(updatedPowerUps);

    setTimer((prevTimer) => prevTimer + powerUpTimers[index]);
  };

  const hidePowerUpAfterDuration = (index, duration) => {
    setTimeout(() => {
      const updatedPowerUps = [...powerUps];
      updatedPowerUps.splice(index, 1);
      setPowerUps(updatedPowerUps);
    }, duration);
  };

  useEffect(() => {
    if (screen === 1 && gameStarted) {
      setGameStarted(false);
    }
    document.addEventListener("mousemove", handleMouseMove);

    const intervalId = setInterval(() => {
      if (gameStarted && timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 0) {
        handleGameEnd(false);
      }
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, [radius, gameStarted, timer, screen]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleGoToMainScreen = () => {
    setScreen(1);
    resetGame();
    setGameStarted(false);
  };

  return (
    <>
      {screen === 1 && (
        <>
          <div className="container">
            <label htmlFor="nameInput" className="label">
              Enter Your Name:
            </label>
            <input
              type="text"
              id="nameInput"
              value={name}
              onChange={handleNameChange}
              className="input"
            />
            {nameError && <p className="error">{nameError}</p>}

            <label className="label">Select Level:</label>
            <button
              onClick={() => handleLevelChange("easy")}
              className={`level-button ${level === "easy" ? "active" : ""}`}
            >
              Easy
            </button>

            <button
              onClick={() => handleLevelChange("medium")}
              className={`level-button ${level === "medium" ? "active" : ""}`}
            >
              Medium
            </button>

            <button
              onClick={() => handleLevelChange("hard")}
              className={`level-button ${level === "hard" ? "active" : ""}`}
            >
              Hard
            </button>

            <button
              onClick={() => handleLevelChange("custom")}
              className={`level-button ${level === "custom" ? "active" : ""}`}
            >
              Custom
            </button>

            {level === "custom" && (
              <>
                <div>
                  <label htmlFor="radiusSlider" className="label">
                    Radius:
                  </label>
                  <input
                    type="range"
                    id="radiusSlider"
                    min="10"
                    max="200"
                    value={radius}
                    onChange={handleRadiusChange}
                    className="slider"
                  />
                  <span className="slider-value">{radius} px</span>
                </div>

                <div>
                  <label htmlFor="speedSlider" className="label">
                    Speed:
                  </label>
                  <input
                    type="range"
                    id="speedSlider"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={handleSpeedChange}
                    className="slider"
                  />
                  <span className="slider-value">{speed}x</span>
                </div>
              </>
            )}

            <button onClick={handleStartGame} className="start-button">
              Start Game
            </button>

            <div className="Table-container">
              <h2 className="stats-heading">Games Played Table</h2>
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Total Games Played</th>
                    <th>Wins</th>
                    <th>Losses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{totalGames}</td>
                    <td>{totalWins}</td>
                    <td>{totalLosses}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {screen === 2 && (
        <div className="containerNew">
          <p className="user-info">Name: {name}</p>
          <p className="user-info">Click Count: {clickCount}</p>
          <p className="user-info">Time remaining: {timer} seconds</p>
          <button onClick={handleGoToMainScreen} className="back-button">
            Main Screen
          </button>
        </div>
      )}

      {gameStarted && (
        <div>
          <button
            ref={buttonRef}
            style={{
              position: "absolute",
              top: `${position.y}px`,
              left: `${position.x}px`,
              transition: `top ${0.5 / speed}s ease, left ${
                0.5 / speed
              }s ease, transform 0.3s ease-in-out`,
              transform: "rotate(0deg)",
            }}
            onClick={handleButtonClick}
            onMouseEnter={() => {
              const angle = Math.random() * 20 - 10;
              buttonRef.current.style.transform = `rotate(${angle}deg)`;
            }}
            onMouseLeave={() => {
              buttonRef.current.style.transform = "rotate(0deg)";
            }}
            className="game-button"
          >
            Click me if you can!
          </button>
          {powerUps.map((powerUp, index) => (
            <div
              key={index}
              className="power-up"
              style={{
                top: `${powerUp.y}px`,
                left: `${powerUp.x}px`,
                backgroundColor: powerUp.color,
                width: `${powerUp.size}px`,
                height: `${powerUp.size}px`,
              }}
              onClick={() => handlePowerUpClick(index)}
            >
              <div className="power-up-content">{powerUpTimers[index]}</div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="popup">
          {clickCount === getTargetClickCount() ? (
            <div>
              <p className="popup-message">
                Congratulations, {name}! You completed the game.
              </p>
              <button onClick={startNewGame} className="popup-button">
                Restart
              </button>
              <button onClick={handleGoToMainScreen} className="popup-button">
                Main Screen
              </button>
            </div>
          ) : (
            <div>
              <p className="popup-message">Sorry, {name}! You lost the game.</p>
              <button onClick={startNewGame} className="popup-button">
                Reset
              </button>
              <button onClick={handleGoToMainScreen} className="popup-button">
                Main Screen
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JumpingButton;
