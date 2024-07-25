import axiosClient from "../api/axiosClient";
import React from "react";

function Test() {
  const [city, setCity] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = new FormData(e.target).get("country");

    try {
      //const res = await checkApi.test(country);
      const res = await axiosClient.get("/test", {
        params: { country: input },
      });
      setCity(res.data.capital);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      Type a name of the country that you want to learn its capital!
      <form onSubmit={handleSubmit}>
        <input
          name="country"
          id="country"
          label="country"
          placeholder="country"
        />
        <button>Submit</button>
      </form>
      <p>The capital of the country is: {city}</p>
    </>
  );
}

export default Test;
