import './Gameboard.scss';
import CharacterBox from '../UI/CharacterBox/CharacterBox';
import GameboardProps from '../../props/gameboard.props';

const Gameboard = (props: GameboardProps) => {
    return (
        <div className={`gameboard grid-cols-${props.gameOptions.word.length}`}>
            {[...Array(props.gameOptions.word.length * props.gameOptions.tries)].map((_, i) =>
                <div className='gameboard-box' key={i}>
                    <CharacterBox />
                </div>
            )}
        </div>
    );
};

export default Gameboard;