import React, { Component } from "react";
import Wizard from "./Wizard";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "../styles/WizardList.css";

const WIZARD_QUERY = gql`
  {
    Wizards {
      name
      image
      ancestry
      species
    }
  }
`;

class WizardList extends Component {
  render() {
    return (
      <Query query={WIZARD_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.Wizards;

          return (
            <div className="characters">
              {linksToRender.map(link => (
                <Wizard key={link.name} link={link} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default WizardList;
