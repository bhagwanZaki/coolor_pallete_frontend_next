import axios from "axios";
import { getColor, addColor } from "@/redux/reducers/color-slice";

export const URL = "https://coolor-pallete-backend-fastapi.vercel.app/";

export async function getPalletesFromAction(loadingState, dispatch,page) {
  const res = await axios
    .get(`${URL}?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      loadingState(false);
      dispatch(getColor(res.data));
      return res.data;
    })
    .catch((err) => {
      loadingState(false);
      console.log(err);
      return err;
    });

  return res;
}

export async function createPallete(palleteUrl, dispatch) {
  var sub1 = palleteUrl.split("https://coolors.co/")[1];
  var arr = sub1.split("-");
  await axios
    .post(
      `${URL}create/`,
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
      console.log(res.data);
      dispatch(addColor(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
}
