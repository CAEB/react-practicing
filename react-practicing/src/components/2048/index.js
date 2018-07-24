import React from 'react'

import './index.less'

// 生成随机坐标
const randomCoor = (start,end) => [Math.floor(Math.random() * (end - start) + start),Math.floor(Math.random() * 4)]
// 游戏的主逻辑 包括得分
const handleSquare = squares => {
    var score = 0
    for (let i = 0; i < 3; i ++) {
        let current1 = squares[i]
        if (Number(squares[i]) === 0) {
            squares[i] = squares[i + 1]
            squares[i + 1] = current1
        }
    }
    for (let i = 0; i < 3; i ++) {
        let current2 = squares[i]
        if (Number(squares[i]) === 0) {
            squares[i] = squares[i + 1]
            squares[i + 1] = current2
        }
    }
    for (let i = 0; i < 3; i ++) {
        let current3 = squares[i]
        if (Number(squares[i]) === 0) {
            squares[i] = squares[i + 1]
            squares[i + 1] = current3
        }
    }
    for (let i = 0; i < 3; i ++) {
        if ( Number(squares[i]) !==0 && squares[i] === squares[i + 1]) {
            squares[i] = squares[i] + squares[i + 1]
            squares[i + 1] = null
            score += squares[i]
        }
    }
    return score
}
// 上下左右操作时生成的新的数据源
const newState = squares => {
    let newArr = [
        [],[],[],[]
    ]
    squares.forEach((value,index) => {
        value.forEach((value_i,index_i) => {
            newArr[index].push(squares[index_i][index])
        })
    })
    return newArr
}
// 数字合并后生成随机坐标
const handleCoor = squares => {
    let arr = []
    squares.forEach((value,index) => {
        value.forEach((value_i,index_i) => {
            if (Number(value_i) === 0) {
                arr.push([index,index_i])
            }
        })
    })
    return arr[Math.floor(Math.random() * arr.length)]
}
// 得分
class Score extends React.Component {

    render () {
        return (
            <div className="score flex flex-around">
                <div className="common-score color2">
                    得分: { this.props.score }
                </div>
                <div className="max-score color2">
                    最佳: 100000
                </div>
            </div>
        )
    }
}
// 游戏上下左右操作按钮
class HandleBtn extends React.Component {

    render () {
        return (
            <div className="handle-btn flex flex-between">
                <div onClick={ () => { this.props.handleTop() } } className="btn color2">上(↑)</div>
                <div onClick={ () => { this.props.handleLeft() } } className="btn color2">左(←)</div>
                <div onClick={ () => { this.props.handleBottom() } } className="btn color2">下(↓)</div>
                <div onClick={ () => { this.props.handleRight() } } className="btn color2">右(→)</div>
            </div>
        )
    }
}
// 游戏方块
const GameSquare = props => {

    let colorClass;
    // 设置棋盘数字背景色
    switch (props.value) {
        case 2:
        case 64:
        case 2048:
            colorClass = 'color2'
            break
        case 4:
        case 128:
            colorClass = 'color4'
            break
        case 8:
        case 256:
            colorClass = 'color8'
            break
        case 16:
        case 512:
            colorClass = 'color16'
            break
        case 32:
        case 1024:
            colorClass = 'color32'
            break
        default:
            colorClass = 'color0'
            break                
    }

    return (
        <div className={ `gameSquares ${colorClass}` }>
            { props.value }
        </div>
    )
}
// 游戏区域
class GameField extends React.Component {

    // 构造棋盘
    initSquare () {
        const squares = this.props.squares.map((val,index) => {
            const squaresRow = val.map((valr,indexr) => {
              return (
                <GameSquare key={ indexr } value={ valr } />
              )
            })
            return (
                <div className="row flex flex-around" key={ index }>
                    { squaresRow }
                </div>
            )
           
        })
        return squares
    }

    render () {
        return (
            <div className="gameSquare">
                { this.initSquare() }
            </div>
        )
    }
}
// 游戏根组件
class Game2048 extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            squares: [
                Array(4).fill(null),
                Array(4).fill(null),
                Array(4).fill(null),
                Array(4).fill(null),
            ],
            score: 0
        }
    }
    // 操作按钮逻辑
    handleGame (way) {
        let squares = this.state.squares.slice()
        let score = this.state.score
        switch (way) {
            case 'top':
                squares = newState(squares)
                squares.forEach(val => {
                    score += handleSquare(val)
                })
                squares = newState(squares)
                break
            case 'left':
                squares.forEach(val => {
                    score += handleSquare(val)
                })
                break
            case 'bottom':
                squares = newState(squares)
                squares.forEach(val => {
                    score += handleSquare(val)
                    val = val.reverse()
                })
                squares = newState(squares)
                break
            case 'right':
                squares.forEach(val => {
                    score += handleSquare(val)
                    val = val.reverse()
                })
                break
            default: break                
        }
        let [a,b] = handleCoor(squares)
        squares[a][b] = 2
        this.setState({
            squares: squares,
            score: score
        })
    }
    // 初始化游戏棋盘坐标
    componentWillMount () {
        let [a,b] = randomCoor(0,2)
        let [c,d] = randomCoor(2,4)
        const squares = this.state.squares.slice()
        squares[a][b] = 2
        squares[c][d] = 4
        this.setState({
            squares: squares
        })
    }
    render () {
        return (
            <div className="game2048 flex">
                <div className="game-left">
                    <GameField squares= { this.state.squares } />
                </div>
                <div className="game-right">
                    <Score
                        score = { this.state.score }
                    />
                    <HandleBtn
                        handleTop = { () => { this.handleGame('top') } }
                        handleLeft = { () => { this.handleGame('left') } }
                        handleBottom = { () => { this.handleGame('bottom') } }
                        handleRight = { () => { this.handleGame('right') } }
                    />
                </div>
            </div>
        )
    }
}

export default Game2048