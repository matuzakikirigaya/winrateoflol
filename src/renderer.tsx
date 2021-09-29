import React, { useState } from "react";
import ReactDOM from "react-dom";

const { myAPI } = window;

const App: React.FC = () => {
  const [twistedNum, setTwistedNum] = useState<number>();

  const onClickTwisted = async () => {
    const twisted = await myAPI.twisted();

    if (!twisted) return;

    setTwistedNum(twisted);
  };
  return (
    <div>
      <button onClick={onClickTwisted}>tf</button>
      <div>{twistedNum}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
