<template>
  <div>
    <div>
      <!--<p style="font-size: 0.68rem">地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>-->
      <p  class="flexAround title" style="font-size: 0.68rem">
        <span @click="cancel" class="cancel">取消</span>
        <span>请选择</span>
        <span @click="confirm" class="sure">确定</span>
      </p>
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
    </div>

  </div>
</template>

<script>
  import {Picker} from 'mint-ui';
  import {Popup} from 'mint-ui';
  import myaddress from '../../images/address.json'     //引入省市区数据
  export default {
    name: 'addressSelect',
    props: ['visible','editaddress'],
    data() {
      return {
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince: '省',
        myAddressCity: '市',
        myAddresscounty: '区/县',
        popupVisible: false
      }
    },
    created() {
    },
    computed: {


    },
    methods: {
      onMyAddressChange(picker, values) {
        if (myaddress[values[0]]) {  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }


      },
      cancel() {
        // console.log(Object.keys(myaddress))

        this.$emit('address-cancel', false)
      },
      confirm() {
        this.$emit('address-confirm', {
          province: this.myAddressProvince,
          city: this.myAddressCity,
          area: this.myAddresscounty,
          visible:false
        })
      }

    },
    mounted() {
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        if(this.editaddress){
            this.myAddressSlots[0].defaultIndex=this.myAddressSlots[0].values.indexOf(this.editaddress.split('-')[0]);
            this.myAddressSlots[2].defaultIndex=this.myAddressSlots[2].values.indexOf(this.editaddress.split('-')[1]);
            this.myAddressSlots[4].defaultIndex=this.myAddressSlots[4].values.indexOf(this.editaddress.split('-')[2]);
            // console.log(this.myAddressSlots[2])
        }
        else {
          this.myAddressSlots[0].defaultIndex=0;
        }


        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
    }
  }
</script>

<style scoped>
  .cancel {
    color: #FB5D57;
  }
  .title{
    padding: 10px 0;
  }

  .sure {
    color: #3190E8;
  }
</style>


