import React from "react";
import Data from "./mock-data.json";

export default function SearchBar({ query, currentField }) {
    return (
        <div className="search-bar ">
            <div>
                <div
                    className=" d-flex justify-content-between  bg-dark"
                    style={{ lineHeight: "1" }}
                >
                    <h6>No</h6>
                    <h6 className="d-block ">{currentField}</h6>
                </div>

                {Data.filter((post) => {
                    if (query === "") {
                        return post;
                    } else if (
                        post.first_name
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    ) {
                        return post;
                    }
                })
                    .slice(0, 5)
                    .map((post, index) => (
                        <div
                            className="box  row"
                            key={index}
                            style={{ borderBottom: "1px solid black" }}
                        >
                            <span className=" col-4">{index + 1}</span>
                            <span className=" col-4">{post.first_name}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
