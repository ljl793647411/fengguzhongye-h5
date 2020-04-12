<!-- # Introduction

[README in Chinese](README.md)

When I began to learn to vue, search of some practical source code about vue, but most of them are simple demo and didn't help to explore the vue. The most of demo are front-end page, such as music player interaction not as complicated as expected.But in actual work, we often meet some project involving money, such as shopping cart page. This kind of project is complex, accompany by login, register ,user information and so on. It's difficult, no one has ever written a project like this in vue and commit to github. So I write it, hope I can help you. 

This functional project is practical but often boring, with no music player so gorgeous. For a long time, I think that Elm APP is a good material. First, it is complex that the open delivery platform is more complicated than the typical project. Second, you won't get bored seeing so much beautiful food.

But why is the Elm APP, not Baidu App or Meituan App? The reason is simple, that Elm's layout is the most beautiful and the most comfortable in the three APP.

There are 45 pages of this project, involving registration, login, merchandise display, shopping cart, order and so on. It is a complete process. The average company project is not that complicated, so if you can understand this project fully, I believe that you can able to do the most of single-page applications in the other company. Even if it's more complex, and it won't be much higher than this one.

The project was done in the spare time, actually it was written years ago and over the years, so the spend time seem a bit long. The project spend more than two months from beginning to end. Now it has been completed, some performance optimizations are being performed to add detailed annotations.

In addition, the project don't related elm video of imooc website, and that project only have one page. After watching the official documentation of vue, I wrote this project directly, and without reference to any code, so please don't mix them up.

__Note: This project is purely personal. If you want to order, please choose the official elm client.__



## Technology

vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex + svg


## Development

Note:This project used a lot of properties such as ES6/7, so node 6.0.0+ is required.

```
git clone https://github.com/bailicangdu/vue2-elm.git  

cd vue2-elm

npm install

npm run dev

```


## More
This project has the supporting background system. If you want to develop it, you can download the corresponding backend system.[backend system](https://github.com/bailicangdu/node-elm)。

Backend system's run command:npm run local .

If you only do the front-end development, ignore this note.


# Explain

>  If it helps you, you can click "Star" in the upper right corner to support,thank you. ^_^

>  May be you can "follow" me, I will make more interstng projects.

>  Development environment: macOS 10.12.3  Chrome 56  nodejs 6.10.0

>  Thanks for 辰妹子[@bailichen](https://github.com/bailichen), [@iceRao](https://github.com/raoenhui)，to help complete the project，thank you🌹

>  If you hava some question,you can post the question in Issues, and if you find some solution or some improvement，please pull request. 👍

>  [communication group](https://gitter.im/vue2-elm/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

>  Recommend a open source project about react and redux。[address](https://github.com/bailicangdu/react-pxq)

>  Recommend a other demo about vue2 and vuex，it's simple and good for newbie.[address](https://github.com/bailicangdu/vue2-happyfri)


## Dscription of the data interface 🤔

### 2017-05-30

For some reason，previous interfaces could not be used, it made the project failed to run.The new backend system is built by nodejs.[backend system address](https://github.com/bailicangdu/node-elm). It can kept consisent with the offical website. And provide corresponding [background management system](https://github.com/bailicangdu/vue2-manage)


# Demo

[click it](http://cangdu.org/elm/)（Preview with chrome phone mode please）

### The mobile can scan the qr code in the below

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/ewm.png" width="250" height="250"/>



# Features
- [x] location function -- finished
- [x] choose city -- finished
- [x] search address-- finished
- [x] display a list of merchant that near by the selected address -- finished
- [x] find food or restaurant -- finished
- [x] sorting and filter according to distance,sales,rating,special course,distribution and so on -- finished
- [x] food list of restaurant -- finished
- [x] cart function -- finished
- [x] evaluation page of shop -- finished
- [x] detail page about one food-- finished
- [x] detail page about merchant -- finished
- [x] login、register -- finished
- [x] change password -- finished
- [x] user center -- finished
- [x] send message、voice verification -- finished
- [x] order function -- finished ✨✨🎉🎉
- [x] order list -- finished
- [x] order detail -- finished
- [x] download App -- finished
- [x] add、delete、change delivery address -- finished
- [x] account info -- finished
- [x] service center -- finished
- [x] red packet -- finished
- [x] upload avator -- finished
- [ ] pay -- No money~~



# Summarize

1, It is not the official of elm, so it is necessary to open the agent, and must be opened on the PC. At most, you can order but not more, after the success of the order, you can check and pay the payment on your mobile phone.

2, In general, the page involves money that is complicated, especially like elm? An open platform, It has many types of merchants and foods, need some complex interaction between page and page. When I writing the cart and order pages, without API but it has a lot of 

3, Vue is so bright, because of it's a lightweight framework good at the small and medium-sized project. Whem you want make a large single-page application, you can use vuex, the performance is still outstanding. In the treatment of the complex interaction logic page, vuex is necessary. So if you use vue and vuex, you can make large single-page projects.

4, Now, after make process of the login to register, homepage, search, businesses, shopping cart, order, order list, personal center and so on. I not only understanding the vue to a deeper level, and it's can help for me to control the large project in the future. Do a practical project has great improvement in myself.

5, Sometimes I doubt that to spend a few months make this project has meaning or not. At first I just wanted to do a small project, but I didn't think I could write more, but when I finished I believed it was worth it.

6, The project was already finished, and have 45 pages.


# Ultimate Goal

1, Build a background system to simulate the delivery platform with node.js。[address](https://github.com/bailicangdu/node-elm)

2, Use react-native to write native APP of Android and IOS。[地址在这里](https://github.com/bailicangdu/React-Native-elm)

3、May be I will make a seller's version in the future.
  
  So my goal is to build a full ecosystem across the frontend , backend, IOS and Android.
  
  ...Waiting for me



# Screenshot


### store list page

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.gif" width="365" height="619"/>


### store filter page

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/food.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/food.gif" width="365" height="619"/>



### food list and cart

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/shop_cart.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/shop_cart.gif" width="365" height="619"/>

### oder check page

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/confirm1.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/confirmOrder.gif" width="365" height="619"/>


### search page

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/search.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/search.gif" width="365" height="619"/>


### login page

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/login1.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/login.gif" width="365" height="619"/>


### user center

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/profile.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/profile.gif" width="365" height="619"/>






# Layout

```
.
├── build                                       // webpack config file
├── config                                      // package path
├── elm                                         // online project file,can access if put them one the server
├── screenshots                                 // screenshot
├── src                                         // source directory
│   ├── components                              // components
│   │   ├── common                              // common components
│   │   │   ├── alertTip.vue                    // popup components
│   │   │   ├── buyCart.vue                     // cart components
│   │   │   ├── computeTime.vue                 // countdown components
│   │   │   ├── loading.vue                     // the animation component when page is initialized
│   │   │   ├── mixin.js                        // mixinf components(inculde：directive-loading more，make picture address)
│   │   │   ├── ratingStar.vue                  // the five rating star component about comment
│   │   │   └── shoplist.vue                    // the resturant list common component of msite and shop page
│   │   ├── footer
│   │   │   └── footGuide.vue                   // footer common component
│   │   └── header
│   │       └── head.vue                        // header common component
│   ├── config                                  // basic configuration
│   │   ├── env.js                              // environment switch configuration
│   │   ├── fetch.js                            // git data
│   │   ├── mUtils.js                           // common function about js
│   │   └── rem.js                              // px transform rem
│   ├── images                                  // public picture
│   ├── page
│   │   ├── balance
│   │   │   ├── balance.vue                     // balance page
│   │   │   └── children
│   │   │       └── detail.vue                  // balance detail page
│   │   ├── benefit
│   │   │   ├── benefit.vue                     // benefit pahe
│   │   │   └── children
│   │   │       ├── commend.vue                 // recommend prize
│   │   │       ├── coupon.vue                  // coupon introduction
│   │   │       ├── exchange.vue                // exchange benefit
│   │   │       ├── hbDescription.vue           // benefit descripting
│   │   │       └── hbHistory.vue               // benefit's history
│   │   ├── city                 
│   │   │   └── city.vue                        // local city page
│   │   ├── confirmOrder
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── addAddress.vue          // add address page
│   │   │   │   │   └── children
│   │   │   │   │       └── searchAddress.vue   // search address page
│   │   │   │   ├── chooseAddress.vue           // choose address page
│   │   │   │   ├── invoice.vue                 // choose invoice page
│   │   │   │   ├── payment.vue                 // pay page
│   │   │   │   ├── remark.vue                  // order remark page 
│   │   │   │   └── userValidation.vue          // user validation page
│   │   │   └── confirmOrder.vue                // confirm order page
│   │   ├── download
│   │   │   └── download.vue                    // downlad App
│   │   ├── find
│   │   │   └── find.vue                        // find page
│   │   ├── food
│   │   │   └── food.vue                        // food filter sort page
│   │   ├── forget
│   │   │   └── forget.vue                      // forget password, change password
│   │   ├── home
│   │   │   └── home.vue                        // index page
│   │   ├── login
│   │   │   └── login.vue                       // login and register page
│   │   ├── msite
│   │   │   └── msite.vue                       // merchant list page
│   │   ├── order
│   │   │   ├── children
│   │   │   │   └── orderDetail.vue             // order detail page
│   │   │   └── order.vue                       // order list page
│   │   ├── points
│   │   │   ├── children
│   │   │   │   └── detail.vue                  // points detail page
│   │   │   └── points.vue                      // points page
│   │   ├── profile
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── address.vue             // address page
│   │   │   │   │   └── children
│   │   │   │   │       ├── add.vue             // add address page
│   │   │   │   │       └── children
│   │   │   │   │           └── addDetail.vue   // search address page
│   │   │   │   ├── info.vue                    // account info page
│   │   │   │   └── setusername.vue             // reset user page
│   │   │   └── profile.vue                     // user profile page
│   │   ├── search
│   │   │   └── search.vue                      // search page
│   │   ├── service
│   │   │   ├── children
│   │   │   │   └── questionDetail.vue          // question detail page
│   │   │   └── service.vue                     // service center page
│   │   ├── shop
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   └── shopSafe.vue            // shop check info page
│   │   │   │   ├── foodDetail.vue              // food detail page
│   │   │   │   └── shopDetail.vue              // shop detail page
│   │   │   └── shop.vue                        // shop filter page
│   │   └── vipcard
│   │       ├── children
│   │       │   ├── invoiceRecord.vue           // invoice record page
│   │       │   ├── useCart.vue                 // use card page
│   │       │   └── vipDescription.vue          // vip deacription page
│   │       └── vipcard.vue                     // vip handling page
│   ├── plugins                                 // plugins
│   ├── router
│   │   └── router.js                           // router configuration
│   ├── service                                 // data interaction and unified deployment
│   │   ├── getData.js                          // the unified deployment file for get data, and unified management of interfaces
│   │   └── tempdata                            // temporary data for the development
│   ├── store                                   // Vuex status management
│   │   ├── action.js                           // actions configuration
│   │   ├── getters.js                          // getters configuration
│   │   ├── index.js                            // use vuex，new store
│   │   ├── modules                             // store modules
│   │   ├── mutation-types.js                   // make const for muations
│   │   └── mutations.js                        // mutations configuration
│   └── style
│       ├── common.scss                         // common css
│       ├── mixin.scss                          // cs configuration file
│       └── swiper.min.css
│   ├── App.vue                                 // entry page js file
│   ├── main.js                                 // the main js for loading components
├── favicon.ico                                 // icon
├── index.html                                  // entry page html file
.

56 directories, 203 files
```


# License

[GPL](https://github.com/bailicangdu/vue2-elm/blob/master/COPYING) -->
