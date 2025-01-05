import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
const URL_POST_DATA =
  "https://script.google.com/macros/s/AKfycbyoDilHTM236kcDwvSOPRHeGXDkxKFGCZ4DH-iEwc6g0QoLI0Lsfkpso27sxPJKImGA/exec";

const AllStudentsList = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const selectedCategory = (e) => {
    const category = e.target.value;
    if (category === "All") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter(
        (item) => item.category === category
      );
      console.log(filtered);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(URL_POST_DATA);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();
        
        setOriginalData(result.data.slice(1));
        setFilteredData(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="fixed-filter-section">
          <div className="filter-section">
            <img
              className="icon"
              src="/images/filter_1.png"
              alt="Filter Icon"
            />
            <p>Filter</p>
          </div>
          <div>
            <div className="category-filter">
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                id="category-select"
                onChange={selectedCategory}
              >
                <option value="All">All</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>
        </div>
        <div className="refresh refresh-data ">
          <span onClick={() => window.location.reload()}>
            <img
              className={`refresh-icon ${isFetching ? "rotate" : ""}`}
              src="../../images/refresh-1.png"
              alt=""
            />
          </span>
        </div>
        <div className="data-show data-show-scroll">
          <table id="table" style={{ marginTop: "20px" }}>
            <thead className="table-head">
              <tr>
                <th className="srno">S.No.</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Phone No</th>
                <th>Form Number</th>
                <th className="cuet-application-no">CUET Application No</th>
                <th>CUET Marks</th>
                <th>10th Marksheet</th>
                <th>12th Marksheet</th>
                <th>Submit Date</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="srno">{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.fatherName}</td>
                  <td>{row.motherName}</td>
                  <td>{row.email}</td>
                  <td>{row.dob.split("T")[0]}</td>
                  <td>{row.gender}</td>
                  <td>{row.category}</td>
                  <td>{row.phoneNo}</td>
                  <td>{row.formNo}</td>
                  <td>{row.cuetNo}</td>
                  <td>{row.cuetMarks}</td>
                  <td>
                    <a
                      className="view-icon"
                      href={
                        "https://drive.google.com/file/d/" +
                        row.marksheet10th
                          .split("uc?id=")[1]
                          ?.split("&export")[0] +
                        "/preview"
                      }
                      target="_blank"
                    >
                      <img
                        className="eye-icon"
                        src="../../images/eye.png"
                        alt="View 10th Marksheet"
                      />
                      <p>View</p>
                    </a>
                  </td>
                  <td>
                    <a
                      className="view-icon"
                      href={
                        "https://drive.google.com/file/d/" +
                        row.marksheet12th
                          .split("uc?id=")[1]
                          ?.split("&export")[0] +
                        "/preview"
                      }
                      target="_blank"
                    >
                      <img
                        className="eye-icon"
                        src="../../images/eye.png"
                        alt="View 12th Marksheet"
                      />
                      <p>View</p>
                    </a>
                  </td>

                  <td>{row.timestamp.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="15" className="no-data-found">
                  No Data Found
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudentsList;