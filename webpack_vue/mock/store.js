var cmsColumnsData = {
        cmsName: '疯狂开学季',
        platform: 'pc',
        backgroundColor: '#fff',
        column: [
            {
                id: '0001',
                name: '首页轮播',
                category: 'main-slider',
                layout: '0',
                isFilling: true,
                fillData:{

                }
            },
            {
                id: '0001',
                name: '首页通栏广告',
                category: 'top-news',
                layout: '0',
                isFilling: true,
                fillData:{

                }
            },
//            {
//                id: '0002',
//                name: '通栏模板一列',
//                category: 'cms-nav',
//                layout: '1',
//                isFilling: false,
//                fillData:{
//
//                }
//            },
//            {
//                id: '0003',
//                name: '通栏模板两列',
//                category: 'cms-ad',
//                layout: '2',
//                isFilling: false,
//                fillData:{
//
//                }
//            },
//            {
//                id: '0004',
//                name: '通栏模板三列',
//                category: 'cms-ad',
//                layout: '3',
//                isFilling: false,
//                fillData:{
//
//                }
//            },
//            {
//                id: '0005',
//                name: '通栏模板四列',
//                category: 'cms-goods',
//                layout: '4',
//                isFilling: false,
//                fillData:{
//
//                }
//            },
//            {
//                id: '0006',
//                name: '通栏模板五列',
//                category: 'cms-goods',
//                layout: '5',
//                isFilling: false,
//                fillData:{
//
//                }
//            },
//            {
//                id: '0005',
//                name: '商品列表四列',
//                category: 'cms-goods',
//                layout: 'shop-4',
//                isFilling: false,
//                typeClass: 'pc-shop-4',
//                fillData:{
//
//                }
//            },
//            {
//                id: '0005',
//                name: '商品列表五列',
//                category: 'cms-goods',
//                layout: 'shop-5',
//                isFilling: false,
//                typeClass: 'pc-shop-5',
//                fillData:{
//
//                }
//            },
//            {
//                id: '0004',
//                name: '左侧导航',
//                category: 'cms-goods',
//                layout: 'nav-left',
//                isFilling: false,
//                typeClass: 'pc-nav-left',
//                fillData:{
//
//                }
//            },
//            {
//                id: '0005',
//                name: '右侧导航',
//                category: 'cms-goods',
//                layout: 'nav-right',
//                isFilling: false,
//                typeClass: 'pc-nav-right'
//            }
        ]
    };
    
module.exports = {
    fetch : function() {
        return cmsColumnsData;
    }
}
       