webpackJsonp([0],{471:function(t,e,r){r(577);var n=r(164)(r(508),r(608),"data-v-ed74348a",null);t.exports=n.exports},476:function(t,e,r){var n=r(178)("wks"),i=r(181),o=r(72).Symbol,a="function"==typeof o;(t.exports=function(t){return n[t]||(n[t]=a&&o[t]||(a?o:i)("Symbol."+t))}).store=n},478:function(t,e){t.exports={}},481:function(t,e,r){var n=r(110).f,i=r(170),o=r(476)("toStringTag");t.exports=function(t,e,r){t&&!i(t=r?t:t.prototype,o)&&n(t,o,{configurable:!0,value:e})}},487:function(t,e,r){var n=r(168),i=r(476)("toStringTag"),o="Arguments"==n(function(){return arguments}()),a=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,r,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=a(e=Object(t),i))?r:o?n(e):"Object"==(s=n(e))&&"function"==typeof e.callee?"Arguments":s}},488:function(t,e,r){t.exports=r(72).document&&document.documentElement},489:function(t,e,r){"use strict";var n=r(490),i=r(111),o=r(533),a=r(167),s=r(170),c=r(478),l=r(525),u=r(481),d=r(531),f=r(476)("iterator"),m=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,r,p,h,b,g){l(r,e,p);var _,y,x,F=function(t){if(!m&&t in S)return S[t];switch(t){case"keys":case"values":return function(){return new r(this,t)}}return function(){return new r(this,t)}},w=e+" Iterator",k="values"==h,L=!1,S=t.prototype,j=S[f]||S["@@iterator"]||h&&S[h],C=j||F(h),O=h?k?F("entries"):C:void 0,P="Array"==e?S.entries||j:j;if(P&&(x=d(P.call(new t)))!==Object.prototype&&(u(x,w,!0),n||s(x,f)||a(x,f,v)),k&&j&&"values"!==j.name&&(L=!0,C=function(){return j.call(this)}),n&&!g||!m&&!L&&S[f]||a(S,f,C),c[e]=C,c[w]=v,h)if(_={values:k?C:F("values"),keys:b?C:F("keys"),entries:O},g)for(y in _)y in S||o(S,y,_[y]);else i(i.P+i.F*(m||L),e,_);return _}},490:function(t,e){t.exports=!0},491:function(t,e,r){var n,i,o,a=r(169),s=r(522),c=r(488),l=r(173),u=r(72),d=u.process,f=u.setImmediate,m=u.clearImmediate,v=u.MessageChannel,p=0,h={},b=function(){var t=+this;if(h.hasOwnProperty(t)){var e=h[t];delete h[t],e()}},g=function(t){b.call(t.data)};f&&m||(f=function(t){for(var e=[],r=1;arguments.length>r;)e.push(arguments[r++]);return h[++p]=function(){s("function"==typeof t?t:Function(t),e)},n(p),p},m=function(t){delete h[t]},"process"==r(168)(d)?n=function(t){d.nextTick(a(b,t,1))}:v?(i=new v,o=i.port2,i.port1.onmessage=g,n=a(o.postMessage,o,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(n=function(t){u.postMessage(t+"","*")},u.addEventListener("message",g,!1)):n="onreadystatechange"in l("script")?function(t){c.appendChild(l("script")).onreadystatechange=function(){c.removeChild(this),b.call(t)}}:function(t){setTimeout(a(b,t,1),0)}),t.exports={set:f,clear:m}},508:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(171),i=r.n(n),o=r(515),a=r.n(o);e.default={watch:{"$store.state.userList":"userListGet"},data:function(){return{filters:{name:""},userList:[],total:0,page:1,listLoading:!1,sels:[],editFormVisible:!1,editLoading:!1,editFormRules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}]},editForm:{id:0,name:"",sex:-1,age:0,birth:"",addr:""},addFormVisible:!1,addLoading:!1,addFormRules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}]},addForm:{name:"",sex:-1,age:0,birth:"",addr:""}}},methods:{userListGet:function(){this.userList=this.$store.state.userList},formatSex:function(t,e){return 1==t.sex?"男":0==t.sex?"女":"未知"},handleCurrentChange:function(t){this.page=t,this.getUsers()},getUsers:function(){var t=this,e=this;this.listLoading=!0,new a.a(function(r,n){e.$store.dispatch("getUserList"),t.listLoading=!1,r()})},handleDel:function(t,e){var r=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then(function(){r.listLoading=!0;var t={id:e.id};removeUser(t).then(function(t){r.listLoading=!1,r.$message({message:"删除成功",type:"success"}),r.getUsers()})}).catch(function(){})},handleEdit:function(t,e){this.editFormVisible=!0,this.editForm=i()({},e)},handleAdd:function(){this.addFormVisible=!0,this.addForm={name:"",sex:-1,age:0,birth:"",addr:""}},editSubmit:function(){var t=this;this.$refs.editForm.validate(function(e){e&&t.$confirm("确认提交吗？","提示",{}).then(function(){t.editLoading=!0;var e=i()({},t.editForm);e.birth=e.birth&&""!=e.birth?util.formatDate.format(new Date(e.birth),"yyyy-MM-dd"):"",editUser(e).then(function(e){t.editLoading=!1,t.$message({message:"提交成功",type:"success"}),t.$refs.editForm.resetFields(),t.editFormVisible=!1,t.getUsers()})})})},addSubmit:function(){var t=this;this.$refs.addForm.validate(function(e){e&&t.$confirm("确认提交吗？","提示",{}).then(function(){t.addLoading=!0;var e=i()({},t.addForm);e.birth=e.birth&&""!=e.birth?util.formatDate.format(new Date(e.birth),"yyyy-MM-dd"):"",addUser(e).then(function(e){t.addLoading=!1,t.$message({message:"提交成功",type:"success"}),t.$refs.addForm.resetFields(),t.addFormVisible=!1,t.getUsers()})})})},selsChange:function(t){this.sels=t},batchRemove:function(){var t=this,e=this.sels.map(function(t){return t.id}).toString();this.$confirm("确认删除选中记录吗？","提示",{type:"warning"}).then(function(){t.listLoading=!0;var r={ids:e};batchRemoveUser(r).then(function(e){t.listLoading=!1,t.$message({message:"删除成功",type:"success"}),t.getUsers()})}).catch(function(){})}},mounted:function(){this.getUsers()}}},515:function(t,e,r){t.exports={default:r(518),__esModule:!0}},518:function(t,e,r){r(539),r(541),r(542),r(540),t.exports=r(73).Promise},519:function(t,e){t.exports=function(){}},520:function(t,e){t.exports=function(t,e,r,n){if(!(t instanceof e)||void 0!==n&&n in t)throw TypeError(r+": incorrect invocation!");return t}},521:function(t,e,r){var n=r(169),i=r(524),o=r(523),a=r(166),s=r(179),c=r(537),l={},u={},e=t.exports=function(t,e,r,d,f){var m,v,p,h,b=f?function(){return t}:c(t),g=n(r,d,e?2:1),_=0;if("function"!=typeof b)throw TypeError(t+" is not iterable!");if(o(b)){for(m=s(t.length);m>_;_++)if((h=e?g(a(v=t[_])[0],v[1]):g(t[_]))===l||h===u)return h}else for(p=b.call(t);!(v=p.next()).done;)if((h=i(p,g,v.value,e))===l||h===u)return h};e.BREAK=l,e.RETURN=u},522:function(t,e){t.exports=function(t,e,r){var n=void 0===r;switch(e.length){case 0:return n?t():t.call(r);case 1:return n?t(e[0]):t.call(r,e[0]);case 2:return n?t(e[0],e[1]):t.call(r,e[0],e[1]);case 3:return n?t(e[0],e[1],e[2]):t.call(r,e[0],e[1],e[2]);case 4:return n?t(e[0],e[1],e[2],e[3]):t.call(r,e[0],e[1],e[2],e[3])}return t.apply(r,e)}},523:function(t,e,r){var n=r(478),i=r(476)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(n.Array===t||o[i]===t)}},524:function(t,e,r){var n=r(166);t.exports=function(t,e,r,i){try{return i?e(n(r)[0],r[1]):e(r)}catch(e){var o=t.return;throw void 0!==o&&n(o.call(t)),e}}},525:function(t,e,r){"use strict";var n=r(529),i=r(177),o=r(481),a={};r(167)(a,r(476)("iterator"),function(){return this}),t.exports=function(t,e,r){t.prototype=n(a,{next:i(1,r)}),o(t,e+" Iterator")}},526:function(t,e,r){var n=r(476)("iterator"),i=!1;try{var o=[7][n]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!i)return!1;var r=!1;try{var o=[7],a=o[n]();a.next=function(){return{done:r=!0}},o[n]=function(){return a},t(o)}catch(t){}return r}},527:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},528:function(t,e,r){var n=r(72),i=r(491).set,o=n.MutationObserver||n.WebKitMutationObserver,a=n.process,s=n.Promise,c="process"==r(168)(a);t.exports=function(){var t,e,r,l=function(){var n,i;for(c&&(n=a.domain)&&n.exit();t;){i=t.fn,t=t.next;try{i()}catch(n){throw t?r():e=void 0,n}}e=void 0,n&&n.enter()};if(c)r=function(){a.nextTick(l)};else if(o){var u=!0,d=document.createTextNode("");new o(l).observe(d,{characterData:!0}),r=function(){d.data=u=!u}}else if(s&&s.resolve){var f=s.resolve();r=function(){f.then(l)}}else r=function(){i.call(n,l)};return function(n){var i={fn:n,next:void 0};e&&(e.next=i),t||(t=i,r()),e=i}}},529:function(t,e,r){var n=r(166),i=r(530),o=r(175),a=r(174)("IE_PROTO"),s=function(){},c=function(){var t,e=r(173)("iframe"),n=o.length;for(e.style.display="none",r(488).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;n--;)delete c.prototype[o[n]];return c()};t.exports=Object.create||function(t,e){var r;return null!==t?(s.prototype=n(t),r=new s,s.prototype=null,r[a]=t):r=c(),void 0===e?r:i(r,e)}},530:function(t,e,r){var n=r(110),i=r(166),o=r(176);t.exports=r(56)?Object.defineProperties:function(t,e){i(t);for(var r,a=o(e),s=a.length,c=0;s>c;)n.f(t,r=a[c++],e[r]);return t}},531:function(t,e,r){var n=r(170),i=r(180),o=r(174)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),n(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},532:function(t,e,r){var n=r(167);t.exports=function(t,e,r){for(var i in e)r&&t[i]?t[i]=e[i]:n(t,i,e[i]);return t}},533:function(t,e,r){t.exports=r(167)},534:function(t,e,r){"use strict";var n=r(72),i=r(73),o=r(110),a=r(56),s=r(476)("species");t.exports=function(t){var e="function"==typeof i[t]?i[t]:n[t];a&&e&&!e[s]&&o.f(e,s,{configurable:!0,get:function(){return this}})}},535:function(t,e,r){var n=r(166),i=r(172),o=r(476)("species");t.exports=function(t,e){var r,a=n(t).constructor;return void 0===a||void 0==(r=n(a)[o])?e:i(r)}},536:function(t,e,r){var n=r(113),i=r(112);t.exports=function(t){return function(e,r){var o,a,s=String(i(e)),c=n(r),l=s.length;return c<0||c>=l?t?"":void 0:(o=s.charCodeAt(c),o<55296||o>56319||c+1===l||(a=s.charCodeAt(c+1))<56320||a>57343?t?s.charAt(c):o:t?s.slice(c,c+2):a-56320+(o-55296<<10)+65536)}}},537:function(t,e,r){var n=r(487),i=r(476)("iterator"),o=r(478);t.exports=r(73).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||o[n(t)]}},538:function(t,e,r){"use strict";var n=r(519),i=r(527),o=r(478),a=r(114);t.exports=r(489)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,r):"values"==e?i(0,t[r]):i(0,[r,t[r]])},"values"),o.Arguments=o.Array,n("keys"),n("values"),n("entries")},539:function(t,e){},540:function(t,e,r){"use strict";var n,i,o,a=r(490),s=r(72),c=r(169),l=r(487),u=r(111),d=r(74),f=r(172),m=r(520),v=r(521),p=r(535),h=r(491).set,b=r(528)(),g=s.TypeError,_=s.process,y=s.Promise,_=s.process,x="process"==l(_),F=function(){},w=!!function(){try{var t=y.resolve(1),e=(t.constructor={})[r(476)("species")]=function(t){t(F,F)};return(x||"function"==typeof PromiseRejectionEvent)&&t.then(F)instanceof e}catch(t){}}(),k=function(t,e){return t===e||t===y&&e===o},L=function(t){var e;return!(!d(t)||"function"!=typeof(e=t.then))&&e},S=function(t){return k(y,t)?new j(t):new i(t)},j=i=function(t){var e,r;this.promise=new t(function(t,n){if(void 0!==e||void 0!==r)throw g("Bad Promise constructor");e=t,r=n}),this.resolve=f(e),this.reject=f(r)},C=function(t){try{t()}catch(t){return{error:t}}},O=function(t,e){if(!t._n){t._n=!0;var r=t._c;b(function(){for(var n=t._v,i=1==t._s,o=0;r.length>o;)!function(e){var r,o,a=i?e.ok:e.fail,s=e.resolve,c=e.reject,l=e.domain;try{a?(i||(2==t._h&&A(t),t._h=1),!0===a?r=n:(l&&l.enter(),r=a(n),l&&l.exit()),r===e.promise?c(g("Promise-chain cycle")):(o=L(r))?o.call(r,s,c):s(r)):c(n)}catch(t){c(t)}}(r[o++]);t._c=[],t._n=!1,e&&!t._h&&P(t)})}},P=function(t){h.call(s,function(){var e,r,n,i=t._v;if($(t)&&(e=C(function(){x?_.emit("unhandledRejection",i,t):(r=s.onunhandledrejection)?r({promise:t,reason:i}):(n=s.console)&&n.error&&n.error("Unhandled promise rejection",i)}),t._h=x||$(t)?2:1),t._a=void 0,e)throw e.error})},$=function(t){if(1==t._h)return!1;for(var e,r=t._a||t._c,n=0;r.length>n;)if(e=r[n++],e.fail||!$(e.promise))return!1;return!0},A=function(t){h.call(s,function(){var e;x?_.emit("rejectionHandled",t):(e=s.onrejectionhandled)&&e({promise:t,reason:t._v})})},R=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),O(e,!0))},U=function(t){var e,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw g("Promise can't be resolved itself");(e=L(t))?b(function(){var n={_w:r,_d:!1};try{e.call(t,c(U,n,1),c(R,n,1))}catch(t){R.call(n,t)}}):(r._v=t,r._s=1,O(r,!1))}catch(t){R.call({_w:r,_d:!1},t)}}};w||(y=function(t){m(this,y,"Promise","_h"),f(t),n.call(this);try{t(c(U,this,1),c(R,this,1))}catch(t){R.call(this,t)}},n=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},n.prototype=r(532)(y.prototype,{then:function(t,e){var r=S(p(this,y));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=x?_.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&O(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),j=function(){var t=new n;this.promise=t,this.resolve=c(U,t,1),this.reject=c(R,t,1)}),u(u.G+u.W+u.F*!w,{Promise:y}),r(481)(y,"Promise"),r(534)("Promise"),o=r(73).Promise,u(u.S+u.F*!w,"Promise",{reject:function(t){var e=S(this);return(0,e.reject)(t),e.promise}}),u(u.S+u.F*(a||!w),"Promise",{resolve:function(t){if(t instanceof y&&k(t.constructor,this))return t;var e=S(this);return(0,e.resolve)(t),e.promise}}),u(u.S+u.F*!(w&&r(526)(function(t){y.all(t).catch(F)})),"Promise",{all:function(t){var e=this,r=S(e),n=r.resolve,i=r.reject,o=C(function(){var r=[],o=0,a=1;v(t,!1,function(t){var s=o++,c=!1;r.push(void 0),a++,e.resolve(t).then(function(t){c||(c=!0,r[s]=t,--a||n(r))},i)}),--a||n(r)});return o&&i(o.error),r.promise},race:function(t){var e=this,r=S(e),n=r.reject,i=C(function(){v(t,!1,function(t){e.resolve(t).then(r.resolve,n)})});return i&&n(i.error),r.promise}})},541:function(t,e,r){"use strict";var n=r(536)(!0);r(489)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,r=this._i;return r>=e.length?{value:void 0,done:!0}:(t=n(e,r),this._i+=t.length,{value:t,done:!1})})},542:function(t,e,r){r(538);for(var n=r(72),i=r(167),o=r(478),a=r(476)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var l=s[c],u=n[l],d=u&&u.prototype;d&&!d[a]&&i(d,a,l),o[l]=o.Array}},558:function(t,e,r){e=t.exports=r(51)(void 0),e.push([t.i,".toolbar[data-v-ed74348a]{height:50px;font-size:12px;padding-left:8px}.toolbar .el-form-item[data-v-ed74348a]{margin-top:7px}.toolbar .button[data-v-ed74348a],.toolbar[data-v-ed74348a]{margin-top:4px}",""])},577:function(t,e,r){var n=r(558);"string"==typeof n&&(n=[[t.i,n,""]]);r(52)(n,{});n.locals&&(t.exports=n.locals)},608:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"page"},[r("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[r("el-form",{attrs:{inline:!0,model:t.filters}},[r("el-form-item",[r("el-input",{attrs:{placeholder:"姓名"},model:{value:t.filters.name,callback:function(e){t.filters.name=e},expression:"filters.name"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.getUsers}},[t._v("查询")])],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.handleAdd}},[t._v("新增")])],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.userList,"highlight-current-row":""},on:{"selection-change":t.selsChange}},[r("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),r("el-table-column",{attrs:{type:"index",width:"60"}}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"sex",label:"性别",width:"100",formatter:t.formatSex,sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"age",label:"年龄",width:"100",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"birthday",label:"生日",width:"120",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"addr",label:"地址","min-width":"180",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"small"},on:{click:function(r){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),r("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(r){t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-button",{staticClass:"button",attrs:{type:"danger",disabled:0===this.sels.length},on:{click:t.batchRemove}},[t._v("批量删除")]),t._v(" "),r("el-pagination",{staticClass:"button",staticStyle:{float:"right"},attrs:{layout:"prev, pager, next","page-size":20,total:500},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),r("el-dialog",{attrs:{title:"编辑","close-on-click-modal":!1},model:{value:t.editFormVisible,callback:function(e){t.editFormVisible=e},expression:"editFormVisible"}},[r("el-form",{ref:"editForm",attrs:{model:t.editForm,"label-width":"80px",rules:t.editFormRules}},[r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{attrs:{"auto-complete":"off"},model:{value:t.editForm.name,callback:function(e){t.editForm.name=e},expression:"editForm.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"性别"}},[r("el-radio-group",{model:{value:t.editForm.sex,callback:function(e){t.editForm.sex=e},expression:"editForm.sex"}},[r("el-radio",{staticClass:"radio",attrs:{label:1}},[t._v("男")]),t._v(" "),r("el-radio",{staticClass:"radio",attrs:{label:0}},[t._v("女")])],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"年龄"}},[r("el-input-number",{attrs:{min:0,max:200},model:{value:t.editForm.age,callback:function(e){t.editForm.age=e},expression:"editForm.age"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"生日"}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.editForm.birth,callback:function(e){t.editForm.birth=e},expression:"editForm.birth"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"地址"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.editForm.addr,callback:function(e){t.editForm.addr=e},expression:"editForm.addr"}})],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",slot:"footer"},[r("el-button",{nativeOn:{click:function(e){t.editFormVisible=!1}}},[t._v("取消")]),t._v(" "),r("el-button",{attrs:{type:"primary",loading:t.editLoading},nativeOn:{click:function(e){t.editSubmit(e)}}},[t._v("提交")])],1)],1),t._v(" "),r("el-dialog",{attrs:{title:"新增","close-on-click-modal":!1},model:{value:t.addFormVisible,callback:function(e){t.addFormVisible=e},expression:"addFormVisible"}},[r("el-form",{ref:"addForm",attrs:{model:t.addForm,"label-width":"80px",rules:t.addFormRules}},[r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addForm.name,callback:function(e){t.addForm.name=e},expression:"addForm.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"性别"}},[r("el-radio-group",{model:{value:t.addForm.sex,callback:function(e){t.addForm.sex=e},expression:"addForm.sex"}},[r("el-radio",{staticClass:"radio",attrs:{label:1}},[t._v("男")]),t._v(" "),r("el-radio",{staticClass:"radio",attrs:{label:0}},[t._v("女")])],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"年龄"}},[r("el-input-number",{attrs:{min:0,max:200},model:{value:t.addForm.age,callback:function(e){t.addForm.age=e},expression:"addForm.age"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"生日"}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.addForm.birth,callback:function(e){t.addForm.birth=e},expression:"addForm.birth"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"地址"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.addForm.addr,callback:function(e){t.addForm.addr=e},expression:"addForm.addr"}})],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",slot:"footer"},[r("el-button",{nativeOn:{click:function(e){t.addFormVisible=!1}}},[t._v("取消")]),t._v(" "),r("el-button",{attrs:{type:"primary",loading:t.addLoading},nativeOn:{click:function(e){t.addSubmit(e)}}},[t._v("提交")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=0.js.map?fe9382f02f897b932969