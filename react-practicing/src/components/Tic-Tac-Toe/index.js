import React from 'react'
import './index.css'
// 判定赢家
const calculateWinner = squares => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i]
        if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
            return { winner: squares[a], winnerLine: lines[i] }
        }
    }
    return { winner:null,winnerLine:[] }
}
// 处理落子格式
const formatStep = step => {
    let x = Math.ceil(step / 3)
    let y = step % 3 ? step % 3 : 3 
    return `(${x},${y})`
}
const Square = props => (
    <button className= { props.winnerLine ? 'square red' : 'square' }  onClick={ props.onClick }>
        { props.value }
    </button>
)

class Board extends React.Component {
    
    renderSquare(i) {
        return (
            <Square 
                key = {i}
                value = { this.props.squares[i] }
                onClick = { () => this.props.onClick(i) }
                winnerLine = { this.props.winnerLine.includes(i) } 
            />
        )
    }

    render () {
        let borards = []
        for (let i = 0; i < 3; i++) {
            let board = []
            for (let j = 3 * i; j < 3 * i + 3; j++) {
                board.push(this.renderSquare(j))
            }
            borards.push(<div className="board-row" key={i}>{board}</div>)
        }
        return (
            <div>
                { borards }
            </div>    
        )
    }

}

class Game extends React.Component {

    constructor () {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastStep: 'Game start'
            }],
            xIsNext: true,
            stepNumber: 0,
            sort: false
        }
    }
    // 悔棋
    jumpTo (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        })
    }
    // 下棋
    handleClick (i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares).winner || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
                lastStep: `${squares[i]} move ${formatStep(i + 1)}`
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }
    // 历史记录点击变色 通过内联样式
    setChessBg (move) {
        return move === this.state.stepNumber ? { backgroundColor: 'yellow' } : {}
    }
    // 历史记录排序
    sorting () {
        this.setState({
           sort: !this.state.sort
        })
    }

    render () {
        let history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares).winner
        const winnerLine = calculateWinner(current.squares).winnerLine
        if (this.state.sort) {
            history = this.state.history.slice()
            history.reverse()
        }
        const moves = history.map((step,move) => {
            return (
                <li key={move}>
                    {move + 1}. <button className={ move === this.state.stepNumber ? 'yellow' : ''} onClick={ () => this.jumpTo(move)} >{step.lastStep}</button>
                </li>
            )
        })
        let status
        if (winner) {
            status = 'winner: ' + winner
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares= {current.squares}
                        winnerLine = { winnerLine } 
                        onClick = { (i) => this.handleClick(i) }
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <button onClick= { () => this.sorting() }>sort</button>
                    <ul>{ moves }</ul>
                </div>
            </div>
        ) 
    }
}

export default Game

