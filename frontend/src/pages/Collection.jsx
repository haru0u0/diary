import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

function Collection() {
  const [allBadgeArr, setAllBadgeArr] = useState([]);
  const [userBadgeArr, setUserBadgeArr] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resAll = await axiosClient.get("/collection/badge/all");
        const resUser = await axiosClient.get("/collection/badge/user");

        const allBadgeNames = resAll.data.allBadge.rows.map(
          (badge) => badge.name
        );
        const userBadgeNames = resUser.data.userBadge.rows.map(
          (badge) => badge.name
        );

        setAllBadgeArr(allBadgeNames);
        setUserBadgeArr(userBadgeNames);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  function conditionalImage(badge) {
    if (userBadgeArr.includes(badge)) {
      return (
        <img
          src={`/images/badges/${badge}.png`}
          className="object-contain h-20 w-20 bg-amber-100"
        />
      );
    } else {
      return (
        <img
          src={`/images/hatena.png`}
          className="object-contain h-20 w-20 bg-slate-200"
        />
      );
    }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-3xl">Your Badge Collection</h2>
        <p>
          Celebrate your exploration of a variety of topics with the badges.
          Earn new badge by writting on a new topic!
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {allBadgeArr.length > 0 ? (
          allBadgeArr.map((badge, index) => (
            <div key={index} className="border-l-4 border-b-2 border-black">
              {conditionalImage(badge)}
            </div>
          ))
        ) : (
          <p>No badges available</p>
        )}
      </div>
    </>
  );
}

export default Collection;
