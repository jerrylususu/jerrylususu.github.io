(function(){"use strict";var t={9661:function(t,e,n){var a=n(9242),i=n(3396);function l(t,e,n,a,l,u){const r=(0,i.up)("flight-view");return(0,i.wg)(),(0,i.j4)(r)}const u=(0,i._)("h1",null,"今天航班熔断了吗？",-1),r=(0,i._)("hr",null,null,-1),o=(0,i.Uk)("民航局文件"),s=(0,i._)("p",null,"不考虑奖励航班和控制客座率措施",-1),d=(0,i.Uk)(" 首个航班入境日期："),c=(0,i._)("br",null,null,-1),g=(0,i.Uk)(" 周数："),h=(0,i._)("p",null,[(0,i.Uk)("图例：日期，是否取消，阳性数量 -> 熔断状态，航班状态 "),(0,i._)("br"),(0,i.Uk)(" 地区提示：北美：航司可能对航班进行"),(0,i._)("a",{href:"https://piao.tips/7bc7e7ee15/",target:"_blank"},"「规律性取消」")],-1);function f(t,e,n,a,l,f){const p=(0,i.up)("a-button"),m=(0,i.up)("github-outlined"),b=(0,i.up)("a-date-picker"),S=(0,i.up)("a-input-number"),v=(0,i.up)("a-col"),w=(0,i.up)("a-row"),k=(0,i.up)("date-item");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(w,{justify:"space-around"},{default:(0,i.w5)((()=>[(0,i.Wm)(v,{lg:12,md:24},{default:(0,i.w5)((()=>[u,r,(0,i.Wm)(p,{href:"http://www.caac.gov.cn/XXGK/XXGK/TZTG/202104/t20210429_207386.html",target:"_blank"},{default:(0,i.w5)((()=>[o])),_:1}),(0,i.Wm)(p,{href:"https://github.com/jerrylususu/rongduan_or_not",target:"_blank"},{default:(0,i.w5)((()=>[(0,i.Wm)(m)])),_:1}),s,d,(0,i.Wm)(b,{value:l.beginDate,"onUpdate:value":e[0]||(e[0]=t=>l.beginDate=t),onChange:f.inputHandler},null,8,["value","onChange"]),c,g,(0,i.Wm)(S,{value:l.numberOfWeeks,"onUpdate:value":e[1]||(e[1]=t=>l.numberOfWeeks=t),min:1,max:40,onChange:f.inputHandler},null,8,["value","onChange"]),h])),_:1})])),_:1}),(0,i.Wm)(w,{justify:"space-around"},{default:(0,i.w5)((()=>[(0,i.Wm)(v,{lg:12,md:24},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.datesDetails,((t,e)=>((0,i.wg)(),(0,i.iD)("div",{key:t.date},[(0,i.Wm)(k,{date:t.date,count:t.count,index:e,triggerStatus:t.triggerStatus,flightStatus:t.flightStatus,enabled:t.enabled,onItemChange:f.itemChangeHandler},null,8,["date","count","index","triggerStatus","flightStatus","enabled","onItemChange"])])))),128))])),_:1})])),_:1})])}n(6497);var p=n(3680),m=(n(8510),n(383)),b=(n(5703),n(6643)),S=(n(3332),n(3969)),v=(n(367),n(34)),w=(n(4535),n(6792)),k=n(2134),C=n(7139);const D={key:0},y={key:1};function _(t,e,n,a,l,u){const r=(0,i.up)("a-switch"),o=(0,i.up)("a-input-number"),s=(0,i.up)("a-button"),d=(0,i.up)("check-outlined"),c=(0,i.up)("stop-outlined"),g=(0,i.up)("a-card");return(0,i.wg)(),(0,i.j4)(g,{class:(0,C.C_)([n.flightStatus])},{default:(0,i.w5)((()=>[(0,i.Uk)((0,C.zw)(n.date)+" ",1),(0,i.Wm)(r,{checked:l.localEnabled,"onUpdate:checked":e[0]||(e[0]=t=>l.localEnabled=t),size:"small",onChange:u.enabledChangeHandler},null,8,["checked","onChange"]),(0,i.Wm)(o,{value:l.localCount,"onUpdate:value":e[1]||(e[1]=t=>l.localCount=t),onChange:u.countChangeHandler,min:0,disabled:!l.localEnabled},null,8,["value","onChange","disabled"]),(0,i.Wm)(s,{class:(0,C.C_)(n.triggerStatus)},{default:(0,i.w5)((()=>[(0,i.Uk)((0,C.zw)(u.triggerStatusName),1)])),_:1},8,["class"]),"yes"===n.flightStatus?((0,i.wg)(),(0,i.iD)("span",D,[(0,i.Wm)(d)])):((0,i.wg)(),(0,i.iD)("span",y,[(0,i.Wm)(c)]))])),_:1},8,["class"])}n(7636);var O=n(3457),W=(n(7358),n(153)),Z=n(6845),x=n(3320),j={components:{AButton:w.Z,AInputNumber:b.Z,ACard:W.ZP,CheckOutlined:Z.Z,StopOutlined:x.Z,ASwitch:O.ZP},props:{date:{type:String,required:!0},count:{type:Number,required:!0},index:{type:Number,required:!0},triggerStatus:{type:String,required:!0},flightStatus:{type:String,required:!0},enabled:{type:Boolean,required:!0}},emits:["itemChange"],data(){return{localCount:this.count,triggerStatusMap:{ok:"正常",minor:"小熔断",major:"大熔断",immediate:"超级熔断",cancelled:"取消"},localEnabled:this.enabled}},methods:{countChangeHandler(t){this.localCount=t,this.$emit("itemChange",{date:this.date,count:this.localCount,enabled:this.localEnabled,index:this.index})},enabledChangeHandler(t){this.localEnabled=t,this.localEnabled||(this.localCount=0),this.$emit("itemChange",{date:this.date,count:this.localCount,enabled:this.localEnabled,index:this.index})}},computed:{triggerStatusName(){return this.triggerStatus in this.triggerStatusMap?this.triggerStatusMap[this.triggerStatus]:this.triggerStatus.replace("broken by","熔断，触发于")}}},A=n(89);const U=(0,A.Z)(j,[["render",_],["__scopeId","data-v-6df3c9b2"]]);var H=U,E={components:{AButton:w.Z,ADatePicker:v.ZP,ASpace:S.Z,AInputNumber:b.Z,DateItem:H,ARow:m.Z,ACol:p.Z,GithubOutlined:k.Z},data(){return{beginDate:"",numberOfWeeks:12,datesDetails:[]}},methods:{inputHandler(t){if(t){this.datesDetails.splice(0,this.datesDetails.length);for(let t=1;t<=this.numberOfWeeks;t++){let e=new Date(this.beginDate);e.setDate(e.getDate()+7*(t-1));let n=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().split("T")[0];this.datesDetails.push({date:n,count:0,triggerStatus:"ok",flightStatus:"yes",enabled:!0})}}},itemChangeHandler(t){this.datesDetails[t.index].count=t.count,this.datesDetails[t.index].enabled=t.enabled,this.reCalculate()},reCalculate(){console.log("recalculating...");for(let t=0;t<this.datesDetails.length;t++){let e=this.datesDetails[t];e.triggerStatus="ok",e.flightStatus="yes",e.enabled||(e.triggerStatus="cancelled",e.flightStatus="no")}for(let t=0;t<this.datesDetails.length;t++){let e=this.datesDetails[t],n=0,a=0,i=!1;if("yes"===e.flightStatus)if(0<=e.count&&e.count<5)e.triggerStatus="ok";else if(5<=e.count&&e.count<10)e.triggerStatus="minor",n=2,a=3;else if(10<=e.count&&e.count<30){if(e.triggerStatus="major",n=4,a=3,t-1>=0){let e=this.datesDetails[t-1];e.count>=10&&(n=8,a=1,i=!0)}}else e.triggerStatus="immediate",n=4,a=1;let l=0;while(n>0&&t+a+l<this.datesDetails.length){let u=this.datesDetails[t+a+l];u.enabled&&("yes"===u.flightStatus||i)&&(u.flightStatus="no",u.triggerStatus=`broken by ${e.date}`,n--,0===n&&(i=!1)),l++}}}}};const I=(0,A.Z)(E,[["render",f]]);var T=I,q={name:"App",components:{FlightView:T},created(){document.title="今天航班熔断了吗？"}};const N=(0,A.Z)(q,[["render",l]]);var P=N;n(2467);(0,a.ri)(P).mount("#app")}},e={};function n(a){var i=e[a];if(void 0!==i)return i.exports;var l=e[a]={exports:{}};return t[a].call(l.exports,l,l.exports,n),l.exports}n.m=t,function(){var t=[];n.O=function(e,a,i,l){if(!a){var u=1/0;for(d=0;d<t.length;d++){a=t[d][0],i=t[d][1],l=t[d][2];for(var r=!0,o=0;o<a.length;o++)(!1&l||u>=l)&&Object.keys(n.O).every((function(t){return n.O[t](a[o])}))?a.splice(o--,1):(r=!1,l<u&&(u=l));if(r){t.splice(d--,1);var s=i();void 0!==s&&(e=s)}}return e}l=l||0;for(var d=t.length;d>0&&t[d-1][2]>l;d--)t[d]=t[d-1];t[d]=[a,i,l]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var i,l,u=a[0],r=a[1],o=a[2],s=0;if(u.some((function(e){return 0!==t[e]}))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(o)var d=o(n)}for(e&&e(a);s<u.length;s++)l=u[s],n.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return n.O(d)},a=self["webpackChunkrongduanlema"]=self["webpackChunkrongduanlema"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(9661)}));a=n.O(a)})();
//# sourceMappingURL=app.7ffabb57.js.map