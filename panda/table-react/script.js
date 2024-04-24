import { mainData } from "./DATA";

class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: this.props.data,
      lastSort: "",
      currentPage: 1,
      postsPerPage: 10,
      sortingOrderAscending: true,
      sortingColumn: "id",
    };
  }
  handleChange(event) {
    let searchValue = event.target.value;
    this.setState({ search: searchValue, currentPage: 1 });
  }

  setPostsPerPage(event) {
    this.setState({ postsPerPage: event.target.value, currentPage: 1 });
  }

  setCurrentPage(event) {
    this.setState({ currentPage: event.number });
  }

  setSortingColumn(event) {
    this.setState({
      sortingColumn: event,
      sortingOrderAscending: !this.state.sortingOrderAscending,
    });
  }

  sortBy(arr, key) {
    let arrayCopy = [...arr];
    let sortedArr = arrayCopy.sort(this.compareBy(key));
    if (this.state.sortingOrderAscending) {
      return sortedArr;
    } else {
      return sortedArr.reverse();
    }
  }

  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  render() {
    let clients = this.state.data;
    let searchString = this.state.search.trim().toLowerCase();
    if (searchString.length > 0) {
      clients = clients.filter(
        (e) =>
          e.first_name.toLowerCase().match(searchString) ||
          e.last_name.toLowerCase().match(searchString) ||
          e.email.toLowerCase().match(searchString) ||
          e.phone.toLowerCase().match(searchString)
      );
    }

    let indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    let currentPosts = clients.slice(indexOfFirstPost, indexOfLastPost);

    currentPosts = this.sortBy(currentPosts, this.state.sortingColumn);

    let pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(clients.length / this.state.postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <UserInput update={(e) => this.handleChange(e)} />
        <Pagination
          pageNumbers={pageNumbers}
          postsPerPage={this.state.postsPerPage}
          currentPage={this.state.currentPage}
          setPostsPerPage={(e) => this.setPostsPerPage(e)}
          setCurrentPage={(e) => this.setCurrentPage(e)}
        />
        <span className="found__entries">Found records: {clients.length}</span>
        <Table data={currentPosts} sortFunc={(e) => this.setSortingColumn(e)} />
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th onClick={() => this.props.sortFunc("id")}>number</th>
              <th onClick={() => this.props.sortFunc("first_name")}>
                First name
              </th>
              <th onClick={() => this.props.sortFunc("last_name")}>
                Last name
              </th>
              <th onClick={() => this.props.sortFunc("email")}>E-mail</th>
              <th onClick={() => this.props.sortFunc("phone")}>Phone</th>
            </tr>
            {this.props.data.map(function (d, i) {
              return (
                <TableRow
                  key={"person-" + i}
                  id={d.id}
                  first_name={d.first_name}
                  last_name={d.last_name}
                  email={d.email}
                  phone={d.phone}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="input__wrapper">
        <input
          className="input__search"
          placeholder="Search..."
          onChange={(e) => this.props.update(e)}
        />
      </div>
    );
  }
}

class Pagination extends React.Component {
  render() {
    return (
      <nav className="nav__bar">
        <div>
          <span>Show </span>
          <select
            value={this.props.postsPerPage}
            onChange={this.props.setPostsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <span> records on page</span>
          <hr></hr>
          <span>Current page: {this.props.currentPage}</span>
          <ul className="pagination">
            {this.props.pageNumbers.map((number) => (
              <li key={number}>
                <button onClick={() => this.props.setCurrentPage({ number })}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.first_name}</td>
        <td>{this.props.last_name}</td>
        <td>{this.props.email}</td>
        <td>{this.props.phone}</td>
      </tr>
    );
  }
}

ReactDOM.render(<SearchApp data={mainData} />, document.getElementById("app"));
