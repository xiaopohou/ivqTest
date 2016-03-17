module.exports = {
    dbConnection: 'mongodb://localhost:27017/ivqTest',
    prefixUrl: '/api/',
    jwtTokenSecret: 'ivqTestTC',
    rootPath: 'ui/',
    ueImagesPath: 'assets/upload/ue/images/',
    coverPath: 'assets/upload/images/',
    wechat: {
        appId: 'wxd1ac5a4a22d2b009',
        appSecret: '84555d25bf2ba27f8e7407a0cf7975c8',
        token: 'ivqTest',
        menu: {
            "button": [
                {
                    "type": "view",
                    "name": "火影忍者",
                    "url": "http://www.ivqtest.com/roleScene/56d68ee7b8df978c0c758379",
                    "sub_button": []
                },
                {
                    "name": "我的菜单",
                    "sub_button": [
                        {"type": "click", "name": "单图文", "key": "menu_1", "sub_button": []},
                        {"type": "click", "name": "多图文", "key": "menu_2", "sub_button": []},
                        {"type": "click", "name": "文本", "key": "menu_3", "sub_button": []}
                    ]
                }
            ]
        }
    }

};