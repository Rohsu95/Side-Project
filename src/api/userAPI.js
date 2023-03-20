import axios from "axios";

const url = `http://localhost:1337/api`;

export const getWrite = async () => {
  try {
    const res = await axios({
      url: `${url}/reals?populate=*`,
      method: "get",
      // headers: { Authorization: `Bearer ${Token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
