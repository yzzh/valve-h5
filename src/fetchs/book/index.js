// getBookFiction()本身返回的是个Promise对象，若单个获取数据需要用到.then()的方法，其中的参数即为请求到的数据
// getBookFiction().then(res=>{
//     console.log(res)
// })
// 图书 虚构类
export function getBookFiction({
    os = 'windows',
    callback = 'jsonp1',
    start = '0',
    count = '8',
    loc_id = '0',
    _ = '1517377019808'
} = {} ){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items',
            type: 'get',
            data: {
                os,
                // callback, ?? 为何这个地方不需要写callback参数
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

// https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items?
// os=windows&callback=jsonp2&start=0&count=8&loc_id=0&_=1517377019812
// 图书 非虚构类
export function getBookNonfiction({
  os = 'windows',
  callback = 'jsonp2',
  start = '0',
  count = '8',
  loc_id = '0',
  _ = '1517377019812',
} = {} ) {
  return new Promise((resolve,reject)=>{
        $.ajax({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items',
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
// https://m.douban.com/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items
// ?os=windows&callback=jsonp3&start=0&count=8&loc_id=0&_=1517377019813
// 豆瓣书店
export function getValveBookshop({
  os = 'windows',
  callback = 'jsonp3',
  start = '0',
  count = '8',
  loc_id = '0',
  _ = '1517377019813',
} = {} ) {
  return new Promise((resolve,reject)=>{
        $.ajax({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items',
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

// 以上三者抽象的一个方法,可公用
export function getBookData({
    os = 'windows',
    // callback = 'jsonp1',
    start = '0',
    count = '8',
    loc_id = '0',
    _ = Date.now(),
    url = ''
} = {} ){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url,
            type: 'get',
            data: {
                os,
                // callback, ?? 为何这个地方不需要写callback参数
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
