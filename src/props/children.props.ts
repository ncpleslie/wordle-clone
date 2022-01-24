import { ReactChild, ReactFragment, ReactPortal } from "react";

export default interface ChildrenProps {
    children: boolean | ReactChild | ReactFragment | ReactPortal | JSX.Element | JSX.Element[] | string | string[];
}