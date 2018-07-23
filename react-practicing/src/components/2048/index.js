import React from 'react'

import './index.less'

// 生成随机坐标
const randomCoor = () => [Math.floor(Math.random() * 4),Math.floor(Math.random() * 4)]


// 得分
class Score extends React.Component {

    render () {
        return (
            <div className="score flex flex-around">
                <div className="common-score color2">
                    得分: 21416
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
    renderSquare () {
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
                { this.renderSquare() }
            </div>
        )
    }
}


class Game2048 extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            squares: [
                Array(4).fill(null),
                Array(4).fill(null),
                Array(4).fill(null),
                Array(4).fill(null),
            ]
        }
    }
    // 向上
    handleTop () {
        
        console.log('top')
    }
    // 向左
    handleLeft () {
        console.log('left')
    }
    // 向下
    handleBottom () {
        console.log('bottom')
    }
    // 向右
    handleRight () {
        console.log('right')
    }
    // 初始化游戏棋盘坐标
    componentWillMount () {
        let [a,b] = randomCoor()
        let [c,d] = randomCoor()
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
                    <Score />
                    <HandleBtn
                        handleTop = { () => { this.handleTop() } }
                        handleLeft = { () => { this.handleLeft() } }
                        handleBottom = { () => { this.handleBottom() } }
                        handleRight = { () => { this.handleRight() } }
                    />
                </div>
            </div>
        )
    }
}

export default Game2048