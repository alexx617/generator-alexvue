import fetch from 'utils/service'
export default {
    //退出登录
    login(data) {
        return fetch({
            method: 'post',
            url: `/login`,
            // ContentType:'form',
            data
        })
    },
}