!function(){class n{constructor(n){this._template=n}compile(n){let e=this._template;return Object.entries(n).forEach((([t,o])=>{const i=new RegExp(`{{\\s*${t}\\s*}}`,"g");if("function"==typeof o)window.handleClick=n[t],e=e.replace(i,`window.${t}()`);else if("object"==typeof o){const o=new RegExp(`{{\\s*${t}..*?}}`,"g");e.match(o).forEach((t=>{const o=t.slice(2,-2).trim(),i=function(n,e,t){return e.split(".").reduce(((n,e)=>{if(n)return n[e]}),n)||t}(n,o);e=e.replace(t,i)}))}else e=e.replace(i,o)})),e}}const e=new n("\n  <div>Login</div>\n  <p class='userName'>Name: {{ name }}</p>\n");var t=content=e.compile({name:"Ivan",isLogin:!0});const o=new n("\n  <div>Signup</div>\n  <p class='userName'>Enter your name: {{ name }}</p>\n");var i=content=o.compile({name:"John Doe"});const c=new n("\n  <h1>404 Нет такой страницы</h1>\n");var a=content=c.compile({name:"Ivan",isLogin:!0});const s=new n("\n  <div>Chat</div>\n");var r=content=s.compile({name:"Ivan",isLogin:!0});const l=new n("\n  <div>User Profile</div>\n");const m={"/":t,"/login":t,"/signup":i,"/chat":r,"/user":content=l.compile({name:"Ivan",isLogin:!0})}[window.location.pathname]??a;document.querySelector(".root").innerHTML=m}();
//# sourceMappingURL=index.66e3a09a.js.map
