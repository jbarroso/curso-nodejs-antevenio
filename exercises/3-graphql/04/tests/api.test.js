const { graphql } = require('graphql');
const { root, schema } = require('../src/api');
const teams = require('../src/teams.json');

describe('Teams API', () => {

  it('should return all teams defining all the fields', async () => {
    const query = '{ teams { name, points, matchesPlayed, players { name, number } } }';
    const result = await graphql(schema, query, root);
    expect(result.data.teams).toEqual(teams);
  });

  it('should return all teams without the players', async () => {
    const query = '{ teams { name, points, matchesPlayed } }';
    const result = await graphql(schema, query, root);
    const teamsWithoutPlayers = teams.map(
      team => {
        let teamWithoutPlayers = Object.assign({}, team);
        delete teamWithoutPlayers.players;
        return teamWithoutPlayers;
      }
    );
    expect(result.data.teams).toEqual(teamsWithoutPlayers);
  });

  it('should return filtered teams', async () => {
    const query = '{ teams(nameFilter:"Team2") { name, points, matchesPlayed, players { name, number } } }';
    const result = await graphql(schema, query, root);
    expect(result.data.teams).toEqual([teams[1]]);
  });

});
