export default interface KeyProps {
    character: string;
    usedLocationUnknown: boolean;
    usedLocationKnown: boolean;
    onKeyClicked: (character: string) => void
}