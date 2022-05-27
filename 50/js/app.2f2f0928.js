(function(){"use strict";var a={5789:function(a,t,n){var s=n(9242),i=n(3396);const e=(0,i.Uk)(" window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FNEHZZBCRR'); ");function o(a,t,n,s,o,r){const u=(0,i.up)("GojuonQuiz");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(u),((0,i.wg)(),(0,i.j4)((0,i.LL)("script"),null,{default:(0,i.w5)((()=>[e])),_:1}))],64)}var r=n(7139);const u=(0,i._)("details",null,[(0,i._)("summary",null,"使用说明"),(0,i._)("p",null,"随机显示一个平假名或片假名，需要输入其对应的发音。"),(0,i._)("p",null,"输入正确后输入框背景会变为绿色，可以按下回车进入下一题，但稍等一会也会自动进入下一题。输入错误后输入框背景变为红色，需要按下回车手动进入下一题。"),(0,i._)("p",null,"仅正确输入会计入时间和准确率。首次输入不计入时间和准确率。数值颜色越绿表示越好（时间更短、准确率越高）。"),(0,i._)("p",null,[(0,i.Uk)("点个 Star 吧："),(0,i._)("a",{href:"https://github.com/jerrylususu/gojuon-quiz",target:"_blank"},"Github")])],-1),k=(0,i._)("summary",null,"设置",-1),h=(0,i.Uk)(" 输入正确后等待时间（ms）："),c=(0,i._)("summary",null,"历史数据",-1),p={class:"wrapper"},_={class:"centered"},l=(0,i._)("tr",null,[(0,i._)("th",null,"平假名"),(0,i._)("th",null,"片假名"),(0,i._)("th",null,"读音")],-1),d={class:"large"},g={class:"large"},y={class:"large"},m=(0,i._)("summary",null,"速度统计（ms）",-1),w={key:0},f=(0,i._)("summary",null,"正确率统计",-1),v={key:0};function b(a,t,n,e,o,b){return(0,i.wg)(),(0,i.iD)(i.HY,null,[u,(0,i._)("details",null,[k,h,(0,i.wy)((0,i._)("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=a=>this.settings.correct_wait_ms=a)},null,512),[[s.nr,this.settings.correct_wait_ms]])]),(0,i._)("details",null,[c,(0,i.Uk)(" 总体正确率："+(0,r.zw)(this.total_accruacy_str)+" ("+(0,r.zw)(this.stats.total_correct)+"/"+(0,r.zw)(this.stats.total_tested)+") 平均用时: "+(0,r.zw)(this.average_time_str)+" 最近10个 ",1),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.stats.last_10.slice().reverse(),(a=>((0,i.wg)(),(0,i.iD)("span",{key:a.enrolled_time,class:(0,r.C_)({correct:a.isCorrect,incorrect:!a.isCorrect})},(0,r.zw)(a.hiragana)+(0,r.zw)(a.katakana),3)))),128))]),(0,i._)("div",p,[(0,i._)("table",_,[l,(0,i._)("tr",null,[(0,i._)("td",d,(0,r.zw)(this.display_hiragana),1),(0,i._)("td",g,(0,r.zw)(this.display_katakana),1),(0,i._)("td",y,(0,r.zw)(this.display_sound),1)])]),(0,i.wy)((0,i._)("input",{class:(0,r.C_)(["sound-input centered",b.inputBackgroundClass]),onInput:t[1]||(t[1]=(...a)=>b.onInput&&b.onInput(...a)),onKeyup:t[2]||(t[2]=(0,s.D2)(((...a)=>b.onEnter&&b.onEnter(...a)),["enter"])),"onUpdate:modelValue":t[3]||(t[3]=a=>this.inputValue=a),type:"text"},null,34),[[s.nr,this.inputValue]])]),(0,i._)("details",null,[m,(0,i._)("table",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.history,((a,t)=>((0,i.wg)(),(0,i.iD)("tr",{key:t},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a,((a,t)=>((0,i.wg)(),(0,i.iD)("td",{key:t,style:(0,r.j5)(this.speed_style(a))},[""!==a.hiragana?((0,i.wg)(),(0,i.iD)("span",w,(0,r.zw)(a.hiragana)+(0,r.zw)(a.avg_time_ms.toFixed(0)),1)):(0,i.kq)("",!0)],4)))),128))])))),128))])]),(0,i._)("details",null,[f,(0,i._)("table",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.history,((a,t)=>((0,i.wg)(),(0,i.iD)("tr",{key:t},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a,((a,t)=>((0,i.wg)(),(0,i.iD)("td",{key:t,style:(0,r.j5)(this.accuracy_style(a))},[""!==a.hiragana?((0,i.wg)(),(0,i.iD)("span",v,(0,r.zw)(a.hiragana)+(0,r.zw)(0===a.total?0:(a.correct/a.total*100).toFixed(0))+"%",1)):(0,i.kq)("",!0)],4)))),128))])))),128))])])],64)}n(6699);const x=[{hiragana:"あ",katakana:"ア",sound:"a",type:"清",skip_count:""},{hiragana:"い",katakana:"イ",sound:"i",type:"清",skip_count:""},{hiragana:"う",katakana:"ウ",sound:"u",type:"清",skip_count:""},{hiragana:"え",katakana:"エ",sound:"e",type:"清",skip_count:""},{hiragana:"お",katakana:"オ",sound:"o",type:"清",skip_count:""},{hiragana:"か",katakana:"カ",sound:"ka",type:"清",skip_count:""},{hiragana:"き",katakana:"キ",sound:"ki",type:"清",skip_count:""},{hiragana:"く",katakana:"ク",sound:"ku",type:"清",skip_count:""},{hiragana:"け",katakana:"ケ",sound:"ke",type:"清",skip_count:""},{hiragana:"こ",katakana:"コ",sound:"ko",type:"清",skip_count:""},{hiragana:"さ",katakana:"サ",sound:"sa",type:"清",skip_count:""},{hiragana:"し",katakana:"シ",sound:"shi",type:"清",skip_count:""},{hiragana:"す",katakana:"ス",sound:"su",type:"清",skip_count:""},{hiragana:"せ",katakana:"セ",sound:"se",type:"清",skip_count:""},{hiragana:"そ",katakana:"ソ",sound:"so",type:"清",skip_count:""},{hiragana:"た",katakana:"タ",sound:"ta",type:"清",skip_count:""},{hiragana:"ち",katakana:"チ",sound:"chi",type:"清",skip_count:""},{hiragana:"つ",katakana:"ツ",sound:"tsu,tu",type:"清",skip_count:""},{hiragana:"て",katakana:"テ",sound:"te",type:"清",skip_count:""},{hiragana:"と",katakana:"ト",sound:"to",type:"清",skip_count:""},{hiragana:"な",katakana:"ナ",sound:"na",type:"清",skip_count:""},{hiragana:"に",katakana:"ニ",sound:"ni",type:"清",skip_count:""},{hiragana:"ぬ",katakana:"ヌ",sound:"nu",type:"清",skip_count:""},{hiragana:"ね",katakana:"ネ",sound:"ne",type:"清",skip_count:""},{hiragana:"の",katakana:"ノ",sound:"no",type:"清",skip_count:""},{hiragana:"は",katakana:"ハ",sound:"ha",type:"清",skip_count:""},{hiragana:"ひ",katakana:"ヒ",sound:"hi",type:"清",skip_count:""},{hiragana:"ふ",katakana:"フ",sound:"fu",type:"清",skip_count:""},{hiragana:"へ",katakana:"ヘ",sound:"he",type:"清",skip_count:""},{hiragana:"ほ",katakana:"ホ",sound:"ho",type:"清",skip_count:""},{hiragana:"ま",katakana:"マ",sound:"ma",type:"清",skip_count:""},{hiragana:"み",katakana:"ミ",sound:"mi",type:"清",skip_count:""},{hiragana:"む",katakana:"ム",sound:"mu",type:"清",skip_count:""},{hiragana:"め",katakana:"メ",sound:"me",type:"清",skip_count:""},{hiragana:"も",katakana:"モ",sound:"mo",type:"清",skip_count:""},{hiragana:"や",katakana:"ヤ",sound:"ya",type:"清",skip_count:"1"},{hiragana:"ゆ",katakana:"ユ",sound:"yu",type:"清",skip_count:"1"},{hiragana:"よ",katakana:"ヨ",sound:"yo",type:"清",skip_count:""},{hiragana:"ら",katakana:"ラ",sound:"ra",type:"清",skip_count:""},{hiragana:"り",katakana:"リ",sound:"ri",type:"清",skip_count:""},{hiragana:"る",katakana:"ル",sound:"ru",type:"清",skip_count:""},{hiragana:"れ",katakana:"レ",sound:"re",type:"清",skip_count:""},{hiragana:"ろ",katakana:"ロ",sound:"ro",type:"清",skip_count:""},{hiragana:"わ",katakana:"ワ",sound:"wa",type:"清",skip_count:"3"},{hiragana:"を",katakana:"ヲ",sound:"wo,o",type:"清",skip_count:""},{hiragana:"ん",katakana:"ン",sound:"n,nn",type:"清",skip_count:"4"},{hiragana:"が",katakana:"ガ",sound:"ga",type:"浊",skip_count:""},{hiragana:"ぎ",katakana:"ギ",sound:"gi",type:"浊",skip_count:""},{hiragana:"ぐ",katakana:"グ",sound:"gu",type:"浊",skip_count:""},{hiragana:"げ",katakana:"ゲ",sound:"ge",type:"浊",skip_count:""},{hiragana:"ご",katakana:"ゴ",sound:"go",type:"浊",skip_count:""},{hiragana:"ざ",katakana:"ザ",sound:"za",type:"浊",skip_count:""},{hiragana:"じ",katakana:"ジ",sound:"ji",type:"浊",skip_count:""},{hiragana:"ず",katakana:"ズ",sound:"zu",type:"浊",skip_count:""},{hiragana:"ぜ",katakana:"ゼ",sound:"ze",type:"浊",skip_count:""},{hiragana:"ぞ",katakana:"ゾ",sound:"zo",type:"浊",skip_count:""},{hiragana:"だ",katakana:"ダ",sound:"da",type:"浊",skip_count:""},{hiragana:"ぢ",katakana:"ヂ",sound:"ji,di",type:"浊",skip_count:""},{hiragana:"づ",katakana:"ヅ",sound:"du",type:"浊",skip_count:""},{hiragana:"で",katakana:"デ",sound:"de",type:"浊",skip_count:""},{hiragana:"ど",katakana:"ド",sound:"do",type:"浊",skip_count:""},{hiragana:"ば",katakana:"バ",sound:"ba",type:"浊",skip_count:""},{hiragana:"び",katakana:"ビ",sound:"bi",type:"浊",skip_count:""},{hiragana:"ぶ",katakana:"ブ",sound:"bu",type:"浊",skip_count:""},{hiragana:"べ",katakana:"ベ",sound:"be",type:"浊",skip_count:""},{hiragana:"ぼ",katakana:"ボ",sound:"bo",type:"浊",skip_count:""},{hiragana:"ぱ",katakana:"パ",sound:"pa",type:"半浊",skip_count:""},{hiragana:"ぴ",katakana:"ピ",sound:"pi",type:"半浊",skip_count:""},{hiragana:"ぷ",katakana:"プ",sound:"pu",type:"半浊",skip_count:""},{hiragana:"ぺ",katakana:"ペ",sound:"pe",type:"半浊",skip_count:""},{hiragana:"ぽ",katakana:"ポ",sound:"po",type:"半浊",skip_count:""}];var z={data(){return{inputValue:"",show_hiragana:!1,show_katakana:!1,show_sound:!1,existing_timeout:null,last_show_time:null,initial_input:!0,settings:{correct_wait_ms:1e3},current:{hiragana:"",katakana:"",sound:""},stats:{last_10:[],total_tested:0,total_correct:0,total_response_time:0},history:[],hiragana_to_history:{}}},computed:{correct(){return this.current.sound.split(",").includes(this.inputValue.toLowerCase())},maxLenInAnswer(){return this.current.sound.split(",").map((a=>a.length)).reduce(((a,t)=>Math.max(a,t)))},inputBackgroundClass(){return{correct:this.correct,incorrect:!this.correct&&this.inRevealState}},display_hiragana(){return this.show_hiragana?this.current.hiragana:" "},display_katakana(){return this.show_katakana?this.current.katakana:" "},display_sound(){return this.show_sound?this.current.sound:" "},inRevealState(){return this.show_hiragana&&this.show_katakana&&this.show_sound},total_accruacy_str(){return`${(this.stats.total_correct/this.stats.total_tested*100).toFixed(2)}%`},average_time_str(){return`${(this.stats.total_response_time/this.stats.total_tested).toFixed(2)}ms`}},methods:{onInput(){this.correct?(this.reveal(),this.existing_timeout=setTimeout((()=>{this.next()}),this.settings.correct_wait_ms)):this.inputValue.length==this.maxLenInAnswer&&this.reveal()},onEnter(){null!==this.existing_timeout&&window.clearTimeout(this.existing_timeout),this.correct?this.next():!this.inRevealState||this.correct?this.correct||this.reveal():this.next()},updateHistory(){if(this.initial_input)return void(this.initial_input=!1);this.hiragana_to_history[this.current.hiragana].total+=1,this.stats.total_tested+=1;let a=Date.now()-this.last_show_time;if(this.stats.last_10.push({hiragana:this.current.hiragana,katakana:this.current.katakana,isCorrect:this.correct,enrolled_time:this.last_show_time}),this.stats.last_10.length>10&&this.stats.last_10.shift(),this.correct){this.stats.total_response_time+=a,this.stats.total_correct+=1;let t=this.hiragana_to_history[this.current.hiragana];t.avg_time_ms=(t.avg_time_ms*t.correct+a)/(t.correct+1),t.correct+=1}let t=0,n=1e9;for(const s of this.history)for(const a of s)console.log(a),a.avg_time_ms>0&&(t=Math.max(t,a.avg_time_ms),n=Math.min(n,a.avg_time_ms));for(let s of this.history)for(let a of s)a.avg_time_ms>0&&(a.relative_speed=(a.avg_time_ms-n+.001)/(t-n))},reveal(){this.updateHistory(),this.show_hiragana=!0,this.show_katakana=!0,this.show_sound=!0},next(){this.inputValue="";const a=Math.floor(Math.random()*x.length),t=x[a];this.current.sound=t.sound,this.current.hiragana=t.hiragana,this.current.katakana=t.katakana,Math.random()>.5?(this.show_hiragana=!1,this.show_katakana=!0):(this.show_katakana=!1,this.show_hiragana=!0),this.show_sound=!1,this.last_show_time=Date.now()},buildHistoryMatrix(){let a=[[],[],[],[],[]],t=-1,n={hiragana:"",katakana:"",sound:"",total:0,correct:0,avg_time_ms:0,relative_speed:0},s={};for(let i of x)if(s[i.hiragana]=i,i["total"]=0,i["correct"]=0,i["avg_time_ms"]=0,i["relative_speed"]=0,t=(t+1)%5,a[t].push(i),""!==i.skip_count){i.skip_count=parseInt(i.skip_count);for(let s=0;s<i.skip_count;s++)t=(t+1)%5,a[t].push(n)}this.history=a,this.hiragana_to_history=s},lerp_color(a,t,n){const s=a>>16,i=a>>8&255,e=255&a,o=t>>16,r=t>>8&255,u=255&t,k=s+n*(o-s),h=i+n*(r-i),c=e+n*(u-e);return"#"+((1<<24)+(k<<16)+(h<<8)+c|0).toString(16).slice(1)},speed_style(a){if(0==a.relative_speed)return{};let t=a.relative_speed,n=this.lerp_color(65280,16711680,t);return{backgroundColor:n}},accuracy_style(a){if(0==a.total)return{};let t=this.lerp_color(16711680,65280,a.correct/a.total);return{backgroundColor:t}}},mounted(){this.next(),this.buildHistoryMatrix()}},j=n(89);const D=(0,j.Z)(z,[["render",b]]);var C=D,H={name:"App",components:{GojuonQuiz:C},mounted(){let a=document.createElement("script");a.setAttribute("src","https://www.googletagmanager.com/gtag/js?id=G-FNEHZZBCRR"),document.head.appendChild(a)}};const O=(0,j.Z)(H,[["render",o]]);var M=O;(0,s.ri)(M).mount("#app")}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var e=t[s]={exports:{}};return a[s](e,e.exports,n),e.exports}n.m=a,function(){var a=[];n.O=function(t,s,i,e){if(!s){var o=1/0;for(h=0;h<a.length;h++){s=a[h][0],i=a[h][1],e=a[h][2];for(var r=!0,u=0;u<s.length;u++)(!1&e||o>=e)&&Object.keys(n.O).every((function(a){return n.O[a](s[u])}))?s.splice(u--,1):(r=!1,e<o&&(o=e));if(r){a.splice(h--,1);var k=i();void 0!==k&&(t=k)}}return t}e=e||0;for(var h=a.length;h>0&&a[h-1][2]>e;h--)a[h]=a[h-1];a[h]=[s,i,e]}}(),function(){n.n=function(a){var t=a&&a.__esModule?function(){return a["default"]}:function(){return a};return n.d(t,{a:t}),t}}(),function(){n.d=function(a,t){for(var s in t)n.o(t,s)&&!n.o(a,s)&&Object.defineProperty(a,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(a){if("object"===typeof window)return window}}()}(),function(){n.o=function(a,t){return Object.prototype.hasOwnProperty.call(a,t)}}(),function(){var a={143:0};n.O.j=function(t){return 0===a[t]};var t=function(t,s){var i,e,o=s[0],r=s[1],u=s[2],k=0;if(o.some((function(t){return 0!==a[t]}))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(u)var h=u(n)}for(t&&t(s);k<o.length;k++)e=o[k],n.o(a,e)&&a[e]&&a[e][0](),a[e]=0;return n.O(h)},s=self["webpackChunkgojuon_quiz"]=self["webpackChunkgojuon_quiz"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(5789)}));s=n.O(s)})();
//# sourceMappingURL=app.2f2f0928.js.map