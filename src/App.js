import { useEffect, useState } from "react";
import "./App.css";
import api, { getInfo } from "./api";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [result, setResult] = useState([]);

  async function consultaApi() {
    await getInfo().then((response) => {
      setData(response.data);
    });
    await api.get("/users/defunkt").then(({ data, status }) => {
      setUser(data);
    });
    const { data } = await axios.get("https://opentdb.com/api.php?amount=10");
    await axios
      .get("https://community-open-weather-map.p.rapidapi.com/forecast", {
        params: {
          q: "London,uk",
          lat: "0",
          lon: "0",
          callback: "test",
          id: "2172797",
          lang: "null",
          units: "imperial",
          mode: "xml",
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "06ca145952msh74fc9da7bbdceefp1d5740jsnbce2734a5919",
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

    setResult(data.results);
  }

  useEffect(() => {
    consultaApi();
  }, []);

  return (
    <div className="App">
      <span>{user.login}</span>
      {data.map((repo) => {
        return (
          <div key={repo.id}>
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
          </div>
        );
      })}
      {result.map((repo) => {
        return (
          <div key={repo.id}>
            <h1>{repo.question}</h1>
            <p>{repo.correct_answer}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
