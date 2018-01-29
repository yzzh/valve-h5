export function getAirings({
  max_id = '',
  ck = '',
  for_mobile = '1'
} = {} ){
  return DB.Ajax({
    url: 'v2/status/anonymous_timeline',
    type: 'get',
    data: {
      max_id,
      ck,
      for_mobile
    }
  })

}
