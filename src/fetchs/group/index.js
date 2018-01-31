// https://m.douban.com/rexxar/api/v2/group/rec_groups_for_newbies?ck=&for_mobile=1
export function getGroups({
    ck = '',
    for_mobile = '1'
} = {} ) {
    return DB.Ajax({
        url: '/v2/group/rec_groups_for_newbies',
        type: 'get',
        data: {
            ck,
            for_mobile
        }
    })
}
