(function(){"use strict";var e={5264:function(e,t,n){var a=n(9242),l=n(3396);const o=(0,l.Uk)(" window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-WKB857318N'); ");function i(e,t,n,a,i,r){const u=(0,l.up)("flight-view");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(u),((0,l.wg)(),(0,l.j4)((0,l.LL)("script"),null,{default:(0,l.w5)((()=>[o])),_:1}))],64)}const r=(0,l._)("h1",null,"今天航班熔断了吗？",-1),u=(0,l._)("hr",null,null,-1),s=(0,l.Uk)(" 一个简单的熔断计算器：填入已知的阳性病例信息，计算未来会被熔断的航班。 "),d=(0,l._)("br",null,null,-1),c=(0,l._)("p",null,[(0,l.Uk)("不考虑奖励航班和控制客座率措施。"),(0,l._)("strong",null,"仅供参考！")],-1),h=(0,l.Uk)(" 首个航班入境日期："),p=(0,l._)("br",null,null,-1),g=(0,l.Uk)(" 周数："),m=(0,l._)("p",null,[(0,l.Uk)("图例：日期，取消开关，阳性数量 -> 熔断状态，航班状态 "),(0,l._)("br"),(0,l.Uk)(" 地区提示：美国：航司可能对航班进行"),(0,l._)("a",{href:"https://piao.tips/7bc7e7ee15/",target:"_blank"},"「规律性取消」"),(0,l.Uk)("，可使用航班卡片中的开关手动取消特定航班。")],-1),f=(0,l._)("p",null,"正常：航班状态正常（0~4 例阳性，不触发熔断）",-1),b=(0,l._)("p",null,"小熔断：5~9 例阳性，触发航班入境第四周起的 2 周熔断",-1),w=(0,l._)("p",null,"大熔断：10~30 例阳性，触发航班入境第四周起的 4 周熔断（若连续两周 10 例或以上阳性，立刻触发 4 周熔断）",-1),k=(0,l._)("p",null,"超级熔断：30 例以上阳性，立即触发 4 周熔断",-1),y=(0,l._)("p",null,"(稳)：（实验性）若触发连续熔断，熔断恢复后的头两班是一定能正常执飞的。",-1),_=(0,l._)("strong",null,"实验性！",-1),S=(0,l._)("p",null,"输入到目前为止已知的熔断信息和自己估计的熔断概率后，计算未来每周航班正常执飞的概率。",-1),v=(0,l._)("p",null,"需要输入的概率值之和为 100 %。计算时页面会卡顿，但通常可在 5 秒内计算完毕（周数为 20 周时）。",-1),W=(0,l._)("p",null,"结果为航班不受熔断影响正常执飞的概率，显示在每个航班所在行的最后，颜色越深，正常执飞的概率越高，即日期越安全。",-1),C=(0,l._)("p",null,"计算原理：在不影响已设定值的前提下，遍历所有可能的熔断/正常组合并记录每种组合对应的概率，最后对每个航次正常执飞的概率求和。",-1),D=(0,l._)("br",null,null,-1),P=(0,l._)("p",null,"已确定周数：算法假设从第一周至 X 周的阳性病例数是确定且已知的，运行中不会变更这些周的结果。",-1),O=(0,l._)("br",null,null,-1),U=(0,l.Uk)("计算");function j(e,t,n,o,i,j){const x=(0,l.up)("header-links"),Z=(0,l.up)("a-date-picker"),M=(0,l.up)("a-input-number"),A=(0,l.up)("a-collapse-panel"),I=(0,l.up)("a-switch"),E=(0,l.up)("a-alert"),H=(0,l.up)("a-form-item"),z=(0,l.up)("a-form"),T=(0,l.up)("a-button"),q=(0,l.up)("a-collapse"),N=(0,l.up)("a-col"),B=(0,l.up)("a-row"),F=(0,l.up)("date-item");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l.Wm)(B,{justify:"space-around"},{default:(0,l.w5)((()=>[(0,l.Wm)(N,{lg:12,md:24},{default:(0,l.w5)((()=>[r,u,s,d,(0,l.Wm)(x),c,h,(0,l.Wm)(Z,{value:i.beginDate,"onUpdate:value":t[0]||(t[0]=e=>i.beginDate=e),onChange:j.inputHandler},null,8,["value","onChange"]),p,g,(0,l.Wm)(M,{value:i.numberOfWeeks,"onUpdate:value":t[1]||(t[1]=e=>i.numberOfWeeks=e),min:1,max:40,onChange:j.inputHandler},null,8,["value","onChange"]),m,(0,l.Wm)(q,null,{default:(0,l.w5)((()=>[(0,l.Wm)(A,{key:"states",header:"状态说明"},{default:(0,l.w5)((()=>[f,b,w,k,y])),_:1}),(0,l.Wm)(A,{key:"simulation",header:"（实验性）日期安全性计算"},{default:(0,l.w5)((()=>[(0,l.Wm)(I,{checked:i.enableSimulation,"onUpdate:checked":t[2]||(t[2]=e=>i.enableSimulation=e),"checked-children":"开启","un-checked-children":"关闭"},null,8,["checked"]),_,S,v,W,C,D,P,O,(0,l.wy)((0,l.Wm)(E,{message:"未开启本功能，请拨动左上角的开关",type:"warning","show-icon":""},null,512),[[a.F8,!i.enableSimulation]]),(0,l.wy)((0,l.Wm)(E,{message:"概率和不为 100%",type:"error","show-icon":""},null,512),[[a.F8,!j.probSumValid]]),(0,l.wy)((0,l.Wm)(E,{message:"未填写首个航班入境日期",type:"error","show-icon":""},null,512),[[a.F8,!j.initialized]]),(0,l.Wm)(z,{layout:"inline"},{default:(0,l.w5)((()=>[(0,l.Wm)(H,{label:"正常"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{value:i.probOk,"onUpdate:value":t[3]||(t[3]=e=>i.probOk=e),"addon-after":"%",min:"0",max:"100"},null,8,["value"])])),_:1}),(0,l.Wm)(H,{label:"小熔断"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{value:i.probMinor,"onUpdate:value":t[4]||(t[4]=e=>i.probMinor=e),"addon-after":"%",min:"0",max:"100"},null,8,["value"])])),_:1}),(0,l.Wm)(H,{label:"大熔断"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{value:i.probMajor,"onUpdate:value":t[5]||(t[5]=e=>i.probMajor=e),"addon-after":"%",min:"0",max:"100"},null,8,["value"])])),_:1}),(0,l.Wm)(H,{label:"超级熔断"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{value:i.probImmediate,"onUpdate:value":t[6]||(t[6]=e=>i.probImmediate=e),"addon-after":"%",min:"0",max:"100"},null,8,["value"])])),_:1}),(0,l.Wm)(H,{label:"已确定周数（包含）"},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{value:i.knownWeekCount,"onUpdate:value":t[7]||(t[7]=e=>i.knownWeekCount=e),"addon-before":"至第","addon-after":"周",min:"0",max:i.numberOfWeeks},null,8,["value","max"])])),_:1})])),_:1}),(0,l.Wm)(H,null,{default:(0,l.w5)((()=>[(0,l.Wm)(T,{type:"primary",onClick:j.runSimulation,disabled:!j.simulationEnabled},{default:(0,l.w5)((()=>[U])),_:1},8,["onClick","disabled"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,l.Wm)(B,{justify:"space-around"},{default:(0,l.w5)((()=>[(0,l.Wm)(N,{lg:12,md:24},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.datesDetails,((e,t)=>((0,l.wg)(),(0,l.iD)("div",{key:e.date},[(0,l.Wm)(F,{date:e.date,count:e.count,index:t,triggerStatus:e.triggerStatus,flightStatus:e.flightStatus,enabled:e.enabled,surely:e.surely,showProb:e.showProb&&j.simulationEnabled,yesProb:e.yesProb,onItemChange:j.itemChangeHandler},null,8,["date","count","index","triggerStatus","flightStatus","enabled","surely","showProb","yesProb","onItemChange"])])))),128))])),_:1})])),_:1})])}n(7636);var x=n(3457),Z=(n(2758),n(575)),M=(n(961),n(5924)),A=(n(2008),n(579)),I=(n(6497),n(7228)),E=(n(8510),n(40)),H=(n(5703),n(6643)),z=(n(3332),n(3969)),T=(n(367),n(34)),q=(n(4535),n(5676)),N=n(7139);const B={key:0},F={key:1};function G(e,t,n,a,o,i){const r=(0,l.up)("a-switch"),u=(0,l.up)("a-input-number"),s=(0,l.up)("a-button"),d=(0,l.up)("check-outlined"),c=(0,l.up)("stop-outlined"),h=(0,l.up)("a-card");return(0,l.wg)(),(0,l.j4)(h,{class:(0,N.C_)([n.flightStatus])},{default:(0,l.w5)((()=>[(0,l.Uk)(" 第 "+(0,N.zw)(n.index+1)+" 周: "+(0,N.zw)(n.date)+" ",1),(0,l.Wm)(r,{checked:o.localEnabled,"onUpdate:checked":t[0]||(t[0]=e=>o.localEnabled=e),size:"small",onChange:i.enabledChangeHandler},null,8,["checked","onChange"]),(0,l.Wm)(u,{value:o.localCount,"onUpdate:value":t[1]||(t[1]=e=>o.localCount=e),onChange:i.countChangeHandler,min:0,disabled:!o.localEnabled},null,8,["value","onChange","disabled"]),(0,l.Wm)(s,{class:(0,N.C_)(n.triggerStatus)},{default:(0,l.w5)((()=>[(0,l.Uk)((0,N.zw)(i.surelyStr+i.triggerStatusName),1)])),_:1},8,["class"]),"yes"===n.flightStatus?((0,l.wg)(),(0,l.iD)("span",B,[(0,l.Wm)(d)])):((0,l.wg)(),(0,l.iD)("span",F,[(0,l.Wm)(c)])),n.showProb?((0,l.wg)(),(0,l.j4)(s,{key:2,type:"dashed",style:(0,N.j5)(i.probColor)},{default:(0,l.w5)((()=>[(0,l.Uk)((0,N.zw)((100*n.yesProb).toFixed(2)+"%"),1)])),_:1},8,["style"])):(0,l.kq)("",!0)])),_:1},8,["class"])}n(7358);var L=n(3023),K=n(6845),X=n(3320);const V={ok:0,minor:5,major:10,immediate:30};function $(e){return R(Y(e))}function Y(e){console.log("recalculating...");for(let t=0;t<e.length;t++){let n=e[t];n.triggerStatus="ok",n.flightStatus="yes",n.surely=!1,n.enabled||(n.triggerStatus="cancelled",n.flightStatus="no")}for(let t=0;t<e.length;t++){let n=e[t],a=0,l=0,o=!1;if("yes"===n.flightStatus)if(0<=n.count&&n.count<5)n.triggerStatus="ok";else if(5<=n.count&&n.count<10)n.triggerStatus="minor",a=2,l=3;else if(10<=n.count&&n.count<30){if(n.triggerStatus="major",a=4,l=3,t-1>=0){let n=e[t-1];n.count>=10&&(a=8,l=1,o=!0)}}else n.triggerStatus="immediate",a=4,l=1;let i=0;while(a>0&&t+l+i<e.length){let r=e[t+l+i];r.enabled&&("yes"===r.flightStatus||o)&&(r.flightStatus="no",r.triggerStatus=`broken by ${n.date}`,a--,0===a&&(o=!1)),i++}}return e}function R(e){let t=0,n=!1;while(t<e.length){if("no"===e[t].flightStatus&&t-1>=0&&["major","minor","immediate"].includes(e[t-1].triggerStatus)){console.log(t);while("no"===e[t].flightStatus)t++;let a=2;while(a>0&&t<e.length)"yes"===e[t].flightStatus&&(a--,e[t].surely=!0,n=!0),t++}n&&(n=!1,t--),t++}return e}function J(e,t){let n=[];for(let a=1;a<=e;a++){let e=new Date(t);e.setDate(e.getDate()+7*(a-1));let l=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().split("T")[0];n.push({date:l,count:0,triggerStatus:"ok",flightStatus:"yes",enabled:!0,surely:!1})}return n}function Q(e,t,n){for(let[a,l]of t.entries())e[a].count=l;for(let[a,l]of n.entries())e[a].enabled=l}function ee(e,t,n){let a=[];for(let o=0;o<t;o++)a.push(0);for(let o=0;o<n;o++)a[o]=e[o].count;let l=e.map((e=>e.enabled));return[a,l]}function te(e,t,n){let[a,l]=t,o=0;for(let u=0;u<a.length;u++){let[t,n]=a[u];o=n,"nop"!==t&&(e[n].count=V[t])}Y(e);let i=o+1;while(i<e.length&&("ok"!==e[i].triggerStatus||!e[i].enabled))i++;if(i===e.length)return null;let r=[];for(const[u,s]of Object.entries(n))if(0!==s){let e=[...a];e.push([u,i]);let t=l*s;r.push([e,t])}return r}function ne(e,t,n,a){let l={};for(let o of e)l[o.date]={yes_prob:0,yes:0,no:0};for(let o of t){Q(e,n,a);let[t,i]=o;for(let n=0;n<t.length;n++){let[a,l]=t[n];"nop"!==a&&(e[l].count=V[a])}Y(e);for(let n of e)l[n.date][n.flightStatus]=1+(l[n.date][n.flightStatus]??0),"yes"===n.flightStatus&&(l[n.date]["yes_prob"]=i+(l[n.date]["yes_prob"]??0))}return l}function ae(e){let{datesDetails:t,beginDate:n,numOfWeeks:a,knownWeekCount:l,probMap:o}=e;console.log("datesDetails",t);let i=J(a,n),[r,u]=ee(t,a,l),s=[[[["nop",l-1]],1]],d=[];while(s.length>0){Q(i,r,u);let e=s.shift(),t=te(i,e,o);null===t?d.push(e):s=s.concat(t)}console.log("sim done"),console.log(`prob sum: ${d.map((e=>e[1])).reduce(((e,t)=>e+t),0)}`);let c=ne(i,d,r,u);return c}const le=function(e,t,n){const a=e>>16,l=e>>8&255,o=255&e,i=t>>16,r=t>>8&255,u=255&t,s=a+n*(i-a),d=l+n*(r-l),c=o+n*(u-o);return"#"+((1<<24)+(s<<16)+(d<<8)+c|0).toString(16).slice(1)};var oe={components:{AButton:q.Z,AInputNumber:H.Z,ACard:L.ZP,CheckOutlined:K.Z,StopOutlined:X.Z,ASwitch:x.ZP},props:{date:{type:String,required:!0},count:{type:Number,required:!1,default:0},index:{type:Number,required:!0},triggerStatus:{type:String,required:!0},flightStatus:{type:String,required:!0},enabled:{type:Boolean,required:!0},surely:{type:Boolean,required:!0},showProb:{type:Boolean,required:!1,default:!1},yesProb:{type:Number,required:!1,default:0}},emits:["itemChange"],data(){return{localCount:this.count,triggerStatusMap:{ok:"正常",minor:"小熔断",major:"大熔断",immediate:"超级熔断",cancelled:"取消"},localEnabled:this.enabled}},methods:{countChangeHandler(e){this.localCount=e,this.$emit("itemChange",{date:this.date,count:this.localCount,enabled:this.localEnabled,index:this.index})},enabledChangeHandler(e){this.localEnabled=e,this.localEnabled||(this.localCount=0),this.$emit("itemChange",{date:this.date,count:this.localCount,enabled:this.localEnabled,index:this.index})}},computed:{triggerStatusName(){return this.triggerStatus in this.triggerStatusMap?this.triggerStatusMap[this.triggerStatus]:this.triggerStatus.replace("broken by","熔断，触发于")},surelyStr(){return this.surely?"(稳)":""},probColor(){let e=this.yesProb>.6?"white":"black";return{"background-color":le(14938877,870305,this.yesProb),color:e}}},watch:{count:{handler(e){this.localCount=e},immediate:!0},enabled:{handler(e){this.localEnabled=e},immediate:!0}}},ie=n(89);const re=(0,ie.Z)(oe,[["render",G],["__scopeId","data-v-30f871bf"]]);var ue=re;const se=(0,l._)("img",{src:"assets/caac_logo.png",style:{"max-height":"75%",width:"auto"}},null,-1),de=(0,l.Uk)("民航局文件"),ce=(0,l.Uk)(" Github"),he=(0,l._)("img",{src:"assets/piaotips_logo.png",style:{"max-height":"75%",width:"auto"}},null,-1),pe=(0,l.Uk)(" 北美票帝"),ge=(0,l.Uk)("官网 piao.tips"),me=(0,l.Uk)("微博 @北美票帝"),fe=(0,l._)("img",{src:"assets/piaotips_large.jpg",style:{"max-width":"100%",height:"auto"}},null,-1);function be(e,t,n,a,o,i){const r=(0,l.up)("a-button"),u=(0,l.up)("github-outlined"),s=(0,l.up)("a-modal");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(r,{size:"large",href:"http://www.caac.gov.cn/XXGK/XXGK/TZTG/202104/t20210429_207386.html",target:"_blank"},{default:(0,l.w5)((()=>[se,de])),_:1}),(0,l.Wm)(r,{size:"large",href:"https://github.com/jerrylususu/rongduan_or_not",target:"_blank",type:"primary"},{default:(0,l.w5)((()=>[(0,l.Wm)(u),ce])),_:1}),(0,l.Wm)(r,{size:"large",onClick:i.showModel},{default:(0,l.w5)((()=>[he,pe])),_:1},8,["onClick"]),(0,l.Wm)(s,{visible:o.showPiaoTipsModal,"onUpdate:visible":t[0]||(t[0]=e=>o.showPiaoTipsModal=e),title:"北美票帝"},{footer:(0,l.w5)((()=>[(0,l.Wm)(r,{href:"https://piao.tips",target:"_blank"},{default:(0,l.w5)((()=>[ge])),_:1}),(0,l.Wm)(r,{href:"https://weibo.com/airticketna",target:"_blank"},{default:(0,l.w5)((()=>[me])),_:1})])),default:(0,l.w5)((()=>[fe])),_:1},8,["visible"])],64)}n(1184);var we=n(7711),ke=n(2134),ye={components:{AButton:q.Z,GithubOutlined:ke.Z,AModal:we.Z},data(){return{showPiaoTipsModal:!1}},methods:{showModel(){this.showPiaoTipsModal=!0}}};const _e=(0,ie.Z)(ye,[["render",be]]);var Se=_e,ve=n(4870),We={components:{AButton:q.Z,ADatePicker:T.ZP,ASpace:z.Z,AInputNumber:H.Z,DateItem:ue,ARow:E.Z,ACol:I.Z,ACollapse:A.ZP,ACollapsePanel:A.ZP.Panel,AForm:M.ZP,AFormItem:M.ZP.Item,AAlert:Z.Z,ASwitch:x.ZP,HeaderLinks:Se},data(){return{beginDate:"",numberOfWeeks:20,datesDetails:[],knownWeekCount:0,probOk:50,probMinor:40,probMajor:8,probImmediate:2,enableSimulation:!1}},computed:{probSumValid(){return this.probOk+this.probMinor+this.probMajor+this.probImmediate===100},initialized(){return this.datesDetails.length>0},simulationEnabled(){return this.initialized&&this.probSumValid&&this.enableSimulation}},methods:{inputHandler(e){if(!e)return;let t=J(this.numberOfWeeks,this.beginDate);for(let n=0;n<t.length;n++){let e=this.datesDetails.filter((e=>e.date===t[n].date));1==e.length&&(t[n].count=e[0].count,t[n].enabled=e[0].enabled),this.datesDetails.push(t[n])}this.datesDetails=t,this.reCalculate()},itemChangeHandler(e){this.datesDetails[e.index].count=e.count,this.datesDetails[e.index].enabled=e.enabled,this.reCalculate()},reCalculate(){this.datesDetails=$(this.datesDetails)},runSimulation(){let e=ae({datesDetails:(0,ve.IU)(this.datesDetails),beginDate:(0,ve.IU)(this.beginDate),numOfWeeks:this.numberOfWeeks,knownWeekCount:this.knownWeekCount,probMap:{ok:this.probOk/100,minor:this.probMinor/100,major:this.probMajor/100,immediate:this.probImmediate/100}});console.log("sim done");for(let t=this.knownWeekCount+1;t<this.datesDetails.length;t++){let n=this.datesDetails[t];n.yesProb=e[n.date]["yes_prob"],n.showProb=!0}console.log(e)}}};const Ce=(0,ie.Z)(We,[["render",j]]);var De=Ce,Pe={name:"App",components:{FlightView:De},created(){document.title="今天航班熔断了吗？"},mounted(){let e=document.createElement("script");e.setAttribute("src","https://www.googletagmanager.com/gtag/js?id=G-WKB857318N"),document.head.appendChild(e)}};const Oe=(0,ie.Z)(Pe,[["render",i]]);var Ue=Oe;n(2467);(0,a.ri)(Ue).mount("#app")}},t={};function n(a){var l=t[a];if(void 0!==l)return l.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,a,l,o){if(!a){var i=1/0;for(d=0;d<e.length;d++){a=e[d][0],l=e[d][1],o=e[d][2];for(var r=!0,u=0;u<a.length;u++)(!1&o||i>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[u])}))?a.splice(u--,1):(r=!1,o<i&&(i=o));if(r){e.splice(d--,1);var s=l();void 0!==s&&(t=s)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[a,l,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var l,o,i=a[0],r=a[1],u=a[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(l in r)n.o(r,l)&&(n.m[l]=r[l]);if(u)var d=u(n)}for(t&&t(a);s<i.length;s++)o=i[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(d)},a=self["webpackChunkrongduanlema"]=self["webpackChunkrongduanlema"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(5264)}));a=n.O(a)})();
//# sourceMappingURL=app.2c06f731.js.map