class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.removeHandler = this.removeHandler.bind( this );
  }

  state = {
    list : [],
    word : ""
  }

  changeHandler(event){
    this.setState({word:event.target.value});
    console.log("change", event.target.value);
  }

  clickHandler(event) {
    let newValue = this.state.word;
    let stateList = this.state.list;
    let empty = "";
    let index = event.target.value;
    let now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    if (newValue.length > 0 && newValue.length < 201) {

      let array = []
      array.push(newValue)
      array.push(now)

      stateList.push(array);
      // console.log('newvalue',newValue)
      // console.log('statelist',stateList)
      this.setState({word: empty, list: stateList})
    } else {
      let errorMessage = document.getElementById('error')
      errorMessage.style.display = "block"
      let form = document.getElementById('form')
      form.style.border = "3px red solid"
      setTimeout(function(){
        form.style.border = "1px grey solid"
        errorMessage.style.display = "none"
      }, 2000)
    }
  }

  removeHandler(event) {
    console.log(event.target.value)
    let index = event.target.value
    // let item = this.state.list[index]
    // console.log(item)
    this.state.list.splice(index, 1)
    this.setState({list: this.state.list})
  }

  render() {

      // render the list with a map() here
      let listItems = this.state.list.map( (item, index) =>{
        return (
          <li key={item + index}>
            {item[0]}
            <button value={index} onClick={this.removeHandler}>idw this alr</button>
            <span>{item[1]}</span>
          </li>
          )
      })

      // console.log("rendering");
      return (
        <div className="list">
          <input id="form" onChange={this.changeHandler} value={this.state.word}/>
          <button onClick={this.clickHandler}>gimme</button>
          <div id="error" style={{color: 'red'}, {display: 'none'}}>Please input a value between 1 and 200 characters</div>
          <ul>
            {listItems}
          </ul>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

