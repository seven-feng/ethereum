import React, {Component} from 'react';
import lottery from './lottery'
import { Card, Button } from 'antd';
import web3 from './web3';
const { Meta } = Card;

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = { manager: '', playersCount: 0, balance: 0, loading: false, display: 'none' }
  }

  async componentDidMount() {
    const manager = await lottery.methods.getManager().call()
    const playersCount = await lottery.methods.getPlayersCount().call()
    const balance = await lottery.methods.getBalance().call()
    this.setState({ manager: manager, playersCount: playersCount, balance: balance })
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    if(manager === accounts[0]) { // 当前账户是管理员账户
        this.setState({display: 'block'})
    } else {
      this.setState({display: 'none'})
    }
  }

  enter = async () => {
    this.setState({loading: true})
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    await lottery.methods.enter().send({
      from: accounts[0],
      gas: '1000000',
      value: '1000000000000000000'
    })
    this.setState({loading: false})
    window.location.reload(true)
  }

  pickWinner = async () => {
    this.setState({loading: true})
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    await lottery.methods.pickWinner().send({
      from: accounts[0],
      gas: '1000000'
    })
    this.setState({loading: true})
    window.location.reload(true)
  }

  refund = async () => {
    this.setState({loading: true})
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()
    await lottery.methods.refund().send({
      from: accounts[0],
      gas: '1000000'
    })
    this.setState({loading: true})
    window.location.reload(true)
  }

  render() {
    return (
      <div className="App">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Meta title={`管理员地址：${this.state.manager}`} description="每周三晚上8点准时开奖" />
          <br/>
          <div>{ this.state.playersCount } 人参与</div>
          <h1>{web3.utils.fromWei(this.state.balance.toString(), 'ether')} ether</h1>
          <Button type="primary" onClick={this.enter} loading={this.state.loading} disabled={this.state.loading}>投注产生希望</Button>
          <div style={{ marginTop: '10px', display: this.state.display }}>
            <Button onClick={this.pickWinner} loading={this.state.loading} disabled={this.state.loading}>开奖</Button>
            <Button onClick={this.refund} loading={this.state.loading} disabled={this.state.loading}>退钱</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default App;
