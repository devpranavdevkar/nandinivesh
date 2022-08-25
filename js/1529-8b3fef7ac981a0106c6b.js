"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1529],{56043:function(n,e,t){var o,i,r,d,l=t(52209),a=t(80395),p=t(90687),s=t(22133),c=t(85893),h=a.Z.label(o||(o=(0,l.Z)(["\n  display: flex;\n  position: relative;\n  padding: 6px 12px 6px 1.875rem;\n  font-size: 14px;\n  color: #595959;\n  line-height: 1.2;\n  cursor: pointer;\n  user-select: none;\n  border-radius: 6px;\n  margin-left: -6px;\n  margin-right: -6px;\n\n  &:hover {\n    background-color: #f2f2f2;\n  }\n"]))),x=(0,a.Z)(s.Z)(i||(i=(0,l.Z)(["\n  display: flex;\n  position: relative;\n  padding: 6px 12px 6px 1.875rem;\n  font-size: 14px;\n  color: #595959;\n  line-height: 1.2;\n  cursor: pointer;\n  user-select: none;\n  border-radius: 6px;\n  margin-left: -6px;\n  margin-right: -6px;\n\n  text-decoration: none;\n\n  &:hover {\n    background-color: #f2f2f2;\n  }\n"]))),u=a.Z.input(r||(r=(0,l.Z)(["\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n  &:checked + span {\n    background-color: #4e93ef;\n    box-shadow: 0px 0.5px 2px rgba(0, 0, 0, 0.1);\n    border: none;\n    &:after {\n      display: block;\n      position: absolute;\n      content: '';\n      width: 10px;\n      height: 8px;\n      background-image: url('","');\n      background-repeat: no-repeat;\n      background-size: contain;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n"])),(0,p.Vh)("checkbox-white-tick.svg")),f=a.Z.span(d||(d=(0,l.Z)(["\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 6px;\n  height: 16px;\n  width: 16px;\n  border: 1px solid #b3b3b3;\n  box-shadow: 0px 0.5px 2px rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  border-radius: 4px;\n  background: #ffffff;\n"]))),g=function(n){var e=n.renderLabel,t=n.renderMeta,o=n.checked,i=n.onClick,r=void 0===i?function(){}:i,d=n.as,l=n.href;return"link"===d?(0,c.jsxs)(x,{href:l,onClick:function(n){r(!o),n.preventDefault()},children:[(0,c.jsx)("span",{children:e()}),(0,c.jsx)(u,{type:"checkbox",checked:o}),(0,c.jsx)(f,{}),t()]}):(0,c.jsxs)(h,{children:[(0,c.jsx)("span",{children:e()}),(0,c.jsx)(u,{type:"checkbox",checked:o,onClick:function(n){return r(n)}}),(0,c.jsx)(f,{}),t()]})};g.defaultProps={renderLabel:function(){return null},renderMeta:function(){return null},checked:!1},e.Z=g},68144:function(n,e,t){t.d(e,{Z:function(){return nn}});var o,i,r,d,l,a,p,s,c,h,x,u,f,g,b,w,m,y=t(92809),k=t(67294),Z=t(45697),v=t.n(Z),j=t(25675),z=t(52209),E=t(80395),C=t(94698),S=E.Z.div(o||(o=(0,z.Z)(["\n  display: block;\n  overflow: auto;\n  width: 100vw;\n  "," {\n    width: 100%;\n  }\n  "," {\n    height: auto;\n    overflow: unset;\n  }\n"])),(0,C.up)("mid"),(0,C.up)("desktop")),T=E.Z.table(i||(i=(0,z.Z)(["\n  background-color: ",";\n  width: ","px;\n\n  "," {\n    width: 100%;\n  }\n"])),(function(n){return n.theme.colors.white}),(function(n){return n.mobileWidth}),(0,C.up)("mid")),A=E.Z.tbody(r||(r=(0,z.Z)(["\n  display: block;\n"]))),B=E.Z.thead(d||(d=(0,z.Z)(["\n  overflow: hidden;\n  z-index: ",";\n  background-color: ",";\n  "," {\n    position: sticky;\n    top: ",";\n  }\n"])),(function(n){return n.theme.zIndexTokens["table-header"]}),(function(n){return n.theme.colors.white}),(0,C.up)("desktop"),(function(n){return n.headStickyAfter})),I=E.Z.tr(l||(l=(0,z.Z)(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  height: 56px;\n  box-shadow: inset 0px -1px 0px ",";\n  "," {\n    box-shadow: inset 0px -1px 0px ",";\n  }\n"])),(function(n){return n.theme.colors["gray-200"]}),(0,C.up)("desktop"),(function(n){return n.theme.colors["gray-100"]})),N=E.Z.tr(a||(a=(0,z.Z)(["\n  display: flex;\n  align-items: center;\n  height: 60px;\n  box-shadow: inset 0px -1px 0px ",";\n  "," {\n    box-shadow: inset 0px -1px 0px ",";\n    &:hover {\n      background-color: ",";\n    }\n  }\n"])),(function(n){return n.theme.colors["gray-200"]}),(0,C.up)("desktop"),(function(n){return n.theme.colors["gray-100"]}),(function(n){return n.theme.colors["gray-50"]})),P=E.Z.th(p||(p=(0,z.Z)(["\n  display: flex;\n  align-items: center;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: left;\n  color: ",";\n  width: ","px;\n  padding-left: 16px;\n  "," {\n    padding: 0;\n    width: ","px;\n  }\n"])),(function(n){return n.theme.colors["gray-600"]}),(function(n){return n.width.mobile}),(0,C.up)("desktop"),(function(n){return n.width.desktop})),F=E.Z.td(s||(s=(0,z.Z)(["\n  width: ","px;\n  padding-left: 16px;\n  padding-right: ",";\n  font-size: 14px;\n  font-weight: 500;\n  text-align: ",";\n  color: ",";\n  border: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  "," {\n    padding: 0;\n    width: ","px;\n  }\n"])),(function(n){return n.width.mobile}),(function(n){return"right"===n.textAlign&&"16px"}),(function(n){return n.textAlign}),(function(n){return n.theme.colors["gray-800"]}),(0,C.up)("desktop"),(function(n){return n.width.desktop})),R=E.Z.td(c||(c=(0,z.Z)(["\n  padding: 0 8px 0 12px;\n  height: 100%;\n  position: sticky;\n  left: 0;\n  width: 60vw;\n  display: flex;\n  align-items: center;\n  font-size: 14px;\n  font-weight: 500;\n  color: ",";\n  border: none;\n  background-color: ",";\n  box-shadow: 3px 0px 4px rgba(230, 230, 230, 0.36),\n    inset 0px -1px 0px ",",\n    inset -1px 0px 0px ",";\n\n  "," {\n    width: 48vw;\n  }\n  "," {\n    width: auto;\n    padding: 0 16px 0 0;\n    box-shadow: inset 0px -1px 0px ",";\n    min-width: 0;\n    flex: 1;\n    background-color: inherit;\n  }\n"])),(function(n){return n.theme.colors["gray-800"]}),(function(n){return n.theme.colors.white}),(function(n){return n.theme.colors["gray-200"]}),(function(n){return n.theme.colors["gray-100"]}),(0,C.between)("mid","desktop"),(0,C.up)("desktop"),(function(n){return n.theme.colors["gray-100"]})),_=E.Z.th(h||(h=(0,z.Z)(["\n  display: flex;\n  align-items: center;\n  width: ","px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  font-size: 14px;\n  font-weight: 500;\n  color: ",";\n  padding-right: 16px;\n  "," {\n    padding: 0;\n    width: ","px;\n  }\n"])),(function(n){return n.width.mobile}),(function(n){return n.theme.colors["gray-600"]}),(0,C.up)("desktop"),(function(n){return n.width.desktop})),L=E.Z.th(x||(x=(0,z.Z)(["\n  display: flex;\n  align-items: center;\n  padding-left: 12px;\n  display: flex;\n  align-items: center;\n  height: 100%;\n  width: 60vw;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: left;\n  color: ",";\n  position: sticky;\n  left: 0;\n  background-color: ",";\n  box-shadow: 3px 0px 4px rgba(230, 230, 230, 0.36),\n    inset 0px -1px 0px ",",\n    inset -1px 0px 0px ",";\n\n  "," {\n    width: 48vw;\n  }\n  "," {\n    width: auto;\n    padding: 0;\n    box-shadow: inset 0px -1px 0px ",";\n    flex: 1;\n  }\n"])),(function(n){return n.theme.colors["gray-600"]}),(function(n){return n.theme.colors.white}),(function(n){return n.theme.colors["gray-200"]}),(function(n){return n.theme.colors["gray-100"]}),(0,C.between)("mid","desktop"),(0,C.up)("desktop"),(function(n){return n.theme.colors["gray-100"]})),W=E.Z.img(u||(u=(0,z.Z)(["\n  width: 12px;\n  height: 12px;\n  margin-left: 4px;\n"]))),H=E.Z.figure(f||(f=(0,z.Z)(["\n  width: 1.125em;\n  height: 16px;\n  margin: auto 3px;\n"]))),M=E.Z.a(g||(g=(0,z.Z)(["\n  text-decoration: none;\n  text-align: left;\n  margin-left: 11px;\n  overflow: hidden;\n  width: 90%;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n"]))),D=E.Z.div(b||(b=(0,z.Z)(["\n  width: 4px;\n  height: 2rem;\n  background-color: transparent;\n  border-radius: 1.6875rem;\n  background-color: ",";\n  margin-right: 4px;\n\n  "," {\n    height: 2rem;\n    margin-right: 2px;\n  }\n"])),(function(n){return"Scripbox Recommended"===n.recommended?n.theme.colors["orange-400"]:""}),(0,C.down)("mobile")),V=t(90687),q=t(44244),Y=t(85893),G="default",J="withInfo",K="fundName",O="default",Q="fundName",U=(w={},(0,y.Z)(w,G,(function(n){var e=n.width,t=n.head;return(0,Y.jsx)(P,{width:e,children:t})})),(0,y.Z)(w,J,(function(n){var e=n.width,t=n.head;return(0,Y.jsxs)(_,{width:e,children:[t,(0,Y.jsx)(W,{width:12,height:12,alt:"information tool tip",src:(0,V.Vh)("info-icon.svg")})]})})),(0,y.Z)(w,K,(function(n){var e=n.head;return(0,Y.jsx)(L,{children:e})})),w);U[G].propTypes={width:v().string.isRequired};var X=(m={},(0,y.Z)(m,O,(function(n,e){var t=n.textAlign,o=n.width,i=n.dataHasPadding,r=n.data;return(0,Y.jsx)(F,{textAlign:t,width:o,dataHasPadding:i,children:r(e)})})),(0,y.Z)(m,Q,(function(n,e){var t=n.logoSrc,o=n.logoAlt,i=n.data,r=n.href,d=(0,n.isRecommended)(e);return(0,Y.jsxs)(R,{children:[d&&(0,Y.jsx)(D,{recommended:d}),(0,Y.jsx)(H,{children:t(e)?(0,Y.jsx)(j.default,{layout:"fixed",width:"18",height:"16",src:t(e),alt:o(e)}):(0,Y.jsx)(q.r,{width:"20",height:"20",alt:o})}),(0,Y.jsx)(M,{href:r(e),children:i(e)})]})})),m),$=function(n){var e=n.fundData,t=n.columns,o=n.headStickyAfter,i=t.reduce((function(n,e){return n+(e.width&&parseInt(e.width.mobile))||0}),0),r=(0,k.useCallback)((function(){var n=document.getElementById("table-parent"),e=document.getElementById("table-head"),t=document.getElementById("table-body");if(n){var o=n.getBoundingClientRect(),i=e.children[0].children,r=t.children[0].children;if(o.top<=50&&o.bottom>=106){e.style.position="fixed",e.style.width="".concat(n.clientWidth,"px"),e.style.top="50px",t.style.marginTop="56px",i[0].style.zIndex=1;for(var d=n.getBoundingClientRect().left,l=0;l<i.length;l+=1){i[l].style.position="absolute",i[l].style.height="56px";var a=r[l].getBoundingClientRect().left-d;i[l].style.left="".concat(a<0?0:a,"px"),i[l].style.backgroundColor="white",i[l].style.boxShadow="inset 0px -1px 0px #e5e5e5"}i[0].style.boxShadow="3px 0px 4px rgba(230, 230, 230, 0.36), inset 0px -1px 0px #E5E5E5, inset -1px 0px 0px #F2F2F2"}else{e.style.position="relative",e.style.width="auto",e.style.top="0",t.style.marginTop="0";for(var p=0;p<i.length;p+=1)i[p].style.position="relative",i[p].style.top="0",i[p].style.height="auto",i[p].style.left="auto",i[p].style.boxShadow="none";i[0].style.height="100%",i[0].style.backgroundColor="white",i[0].style.zIndex="1",i[0].style.position="sticky",i[0].style.left="0",i[0].style.boxShadow="3px 0px 4px rgba(230, 230, 230, 0.36), inset 0px -1px 0px #E5E5E5, inset -1px 0px 0px #F2F2F2"}}}),[]);return(0,k.useEffect)((function(){if(!(window.innerWidth>=992))return window.addEventListener("scroll",r,!0),function(){window.removeEventListener("scroll",r)}}),[r]),(0,Y.jsx)(S,{id:"table-parent",children:(0,Y.jsxs)(T,{mobileWidth:i,children:[(0,Y.jsx)(B,{id:"table-head",headStickyAfter:o,children:(0,Y.jsx)(I,{children:t.map((function(n){return U[n.headType||G](n)}))})}),(0,Y.jsx)(A,{id:"table-body",children:e.map((function(n){return(0,Y.jsx)(N,{children:t.map((function(e){return X[e.dataType||O](e,n)}))})}))})]})})};$.defaultProps={headStickyAfter:"48px"};var nn=$},73560:function(n,e,t){var o,i=t(52209),r=t(80395),d=t(85893),l=r.Z.div(o||(o=(0,i.Z)([""]))),a=function(n){var e=n.data,t=n.extendedParentClassName;return(0,d.jsx)(l,{className:"wordpress-wrapper wordpress-content ".concat(t),dangerouslySetInnerHTML:{__html:e}})};a.defaultProps={data:"",extendedParentClassName:""},e.Z=a},1448:function(n,e,t){var o,i,r,d=t(52209),l=t(80395),a=t(85893),p=l.Z.div(o||(o=(0,d.Z)(["\n  padding-top: 16px;\n  padding-bottom: 1.25rem;\n  border-top: ",";\n"])),(function(n){return n.hasBorderTop?"1px solid ".concat(n.theme.colors["gray-200"]):"unset"})),s=l.Z.span(i||(i=(0,d.Z)(["\n  font-weight: 600;\n  color: ",";\n  line-height: 1.2;\n  padding-bottom: 8px;\n  font-size: 14px;\n  display: block;\n\n  ","\n"])),(function(n){return n.theme.colors["gray-900"]}),(function(n){return n.withSubtitle?"\n    padding-bottom: 0px;\n  ":""})),c=l.Z.small(r||(r=(0,d.Z)(["\n  font-size: 14px;\n  color: ",";\n  display: inline-block;\n  line-height: 1.2;\n  padding-bottom: 12px;\n  padding-top: 4px;\n"])),(function(n){return n.theme.colors["gray-500"]}));e.Z=function(n){var e=n.title,t=n.subTitle,o=n.children,i=n.hasBorderTop,r=void 0===i||i;return(0,a.jsxs)(p,{hasBorderTop:r,children:[(0,a.jsx)(s,{withSubtitle:!!t,children:e}),t&&(0,a.jsx)(c,{children:t}),o]})}}}]);