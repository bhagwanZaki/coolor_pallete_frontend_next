"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../css/page.module.css";
import { createPallete, getPalletesFromAction } from "@/action/colorapi";

import Pallete from "./component/pallete";
import RippleLoader from "./component/RippleLoader";
import EllipseLoader from "./component/EllipseLoader";

export default function Home() {
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  // Loading state
  const [mainLoading, setMainLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [moreloading, setMoreLoading] = useState(false);

  const dispatch = useDispatch();
  const palleteData = useSelector((state) => state.colorDataReducer);

  useEffect(() => {
    async function fetchAPI() {
      await getPalletesFromAction(setMainLoading, dispatch, page);
    }
    fetchAPI();
  }, []);

  const loadMoreCollor = async () => {
    setMoreLoading(true);
    await getPalletesFromAction(setMoreLoading, dispatch, page + 1);
    var temp = page + 1;
    setPage(temp);
  };

  const addPallete = async (e) => {
    e.preventDefault();
    if (text.includes("https://coolors.co/")) {
      setAddLoading(true);
      await createPallete(text, dispatch);
      setAddLoading(false);
    } else {
      alert("Invalid url");
    }
    setText("");
  };

  return (
    <>
      {mainLoading ? (
        <section className={styles.loadingSec}>
          <RippleLoader />
        </section>
      ) : (
        <main className={styles.main}>
          <form className={styles.addDiv} onSubmit={(e) => addPallete(e)}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the coolors link"
              className={styles.textField}
            />
            {addLoading ? (
              <button className={styles.disableBtn} disabled>
                <EllipseLoader />
              </button>
            ) : (
              <input type="submit" value="Add" className={styles.btn} />
            )}
          </form>
          <div className={styles.palletteGrp}>
            {palleteData.data !== undefined ? (
              palleteData.data.map((data, index) => (
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
          {!palleteData.isLast && !moreloading ? (
            <button
              className={styles.loadMore}
              onClick={() => loadMoreCollor()}
            >
              Load more
            </button>
          ) : (
            <></>
          )}

          {moreloading ? <RippleLoader /> : <></>}
        </main>
      )}
    </>
  );
}
