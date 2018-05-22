// components/main/setting/setting.js
Component({
  properties: {
    isSettingShow: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    closeSetting(e) {
      let id = e.target.id;
      if (id === 'settingWrap'){
        console.log(12)
        // this.isSettingShow = false;
        this.triggerEvent('closeSetting',false);
        // this.setData({
        //   isSettingShow:false
        // })
      }
    }
  }
})
