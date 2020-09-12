const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
const MAX_HIGH_SCORES = 5;
console.log("highscores");

localStorage.setItem("highScores", JSON.stringify([]));
console.log(JSON.parse(localStorage.getItem("highScores")));

finalScore.innerText = mostRecentScore;

// only turns button on after username input
username.addEventListener('input', () => {
    // console.log(username.value); // log key values 
    saveScoreBtn.disabled = !username.value;
 });

saveHighScore = (e) => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    // add score to array
    highScores.push(score);
    // sort score descending
    highScores.sort( (a,b) => b.score - a.score);
    // remove low scores
    highScores.slice(0, 5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/highscores.html');
    console.log(highScores);
};

