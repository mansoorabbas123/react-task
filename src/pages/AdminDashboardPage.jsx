import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../authContext";
import btn_icon from "../asset/btn-icon.png";
import up_arrow from "../asset/up-arrow.png";
import { useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setDate] = useState({
    error: false,
    list: [
      {
        id: 1,
        title:
          "Rune raises $100,000 for marketing through NFT butterflies sale",
        photo: "https://picsum.photos/200/200",
        user_id: 1,
        username: "boss",
        create_at: "2022-01-01",
        update_at: "2022-01-01T04:00:00.000Z",
        like: 10,
      },
    ],
    page: 1,
    limit: 10,
    total: 112,
    num_pages: 12,
  });

  useEffect(() => {
    let sdk = new MkdSDK();
    sdk.callRestAPI({}, "GET");
  }, []);

  return (
    <div className="w-[85%] mx-auto font-[100]">
      <div className="flex justify-between items-center">
        <div className="font-[900] text-[48px] text-[#fff]">App</div>
        <button
          className="bg-[#9BFF00] hover:bg-[#99ff00b9] px-8 text-[#696969] hover:text-[#fff] py-3 rounded-[25px] flex"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            navigate("/admin/login");
          }}
        >
          <img src={btn_icon} className="mr-2" /> <font>logout</font>
        </button>
      </div>
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-[#FFFFFF] text-[40px]">Today’s leaderboard</h1>
          <div
            className="bg-[#181717] rounded-lg p-3 text-[#ffffffa5]"
            style={{ boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.75)" }}
          >
            30 May 2022
            <button
              className="text-[#4f4f4f] hover:text-[#fff] bg-[#9BFF00] hover:bg-[#99ff00b9] px-2 mx-2 rounded-md"
              style={{ boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.75)" }}
            >
              Submissions OPEN
            </button>{" "}
            11:34
          </div>
        </div>

        <div>
          <table className="w-full mt-5" cellPadding="10">
            <thead className="text-[#696969] ">
              <tr>
                <th className="text-left font-[100]">
                  #{"  "}
                  Title
                </th>
                <th className="font-[100] text-center">Author</th>
                <th className="text-right font-[100]">Most Liked</th>
              </tr>
            </thead>
            <tbody>
              {data.list.map((li) => {
                return (
                  <tr
                    key={li.id}
                    className=""
                    style={{
                      border: "1px solid #696969",
                      borderRadius: "20px",
                    }}
                  >
                    <td className="flex items-center text-left w-[500px]">
                      <div style={{ width: "150px", height: "80px" }}>
                        <img
                          src={li.photo}
                          className="w-full h-full rounded"
                        ></img>
                      </div>
                      <p className="text-[#FFFFFF] rounded-md p-2">
                        {li.title}
                      </p>
                    </td>
                    <td className="text-[#DBFD51] font-[100] text-[16px] text-center">
                      {li.username}
                    </td>
                    <td className="text-[#FFFFFF] font-[100] text-[16px] text-right pr-8">
                      {li.like}
                      <img className="inline ml-2 mb-1" src={up_arrow} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
