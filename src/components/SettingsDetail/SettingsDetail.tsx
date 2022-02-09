import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import SettingsProps from "../../props/settings.props";
import { GameContext } from "../../store/game-context";
import SelectDropdown from "../UI/SelectDropdown/SelectDropdown";

const SettingsDetail: FC<SettingsProps> = observer(({ settingsConfig }) => {
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
      {settingsConfig.currentWordLength && (
        <SelectDropdown
          onChange={handleWordLengthChanged}
          values={settingsConfig.wordLengths}
          defaultValue={settingsConfig.currentWordLength}
          label={"Word Length"}
        />
      )}
      <hr className="border border-gray-300" />

      {settingsConfig.currentTries && (
        <SelectDropdown
          onChange={handleTriesChanged}
          values={settingsConfig.tries}
          defaultValue={settingsConfig.currentTries}
          label={"Total Attempts"}
        />
      )}
      <hr className="border border-gray-300" />

      {settingsConfig.currentLang && (
        <SelectDropdown
          onChange={handleLanguageChanged}
          values={settingsConfig.languages}
          defaultValue={settingsConfig.currentLang}
          label={"Language"}
        />
      )}
    </div>
  );
});

export default SettingsDetail;
