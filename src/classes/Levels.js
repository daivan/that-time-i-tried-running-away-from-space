class Levels {

    constructor(currentLevel) {
        this.currentLevel = currentLevel;

        this.levels = [
            {
                name: 'level1',
                movesLeft: 50,
                requests: [
                    {
                        start: [0, 4],
                        goal: [7, 3],
                        name: 'index.html'
                    },
                    {
                        start: [3, 0],
                        goal: [5, 7],
                        name: 'meme.png'
                    },
                ],
                goals: [
                    {
                        start: [7, 3],
                        name: 'index.html'

                    },
                    {
                        start: [5, 7],
                        name: 'meme.png'
                    },
                ],
            },
            {
                name: 'level2',
                movesLeft: 200,
                requests: [
                    {
                        start: [0, 4],
                        goal: [7, 1],
                        name: 'index.php'
                    },
                    {
                        start: [0, 2],
                        goal: [7, 4],
                        name: 'style.css'
                    },
                    {
                        start: [4, 0],
                        goal: [3, 7],
                        name: 'hack.js'
                    },
                    {
                        start: [3, 0],
                        goal: [4, 7],
                        name: 'dont.zip'
                    },
                ],
                goals: [
                    {
                        start: [7, 1],
                        name: 'index.php'
                    },
                    {
                        start: [7, 4],
                        name: 'style.css'
                    },
                    {
                        start: [3, 7],
                        name: 'hack.js'
                    },
                    {
                        start: [4, 7],
                        name: 'dont.zip'
                    },
                ],
            },
        ];
    }


    getCurrentLevel() {
        return this.levels[this.currentLevel];
    }

    setNextLevel() {
        this.currentLevel++;
    }
}