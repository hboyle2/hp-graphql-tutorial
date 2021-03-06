import React, { Component } from "react";
import Wizard from "./Wizard";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "../styles/WizardList.css";
import { Link } from "react-router-dom";

export const WIZARD_QUERY = gql`
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
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: WIZARD_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: WIZARD_QUERY, data });
  };
  render() {
    return (
      <div className="wrapper">
        <h2>Harry Potter and the Graphql Tutorial</h2>
        <Link to="/create-wizard">Create Wizard</Link>
        <Link to="/update-wizard">Update Wizard</Link>

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
      </div>
    );
  }
}

export default WizardList;
