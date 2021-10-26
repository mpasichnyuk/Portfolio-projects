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
        <h1> Список задач</h1>
        <h2>Текущие задачи: {this.state.tasks.length}</h2>
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
        <button onClick={this.addTask}>Добавить задачу</button>
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
