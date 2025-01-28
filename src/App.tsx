import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

import "./style.css";

import Settings from "./components/Settings";
import ThemeChanger from "./components/ThemeChanger";

import { Button } from "@mui/joy";
import PasswordsList from "./components/PasswordsList";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";

import { ISettingsParameter } from "./types";

import { generatePasswords } from "./utils/generatePasswords";
import { INITIAL_SETTINGS_DATA } from "./utils/constants";

interface Password {
  isGenerated: boolean;
  passwords: string[];
}

function App() {
  const [theme, setTheme] = useState("light");
  const changeTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const changeSettingsData = (newData: ISettingsParameter[]) => {
    setSettingsData(newData);
  };
  const changePasswordSize = (newSize: number) => {
    setPasswordSize(newSize);
  };
  const changeCopyAlertStatus = () => {
    setAlertCopyStatus(false);
    setTimeout(() => {
      setAlertCopyStatus(true);
    }, 100);

    setTimeout(() => {
      setAlertCopyStatus(false);
    }, 3500);
  };
  const changeErrorAlertStatus = () => {
    setAlertErrorStatus(false);
    setTimeout(() => {
      setAlertErrorStatus(true);
    }, 100);

    setTimeout(() => {
      setAlertErrorStatus(false);
    }, 3500);
  };

  const [settingsData, setSettingsData] = useState<ISettingsParameter[]>(
    INITIAL_SETTINGS_DATA
  );

  const [passwordSize, setPasswordSize] = useState<number>(5);
  const [generatedPasswords, setPasswords] = useState<Password>({
    isGenerated: false,
    passwords: [],
  });
  const [alertCopyStatus, setAlertCopyStatus] = useState<boolean>(false);
  const [alertErrorStatus, setAlertErrorStatus] = useState<boolean>(false);

  const fadeIn = useSpring({
    opacity: generatedPasswords.isGenerated ? 1 : 0,
    transform: generatedPasswords.isGenerated
      ? "translateY(0)"
      : "translateY(-20px)",
  });

  const alertCopyNodeRef = useRef(null);
  const alertErrorNodeRef = useRef(null);

  return (
    <div className="app" data-theme={theme}>
      <div className="container">
        <Settings
          changeSettingsData={changeSettingsData}
          changePasswordSize={changePasswordSize}
        />
        <Button
          variant="outlined"
          style={{ marginBottom: 40 }}
          onClick={(e) => {
            const newPasswords = generatePasswords(settingsData, passwordSize);
            if (newPasswords) {
              const obj = {
                isGenerated: true,
                passwords: [...newPasswords],
              };

              setPasswords(obj);
            } else {
              changeErrorAlertStatus();
            }
            setAlertCopyStatus(false);
          }}
        >
          Generate
        </Button>
        {generatedPasswords.isGenerated && (
          <animated.div style={fadeIn}>
            <PasswordsList
              changeAlertStatus={changeCopyAlertStatus}
              passwords={generatedPasswords.passwords}
            />
          </animated.div>
        )}
        <CSSTransition
          in={alertCopyStatus}
          nodeRef={alertCopyNodeRef}
          timeout={400}
          classNames="alert"
          unmountOnExit
          onEnter={() => setAlertCopyStatus(true)}
          onExited={() => setAlertCopyStatus(false)}
        >
          <Alert
            ref={alertCopyNodeRef}
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Check fontSize="medium" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              >
                <Close onClick={() => setAlertCopyStatus(false)} />
              </IconButton>
            }
            sx={{
              alignItems: "flex-start",
              overflow: "hidden",
              position: "absolute",
              bottom: 20,
              width: "800px",
            }}
          >
            <div>
              <Typography level="title-lg">Copied</Typography>
              <Typography level="body-sm">
                Password was copied to clipboard
              </Typography>
            </div>
          </Alert>
        </CSSTransition>

        <CSSTransition
          in={alertErrorStatus}
          nodeRef={alertErrorNodeRef}
          timeout={400}
          classNames="alert"
          unmountOnExit
          onEnter={() => setAlertErrorStatus(true)}
          onExited={() => setAlertErrorStatus(false)}
        >
          <Alert
            ref={alertErrorNodeRef}
            size="lg"
            color="danger"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Close fontSize="medium" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              >
                <Close onClick={() => setAlertErrorStatus(false)} />
              </IconButton>
            }
            sx={{
              alignItems: "flex-start",
              overflow: "hidden",
              position: "absolute",
              bottom: 20,
              width: "800px",
            }}
          >
            <div>
              <Typography level="title-lg">
                Password wasn't generated
              </Typography>
              <Typography level="body-sm">Settings are empty</Typography>
            </div>
          </Alert>
        </CSSTransition>

        <ThemeChanger changeTheme={changeTheme} />
      </div>
    </div>
  );
}

export default App;
