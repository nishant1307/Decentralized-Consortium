(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1754:function(e,t,n){"use strict";var a=n(2),r=n(4),o=n(0),i=n.n(o),c=(n(1),n(6)),s=n(9),u=i.a.forwardRef(function(e,t){var n=e.alt,o=e.children,s=e.childrenClassName,u=e.classes,l=e.className,m=e.component,f=void 0===m?"div":m,d=e.imgProps,p=e.sizes,b=e.src,g=e.srcSet,h=Object(r.a)(e,["alt","children","childrenClassName","classes","className","component","imgProps","sizes","src","srcSet"]),v=null,y=b||g;return v=y?i.a.createElement("img",Object(a.a)({alt:n,src:b,srcSet:g,sizes:p,className:u.img},d)):s&&i.a.isValidElement(o)?i.a.cloneElement(o,{className:Object(c.a)(s,o.props.className)}):o,i.a.createElement(f,Object(a.a)({className:Object(c.a)(u.root,u.system,l,!y&&u.colorDefault),ref:t},h),v)});t.a=Object(s.a)(function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover"}}},{name:"MuiAvatar"})(u)},1820:function(e,t,n){(function(t){var a=n(1822);function r(e,n){var r=JSON.stringify(n),o=a.utf8ToBuffer(r),i=t.crypto.getRandomValues(new Uint8Array(16));return t.crypto.subtle.encrypt({name:"AES-GCM",iv:i},e,o).then(function(e){var t=new Uint8Array(e),n=a.bufferToBase64(i);return{data:a.bufferToBase64(t),iv:n}})}function o(e,t){const n=a.base64ToBuffer(t.data),r=a.base64ToBuffer(t.iv);return crypto.subtle.decrypt({name:"AES-GCM",iv:r},e,n).then(function(e){const t=new Uint8Array(e),n=a.bufferToUtf8(t);return JSON.parse(n)}).catch(function(e){throw new Error("Incorrect password")})}function i(e,n){var r=a.utf8ToBuffer(e),o=a.base64ToBuffer(n);return t.crypto.subtle.importKey("raw",r,{name:"PBKDF2"},!1,["deriveBits","deriveKey"]).then(function(e){return t.crypto.subtle.deriveKey({name:"PBKDF2",salt:o,iterations:1e4,hash:"SHA-256"},e,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])})}function c(e){for(var t=e.toString(16);t.length<2;)t="0"+t;return t}function s(e=32){var n=new Uint8Array(e);return t.crypto.getRandomValues(n),btoa(String.fromCharCode.apply(null,n))}e.exports={encrypt:function(e,t){var n=s();return i(e,n).then(function(e){return r(e,t)}).then(function(e){return e.salt=n,JSON.stringify(e)})},decrypt:function(e,t){const n=JSON.parse(t),a=n.salt;return i(e,a).then(function(e){return o(e,n)})},keyFromPassword:i,encryptWithKey:r,decryptWithKey:o,serializeBufferForStorage:function(e){for(var t="0x",n=e.length||e.byteLength,a=0;a<n;a++)t+=c(e[a]);return t},serializeBufferFromStorage:function(e){for(var t="0x"===e.slice(0,2)?e.slice(2):e,n=new Uint8Array(t.length/2),a=0;a<t.length;a+=2){var r=t.substr(a,2);n[a/2]=parseInt(r,16)}return n},generateSalt:s}}).call(this,n(31))},1821:function(e,t,n){"use strict";var a=n(20);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(0)),o=(0,a(n(80)).default)(r.default.createElement(r.default.Fragment,null,r.default.createElement("g",{fill:"none"},r.default.createElement("path",{d:"M0 0h24v24H0V0z"}),r.default.createElement("path",{d:"M0 0h24v24H0V0z",opacity:".87"})),r.default.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"})),"LockOutlined");t.default=o},1822:function(e,t,n){"use strict";function a(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode(parseInt(t,16))})}function r(e){return u(a(e))}function o(e){var t=e.replace(/(.)/g,function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n});return decodeURIComponent(t)}function i(e){return o(c(e))}function c(e){return Array.prototype.map.call(e,function(e){return String.fromCharCode(e)}).join("")}function s(e){var t=c(e);return btoa(t)}function u(e){var t;return t="undefined"!=typeof Uint8Array?new Uint8Array(e.length):[],Array.prototype.forEach.call(e,function(e,n){t[n]=e.charCodeAt(0)}),t}function l(e){return u(atob(e))}e.exports={utf8ToBinaryString:a,utf8ToBuffer:r,utf8ToBase64:function(e){var t=a(e);return btoa(t)},binaryStringToUtf8:o,bufferToUtf8:i,base64ToUtf8:function(e){return o(atob(e))},bufferToBinaryString:c,bufferToBase64:s,binaryStringToBuffer:u,base64ToBuffer:l,strToUtf8Arr:r,utf8ArrToStr:i,arrToBase64:s,base64ToArr:l}},1963:function(e,t,n){"use strict";var a=n(20);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(0)),o=(0,a(n(80)).default)(r.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=o},2056:function(e,t,n){"use strict";n.r(t);var a=n(30),r=n.n(a),o=n(44),i=n.n(o),c=n(12),s=n.n(c),u=n(0),l=n.n(u),m=n(1754),f=n(191),d=n(1808),p=n(287),b=n(1803),g=n(246),h=n(124),v=n(1821),y=n.n(v),N=n(79),E=n(291),O=(n(35),n(496)),j=n(1963),w=n.n(j),_=n(22),C=n(4),S=n(28),x=n(2),T=(n(1),n(6)),k=n(9),A=n(95),B=n(1788),z=n(21),M=n(1741),L=n(26),P=l.a.forwardRef(function(e,t){var n=e.action,a=e.classes,r=e.className,o=e.message,i=Object(C.a)(e,["action","classes","className","message"]);return l.a.createElement(g.a,Object(x.a)({component:N.a,variant:"body2",variantMapping:{body1:"div",body2:"div"},role:"alertdialog",square:!0,elevation:6,className:Object(T.a)(a.root,r),ref:t},i),l.a.createElement("div",{className:a.message},o),n?l.a.createElement("div",{className:a.action},n):null)}),U=Object(k.a)(function(e){var t="light"===e.palette.type?.8:.98,n=Object(L.b)(e.palette.background.default,t);return{root:Object(S.a)({color:e.palette.getContrastText(n),backgroundColor:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:e.shape.borderRadius,flexGrow:1},e.breakpoints.up("sm"),{flexGrow:"initial",minWidth:288}),message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}}},{name:"MuiSnackbarContent"})(P),I=l.a.forwardRef(function(e,t){var n=e.action,a=e.anchorOrigin,r=(a=void 0===a?{vertical:"bottom",horizontal:"center"}:a).vertical,o=a.horizontal,i=e.autoHideDuration,c=e.children,s=e.classes,u=e.className,m=e.ClickAwayListenerProps,f=e.ContentProps,d=e.disableWindowBlurListener,p=void 0!==d&&d,b=e.message,g=e.onClose,h=e.onEnter,v=e.onEntered,y=e.onEntering,N=e.onExit,E=e.onExited,O=e.onExiting,j=e.onMouseEnter,w=e.onMouseLeave,S=e.open,k=e.resumeHideDuration,L=e.TransitionComponent,P=void 0===L?M.a:L,I=e.transitionDuration,R=void 0===I?{enter:A.b.enteringScreen,exit:A.b.leavingScreen}:I,D=e.TransitionProps,F=Object(C.a)(e,["action","anchorOrigin","autoHideDuration","children","classes","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onClose","onEnter","onEntered","onEntering","onExit","onExited","onExiting","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"]),H=l.a.useRef(),V=l.a.useState(!0),K=Object(_.a)(V,2),W=K[0],J=K[1],G=l.a.useCallback(function(e){var t=null!=e?e:i;g&&null!=t&&(clearTimeout(H.current),H.current=setTimeout(function(){g&&null!=(null!=e?e:i)&&g(null,"timeout")},t))},[i,g]);l.a.useEffect(function(){return S&&G(),function(){clearTimeout(H.current)}},[S,G]);var q=function(){clearTimeout(H.current)},X=l.a.useCallback(function(){if(null!=i){if(null!=k)return void G(k);G(.5*i)}},[i,k,G]);return l.a.useEffect(function(){if(!p&&S)return window.addEventListener("focus",X),window.addEventListener("blur",q),function(){window.removeEventListener("focus",X),window.removeEventListener("blur",q)}},[p,X,S]),!S&&W?null:l.a.createElement(B.a,Object(x.a)({onClickAway:function(e){g&&g(e,"clickaway")}},m),l.a.createElement("div",Object(x.a)({className:Object(T.a)(s.root,s["anchorOrigin".concat(Object(z.a)(r)).concat(Object(z.a)(o))],u),onMouseEnter:function(e){j&&j(e),q()},onMouseLeave:function(e){w&&w(e),X()},ref:t},F),l.a.createElement(P,Object(x.a)({appear:!0,in:S,onEnter:Object(z.b)(function(){J(!1)},h),onEntered:v,onEntering:y,onExit:N,onExited:Object(z.b)(function(){J(!0)},E),onExiting:O,timeout:R,direction:"top"===r?"down":"up"},D),c||l.a.createElement(U,Object(x.a)({message:b,action:n},f)))))}),R=Object(k.a)(function(e){var t={top:8},n={bottom:8},a={justifyContent:"flex-end"},r={justifyContent:"flex-start"},o={top:24},i={bottom:24},c={right:24},s={left:24},u={left:"50%",right:"auto",transform:"translateX(-50%)"};return{root:{zIndex:e.zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},anchorOriginTopCenter:Object(x.a)({},t,Object(S.a)({},e.breakpoints.up("sm"),Object(x.a)({},o,{},u))),anchorOriginBottomCenter:Object(x.a)({},n,Object(S.a)({},e.breakpoints.up("sm"),Object(x.a)({},i,{},u))),anchorOriginTopRight:Object(x.a)({},t,{},a,Object(S.a)({},e.breakpoints.up("sm"),Object(x.a)({left:"auto"},o,{},c))),anchorOriginBottomRight:Object(x.a)({},n,{},a,Object(S.a)({},e.breakpoints.up("sm"),Object(x.a)({left:"auto"},i,{},c))),anchorOriginTopLeft:Object(x.a)({},t,{},r,Object(S.a)({},e.breakpoints.up("sm"),Object(x.a)({right:"auto"},o,{},s))),anchorOriginBottomLeft:Object(x.a)({},n,{},r,Object(S.a)({},e.breakpoints.up("sm"),Object(x.a)({right:"auto"},i,{},s)))}},{flip:!1,name:"MuiSnackbar"})(I),D=(n(98),n(51)),F=n(513),H="/var/www/Consortium/ConsortiumClient/src/views/Login.jsx",V=n(1820),K=Object(E.a)(function(e){return{root:{height:"100vh"},image:{backgroundImage:"url(https://source.unsplash.com/random)",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"},paper:{margin:e.spacing(8,4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}});t.default=Object(D.connect)(function(e){return{auth:e.auth,errors:e.errors}},{loginUser:F.a})(function(e){var t=K(),n=Object(u.useState)(""),a=s()(n,2),o=a[0],c=a[1],v=Object(u.useState)(""),E=s()(v,2),j=E[0],_=E[1],C=Object(u.useState)(""),S=s()(C,2),x=S[0],T=S[1],k=Object(u.useState)(!1),A=s()(k,2),B=A[0],z=A[1];function M(e,t){"clickaway"!==t&&z(!1)}Object(u.useEffect)(function(){e.auth.isAuthenticated&&e.history.push("/dashboard/home");var t=localStorage.getItem("address"),n=localStorage.getItem("data");null===n?(alert("No account Found!"),e.history.push("/signup")):(_(JSON.parse(n)),T(t))},[]);var L=(P=i()(r.a.mark(function t(n){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),V.decrypt(o,j).then(function(t){sessionStorage.setItem("privateKey",JSON.parse(t).privateKey),e.loginUser({address:x,data:t},e.history)}).catch(function(e){console.error(e),z(!0)});case 2:case"end":return t.stop()}},t)})),function(e){return P.apply(this,arguments)});var P;return l.a.createElement(h.a,{container:!0,component:"main",className:t.root,__source:{fileName:H,lineNumber:98}},l.a.createElement(d.a,{__source:{fileName:H,lineNumber:99}}),e.errors.message&&l.a.createElement(R,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:!0,autoHideDuration:6e3,ContentProps:{"aria-describedby":"message-id"},message:l.a.createElement("span",{id:"message-id",__source:{fileName:H,lineNumber:110}},e.errors.message),__source:{fileName:H,lineNumber:100}}),l.a.createElement(R,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:B,autoHideDuration:6e5,onClose:M,ContentProps:{"aria-describedby":"message-id"},message:l.a.createElement("span",{id:"message-id",__source:{fileName:H,lineNumber:123}},"Your password is invalid. Please try again."),action:[l.a.createElement(O.a,{key:"close","aria-label":"close",color:"secondary",className:t.close,onClick:M,__source:{fileName:H,lineNumber:125}},l.a.createElement(w.a,{__source:{fileName:H,lineNumber:132}}))],__source:{fileName:H,lineNumber:112}}),l.a.createElement(h.a,{item:!0,xs:!1,sm:4,md:7,className:t.image,__source:{fileName:H,lineNumber:136}}),l.a.createElement(h.a,{item:!0,xs:12,sm:8,md:5,component:g.a,elevation:6,square:!0,__source:{fileName:H,lineNumber:137}},l.a.createElement("div",{className:t.paper,__source:{fileName:H,lineNumber:138}},l.a.createElement(m.a,{className:t.avatar,__source:{fileName:H,lineNumber:139}},l.a.createElement(y.a,{__source:{fileName:H,lineNumber:140}})),l.a.createElement(N.a,{component:"h1",variant:"h5",__source:{fileName:H,lineNumber:142}},"Sign in"),l.a.createElement("form",{className:t.form,noValidate:!0,__source:{fileName:H,lineNumber:145}},l.a.createElement(p.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Address",name:"email",value:x||"",disabled:!0,__source:{fileName:H,lineNumber:146}}),l.a.createElement(p.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){c(e.target.value)},__source:{fileName:H,lineNumber:157}}),l.a.createElement(f.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:L,__source:{fileName:H,lineNumber:171}},"Sign In"),l.a.createElement(h.a,{container:!0,__source:{fileName:H,lineNumber:180}},l.a.createElement(h.a,{item:!0,xs:!0,__source:{fileName:H,lineNumber:181}},l.a.createElement(b.a,{href:"/recover",variant:"body2",__source:{fileName:H,lineNumber:182}},"Forgot password?")),l.a.createElement(h.a,{item:!0,__source:{fileName:H,lineNumber:186}},l.a.createElement(b.a,{href:"/signup",variant:"body2",__source:{fileName:H,lineNumber:187}},"Don't have an account? Sign Up")))))))})}}]);