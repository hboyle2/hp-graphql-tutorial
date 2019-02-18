import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_WIZARD = gql`
  mutation createWizard($name: String, $image: String, $species: String) {
    createWizard(name: $name, image: $image, species: $species) {
      name
      image
      species
    }
  }
`;

class CreateWizard extends Component {
  state = {
    name: "",
    image: "",
    species: ""
  };

  render() {
    const { name, image, species } = this.state;

    return (
      <div>
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
          <input
            value={species}
            onChange={e => this.setState({ species: e.target.value })}
            type="text"
            placeholder="The Species "
          />
        </div>
        <Mutation mutation={CREATE_WIZARD} variables={{ name, image, species }}>
          {(createWizard, { data, loading, error }) => (
            <button onClick={createWizard}>submit</button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateWizard;
