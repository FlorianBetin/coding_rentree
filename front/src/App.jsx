import Wilder from './components/wilder/Wilder';
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AddWilder from './components/addwilder/Addwilder';

function App() {
  const [wilders, setWilders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const wilders = await axios.get("http://localhost:5000/api/wilder");
      console.log(wilders.data, "wilder.data");
      setWilders(wilders.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <div>
          <h3>Add a wilder</h3>
          <AddWilder />
        </div>
        <section className="card-row">
          {wilders.map((wilder) => (
          <Wilder
          key={wilder.id}
          name={wilder.name}
          skills={wilder.skills}
          city={wilder.city}
          wilderId={wilder.id}/>
          ))}

        </section>

      </main>
    </div>
  );
}

export default App;
