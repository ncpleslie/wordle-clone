import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import SettingsDetail from "../../components/SettingsDetail/SettingsDetail";
import LoadingIndicator from "../../components/UI/LoadingIndicator/LoadingIndicator";
import Modal from "../../components/UI/Modal/Modal";
import SettingsConfig from "../../models/settings-config.model";
import { GameContext } from "../../store/game-context";

const Settings = observer(() => {
  const store = useContext(GameContext);
  const [settingsConfig, setSettingsConfig] = useState<SettingsConfig | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const settingsConfig = await store?.getSettings();

      if (settingsConfig) {
        setSettingsConfig(settingsConfig);
        console.log(settingsConfig);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <Modal title="Settings">
      {isLoading && (
        <div className="p-4">
          <LoadingIndicator />
        </div>
      )}
      {!isLoading && settingsConfig && (
        <SettingsDetail settingsConfig={settingsConfig} />
      )}
    </Modal>
  );
});

export default Settings;
