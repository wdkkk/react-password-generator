import React from "react";

type FixMe = any;

const PasswordsList = ({ passwords, changeAlertStatus }: FixMe) => {
  return (
    <div className="passwords-list">
      <div className="title">Passwords:</div>
      {passwords.map((password: string) => (
        <div
          className="password"
          onClick={(e) => {
            navigator.clipboard.writeText(password);
            changeAlertStatus();
          }}
        >
          {password}
        </div>
      ))}
    </div>
  );
};

export default PasswordsList;
