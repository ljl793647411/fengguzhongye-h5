import App from '../App'

import rebateManageDetail from "../views/index/rebateManageDetail";
import login from "../views/login/login";
import register from "../views/login/register";
import agentRegister from "../views/login/agentRegister";
import forgetPwd from "../views/login/forgetPwd";
import search from "../views/login/search";



import mallIndex from "../views/index/index";
import giftDetail from "../views/index/giftDetail";
import exchange from "../views/index/exchange";
import inviteAgents from "../views/index/inviteAgents";
import authManage from "../views/index/authManage";
import authorizeUpgradeManage from "../views/index/authorizeUpgradeManage";
import authHeadManage from "../views/index/authHeadManage";
import authAgnetHeadManage from "../views/index/authAgnetHeadManage";
import authAgentManage from "../views/index/authAgentManage";
import myTeam from "../views/index/myTeam";
import rebate from "../views/index/rebate";
import rebateManage from "../views/index/rebateManage";
import payFreight from "../views/index/payFreight";
import orderList from "../views/index/orderList";
import deliverStatus from "../views/index/deliverStatus";
import inventory from "../views/index/inventory";
import recharge from "../views/index/recharge";
import stockOrders from "../views/index/stockOrders";
import overstock from "../views/index/overstock";
import agentInventory from "../views/index/agentInventory";
import stockOrdersDetail from "../views/index/stockOrdersDetail";
import scanCode from "../views/index/scanCode";
import performance from "../views/index/performance";
import performanceOrder from "../views/index/performanceOrder";
import authorization from "../views/index/authorization";
import performanceBill from "../views/index/performanceBill";
import distributionCommission from "../views/index/distributionCommission";
import share from "../views/index/share";
import issueEvaluate from "../views/index/issueEvaluate";
import lookEvaluate from "../views/index/lookEvaluate";
import allEvaluate from "../views/index/allEvaluate";
import rebateItem from "../views/index/rebateItem";
import myRebate from "../views/index/myRebate";
import applyWithdrawDeposit from "../views/index/applyWithdrawDeposit";
import withdrawDepositDetail from "../views/index/withdrawDepositDetail";
import applySuccess from "../views/index/applySuccess";






import classifyIndex from "../views/classify/index";
import setting from "../views/my/setting/setting";
import changePassword from "../views/my/setting/changePassword";
import shopCarIndex from "../views/shopCar/index";
import info from "../views/my/setting/info";
import infoSucceed from "../views/my/setting/infoSucceed";

import myIndex from "../views/my/index";
import sysIndex from "../views/my/sysindex";
import orderIndex from "../views/my/order/orderIndex";
import orderIndexth from "../views/my/order/orderIndexth";
import orderDetail from "../views/my/order/orderDetail";
import logisticsDetail from "../views/my/order/logisticsDetail";
import addressIndex from "../views/my/address/addressIndex";
import addAddress from "../views/my/address/addAddress";
import integralIndex from "../views/my/integral";
import scan from "../views/my/scan";
import informMsg from "../views/my/informMsg";
import promptMessage from "../views/my/promptMessage";




export default [{
  path: '/',
  component: App, //顶层路由，在index.html里加载App组件
  children: [//二级路由。对应App.vue
    //地址为空时跳转index页面
    {
      path: '',
      redirect: '/mallIndex',//mallIndex
      auth: false
    },
    //楼层滚动
    {
      path: '/search',
      component: search,
      meta: {
        title: '登陆',
        auth: false
      },

    },
    //登录页面
    {
      path: '/login',
      component: login,
      meta: {
        title: '登陆',
        auth: false
      },

    },
    //注册页面
    {
      path: '/register',
      component: register,
      meta: {
        title: '注册信息',
        auth: false
      },
    },
    //代理商注册页面
    {
      path: '/agentRegister',
      component: agentRegister,
      meta: {
        title: '代理商注册',
        auth: false
      },
    },
    //忘记密码页面
    {
      path: '/forgetPwd',
      component: forgetPwd,
      meta: {
        title: '忘记密码'
      }
    },
    //index页面
    {
      path: '/mallIndex',
      component: mallIndex,
      meta: {
        title: '云玛社交新零售分销系统',
        auth: false
      }
    },
    {
      path: '/giftDetail',
      component: giftDetail,
      meta: {
        title: '商品详情',
        auth: false
      }
    },
    {
      path: '/sysIndex',
      component: sysIndex,
      meta: {
        title: '个人中心',
        auth: true
      }
    },
    {
      path: '/exchange',
      component: exchange,
      meta: {
        title: '提货结算',
        auth: true
      }
    },
    {
      path: '/authAgentManage',
      component: authAgentManage,
      meta: {
        title: '审核管理',
        auth: true
      }
    },
    {
      path: '/authAgnetHeadManage',
      component: authAgnetHeadManage,
      meta: {
        title: '代理商注册管理',
        auth: true
      }
    },
    {
      path: '/authManage',
      component: authManage,
      meta: {
        title: '邀请记录',
        auth: true
      }
    },
    {
      path: '/authorizeUpgradeManage',
      component: authorizeUpgradeManage,
      meta: {
        title: '升级管理',
        auth: true
      }
    },
    {
      path: '/authHeadManage',
      component: authHeadManage,
      meta: {
        title: '授权管理',
        auth: true
      }
    },
    {
      path: '/inviteAgents',
      component: inviteAgents,
      meta: {
        title: '代理邀请',
        auth: true
      }
    },
    {
      path: '/myTeam',
      component: myTeam,
      meta: {
        title: '我的团队',
        auth: true
      }
    },
    {
      path: '/performance',
      component: performance,
      meta: {
        title: '绩效管理',
        auth: true
      }
    },
    {
      path: '/performanceOrder',
      component: performanceOrder,
      meta: {
        title: '绩效明细',
        auth: true
      }
    },
    {
      path: '/rebate',
      component: rebate,
      meta: {
        title: '返利管理',
        auth: true
      }
    },
    {
      path: '/orderIndexth',
      component: orderIndexth,
      meta: {
        title: '提货',
        auth: true
      }
    },
    {
      path: '/rebateManage',
      component: rebateManage,
      meta: {
        title: '返利管理',
        auth: true
      }
    },
    {
      path: '/rebateManageDetail',
      component: rebateManageDetail,
      meta: {
        title: '返利明细',
        auth: true
      }
    },
    {
      path: '/rebateItem',
      component: rebateItem,
      meta: {
        title: '返利项',
        auth: true
      }
    },
    {
      path: '/payFreight',
      component: payFreight,
      meta: {
        title: '提货结算',
        auth: true
      }
    },
    {
      path: '/orderList',
      component: orderList,
      meta: {
        title: '我的订单',
        auth: true
      }
    },
    // {
    //   path: '/deliverStatus',
    //   component: deliverStatus,
    //   meta: {
    //     title: '我的订单',
    //     auth:true
    //   }
    // },
    {
      path: '/inventory',
      component: inventory,
      meta: {
        title: '库存管理',
        auth: true
      }
    },

    {
      path: '/recharge',
      component: recharge,
      meta: {
        title: '充值',
        auth: true
      }
    },
    {
      path: '/stockOrders',
      component: stockOrders,
      meta: {
        title: '存货订单',
        auth: true
      }
    },
    {
      path: '/overstock',
      component: overstock,
      meta: {
        title: '余货明细',
        auth: true
      }
    },
    {
      path: '/agentInventory',
      component: agentInventory,
      meta: {
        title: '代理库存',
        auth: true
      }
    },
    {
      path: '/stockOrdersDetail',
      component: stockOrdersDetail,
      meta: {
        title: '存货订单详情',
        auth: true
      }
    },
    {
      path: '/scanCode',
      component: scanCode,
      meta: {
        title: '扫码发货',
        auth: true
      }
    },
    {
      path: '/authorization',
      component: authorization,
      meta: {
        title: '授权证书',
        auth: true
      }
    },
    {
      path: '/performanceBill',
      component: performanceBill,
      meta: {
        title: '业绩账单',
        auth: true
      }
    },
    {
      path: '/myRebate',
      component: myRebate,
      meta: {
        title: '分销返佣',
        auth: true
      }
    },
    {
      path: '/myRebate',
      component: myRebate,
      meta: {
        title: '我的返佣',
        auth: true
      }
    },
    {
      path: '/applyWithdrawDeposit',
      component: applyWithdrawDeposit,
      meta: {
        title: '申请提现',
        auth: true
      }
    },
    {
      path: '/withdrawDepositDetail',
      component: withdrawDepositDetail,
      meta: {
        title: '申请提现',
        auth: true
      }
    },
    {
      path: '/applySuccess',
      component: applySuccess,
      meta: {
        title: '申请成功',
        auth: true
      }
    },
    {
      path: '/share',
      component: share,
      meta: {
        title: '商品分享',
        auth: true
      }
    },
    {
      path: '/lookEvaluate',
      component: lookEvaluate,
      meta: {
        title: '发表评价',
        auth: true
      }
    },
    {
      path: '/issueEvaluate',
      component: issueEvaluate,
      meta: {
        title: '交易成功',
        auth: true
      }
    },
    {
      path: '/allEvaluate',
      component: allEvaluate,
      meta: {
        title: '全部评价',
        auth: true
      }
    },
    //分类页面
    {
      path: '/classifyIndex',
      component: classifyIndex,
      meta: {
        title: '商品分类',
        auth: true
      }
    },
    //购物车页面
    {
      path: '/shopCarIndex',
      component: shopCarIndex,
      meta: {
        title: '购物车',
        auth: true
      }
    },
    //我的页面
    {
      path: '/myIndex',
      component: myIndex,
      meta: {
        title: '个人中心',
        auth: true
      }
    },
    {
      path: '/integralIndex',
      component: integralIndex,
      meta: {
        title: '我的积分',
        auth: true
      }
    },
    {
      path: '/orderIndex',
      component: orderIndex,
      meta: {
        title: '我的订单',
        auth: true
      }
    },
    {
      path: '/orderDetail',
      component: orderDetail,
      meta: {
        title: '订单详情',
        auth: true
      }
    },
    {
      path: '/logisticsDetail',
      component: logisticsDetail,
      meta: {
        title: '物流详情',
        auth: true
      }
    },
    {
      path: '/setting',
      component: setting,
      meta: {
        title: '个人设置',
        auth: true
      }
    },
    {
      path: '/changePassword',
      component: changePassword,
      meta: {
        title: '修改密码',
        auth: true
      }
    },
    {
      path: '/addressIndex',
      component: addressIndex,
      meta: {
        title: '地址列表',
        auth: true
      }
    },
    {
      path: '/addAddress',
      name: '/addAddress',
      component: addAddress,
      meta: {
        title: '新增地址',
        auth: true
      }
    },
    {
      path: '/scan',
      component: scan,
      meta: {
        title: '扫码',
        auth: true
      }
    },
    {
      path: '/informMsg',
      component: informMsg,
      meta: {
        title: '通知消息',
        auth: true
      }
    },
    {
      path: '/info',
      component: info,
      meta: {
        title: '注册申请',
        auth: true
      }
    },
    {
      path: '/infoSucceed',
      component: infoSucceed,
      meta: {
        title: '注册信息',
        auth: true
      }
    },
    {
      path: '/promptMessage',
      component: promptMessage,
      meta: {
        title: '提示信息',
        auth: true
      }
    }
  ]
}]
