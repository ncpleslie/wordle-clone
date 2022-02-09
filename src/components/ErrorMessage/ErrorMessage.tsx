import { FC } from "react";
import ErrorMessageProps from "../../props/error-message.props";

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 text-center bg-red-100 border border-red-400">
      <h1 className="font-bold text-xl mb-2">
        An error has occurred while loading this application
      </h1>
      {message && <p>Reason: {message}</p>}
    </div>
  );
};

export default ErrorMessage;
