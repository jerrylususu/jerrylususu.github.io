(function(){"use strict";var t={5387:function(t,e,n){var a=n(9242),u=n(3396);function r(t,e,n,a,r,i){const o=(0,u.up)("flight-view");return(0,u.wg)(),(0,u.j4)(o)}const i=(0,u._)("h1",null,"今天航班熔断了吗？",-1),o=(0,u._)("hr",null,null,-1),s=(0,u.Uk)("民航局文件"),l=(0,u._)("p",null,"不考虑奖励航班和控制客座率措施",-1),c=(0,u.Uk)(" 开始日期："),g=(0,u._)("br",null,null,-1),d=(0,u.Uk)(" 周数：");function h(t,e,n,a,r,h){const f=(0,u.up)("a-button"),p=(0,u.up)("a-date-picker"),m=(0,u.up)("a-input-number"),v=(0,u.up)("a-col"),S=(0,u.up)("a-row"),b=(0,u.up)("date-item");return(0,u.wg)(),(0,u.iD)("div",null,[(0,u.Wm)(S,{justify:"space-around"},{default:(0,u.w5)((()=>[(0,u.Wm)(v,{lg:12,md:24},{default:(0,u.w5)((()=>[i,o,(0,u.Wm)(f,{href:"http://www.caac.gov.cn/XXGK/XXGK/TZTG/202104/t20210429_207386.html",target:"_blank"},{default:(0,u.w5)((()=>[s])),_:1}),l,c,(0,u.Wm)(p,{value:r.beginDate,"onUpdate:value":e[0]||(e[0]=t=>r.beginDate=t),onChange:h.inputHandler},null,8,["value","onChange"]),g,d,(0,u.Wm)(m,{value:r.numberOfWeeks,"onUpdate:value":e[1]||(e[1]=t=>r.numberOfWeeks=t),min:1,max:20,onChange:h.inputHandler},null,8,["value","onChange"])])),_:1})])),_:1}),(0,u.Wm)(S,{justify:"space-around"},{default:(0,u.w5)((()=>[(0,u.Wm)(v,{lg:12,md:24},{default:(0,u.w5)((()=>[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)(r.datesDetails,((t,e)=>((0,u.wg)(),(0,u.iD)("div",{key:t.date},[(0,u.Wm)(b,{date:t.date,count:t.count,index:e,triggerStatus:t.triggerStatus,flightStatus:t.flightStatus,onCountChange:h.countChangeHandler},null,8,["date","count","index","triggerStatus","flightStatus","onCountChange"])])))),128))])),_:1})])),_:1})])}n(6497);var f=n(3680),p=(n(8510),n(383)),m=(n(5703),n(6643)),v=(n(3332),n(3969)),S=(n(367),n(34)),b=(n(4535),n(6792)),w=n(7139);const C={key:0},D={key:1};function k(t,e,n,a,r,i){const o=(0,u.up)("a-input-number"),s=(0,u.up)("a-button"),l=(0,u.up)("check-outlined"),c=(0,u.up)("stop-outlined"),g=(0,u.up)("a-card");return(0,u.wg)(),(0,u.j4)(g,{class:(0,w.C_)([n.flightStatus])},{default:(0,u.w5)((()=>[(0,u.Uk)((0,w.zw)(n.date)+" ",1),(0,u.Wm)(o,{value:r.localCount,"onUpdate:value":e[0]||(e[0]=t=>r.localCount=t),onChange:i.countChangeHandler,min:0},null,8,["value","onChange"]),(0,u.Wm)(s,{class:(0,w.C_)(n.triggerStatus)},{default:(0,u.w5)((()=>[(0,u.Uk)((0,w.zw)(i.triggerStatusName),1)])),_:1},8,["class"]),"yes"===n.flightStatus?((0,u.wg)(),(0,u.iD)("span",C,[(0,u.Wm)(l)])):((0,u.wg)(),(0,u.iD)("span",D,[(0,u.Wm)(c)]))])),_:1},8,["class"])}n(7358);var y=n(153),_=n(6845),O=n(3320),W={components:{AButton:b.Z,AInputNumber:m.Z,ACard:y.ZP,CheckOutlined:_.Z,StopOutlined:O.Z},props:{date:{type:String,required:!0},count:{type:Number,required:!0},index:{type:Number,required:!0},triggerStatus:{type:String,required:!0},flightStatus:{type:String,required:!0}},emits:["countChange"],data(){return{localCount:this.count,triggerStatusMap:{ok:"正常",minor:"小熔断",major:"大熔断",immediate:"超级熔断"}}},methods:{countChangeHandler(t){this.localCount=t,this.$emit("countChange",{date:this.date,count:this.localCount,index:this.index})}},computed:{triggerStatusName(){return this.triggerStatus in this.triggerStatusMap?this.triggerStatusMap[this.triggerStatus]:this.triggerStatus.replace("broken by","熔断，触发于")}}},Z=n(89);const x=(0,Z.Z)(W,[["render",k],["__scopeId","data-v-42825c22"]]);var j=x,A={components:{AButton:b.Z,ADatePicker:S.ZP,ASpace:v.Z,AInputNumber:m.Z,DateItem:j,ARow:p.Z,ACol:f.Z},data(){return{beginDate:"",numberOfWeeks:12,datesDetails:[]}},methods:{inputHandler(t){if(t){this.datesDetails.splice(0,this.datesDetails.length);for(let t=1;t<=this.numberOfWeeks;t++){let e=new Date(this.beginDate);e.setDate(e.getDate()+7*(t-1));let n=e.toISOString().split("T")[0];this.datesDetails.push({date:n,count:0,triggerStatus:"ok",flightStatus:"yes"})}}},countChangeHandler(t){this.datesDetails[t.index].count=t.count,this.reCalculate()},reCalculate(){console.log("recalculating...");for(let t=0;t<this.datesDetails.length;t++)this.datesDetails[t].triggerStatus="ok",this.datesDetails[t].flightStatus="yes";for(let t=0;t<this.datesDetails.length;t++){let e=this.datesDetails[t],n=0,a=0;"yes"===e.flightStatus&&(0<=e.count&&e.count<5?e.triggerStatus="ok":5<=e.count&&e.count<10?(e.triggerStatus="minor",n=2,a=3):10<=e.count&&e.count<30?(e.triggerStatus="major",n=4,a=3):(e.triggerStatus="immediate",n=4,a=1));let u=0;while(n>0&&t+a+u<this.datesDetails.length)"yes"===this.datesDetails[t+a+u].flightStatus&&(this.datesDetails[t+a+u].flightStatus="no",this.datesDetails[t+a+u].triggerStatus=`broken by ${e.date}`,n--),u++}}}};const H=(0,Z.Z)(A,[["render",h]]);var U=H,N={name:"App",components:{FlightView:U},created(){document.title="今天航班熔断了吗？"}};const q=(0,Z.Z)(N,[["render",r]]);var I=q;n(2467);(0,a.ri)(I).mount("#app")}},e={};function n(a){var u=e[a];if(void 0!==u)return u.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,a,u,r){if(!a){var i=1/0;for(c=0;c<t.length;c++){a=t[c][0],u=t[c][1],r=t[c][2];for(var o=!0,s=0;s<a.length;s++)(!1&r||i>=r)&&Object.keys(n.O).every((function(t){return n.O[t](a[s])}))?a.splice(s--,1):(o=!1,r<i&&(i=r));if(o){t.splice(c--,1);var l=u();void 0!==l&&(e=l)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[a,u,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var u,r,i=a[0],o=a[1],s=a[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(u in o)n.o(o,u)&&(n.m[u]=o[u]);if(s)var c=s(n)}for(e&&e(a);l<i.length;l++)r=i[l],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(c)},a=self["webpackChunkvuex_demo"]=self["webpackChunkvuex_demo"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(5387)}));a=n.O(a)})();
//# sourceMappingURL=app.4d166d18.js.map