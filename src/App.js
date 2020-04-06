import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  //hooks
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries"),
      ])
      .then((ResponseArr) => {
        setLatest(ResponseArr[0].data);
        setResults(ResponseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //get time in msec then convert it to Integer
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const countries = results.map((data) => {
    return (
      <Card
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Today's cases {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths {data.todyDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Death</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      {countries}
    </div>
  );
}

export default App;
