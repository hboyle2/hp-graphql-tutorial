import React, { Component } from "react";
import WizardList from "./WizardList";
import CreateWizard from "./CreateWizard";
import UpdateWizard from "./UpdateWizard";
class App extends Component {
  render() {
    return (
      <div>
        <h2>Harry potter and the graphql tutorial </h2>
        <UpdateWizard />
        <CreateWizard />
        <WizardList />;
      </div>
    );
  }
}

export default App;
