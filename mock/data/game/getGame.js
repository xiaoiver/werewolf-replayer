module.exports = function (params) {
    var cast = [];
    for (var i = 0; i <= 12; i++) {
        var seat = {
            seatNum: i + 1
        };
        cast.push(seat);
    }
    return {
        success : true,     //请求成功标识
        errorCode : '',       //响应码,
        errorMsg : '网络错误404',        //错误信息,
        result: {
            gameId: 1,
            roleList: [],
            cast: cast,
            baseInfo: {
                datetime: '2016-1-22 15:00:00',
                location: 'F7A 赤壁词',
                isGodView: true
            }
        }
    };
};