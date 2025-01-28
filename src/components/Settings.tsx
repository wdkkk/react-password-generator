import React, { useEffect, useState } from "react";

import Checkbox from "@mui/joy/Checkbox";
import Slider from "@mui/joy/Slider";

import { useSpring, animated } from "@react-spring/web";

import { ISettingsParameter } from "../types";

import { INITIAL_SETTINGS_DATA } from "../utils/constants";

type Error = "Error";

function instanceOfCheckbox(object: any): object is ISettingsParameter {
  return true;
}

type Props = {
  changeSettingsData: (newData: ISettingsParameter[]) => void;
  changePasswordSize: (newSize: number) => void;
};
const Settings = ({ changeSettingsData, changePasswordSize }: Props) => {
  const [passwordSize, setPasswordSize] = useState<number>(5);
  const [settingsData, setSettingsData] = useState<ISettingsParameter[]>(
    INITIAL_SETTINGS_DATA
  );
  const spring = useSpring({ passwordSize });

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setPasswordSize(newValue);
      changePasswordSize(newValue);
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxIndex = parseInt(event.target.id[2]);

    let currentSettingsDataElement: ISettingsParameter | Error = "Error";

    settingsData.findIndex((element): boolean => {
      if (element.index === checkboxIndex) {
        currentSettingsDataElement = element;
        return true;
      }
      return false;
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
  }, [changeSettingsData, settingsData]);

  return (
    <div className="settings">
      <div className="title">Settings:</div>

      <div className="settings-column">
        {settingsData.map((parameter) => (
          <Checkbox
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
        Password size:{" "}
        <animated.span>
          {spring.passwordSize.to((n) => n.toFixed(0))}
        </animated.span>
        .
        <Slider
          defaultValue={passwordSize}
          min={8}
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
