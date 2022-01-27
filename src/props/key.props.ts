export default interface KeyProps {
  character: string;
  usedLocationUnknown: boolean;
  usedLocationKnown: boolean;
  notUsed: boolean;
  special: boolean;
  onKeyClicked: (character: string) => void;
}
