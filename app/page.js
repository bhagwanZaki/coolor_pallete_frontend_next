"use client";

import Pallete from "./component/pallete";
import styles from "../css/page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const URL = "https://coolor-pallete-backend-fastapi.vercel.app/";

// api call
async function getPalletes(setLoading, setPallete) {
  const res = await axios
    .get(URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setLoading(false);
      setPallete(res.data);
      return res.data;
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
      return err;
    });

  return res;
}

async function createPallete(setLoading, palleteUrl, setPallete) {
  var sub1 = palleteUrl.split("https://coolors.co/")[1];
  var arr = sub1.split("-");
  const res = await axios
    .post(
      `${URL}create`,
      {
        color1: arr[0],
        color2: arr[1],
        color3: arr[2],
        color4: arr[3],
        color5: arr[4],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (res) => {
      await getPalletes(setLoading, setPallete);
      setLoading(false);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return res;
}

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [pallete, setPallete] = useState();

  useEffect(() => {
    async function fetchAPI() {
      await getPalletes(setLoading, setPallete);
    }

    fetchAPI();
  }, []);

  const addPallete = async (e) => {
    e.preventDefault();

    if (text.includes("https://coolors.co/")) {
      setLoading(true);
      const res = await createPallete(setLoading, text, setPallete);
      setText("")
    } else {
      alert("Invalid url");
    }
  };

  return (
    <>
      {loading ? (
        <section className={styles.loadingSec}>
          <h3>
            Loading ...
          </h3>
        </section>
      ) : (
        <main className={styles.main}>
          <h1>Coolor pallete saver</h1>
          <form className={styles.addDiv} onSubmit={(e) => addPallete(e)}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the coolors link"
              className={styles.textField}
            />
            <input type="submit" value="Add" className={styles.btn} />
          </form>
          <div className={styles.palletteGrp}>
            {pallete !== undefined ? (
              pallete.map((data, index) => (
                <Pallete
                  key={index}
                  color1={data.color1}
                  color2={data.color2}
                  color3={data.color3}
                  color4={data.color4}
                  color5={data.color5}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </main>
      )}
    </>
  );
}
