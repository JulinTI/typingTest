const text = document.querySelector("#text")
const entrance = document.querySelector("#entrance")
const restart = document.querySelector("#restart")
const result = document.querySelector("#result")
const historic = document.querySelector("#historic")
const changeThemeBtn = document.querySelector("#changeTheme")

const texts = [
    "Exemplo para digitar.",
    "Digite corretamente.",
    "Paralelepipedo",
    "Mais um exemplo de texto para digitar.",
    "Digite de acordo com o que está aqui.",
    "Digite isso.",
    "Você pode digitar isso."
];

const newText = () => {
    const index = Math.floor(Math.random() * texts.length);
    text.textContent = texts[index];
}

const updateTest = () => {

    start();

    if (entrance.value === text.textContent) {
        toCheck()
    }

};

const start = () => {
    const testStatus = JSON.parse(localStorage.getItem("testInProgress"));
    if (!testStatus) {
        localStorage.setItem("startTime", new Date().getTime());
        localStorage.setItem("testInProgress", true);
    }
}

const toCheck = () => {
    const finalTime = new Date().getTime();
    const startTime = parseInt(localStorage.getItem("startTime"));
    const timeSpent = (finalTime - startTime) / 1000;
    const formattedTime = timeSpent.toFixed(2);    
    result.textContent = `Parabéns! Você levou ${formattedTime} segundos!`

    addToHistory(text.textContent, formattedTime)

    localStorage.setItem("testInProgress", false);
    entrance.value = "";
    newText();
};

const addToHistory = (typedText, formattedTime  ) => {
    const historicalItem = document.createElement("p");

    historicalItem.textContent = `Texto "${typedText}" - Tempo: ${formattedTime} segundos.`

    historic.appendChild(historicalItem);

    if(historicalItem >= 5){
        restartTest()
    }
}

const restartTest = () => {

    entrance.value = ""
    result.textContent = ""
    newText()
    localStorage.setItem("testInProgress", false)
    historic.innerHTML = ""
}

const changeTheme = () => {
    const body= document.body

    body.classList.toggle("light")
    body.classList.toggle("dark")
}

entrance.addEventListener("keyup", updateTest)
restart.addEventListener("click", restartTest)
changeThemeBtn.addEventListener("click", changeTheme)

newText()