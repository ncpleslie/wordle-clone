import Key from "../UI/Key/Key";

const Keyboard = () => {
    const handleOnKeyboardKeyClick = (key: string): void => {
        console.log(key);
    }

    const keyboardState: { [key: string]: any } = {
        'Q': {
            character: 'Q',
            order: 0,
            row: 0,
            usedLocationKnown: true,
            usedLocationUnknown: false
        }
    }


    return (
        <div>
            {
                Object.keys(keyboardState).map((keyName: string, i: number) =>
                    <Key
                        character={keyName}
                        usedLocationKnown={keyboardState[keyName].usedLocationKnown}
                        usedLocationUnknown={keyboardState[keyName].usedLocationUnknown}
                        onKeyClicked={handleOnKeyboardKeyClick}
                        key={i}
                    />
                )
            }
            <div className="flex flex-row gap-1">
                <Key character={'Q'} usedLocationKnown={false} usedLocationUnknown={false} onKeyClicked={handleOnKeyboardKeyClick} />
                <Key character={'W'} usedLocationKnown={false} usedLocationUnknown={false} onKeyClicked={handleOnKeyboardKeyClick} />
                <Key character={'E'} usedLocationKnown={false} usedLocationUnknown={false} onKeyClicked={handleOnKeyboardKeyClick} />
                <Key character={'R'} usedLocationKnown={false} usedLocationUnknown={false} onKeyClicked={handleOnKeyboardKeyClick} />
                <Key character={'T'} usedLocationKnown={false} usedLocationUnknown={false} onKeyClicked={handleOnKeyboardKeyClick} />
            </div>
        </div>
    );
}

export default Keyboard;