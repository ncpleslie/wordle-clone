import { observer } from "mobx-react-lite";
import { useContext } from "react";
import SettingsProps from "../../props/settings.props";
import { GameContext } from "../../store/game-context";
import SelectDropdown from "../UI/SelectDropdown/SelectDropdown";

const SettingsDetail = observer((props: SettingsProps) => {
  const store = useContext(GameContext);

  const handleWordLengthChanged = (newValue: string) => {
    store?.setWordLength(parseInt(newValue));
  };

  const handleTriesChanged = (newValue: string) => {
    store?.setTries(parseInt(newValue));
  };

  const handleLanguageChanged = (newValue: string) => {
    store?.setLang(newValue);
  };

  return (
    <div className="w-72 h-52 my-10 mx-10 flex flex-col gap-2">
      {props.settingsConfig.currentWordLength && (
        <SelectDropdown
          onChange={handleWordLengthChanged}
          values={props.settingsConfig.wordLengths}
          defaultValue={props.settingsConfig.currentWordLength}
          label={"Word Length"}
        />
      )}
      <hr className="border border-gray-300" />

      {props.settingsConfig.currentTries && (
        <SelectDropdown
          onChange={handleTriesChanged}
          values={props.settingsConfig.tries}
          defaultValue={props.settingsConfig.currentTries}
          label={"Total Attempts"}
        />
      )}
      <hr className="border border-gray-300" />

      {props.settingsConfig.currentLang && (
        <SelectDropdown
          onChange={handleLanguageChanged}
          values={props.settingsConfig.languages}
          defaultValue={props.settingsConfig.currentLang}
          label={"Language"}
        />
      )}
    </div>
  );
});

export default SettingsDetail;
