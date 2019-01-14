const { buildSchema, graphql } = require('graphql');

const teams = require('./teams.json');

const typeDefinition = `
  type Player {
    name: String!,
    number: Int!
  }

  type Team {
    name: String!,
    points: Int!,
    matchesPlayed: Int!,
    players: [Player]!
  }

  type Query {
    teams(nameFilter: String): [Team]!
  }
`;

class Team {

  constructor(data) {
    //With this line methods will not be necessary : Object.assign(this, data);
    this.data = data;
  }

  name() {
    return this.data.name;
  }

  points() {
    return this.data.points;
  }

  matchesPlayed() {
    return this.data.matchesPlayed;
  }

  players() {
    return this.data.players;
  }

}

const schema = buildSchema(typeDefinition);

function getTeams(nameFilter) {
  return nameFilter ? teams.filter(team => team.name.includes(nameFilter)) : teams;
}

const root = {
  teams:({nameFilter}) =>  getTeams(nameFilter).map((team) => new Team(team))
}

module.exports = { root, schema };
