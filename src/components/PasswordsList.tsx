type Props = {
  passwords: string[];
  changeAlertStatus: () => void;
};
const PasswordsList = ({ passwords, changeAlertStatus }: Props) => {
  return (
    <div className="passwords-list">
      <div className="title">Passwords:</div>
      {passwords.map((password: string, index: number) => (
        <div
          key={index}
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
