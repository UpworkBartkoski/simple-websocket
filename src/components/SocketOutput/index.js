import React from "react";
import moment from "moment";
import "./index.css";

export const SocketOutput = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="box-container output">
        <table>
          <thead>
            <tr>
              <td width="100">
                <h4>Time stamp</h4>
              </td>
              <td width="100">
                <h4>Type</h4>
              </td>
              <td width="100">
                <h4>Payload</h4>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {moment(new Date(item.timeStamp)).format(
                    "MMM DD, yyyy hh:mm"
                  )}
                </td>
                <td>{item.type}</td>
                <td>{item.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
