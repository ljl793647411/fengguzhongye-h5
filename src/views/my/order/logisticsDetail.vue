<template>
    <div>
        <div class="top flex">
            <span>{{state}}</span>
            <span class="flexGrow">{{orderNum}}</span>
            <span class="iconfont icon-xuanzeqixiayige"></span>
        </div>
        <div class="main">
            <div class="title flex">
                <span>运单</span>
                <span></span>
            </div>
            <div class="sendDetail">
                <div>
                    <span>发货方式：</span>
                    <span>{{sendWay}}</span>
                </div>
                <div>
                    <span>物流公司：</span>
                    <span>{{sendCompany}}</span>
                </div>
                <div>
                    <span>运单号码：</span>
                    <span>{{sendNum}}</span>
                </div>
                <div>
                    <span>发货时间：</span>
                    <span>{{sendDate}}</span>
                </div>
            </div>
            <div class="productDetail flex">
                <div class="flexCenter">
                    <img :src="imgUrl" alt="">
                </div>
                <div class="flexGrow">
                    <div>产品名称：{{productName}}</div>
                    <div>产品型号：{{productSize}}</div>
                    <span :style="{'background-color':productColor}"></span>
                </div>
            </div>
            <div class="logisticsDetail">
                <div class="title">物流跟踪</div>
                <div class="time-vertical">
                    <div class="item" v-for="(item,index) in datalist" :key="index">
                        <span class="item_first"></span>
                        <div class="item_three">
                            <div class="flexBetween">
                                <span>{{item.RecordTitle}}</span>
                                <span>{{item.CreateTime}}</span>
                            </div>
                            <div>{{item.RecordContent}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            state: "订单",
            orderNum: "3255545464646",
            sendWay: "快递",
            sendCompany: "中通快递",
            sendNum: "53535435454",
            sendDate: "2018-05-06 16:00:00",
            imgUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=179024290,1516758999&fm=26&gp=0.jpg",
            productName: "男士彩妆套装",
            productSize: "20ml",
            productColor: "#888",
            datalist:[{
                RecordTitle: "订单创建",
                CreateTime: "2018-10-26 10:44:58",
                RecordContent: "请耐心等待厂家审核"
            }]
        }
    }
}
</script>
<style lang="scss" scoped>
    .top{
        background-color: white;
        padding: .26087rem .652174rem;
        margin-bottom: .26087rem;
        >span:nth-child(1){
            font-size: .608696rem;
            color: #FA9D26;
            margin-right: .869565rem;
        }
        >span:nth-child(2){
            font-size: .521739rem;
        }
        >span:nth-child(2),span:nth-child(3){
            color: #888888;
        }
        >span:nth-child(3){
            font-size: .695652rem;
        }
    }
    .main{
        background-color: white;
        >.title{
            padding: .434783rem 0;
            >span:nth-child(1){
                width: 3.304348rem;
                height: 1.130435rem;
                line-height: 1.086957rem;
                background-color: #62ADE5;
                color: white;
                text-align: center;
                font-size: .608696rem;
                display: inline-block;
            }
            >span:nth-child(2){
                display: inline-block;
                border-top: .565217rem solid white;
                border-left: .652174rem solid #62ADE5;
                border-bottom: .565217rem solid white;
            }
        }
        >.sendDetail{
            font-size: .521739rem;
            padding: 0 .652174rem .217391rem;
            >div{
                padding: .130435rem 0;
            }
        }
        >.productDetail{
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: .434783rem .652174rem;
            >div:nth-child(1){
                width: 2.608696rem;
                height: 2.608696rem;
                overflow: hidden;
                >img{
                    width: 100%;
                }
            }
            >div:nth-child(2){
                padding-left: .652174rem;
                >div:nth-child(1){
                    font-size: .608696rem;
                }
                >div:nth-child(2){
                    font-size: .521739rem;
                    color: #888888;
                }
                >span{
                    display: inline-block;
                    width: .956522rem;
                    height: .956522rem;
                    margin-top: .434783rem;
                }
            }
        }
        /*纵向时间轴*/
        >.logisticsDetail {
            padding: .434783rem .652174rem;
            >.title{
                font-size: .695652rem;
                margin-bottom: .434783rem;
            }
        }
        .time-vertical {
            list-style-type: none;
            border-left: 1px solid #d8d8d8;
            padding: 0;
            width: 90%;
            margin: 0 auto;
            font-size: .608696rem;
            >.item{
                position: relative;
                padding: .434783rem 0 .434783rem .652174rem;
                >.item_first:before{
                    content: '';
                    position: absolute;
                    top: 15px;
                    left: -7px;
                    width: 10px;
                    height: 10px;
                    border: 1px solid #d8d8d8;
                    border-radius: 10px;
                    background: #d8d8d8;
                }
                >.item_three{
                    color: #828282;
                    border-bottom: 1px solid #f4f4f4;
                    >div:nth-child(2) {
                        font-size: 26rpx;
                    }
                }
            }
            .item:last-child{
                .item_first:before{
                    border: 1px solid #FA9D26;
                    border-radius: 10px;
                    background: #FA9D26;
                }
                .item_three{
                    color: #FA9D26;
                }
            }
        }
    }
</style>