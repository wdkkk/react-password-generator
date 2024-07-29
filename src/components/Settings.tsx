import React, { useEffect, useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import Slider from "@mui/joy/Slider";
import { SettingsParameter } from "../types/SettingsParameter";

type Error = "Error";

function instanceOfCheckbox(object: any): object is SettingsParameter {
  return true;
}

type Props = {
  changeSettingsData: (newData: SettingsParameter[]) => void;
  changePasswordSize: (newSize: number) => void;
};
const Settings = ({ changeSettingsData, changePasswordSize }: Props) => {
  const [passwordSize, setPasswordSize] = useState<number>(5);
  const [settingsData, setSettingsData] = useState<SettingsParameter[]>([
    {
      index: 0,
      name: "Numbers",
      use: true,
    },
    {
      index: 1,
      name: "Small letters",
      use: true,
    },
    {
      index: 2,
      name: "Big letters",
      use: true,
    },
    {
      index: 3,
      name: "Special symbols",
      use: true,
    },
  ]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setPasswordSize(newValue);
      changePasswordSize(newValue);
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxIndex = parseInt(event.target.id[2]);

    let currentSettingsDataElement: SettingsParameter | Error = "Error";
    settingsData.findIndex((element) => {
      if (element.index === checkboxIndex) currentSettingsDataElement = element;
    });

    if (instanceOfCheckbox(currentSettingsDataElement)) {
      currentSettingsDataElement.use = !currentSettingsDataElement.use;
      setSettingsData([
        ...settingsData.filter((el) => el.index < checkboxIndex),
        currentSettingsDataElement,
        ...settingsData.filter((el) => el.index > checkboxIndex),
      ]);
    }
  };

  useEffect(() => {
    changeSettingsData(settingsData);
  }, [settingsData]);

  return (
    <div className="settings">
      <div className="title">Settings:</div>

      <div className="settings-column">
        {settingsData.map((parameter) => (
          <Checkbox
            defaultChecked
            label={parameter.name}
            checked={parameter.use}
            key={parameter.index}
            variant="outlined"
            onChange={handleCheckboxChange}
            className="checkbox"
          />
        ))}
      </div>

      <div className="settings__size">
        Password size: {passwordSize}.
        <Slider
          defaultValue={passwordSize}
          min={5}
          max={35}
          valueLabelDisplay="auto"
          value={passwordSize}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default Settings;
