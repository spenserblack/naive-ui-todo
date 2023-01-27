(function(){"use strict";var e={2080:function(e,t,o){var n=o(9963),l=o(6252),i=o(2262),a=o(3577),d=o(404),s=o(8578),r=o(8771),u=o(4486),c=o(521),m=o(2740),p=o(7170),f=o(8115),v=o(1101),w=o(5892),U=o(6035),S=o(4916),h=o(470),g=o(4429),y=o(8207),x=o(776),_=o(1859),Z=o(6190),b=o(8888),W=o(7100),k=o(8764),I=o(1886),j=o(2201),T=o(1296),P=o.n(T),D=(o(1703),o(3907)),C=o(1272);const $=Symbol("store"),F=e=>1+e.todos.reduce(((e,{id:t})=>t>e?t:e),0),O=e=>t=>1+e.todos[t].items.reduce(((e,{id:t})=>t>e?t:e),0),z={completeItems:e=>t=>e.todos[t].items.map(((e,t)=>({index:t,...e}))).filter((({done:e})=>e)),incompleteItems:e=>t=>e.todos[t].items.map(((e,t)=>({index:t,...e}))).filter((({done:e})=>!e)),isItemValid:e=>(t,o)=>e.todos[t].items[o].description.length>0,areItemsValid:(e,{isItemValid:t})=>o=>{const{items:n}=e.todos[o];return n.every(((e,n)=>t(o,n)))},isTodoValid:(e,{areItemsValid:t})=>o=>e.todos[o].title.length>0&&t(o),isValid:(e,{isTodoValid:t})=>{const o={};return e.todos.every((({title:e},n)=>(o[e]=(o[e]||0)+1,t(n)&&o[e]<2)))},forJsonExport:e=>{const t=e.todos.map((({title:e,items:t})=>({title:e,items:t.map((({description:e,done:t})=>({description:e,done:t})))})));return{todos:t}},forYamlExport:e=>{const t={};return e.todos.forEach((({title:e,items:o})=>{t[e]={"to do":o.filter((({done:e})=>!e)).map((({description:e})=>e)),done:o.filter((({done:e})=>e)).map((({description:e})=>e))}})),t},nextTodoId:F,nextItemId:O},H=(e,t)=>{e.todos.splice(0,e.todos.length,...t)},A=(e,t)=>{let o=0,n=0;const l=Object.entries(t).map((([e,{done:t,"to do":l}])=>(o+=1,{title:e,items:[l.map((e=>(n+=1,{done:!1,description:e,id:n}))),t.map((e=>(n+=1,{done:!0,description:e,id:n})))].flat(),id:o})));H(e,l)},E={load:H,loadFromImport:A,loadFromYaml:(e,t)=>{const o=(0,C.zD)(t),n=new TypeError(`Does not parse to to-do object: ${t}`);switch(typeof o){case"string":case"number":case"undefined":throw n;default:}if(null===o)throw n;const l=e=>"string"===typeof e;Object.values(o).forEach((e=>{if(!Array.isArray(e.done)||!Array.isArray(e["to do"]))throw n;const{done:t,"to do":o}=e;if(!t.every(l)||!o.every(l))throw n})),A(e,o)},addList:e=>{const t=F(e);e.todos.push({title:"",items:[],id:t})},removeList:(e,t)=>{e.todos.splice(t,1)},setTodoTitle:(e,{index:t,title:o})=>{e.todos[t].title=o},addTodoItem:(e,{index:t})=>{const o=O(e)(t);e.todos[t].items.push({description:"",done:!1,id:o})},removeTodoItem:(e,{todoIndex:t,itemIndex:o})=>{e.todos[t].items.splice(o,1)},setTodoItemDescription:(e,{todoIndex:t,itemIndex:o,description:n})=>{e.todos[t].items[o].description=n},completeTodoItem:(e,{todoIndex:t,itemIndex:o})=>{e.todos[t].items[o].done=!0},startTodoItem:(e,{todoIndex:t,itemIndex:o})=>{e.todos[t].items[o].done=!1},clearDuplicates:(e,t)=>{const o=new Set;e.todos[t].items=e.todos[t].items.filter((({description:e,done:t})=>{const n=!o.has(e);return t&&o.add(e),n})),e.todos[t].items=e.todos[t].items.filter((({description:e,done:t})=>{const n=t||!o.has(e);return o.add(e),n}))}},L=(0,D.MT)({state:{todos:[]},getters:z,mutations:E,actions:{},modules:{}});function Y(){return(0,D.oR)($)}var N=o(1484),B=o(3162);const J=(0,l.Uk)("Download");var V=(0,l.aZ)({__name:"DownloadJson",props:{disabled:{type:Boolean,default:!1}},setup(e){const t=e,o=Y(),n=()=>{const e=JSON.stringify(o.getters.forJsonExport),t=new Blob([e],{type:"text/json;charset=utf-8"});(0,B.saveAs)(t,"to-do.json")};return(e,o)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(Z.ZP),{type:"primary",disabled:t.disabled,onClick:n},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(N.Z))])),_:1})])),default:(0,l.w5)((()=>[(0,l.WI)(e.$slots,"default",{},(()=>[J]))])),_:3},8,["disabled"]))}});const M=V;var R=M;const q=(0,l.Uk)("Download");var K=(0,l.aZ)({__name:"DownloadYaml",props:{disabled:{type:Boolean,default:!1}},setup(e){const t=e,o=Y(),n=()=>{const e=(0,C.$w)(o.getters.forYamlExport),t=new Blob([e],{type:"text/yaml;charset=utf-8"});(0,B.saveAs)(t,"to-do.yaml")};return(e,o)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(Z.ZP),{type:"primary",disabled:t.disabled,onClick:n},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(N.Z))])),_:1})])),default:(0,l.w5)((()=>[(0,l.WI)(e.$slots,"default",{},(()=>[q]))])),_:3},8,["disabled"]))}});const G=K;var Q=G,X=o(943),ee=o(4693),te=o(8779);const oe=(0,l.Uk)("This will "),ne=(0,l.Uk)("overwrite"),le=(0,l.Uk)(" the current to-do lists."),ie=(0,l.Uk)("Upload");var ae=(0,l.aZ)({__name:"UploadYaml",setup(e){const t=Y(),o=async({file:{file:e}})=>{t.commit("loadFromYaml",await e.text())},n=["yml","yaml"].map((e=>[`.${e}`,`text/${e}`,`text/x-${e}`,`application/${e}`,`application/x-${e}`])).flat().join(",");return(e,t)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(X.ZP),{placement:"top-end"},{trigger:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(ee.Z),{accept:(0,i.SU)(n),showFileList:!1,onChange:o},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Z.ZP),{type:"primary"},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(te.Z))])),_:1})])),default:(0,l.w5)((()=>[(0,l.WI)(e.$slots,"default",{},(()=>[ie]))])),_:3})])),_:3},8,["accept"])])),default:(0,l.w5)((()=>[(0,l._)("span",null,[oe,(0,l.Wm)((0,i.SU)(x.Z),{italic:""},{default:(0,l.w5)((()=>[ne])),_:1}),le])])),_:3}))}});const de=ae;var se=de,re=JSON.parse('{"name":"naive-ui-todo","version":"2.2.0","private":true,"scripts":{"serve":"vue-cli-service serve","build":"vue-cli-service build","test:unit":"vue-cli-service test:unit","lint":"vue-cli-service lint","test:cov":"nyc --reporter=lcov yarn test:unit"},"dependencies":{"@vicons/ionicons5":"^0.12.0","core-js":"^3.25.0","file-saver":"^2.0.5","js-yaml":"^4.1.0","lodash.debounce":"^4.0.8","naive-ui":"^2.33.2","vfonts":"^0.1.0","vue":"^3.2.39","vue-router":"^4.1.5","vuex":"^4.0.0-0"},"devDependencies":{"@babel/core":"^7.20.2","@types/chai":"^4.3.3","@types/file-saver":"^2.0.5","@types/js-yaml":"^4.0.5","@types/lodash.debounce":"^4.0.7","@types/mocha":"^9.1.1","@typescript-eslint/eslint-plugin":"^5.4.0","@typescript-eslint/parser":"^5.4.0","@vue/cli-plugin-babel":"~5.0.8","@vue/cli-plugin-eslint":"~5.0.8","@vue/cli-plugin-router":"~5.0.8","@vue/cli-plugin-typescript":"~5.0.8","@vue/cli-plugin-unit-mocha":"~5.0.8","@vue/cli-plugin-vuex":"~5.0.8","@vue/cli-service":"~5.0.8","@vue/compiler-sfc":"^3.2.23","@vue/eslint-config-airbnb":"^6.0.0","@vue/eslint-config-typescript":"^10.0.0","@vue/test-utils":"^2.0.2","chai":"^4.3.6","eslint":"^7.32.0","eslint-plugin-import":"^2.26.0","eslint-plugin-vue":"^8.7.1","eslint-plugin-vuejs-accessibility":"^1.2.0","lint-staged":"^13.0.3","nyc":"^15.1.0","stylus":"^0.59.0","stylus-loader":"^7.0.0","typescript":"~4.5.5","webpack":"^5.0.0"},"_id":"naive-ui-todo@0.1.0","gitHooks":{"pre-commit":"lint-staged"},"lint-staged":{"*.{js,jsx,vue,ts,tsx}":["vue-cli-service lint"]},"readme":"ERROR: No README data found!"}');const ue=(0,l.Uk)(" This project will be replaced by "),ce=(0,l.Uk)("an app using quasar"),me=(0,l.Uk)(". Please use the JSON export to back up your data. You can use "),pe=(0,l.Uk)("this script"),fe=(0,l.Uk)(" to convert your data to the new format. "),ve=(0,l.Uk)("Automatic saving is"),we=(0,l.Uk)("on"),Ue=(0,l.Uk)("off"),Se=(0,l.Uk)(" Save "),he=(0,l.Uk)("Export JSON"),ge=(0,l.Uk)("Export YAML"),ye=(0,l.Uk)("Import YAML"),xe=(0,l.Uk)(" Dark "),_e=(0,l.Uk)(" Light "),Ze=(0,l.Uk)(" GitHub");var be=(0,l.aZ)({__name:"App",setup(e){const{version:t}=re,o=e=>`naive-todo__${e}`,n=o("todolist"),T=o("autosave"),D=e=>{const t=localStorage.getItem(e);if(null!=t)return JSON.parse(t)},C=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))},$=e=>C(n,e),F=e=>C(T,e),O=D(n),z=D(T),H=Y(),A=(0,j.tv)();null!=O&&H.commit("load",O);const E=(0,i.iH)(z??!0),L=(0,l.Fl)((()=>H.state.todos)),N=(0,i.iH)(!1),B=()=>{N.value=!0,$(L.value),setTimeout((()=>{N.value=!1}),300)},J=P()((()=>{E.value&&B()}),1e3);(0,l.YP)([L.value,...L.value],J),(0,l.YP)(E,(()=>F(E.value))),A.beforeEach((({fullPath:e,name:t,params:o})=>{if("Home"===t)return!0;if("Todo"===t){const t=Number.parseInt(o.index,10);if(null==H.state.todos[t])return console.warn("User attempted to access invalid route:",e),{replace:!0,name:"Home"}}return!0}));const V=()=>{A.push({name:"Todo",params:{index:H.state.todos.length-1}})},M=10,q="todo__home",K=e=>`todo__${e}`,G="todo__add",X={label:()=>(0,l.h)(j.rH,{to:{name:"Home"}},(()=>"Home")),key:q,icon:()=>(0,l.h)(f.g,null,(()=>(0,l.h)(d.Z)))},ee={label:()=>(0,l.h)("span",null,"Add List"),key:G,icon:()=>(0,l.h)(f.g,null,(()=>(0,l.h)(s.Z)))},te=(0,l.Fl)((()=>{const e=H.state.todos.map((({title:e,id:t},o)=>({label:()=>(0,l.h)(j.rH,{to:{name:"Todo",params:{index:o}}},(()=>e)),key:K(t),icon:()=>(0,l.h)(f.g,null,(()=>(0,l.h)(r.Z)))})));return e.length>M?[X,{label:"To-Do Lists",key:"todo__extra-lists",icon:()=>(0,l.h)(f.g,null,(()=>(0,l.h)(r.Z))),children:e},ee]:[X,...e,ee]})),oe=(0,l.Fl)((()=>{const e=A.currentRoute.value;switch(e.name){case"Home":return q;case"Todo":{const t=H.state.todos[Number.parseInt(e.params.index,10)];return K(t.id)}default:return null}})),ne=e=>{e===G&&(H.commit("addList"),V())},le=(0,i.iH)(v.$),ie=(0,l.Fl)((()=>H.getters.isValid));return(e,o)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(w.Z),{theme:le.value},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(U.ZP),{id:"main"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(S.Z),{class:"header"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(h.Z),{vertical:""},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(g.Z),{title:"Deprecation Notice",type:"warning",closable:""},{default:(0,l.w5)((()=>[ue,(0,l.Wm)((0,i.SU)(y.Z),{href:"//github.com/spenserblack/quasar-todo"},{default:(0,l.w5)((()=>[ce])),_:1}),me,(0,l.Wm)((0,i.SU)(y.Z),{href:"./static/convert.js"},{default:(0,l.w5)((()=>[pe])),_:1}),fe])),_:1}),(0,l.Wm)((0,i.SU)(h.Z),{class:"options",justify:"end",size:"small"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(x.Z),null,{default:(0,l.w5)((()=>[ve])),_:1}),(0,l.Wm)((0,i.SU)(_.Z),{value:E.value,"onUpdate:value":o[0]||(o[0]=e=>E.value=e)},{checked:(0,l.w5)((()=>[we])),unchecked:(0,l.w5)((()=>[Ue])),_:1},8,["value"]),(0,l.Wm)((0,i.SU)(Z.ZP),{type:"primary",loading:N.value,disabled:N.value,onClick:B},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(u.Z))])),_:1})])),default:(0,l.w5)((()=>[Se])),_:1},8,["loading","disabled"]),(0,l.Wm)(R,{disabled:!(0,i.SU)(ie)},{default:(0,l.w5)((()=>[he])),_:1},8,["disabled"]),(0,l.Wm)(Q,{disabled:!(0,i.SU)(ie)},{default:(0,l.w5)((()=>[ge])),_:1},8,["disabled"]),(0,l.Wm)(se,null,{default:(0,l.w5)((()=>[ye])),_:1}),null==le.value?((0,l.wg)(),(0,l.j4)((0,i.SU)(Z.ZP),{key:0,onClick:o[1]||(o[1]=e=>le.value=(0,i.SU)(v.$))},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(c.Z))])),_:1})])),default:(0,l.w5)((()=>[xe])),_:1})):((0,l.wg)(),(0,l.j4)((0,i.SU)(Z.ZP),{key:1,onClick:o[2]||(o[2]=e=>le.value=null)},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(m.Z))])),_:1})])),default:(0,l.w5)((()=>[_e])),_:1}))])),_:1}),(0,l.Wm)((0,i.SU)(b.Z)),(0,l.Wm)((0,i.SU)(W.Z),{options:(0,i.SU)(te),mode:"horizontal",value:(0,i.SU)(oe),"onUpdate:value":ne},null,8,["options","value"])])),_:1})])),_:1}),(0,l.Wm)((0,i.SU)(k.Z),{class:"body"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(j.MA))])),_:1}),(0,l.Wm)((0,i.SU)(I.Z),{class:"footer"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(h.Z),{class:"footer-text",justify:"end"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(y.Z),{href:"https://github.com/spenserblack/naive-ui-todo"},{default:(0,l.w5)((()=>[(0,l._)("span",null,[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(p.Z))])),_:1}),Ze])])),_:1}),(0,l.Wm)((0,i.SU)(b.Z),{vertical:""}),(0,l.Wm)((0,i.SU)(x.Z),{italic:"",type:"info"},{default:(0,l.w5)((()=>[(0,l.Uk)("v"+(0,a.zw)((0,i.SU)(t)),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["theme"]))}}),We=o(3744);const ke=(0,We.Z)(be,[["__scopeId","data-v-5f1d7565"]]);var Ie=ke,je=o(8668),Te=o(918),Pe=o(766),De=o(6839),Ce=o(3504),$e=o(8357),Fe=o(1109),Oe=o(1705),ze=o(9658),He=o(8171),Ae=o(8354);const Ee={type:String,default:"text"},Le={type:Boolean,default:!1},Ye={type:Boolean,default:!1},Ne={type:Boolean,default:!1},Be={type:Boolean,default:!1},Je={type:Boolean,default:!1},Ve={type:[String,Number],default:1},Me={h1:He.qg,h2:He.kn,h3:He.Fj,h4:He._M,h5:He.Lp,h6:He.zb};var Re=(0,l.aZ)({name:"DynamicNaiveText",props:{tag:Ee,depth:Ve,strong:Le,italic:Ye,underline:Ne,delete:Be,code:Je},render(){const{depth:e,strong:t,italic:o,underline:n,code:i}=this,{default:a}=this.$slots;switch(this.tag){case"text":return(0,l.h)(x.Z,{strong:t,italic:o,underline:n,delete:this.delete,code:i,depth:e},a);case"p":return(0,l.h)(Ae.Z,{depth:e},a);default:}return(0,l.h)(Me[this.tag],null,a)}});const qe={class:"editable-text"},Ke=(0,l.Uk)(" Confirm ");var Ge=(0,l.aZ)({__name:"EditableText",props:{tag:{default:"text"},text:null,textStyle:{default:()=>({strong:!1,italic:!1,underline:!1,delete:!1,code:!1})},textDepth:{default:1},size:{default:"medium"},inputPlaceholder:{default:"Please input a value"}},emits:["update:value"],setup(e,{emit:t}){const o=e,d=(0,l.Fl)((()=>!o.text)),s=(0,i.iH)(!o.text);return(e,r)=>((0,l.wg)(),(0,l.iD)("span",qe,[s.value?((0,l.wg)(),(0,l.j4)((0,i.SU)(Fe.Z),{key:1},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Oe.Z),{size:o.size,value:o.text,"onUpdate:value":r[1]||(r[1]=e=>t("update:value",e)),onBlur:r[2]||(r[2]=e=>s.value=(0,i.SU)(d)),onKeyup:r[3]||(r[3]=(0,n.D2)((e=>s.value=(0,i.SU)(d)),["enter"])),clearable:"",placeholder:o.inputPlaceholder},null,8,["size","value","placeholder"]),(0,l.Wm)((0,i.SU)(Z.ZP),{size:o.size,type:"success",onClick:r[4]||(r[4]=e=>s.value=(0,i.SU)(d))},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(ze.Z))])),_:1})])),default:(0,l.w5)((()=>[Ke])),_:1},8,["size"])])),_:1})):((0,l.wg)(),(0,l.j4)((0,i.SU)(Re),{key:0,tag:o.tag,onClick:r[0]||(r[0]=e=>s.value=!0),strong:o.textStyle.strong,italic:o.textStyle.italic,underline:o.textStyle.underline,delete:o.textStyle.delete,code:o.textStyle.code,depth:o.textDepth},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(o.text),1)])),_:1},8,["tag","strong","italic","underline","delete","code","depth"]))]))}});const Qe=Ge;var Xe=Qe,et=(0,l.aZ)({__name:"TodoItem",props:{todoIndex:null,itemIndex:null},emits:["delete"],setup(e,{emit:t}){const o=e,n=Y(),d=(0,l.Fl)((()=>n.state.todos[o.todoIndex].items[o.itemIndex])),s=(0,l.Fl)((()=>d.value.done)),r=(0,l.Fl)((()=>""===d.value.description)),u=(0,l.Fl)((()=>[(s.value?"":"in")+"complete",...r.value?["new-item"]:[]])),c=e=>n.commit("setTodoItemDescription",{todoIndex:o.todoIndex,itemIndex:o.itemIndex,description:e}),m=e=>{const t=e?"completeTodoItem":"startTodoItem";n.commit(t,{todoIndex:o.todoIndex,itemIndex:o.itemIndex})},p=()=>t("delete",o.itemIndex);return(e,t)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(h.Z),{justify:"left",class:(0,a.C_)(["todo-item",(0,i.SU)(u)])},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Z.ZP),{type:"warning",size:"tiny",onClick:p},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(De.Z))])),_:1})])),_:1}),(0,l.Wm)((0,i.SU)($e.Z),{disabled:!(0,i.SU)(d).description,checked:(0,i.SU)(d).done,"onUpdate:checked":m},null,8,["disabled","checked"]),(0,l.Wm)(Xe,{text:(0,i.SU)(d).description,"onUpdate:value":c,inputPlaceholder:"Please describe the to-do item",textStyle:{delete:(0,i.SU)(d).done},textDepth:(0,i.SU)(d).done?3:1},null,8,["text","textStyle","textDepth"])])),_:1},8,["class"]))}});const tt=et;var ot=tt;const nt=(0,l.Uk)(" Delete "),lt=(0,l.Uk)(" This will delete the whole to-do list. "),it=(0,l.Uk)(" Remove Duplicates "),at=(0,l.Uk)(" Completed items will be kept over incomplete items ");var dt=(0,l.aZ)({__name:"TodoList",props:{index:null,mainContentStyle:null},emits:["delete"],setup(e,{emit:t}){const o=e,n=Y(),d=(0,l.Fl)((()=>n.state.todos[o.index])),r=(0,l.Fl)((()=>n.getters.completeItems(o.index))),u=(0,l.Fl)((()=>n.getters.incompleteItems(o.index))),c=e=>n.commit("setTodoTitle",{index:o.index,title:e}),m=()=>t("delete",o.index),p=async()=>{await n.commit("addTodoItem",{index:o.index});const e=document.querySelector(".todo-item.new-item");e.scrollIntoView({behavior:"smooth",block:"center"})},v=e=>n.commit("removeTodoItem",{todoIndex:o.index,itemIndex:e}),w=()=>n.commit("clearDuplicates",o.index);return(t,o)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(je.ZP),{size:"huge",hoverable:""},{header:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(h.Z),{justify:"left"},{default:(0,l.w5)((()=>[(0,l.Wm)(Xe,{text:(0,i.SU)(d).title,"onUpdate:value":c,tag:"h2",size:"large",inputPlaceholder:"Please add a title"},null,8,["text"])])),_:1})])),"header-extra":(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Pe.Z),{onPositiveClick:m,placement:"top-end"},{trigger:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Z.ZP),{size:"large",type:"warning"},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(De.Z))])),_:1})])),default:(0,l.w5)((()=>[nt])),_:1})])),default:(0,l.w5)((()=>[lt])),_:1}),(0,l.Wm)((0,i.SU)(b.Z),{vertical:""}),(0,l.Wm)((0,i.SU)(X.ZP),null,{trigger:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Z.ZP),{size:"large",type:"warning",secondary:"",onClick:w},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Ce.Z))])),_:1})])),default:(0,l.w5)((()=>[it])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(x.Z),{type:"warning"},{default:(0,l.w5)((()=>[at])),_:1})])),_:1})])),action:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(h.Z),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Z.ZP),{type:"primary",onClick:p},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(s.Z))])),_:1})])),default:(0,l.w5)((()=>[(0,l.Uk)(" Add "+(0,a.zw)((0,i.SU)(d).title)+" Item ",1)])),_:1})])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(U.ZP),{class:"todo-items"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(k.Z),{class:"todo-items-content",style:(0,a.j5)(e.mainContentStyle),"native-scrollbar":!1},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,i.SU)(u),(t=>((0,l.wg)(),(0,l.j4)(ot,{todoIndex:e.index,itemIndex:t.index,onDelete:v,key:`todo-${(0,i.SU)(d).id}-item-${t.id}-not-done`},null,8,["todoIndex","itemIndex"])))),128)),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,i.SU)(r),(t=>((0,l.wg)(),(0,l.j4)(ot,{todoIndex:e.index,itemIndex:t.index,onDelete:v,key:`todo-${(0,i.SU)(d).id}-item-${t.id}-done`},null,8,["todoIndex","itemIndex"])))),128)),(0,l.Wm)((0,i.SU)(Te.Z))])),_:1},8,["style"])])),_:1})])),_:1}))}});const st=dt;var rt=st;const ut=(0,l.Uk)(" Add List "),ct={name:"home-view"};var mt=(0,l.aZ)({...ct,setup(e){const t=Y(),o=(0,l.Fl)((()=>t.state.todos)),n=(0,l.Fl)((()=>o.value.map((e=>{const t=e.items.length<10?null:{height:"15em"};return{...e,contentStyle:t}})))),a=()=>t.commit("addList"),d=e=>t.commit("removeList",e);return(e,t)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(je.ZP),{class:"home"},{action:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(Z.ZP),{type:"primary",onClick:a},{icon:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(f.g),null,{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(s.Z))])),_:1})])),default:(0,l.w5)((()=>[ut])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(U.ZP),{class:"lists","native-scrollbar":!1},{default:(0,l.w5)((()=>[(0,l.Wm)((0,i.SU)(k.Z),null,{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,i.SU)(n),((e,t)=>((0,l.wg)(),(0,l.j4)(rt,{index:t,onDelete:d,key:`todo-list-${e.id}${null==e.contentStyle?"":"-long"}`,mainContentStyle:e.contentStyle},null,8,["index","mainContentStyle"])))),128)),(0,l.Wm)((0,i.SU)(Te.Z))])),_:1})])),_:1})])),_:1}))}});const pt=mt;var ft=pt;const vt={name:"single-todo-list-view"};var wt=(0,l.aZ)({...vt,setup(e){const t=(0,j.yj)(),o=(0,j.tv)(),n=Y(),a={height:"45vh"},d=(0,l.Fl)((()=>Number.parseInt(t.params.index,10))),s=async()=>{const e=d.value;await o.replace({name:"Home"}),n.commit("removeList",e)};return(e,t)=>((0,l.wg)(),(0,l.j4)(rt,{index:(0,i.SU)(d),mainContentStyle:a,onDelete:s,key:`todo-view-${(0,i.SU)(d)}`},null,8,["index"]))}});const Ut=wt;var St=Ut;const ht=[{path:"/",name:"Home",component:ft},{path:String.raw`/to-do/:index(\d+)`,name:"Todo",component:St}],gt=(0,j.p7)({history:(0,j.r5)(),routes:ht});var yt=gt;(0,n.ri)(Ie).use(L,$).use(yt).mount("#app")}},t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.m=e,function(){var e=[];o.O=function(t,n,l,i){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],l=e[u][1],i=e[u][2];for(var d=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(o.O).every((function(e){return o.O[e](n[s])}))?n.splice(s--,1):(d=!1,i<a&&(a=i));if(d){e.splice(u--,1);var r=l();void 0!==r&&(t=r)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,l,i]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,i,a=n[0],d=n[1],s=n[2],r=0;if(a.some((function(t){return 0!==e[t]}))){for(l in d)o.o(d,l)&&(o.m[l]=d[l]);if(s)var u=s(o)}for(t&&t(n);r<a.length;r++)i=a[r],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},n=self["webpackChunknaive_ui_todo"]=self["webpackChunknaive_ui_todo"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(2080)}));n=o.O(n)})();
//# sourceMappingURL=app.171647b9.js.map