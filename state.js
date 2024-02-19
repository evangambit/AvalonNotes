import { Observable } from './observable.js';

export class RowState {
  constructor(type, approvers, text = '') {
    this.type = type;
    this.approvers = approvers;
    this.text = text;
  }
  json() {
    return {
      "type": this.type,
      "approvers": this.approvers,
      "text": this.text,
    }
  }
  static from_json(json) {
    return new RowState(json.type, json.approvers, json.text);
  }
}

export class MotherState extends Observable {
  constructor() {
    super();
    this._players = [];
    this._rows = [];
    this._firstProposer = undefined;
  }
  add_player(name) {
    this._players.push(name);
    this.dispatch();
  }
  add_row(row) {
    this._rows.push(row);
    this.dispatch();
  }
  get players() {
    return this._players;
  }
  set rows(rows) {
    this._rows = rows;
    this.dispatch();
  }
  get rows() {
    return this._rows;
  }
  set firstProposer(name) {
    this._firstProposer = name;
    this.dispatch();
  }
  get firstProposer() {
    return this._firstProposer;
  }
  json() {
    return {
      "players": this._players,
      "rows": this._rows.map(row => row.json()),
    }
  }
  static from_json(json) {
    let state = new MotherState();
    state._players = json.players;
    state._rows = json.rows.map(row => RowState.from_json(row));
    return state;
  }
}