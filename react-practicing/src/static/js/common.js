// 生成不可重复的id len:随机数的长度
const CreateUid = len => Number(Math.random().toString().substr(3,len) + Date.now()).toString(36)


export { CreateUid }









