
// 以下方法中的参数写法意思：es6写法
// 使用getMovieShow时没有传任何参数，则默认参数为空对象，不会报错 => 若对象中没有os这个key，则默认给此对象加一个os:'ios'的属性，后面的属性类似。
// （意思时此方法必须要传一个对象，而且对象中必须有这些key的存在，若没有则为对应的key设置默认的value）
// 若getMovieShow中的参数不写上... = {} ,然后在使用此方法的时候不传任何参数，则默认参数为undefined，而undefined不是一个对象，没有属性，所以会报错

// 影院热映
export function getMovieShow({
  os = 'ios',
  callback = 'jsonp1',
  start = '0',
  count = '8',
  loc_id = '108288',
  _ = '1517210951135',
} = {} ) {
    // Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
    // 它们是两个函数：resolve函数在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
            data : {
                os,
                start,
                count,
                loc_id,
                _
            },
            dataType: 'jsonp',
            success: resolve, // 数据请求成功的时候执行Promise的异步操作成功的回调即resolve
            error: reject // 数据请求失败的时候执行Promise的异步操作失败的回调即reject
        })
    });
}

// 免费在线观影
export function getMovieFree({
  os = 'ios',
  callback = 'jsonp2',
  start = '0',
  count = '8',
  loc_id = '108288',
  _ = '1517210951136',
} = {} ) {
  return new Promise((resolve,reject)=>{
        $.ajax({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
            data : {
                os,
                start,
                count,
                loc_id,
                _
            },
            dataType: 'jsonp',
            success: resolve,
            error: reject
        })
    })
}

// 新片速递
export function getMovieLatest({
  os = 'ios',
  callback = 'jsonp3',
  start = '0',
  count = '8',
  loc_id = '108288',
  _ = '1517210951139',
} = {} ) {
    return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
                data : {
                    os,
                    start,
                    count,
                    loc_id,
                    _
                },
                dataType: 'jsonp',
                success: resolve,
                error: reject
            })
    })
}

// 获取电影数据抽象函数,/movie页面用的时候需要传url,_这两个参数（若不传，默认用影院热映的数据），
// /movie/child页面用的时候需要传url,_,start,count四个参数
export function getMovieData({
  os = 'ios',
//   callback = 'jsonp3', jsonp的方式，所以这个参数可以不传
  start = '0',
  count = '8',
  loc_id = '108288',
  _ = Date.now(),
  url = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
} = {} ) {
    return new Promise((resolve, reject) => {
            $.ajax({
                url,
                data : {
                    os,
                    start,
                    count,
                    loc_id,
                    _
                },
                dataType: 'jsonp',
                success: resolve,
                error: reject
            })
    })
}

/** 没有用Promise封装之前得函数，如下，用法如下
 * 封装：
export function getMovieLatest({
  os = 'ios',
  callback = 'jsonp3',
  start = '0',
  count = '8',
  loc_id = '108288',
  _ = '1517210951139',
  success = () => {}
} = {} ) {
  return $.ajax({
	url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
    data : {
        os,
        start,
        count,
        loc_id,
        _
    },
    dataType: 'jsonp',
    success,
    })
}
* 用法：（会比较复杂）
getMovieLatest({
    success: (res) => {
    console.log('新片速递',res);
    this.movieLatest.collection = res.subject_collection;
    this.movieLatest.collectionItems = res.subject_collection_items;
    }
})*/
