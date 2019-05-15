class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.removeHandler = this.removeHandler.bind( this );
    this.submitHandler = this.submitHandler.bind( this );
    this.canvas = null;
    this.ctx = null;

    this.pen={x:33,y:234}

    this.text = "christean sux ballz⚽⚽⚽⚽⚽"

    this.modText = ""
    this.modTextArr = []
  }


  state = {
    list : [],
    word : ""
  }
  componentDidMount(){
    this.canvas = document.getElementById("pies");
    this.canvas.width=1000;
    this.canvas.height=1000;
    this.ctx = this.canvas.getContext("2d");

    setInterval(this.runDMC,50)
  }

  runDMC=()=>{



    let length = this.modTextArr.length;

    const textLens = this.text.length;

    if (length<textLens){
      this.modTextArr.push(this.text[length])
    } else {
      this.modTextArr=[]
    }

    this.modText = this.modTextArr.join("")

    this.ctx.clearRect(0,0,1000,1000)

 //  this.ctx.fillRect(this.pen.x,this.pen.y,66,88)

     this.ctx.fillText(this.modText,this.pen.x,this.pen.y)


  }

  moveMover=e=>{
    console.log(e.clientX,this.pen)

    this.pen.x = e.clientX
    this.pen.y = e.clientY


  }

  changeHandler(event){
    this.setState({word:event.target.value});
    console.log("change", event.target.value);
  }

  submitHandler(event) {
    if (event.keyCode === 13) {
      this.clickHandler(event)
    }
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
          <canvas onMouseMove={this.moveMover} id="pies" style={{width:"100vw",height:"100vh"}}>
          </canvas>

          <input id="form" onChange={this.changeHandler} onKeyDown={this.submitHandler} value={this.state.word}/>
          <button onClick={this.clickHandler}>gimme</button>
          <div id="error" style={{color: 'red'}, {display: 'none'}}>input a value between 1 and 200 characters can or not</div>
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

