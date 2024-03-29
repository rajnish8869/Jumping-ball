# JumpingButton

JumpingButton is a React component representing a simple game where users have to click on a moving button within a certain time limit to win. The game includes features like different levels, power-ups, and scoring.

## Features

- Three difficulty levels: easy, medium, and hard.
- Customizable game settings such as button radius and speed.
- Power-ups that extend the game timer.
- Statistics tracking for games played, wins, and losses.

## Live Demo

You can try the live demo [here](https://juming-ball.netlify.app/).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/jumping-button.git
```

2. Navigate to the project directory:

```bash
cd jumping-button
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Usage

```javascript
import React from 'react';
import JumpingButton from './JumpingButton';

const App = () => {
  return (
    <div>
      <JumpingButton />
    </div>
  );
};

export default App;
```

## Props

The `JumpingButton` component does not accept any props.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
