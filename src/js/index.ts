import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index"

interface IBruger {
    bruger_id: number;
    brugernavn: string;
    highscore: number;
    wins: number;
    loses: number;
    winstreak: number;
}

//let divElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");

let getButtonElement: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getHighscoreButton");
getButtonElement.addEventListener('click', getHighscore)

const azureUri: string = "https://test.azurewebsites.net/api/bruger";
const localUri: string = "https://localhost:5001/api/bruger";

var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable");
var row1 = table.insertRow(0);
var brugernavn = row1.insertCell(0);
var highscore = row1.insertCell(1);
var wins = row1.insertCell(2);
var loses = row1.insertCell(3);
var winstreak = row1.insertCell(4);
brugernavn.innerHTML = "Brugernavn";
highscore.innerHTML = "Highscore";
wins.innerHTML = "Wins";
loses.innerHTML = "Loses";
winstreak.innerHTML = "Winstreak";

function getHighscore(): void {
    axios.get<IBruger[]>(localUri)
    .then(function (response: AxiosResponse<IBruger[]>):void {
        response.data.forEach((bruger:IBruger) => {
            if(bruger == null)
            {
                var newrow = table.insertRow(1);
                var nulltext = newrow.insertCell(0);
                nulltext.innerHTML = "Null Element"
            }
            else
            {
                var newrow1 = table.insertRow()
                var bruger1 = newrow1.insertCell(0);
                var highscore1 = newrow1.insertCell(1);
                var wins1 = newrow1.insertCell(2);
                var loses1 = newrow1.insertCell(3);
                var winstreak1 = newrow1.insertCell(4);
                bruger1.innerHTML = bruger.brugernavn;
                highscore1.innerHTML = bruger.highscore.toString();
                wins1.innerHTML = bruger.wins.toString();
                loses1.innerHTML = bruger.loses.toString();
                winstreak1.innerHTML = bruger.winstreak.toString();
            }
        });
        }
    )
    .catch(function (error: AxiosError): void {
        if(error.response) {
            var newrow = table.insertRow(1);
            var nulltext = newrow.insertCell(0);
            nulltext.innerHTML = error.message;
        }
    })
    }