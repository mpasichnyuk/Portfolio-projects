class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: true,
      cards: [
        { front: "apple", back: "яблоко" },
        { front: "juicy", back: "сочный" },
      ],

      input: "",
    };
  }

  render() {
    if (this.state.editor) {
      return (
        <CardEditor
          cards={this.state.cards}
          addCard={this.addCard}
          switchMode={this.switchMode}
          deleteCard={this.deleteCard}
        />
      );
    } else {
      return (
        <CardViewer cards={this.state.cards} switchMode={this.switchMode} />
      );
    }
  }

  addCard = (front, back) => {
    this.setState((state) => ({
      cards: [...state.cards, { front: front, back: back }],
    }));
  };

  deleteCard = (index) => {
    this.setState((state) => {
      const cards = [...state.cards];
      cards.splice(index, 1);
      return { cards: cards };
    });
  };

  switchMode = () => {
    this.setState((state) => ({
      editor: !state.editor,
    }));
  };
}

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: "",
      back: "",
    };
  }

  render() {
    const rows = this.props.cards.map((card, i) => {
      return (
        <tr key={i}>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td>
            <button data-index={i} onClick={this.deleteCard}>
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h2>Редактор карточек</h2>
        <table>
          <thead>
            <tr>
              <th>Лицевая сторона</th>
              <th>Обратная сторона</th>
              <th>удалить</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
        <br />
        <input
          onChange={this.handleChange}
          type="text"
          name="front"
          placeholder="иностранный текст"
          value={this.state.front}
        />

        <input
          onChange={this.handleChange}
          type="text"
          name="back"
          placeholder="перевод"
          value={this.state.back}
        />
        <button onClick={this.addCard}>добавить карточку</button>
        <hr />
        <button onClick={this.props.switchMode}>Начать тренировку</button>
      </div>
    );
  }

  deleteCard = (event) => {
    this.props.deleteCard(event.target.dataset.index);
  };

  addCard = () => {
    this.props.addCard(this.state.front, this.state.back);
    this.setState({
      front: "",
      back: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
}

class CardViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      frontSide: true,
    };
  }

  increment = () => {
    let cards = this.props.cards
    if (this.state.index < cards.length - 1) {
        this.setState(state => ({
            index: state.index + 1
        })) 
    }
    
  }

  decrement = () => {
    if (this.state.index > 0) {
        this.setState(state => ({
            index: state.index - 1
        })) 
    }
    
  }

  cardTurn = () => {
    this.setState(state => ({
        frontSide: !state.frontSide
    })) 
    
  }

  render() {
    let index = this.state.index
    let cards = this.props.cards
    return (
      <div>
        <h3>Тренировка!</h3>
        <h1>{this.state.frontSide ? cards[index].front : cards[index].back}</h1>
        <button onClick={this.decrement}>Назад</button>
        <button onClick={this.cardTurn} >Перевод</button>
        <button onClick={this.increment}>Далее</button>


        <hr />
        <button onClick={this.props.switchMode}>перейти в редактор</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
