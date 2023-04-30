import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './App.css';

const Users = (props) => {
  return (
    <div>
      {props.users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </div>
  );
};

class User extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="git user profile" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class AddUser extends React.Component {
  state = { userName: '' };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );

    this.props.onSubmit(response.data);
    this.setState({ userName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter Github User Name"
          required
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
        />
        <button>Add User</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    users: [],
  };

  addNewUser = (user) => {
    this.setState((prevState) => ({ users: [...prevState.users, user] }));
  };

  render() {
    return (
      <div className="root">
        <h1>The GitHub Users App</h1>
        <AddUser onSubmit={this.addNewUser} />
        <Users users={this.state.users} />
      </div>
    );
  }
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
