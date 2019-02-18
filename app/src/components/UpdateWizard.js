import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const UPDATE_WIZARD = gql`
  mutation updateWizard($name: String, $image: String, $species: String) {
    updateWizard(name: $name, image: $image, species: $species) {
      name
      image
      species
    }
  }
`;

class UpdateWizard extends Component {
  state = {
    name: "",
    image: "",
    species: ""
  };

  render() {
    const { name, image, species } = this.state;

    return (
      <div>
        <h3>Update a wizard</h3>
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
        <Mutation mutation={UPDATE_WIZARD} variables={{ name, image, species }}>
          {(updateWizard, { data, loading, error }) => (
            <button onClick={updateWizard}>submit</button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UpdateWizard;
