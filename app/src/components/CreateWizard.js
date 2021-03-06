import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { WIZARD_QUERY } from "./WizardList";

const CREATE_WIZARD = gql`
  mutation createWizard($name: String, $image: String) {
    createWizard(name: $name, image: $image) {
      name
      image
    }
  }
`;

class CreateWizard extends Component {
  state = {
    name: "",
    image: ""
  };

  render() {
    const { name, image } = this.state;

    return (
      <div>
        <Link to="/">Home</Link>
        <h1> Create a Wizard</h1>
        <div className="flex flex-column mt3">
          <input
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            value={image}
            onChange={e => this.setState({ image: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={CREATE_WIZARD}
          variables={{ name, image }}
          onCompleted={() => this.props.history.push("/")}
          update={(store, { data: { createWizard } }) => {
            const data = store.readQuery({ query: WIZARD_QUERY });
            data.Wizards.push(createWizard);
            store.writeQuery({
              query: WIZARD_QUERY,
              data
            });
          }}
        >
          {(createWizard, { data, loading, error }) => (
            <button onClick={createWizard}>submit</button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateWizard;
