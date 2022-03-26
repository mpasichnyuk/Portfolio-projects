class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: "",
    };
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <h2>List of todos: {this.state.tasks.length}</h2>
        <ul>
          {this.state.tasks.map((task, i) => (
            <li key={i}>
              {task}
              <button onClick={() => this.deleteTask(i)}>x</button>
            </li>
          ))}
        </ul>
        <input
          onChange={this.handleChange}
          value={this.state.input}
          type="text"
        />
        <button onClick={this.addTask}>Add task</button>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  addTask = () => {
    this.setState((state) => ({
      tasks: [...state.tasks, state.input],
      input: "",
    }));
  };

  deleteTask = (index) => {
    this.setState((state) => {
      const tasks = [...state.tasks];
      tasks.splice(index, 1);
      return {
        tasks: tasks,
      };
    });
  };
}

ReactDOM.render(<App />, document.querySelector("#app"));
