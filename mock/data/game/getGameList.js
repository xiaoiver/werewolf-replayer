module.exports = function (params) {
    var gameList = [];
    for (var i = 0; i <= 10; i++) {
        var game = {
            gameId: i
        };
        gameList.push(game);
    }
    
    return {
        success : true,     //请求成功标识
        errorCode : '',       //响应码,
        errorMsg : '网络错误404',        //错误信息,
        result: gameList
    };
};