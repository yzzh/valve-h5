export function getRecommend({
  alt = 'json',
  loc_id = '108288',
  udid = '9fcefbf2acf1dfc991054ac40ca5114be7cd092f',
  for_mobile = '1',
  next_date = '',
  gender = '',
  birthday = ''
} = {} ) {
    return DB.Ajax({
        url: 'v2/recommend_feed',
        type: 'get',
        data: {
            alt,
            loc_id,
            udid,
            for_mobile,
            next_date,
            gender,
            birthday
        }
    });
}
