(this.webpackJsonpgrandpybot=this.webpackJsonpgrandpybot||[]).push([[0],{26:function(e,t,a){e.exports=a(71)},70:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(4),l=a.n(s),o=a(25),c=a(2),u=a(5),i=a.n(u),m=a(23),d=a.n(m),p=a(24),g=a.n(p),v=a(3),b=a.n(v),f=function(e){var t=e.message,a=Object(n.useState)(null),s=Object(c.a)(a,2),l=s[0],o=s[1],u="position"in t?function(e){var t={lng:Number(e.lng.toFixed(3)),lat:Number(e.lat.toFixed(3))};return b.a.get("/get_google_key").then((function(e){return o(e.data.key)})).catch((function(e){return console.log(e)})),null===l?null:r.a.createElement("div",{className:"map"},r.a.createElement(g.a,{bootstrapURLKeys:{key:l,language:"fr"},options:{mapTypeControl:!1,scrollwheel:!1,panControl:!1},defaultCenter:t,defaultZoom:15},r.a.createElement((function(e){var t=e.text;return r.a.createElement("div",{className:"pin bounce"},t,r.a.createElement("div",{className:"pulse"}))}),{lat:e.lat,lng:e.lng})))}(t.position):"",i="Me"!==t.user?{image:r.a.createElement("img",{src:"https://image.flaticon.com/icons/png/512/2115/2115916.png",alt:"grandpybot"}),class:""}:{image:"",class:"message-personal"};return r.a.createElement("div",{className:"message new ".concat(i.class)},r.a.createElement("figure",{className:"avatar"},i.image),u,t.text,r.a.createElement("div",{className:"timestamp"},t.hour),r.a.createElement("div",{className:"checkmark-read"},"\u2713\u2713"))},h=r.a.createContext({conversation:null,updateConversation:null}),E=r.a.createContext({loaderStatus:null,updateLoaderStatus:null}),y=function(){var e=Object(n.useState)(""),t=Object(c.a)(e,2),a=t[0],s=t[1],l=Object(n.useContext)(h),o=Object(n.useContext)(E);return r.a.createElement("div",{className:"message-box"},r.a.createElement("form",{className:"message-input",onSubmit:function(e){e.preventDefault();var t=a;l.updateConversation({user:"Me",text:t}),o.updateLoaderStatus("visible"),b.a.post("/askbot",{message:t}).then((function(e){var t=e.data.description,a=e.data.address,n=e.data.position;if(a){var r={user:"GrandPY",text:a};n&&(r.position={lng:n.lng,lat:n.lat}),l.updateConversation(r)}l.updateConversation({user:"GrandPY",text:t}),o.updateLoaderStatus("hidden")})).catch((function(e){return console.log(e)})),document.querySelector(".message-input").reset()}},r.a.createElement("input",{onChange:function(e){var t=e.currentTarget.value;s(t)},type:"text",className:"message-input",placeholder:"Ask your question...",required:!0}),r.a.createElement("button",{type:"submit",className:"message-submit"},"Send")))},N=function(){var e=Object(n.useContext)(h),t=Object(n.useState)("hidden"),a=Object(c.a)(t,2),s=a[0],l={loaderStatus:s,updateLoaderStatus:a[1]},o={loader:{visibility:s,display:"flex",alignItems:"center",justifyContent:"center",zIndex:"999",position:"absolute",width:"100%",height:"94%",backgroundColor:"rgba(239,239,239, 0.6)",borderRadius:"20px"}};return r.a.createElement(E.Provider,{value:l},r.a.createElement("section",{className:"avenue-messenger"},r.a.createElement("div",{style:o.loader},r.a.createElement(d.a,{type:"bubbles",style:{width:"25%"}})),r.a.createElement("div",{className:"agent-face"},r.a.createElement("div",{className:"half"},r.a.createElement("a",{href:"/"},r.a.createElement("img",{className:"agent circle",src:"https://image.flaticon.com/icons/png/512/2115/2115916.png",alt:"grandpybot"})))),r.a.createElement("div",{className:"chat"},r.a.createElement("div",{className:"chat-title"},r.a.createElement("h1",null,"GrandPy"),r.a.createElement("h2",null,"Bot")),r.a.createElement("div",{className:"messages"},e.conversation.map((function(e){return r.a.createElement(f,{key:e.id,message:e})}))),r.a.createElement(y,null))))},x=(a(70),function(){var e=Object(n.useState)([{id:1,user:"GrandPY",text:"Bonjour ! Bienvenue sur GrandPY Bot, pose une question relative \xe0 un lieu.",hour:"Now"}]),t=Object(c.a)(e,2),a=t[0],s=t[1],l={conversation:a,updateConversation:function(e){var t=a;i.a.locale("fr");var n=i()().format("LT");e.hour=n,e.id=Math.round(1e5*Math.random()),t.push(e),s(Object(o.a)(t))}};return Object(n.useEffect)((function(){document.querySelector(".message:nth-last-child(1)").scrollIntoView(!0)})),r.a.createElement(h.Provider,{value:l},r.a.createElement(N,null))});l.a.render(r.a.createElement(x,null),document.querySelector("#root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.02e6168e.chunk.js.map