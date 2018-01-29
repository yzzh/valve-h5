// export function getMovieShow({
//   os = 'ios',
//   callback = 'jsonp1',
//   start = '0',
//   count = '8',
//   loc_id = '108288',
//   _ = '0'
// } = {} ) {
//   return DB.Ajax({
//     url: 'v2/subject_collection/movie_showing/',
//     type: 'get',
//     data: {
//       os,
//       callback,
//       start,
//       count,
//       loc_id,
//       _
//     }
//   })
// }

// 以下方法中的参数写法意思：es6写法
// 若没有传任何参数，则默认参数为空对象 => 若对象中没有os这个key，则默认给此对象加一个os:'ios'的属性，后面的属性类似。
// （意思时此方法必须要传一个对象，而且对象中必须有这些key的存在，若没有则为对应的key设置默认的value）
// 若使用此方法的时候不传任何参数，则默认参数为undefined，而undefined不是一个对象，没有属性，所以会报错
export function getMovieShow({
  os = 'ios',
  callback = 'jsonp1',
  start = '0',
  count = '8',
  loc_id = '108288',
  _ = '0',
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
