import React from "react";
import "./styles/index.scss";
// import Button, { ButtonType, ButtonSize } from "./components/Button/button";

import Alert, { AlertType } from "./components/Alert/alert";

function App() {
  return (
    <div className="App">
      {/* <Button>hello</Button>
      <Button disabled>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        hello
      </Button>
      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Large}
        onClick={() => {
          alert(111);
        }}
      >
        hello
      </Button>
      <Button
        btnType={ButtonType.Link}
        href="http://www.baidu.com"
        target="_blank"
      >
        hello
      </Button>
      <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com">
        hello
      </Button> */}
      <div style={{ marginTop: "20px" }}>
        <Alert
          type={AlertType.Success}
          message="alert 提示语"
          onClose={() => {
            console.log(111);
          }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Alert type={AlertType.Warning} message="alert 提示语" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Alert type={AlertType.Info} message="alert 提示语" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Alert type={AlertType.Error} closable={false} message="alert 提示语" />
      </div>
    </div>
  );
}

export default App;
