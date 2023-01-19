import { useState } from 'react';
import LeagueStandings from './components/LeagueStandings';
import './App.css';

// 3e6a38eb358710e175aab99a97472d73

function App() {
  const [todaysGames, setTodaysGames] = useState([])
  const [tomorrowsGames, setTomorrowsGames] = useState([])
  const [standings, setStandings] = useState([])

  const headers = {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": "3e6a38eb358710e175aab99a97472d73"
    }
  }

  const updateStandings = () => {
    fetch("https://v2.nba.api-sports.io/standings?league=standard&season=2022", headers)
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        setStandings(response.response)
      })
      .catch(err => {
        console.log(err);
      });
  }






  return (
    <div className="App">
      <h1>Tank Tracker</h1>
      <button onClick={() => updateStandings()}>Update</button>
      <LeagueStandings standings={standings}/>
    </div>
  );
}

export default App;
