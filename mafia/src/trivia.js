const questions = [
    {
        question: "who is known as the \"Queen of Pop\"?",
        options: ["Madonna", "Beyonce", "Rihanna", "Taylor Swift"],
        answer: "Madonna"
    },
    {
        question: "which country won the FIFA World Cup in 2018?",
        options: ["Croatia", "Belgium", "France", "England"],
        answer: "France"
    },
    {
        question: "what was considered to be the first video game ever created?",
        options: ["Space Invaders", "Pacman", "Tetris", "Pong"],
        answer: "Pong"
    },
    {
        question: "where does the game Mafia Originate From?",
        options: ["Italy", "Soviet Union", "USA", "Russia"],
        answer: "Soviet Union",
    },
    {
        question: "during the mid-20th century, the Mafia played a significant role in the development of which American city?",
        options: ["New York", "Chicago", "Los Angeles", "Las Vegas"],
        answer: "Las Vegas",
    },
    {
        question: "what term is commonly used to describe the Mafia's code of silence and refusal to cooperate with law enforcement?",
        options: ["Omerta", "Cosa Nostra", "Capo", "Consigliere"],
        answer: "Omerta",
    },
    {
        question: "what former Mafia member became a high-profile informant, helping the FBI dismantle the American Mafia in the 1980s?",
        options: ["John Junior Gotti", "Salvatore \"Sammy the Bull\" Gravano", "Vincent \"The Chin\" Gigante", "Joseph \"Joe Bananas\" Bonanno"],
        answer: "Salvatore \"Sammy the Bull\" Gravano",
    },
    {
        question: "what city is often considered the birthplace of the real-life Mafia, where criminal organizations like the Sicilian Mafia first emerged?",
        options: ["Rome", "Naples", "Palermo", "Venice"],
        answer: "Palermo",
    },
    {
        question: "what is the name of the Italian-American Mafia that emerged in the United States during the late 19th century?",
        options: ["Cosa Nostra", "La Cosa Nostra", "The Mob", "The Outfit"],
        answer: "Cosa Nostra",
    },
    {
        question: "which country doesn't border the Caspian Sea?",
        options: ["Azerbaijan", "Uzbekistan", "Kazakhstan", "Iran"],
        answer: "Uzbekistan",
    }
];

export const getTriviaQuestions = (quantity) => {
    const questionsCopy = [...questions];
    const selectedQuestions = [];
    for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * questionsCopy.length);
        selectedQuestions.push(questionsCopy[randomIndex]);
        questionsCopy.splice(randomIndex, 1);
    }
    return selectedQuestions;
}

export const getRandomTriviaQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}