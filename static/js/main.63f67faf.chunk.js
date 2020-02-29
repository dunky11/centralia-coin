(this["webpackJsonpcentralia-coin"]=this["webpackJsonpcentralia-coin"]||[]).push([[0],{161:function(e,t,a){e.exports=a(273)},191:function(e,t){},192:function(e,t){},214:function(e,t){},216:function(e,t){},273:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(14),s=a.n(r),c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function o(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var l=a(304),u=a(306),h=a(94),m=a.n(h)()({palette:{primary:{main:"#b3294e"},secondary:{main:"#4829B2"},contrastThreshold:3,tonalOffset:.2},typography:{useNextVariants:!0}}),d=a(49),p=a.n(d),f=a(67),g=a(11),v=a(12),b=a(9),k=a(18),y=a(19),w=a(20),E=a(305),O=a(274),T=a(5),C=a(298),j=a(300),x=a(301),S=a(302);var W=Object(T.a)((function(e){return{grow:{flexGrow:1},marginRight:{marginRight:e.spacing(1)},menuLink:{textDecoration:"none",color:e.palette.common.white}}}),{withTheme:!0})((function(e){var t=e.classes,a=e.switchTab;return i.a.createElement(C.a,{position:"static"},i.a.createElement(j.a,null,i.a.createElement(x.a,{variant:"h6",color:"inherit",className:t.grow},"Centralia Coin"),i.a.createElement(S.a,{color:"inherit",size:"large",className:t.marginRight,onClick:function(){a("Wallet")}},"Wallet"),i.a.createElement(S.a,{color:"inherit",size:"large",onClick:function(){a("Mine")}},"Mine")))})),B=a(307),P=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(i)))).state={coins:"",pk:""},a.checkBalance=function(){var e=a.props.blockchain,t=a.state.pk;a.setState({coins:e.getBalanceOfAddress(t)})},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state,r=a.pk,s=a.coins;return i.a.createElement(n.Fragment,null,i.a.createElement(x.a,{paragraph:!0,variant:"h6"},"Enter the public key of a wallet to find out it's balance"),i.a.createElement(B.a,{value:r,fullWidth:!0,variant:"outlined",margin:"normal",onChange:function(t){e.setState({pk:t.target.value})},multiline:!0,label:"Public Key"}),i.a.createElement(B.a,{value:s,fullWidth:!0,variant:"outlined",margin:"normal",InputProps:{readOnly:!0},multiline:!0,label:"Coins"}),i.a.createElement(S.a,{fullWidth:!0,onClick:this.checkBalance,color:"primary",variant:"contained",className:t.button,disabled:!r},"Check Balance"))}}]),t}(n.PureComponent),N=Object(T.a)((function(e){return{button:{marginTop:e.spacing(4)}}}),{withTheme:!0})(P),A=a(51).ec;var M=function(){var e=new A("secp256k1").genKeyPair();return{pk:e.getPublic("hex"),sk:e.getPrivate("hex")}},H=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(i)))).state={pk:"",sk:""},a.createWallet=function(){var e=M();a.setState({pk:e.pk,sk:e.sk})},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.pk,r=t.sk;return i.a.createElement(n.Fragment,null,i.a.createElement(x.a,{paragraph:!0,variant:"h6"},"Generate a keypair"),i.a.createElement(B.a,{value:a,fullWidth:!0,variant:"outlined",margin:"normal",InputProps:{readOnly:!0},multiline:!0,label:"Public Key"}),i.a.createElement(B.a,{value:r,fullWidth:!0,variant:"outlined",margin:"normal",InputProps:{readOnly:!0},multiline:!0,label:"Private Key"}),i.a.createElement(S.a,{fullWidth:!0,onClick:this.createWallet,color:"primary",variant:"contained",className:e.button},"Generate Wallet"))}}]),t}(n.PureComponent),L=Object(T.a)((function(e){return{button:{marginTop:e.spacing(4)}}}),{withTheme:!0})(H),R=a(72),F=a.n(R),I=new(0,a(51).ec)("secp256k1"),V=function(){function e(t,a,n){Object(v.a)(this,e),this.fromAddress=t,this.toAddress=a,this.amount=n,this.timestamp=Date.now()}return Object(b.a)(e,[{key:"calculateHash",value:function(){return F()(this.fromAddress+this.toAddress+this.amount+this.timestamp).toString()}},{key:"signTransaction",value:function(e,t){var a=I.keyFromPrivate(t);if(e!==this.fromAddress)throw new Error("You cannot sign transactions for other wallets!");var n=this.calculateHash(),i=a.sign(n,"base64");this.signature=i.toDER("hex")}},{key:"isValid",value:function(){if(null===this.fromAddress)return!0;if(!this.signature||0===this.signature.length)throw new Error("No signature in this transaction");return I.keyFromPublic(this.fromAddress,"hex").verify(this.calculateHash(),this.signature)}}]),e}(),D=a(73),z=a.n(D),G=a(147),J=a.n(G);var K=z()((function(e){return{main:{backgroundColor:"rgba(253, 200, 69, .2)",border:"2px solid rgba(253, 200, 69, .4)",padding:e.spacing(2),borderRadius:e.shape.borderRadius}}}),{withTheme:!0})((function(e){var t=e.className,a=e.children,n=e.classes;return i.a.createElement("div",{className:J()(n.main,t||null)},i.a.createElement(x.a,null,a))})),Y=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(i)))).state={pk:"",sk:"",coins:"",recPk:"",status:null},a.makeTransaction=function(){a.setState({status:null});var e=a.props.blockchain,t=a.state,n=t.pk,i=t.recPk,r=t.sk,s=t.coins,c=new V(n,i,parseInt(s));try{c.signTransaction(n,r),e.addTransaction(c),a.setState({status:"Transaction will be in the next block if it's valid"})}catch(o){if(console.log(o),"Cannot add invalid transaction to chain"!==o.message&&"You cannot sign transactions for other wallets!"!==o.message)throw o;a.setState({status:o.message})}},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state,r=a.pk,s=a.sk,c=a.coins,o=a.recPk,l=a.status;return i.a.createElement(n.Fragment,null,i.a.createElement(x.a,{paragraph:!0,variant:"h6"},"Transfer coins from one wallet to another"),i.a.createElement(B.a,{value:r,fullWidth:!0,variant:"outlined",margin:"normal",onChange:function(t){e.setState({pk:t.target.value})},multiline:!0,label:"Your wallets public key"}),i.a.createElement(B.a,{value:s,fullWidth:!0,variant:"outlined",margin:"normal",onChange:function(t){e.setState({sk:t.target.value})},multiline:!0,label:"Your wallets private key"}),i.a.createElement(B.a,{value:o,fullWidth:!0,variant:"outlined",margin:"normal",onChange:function(t){e.setState({recPk:t.target.value})},multiline:!0,label:"The recipient's wallet public key"}),i.a.createElement(B.a,{value:c,fullWidth:!0,variant:"outlined",margin:"normal",onChange:function(t){var a=t.target.value;isNaN(a)||e.setState({coins:t.target.value})},multiline:!0,label:"Coins to send"}),l&&i.a.createElement(K,{className:t.highLightedInformation},l),i.a.createElement(S.a,{className:t.button,fullWidth:!0,variant:"contained",color:"primary",disabled:!r||!s||!o||!c,onClick:this.makeTransaction},"Create Transaction"))}}]),t}(n.PureComponent),U=Object(T.a)((function(e){return{button:{marginTop:e.spacing(4)},highLightedInformation:{marginTop:e.spacing(2)}}}),{withTheme:!0})(Y),X=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).state={activeMenu:"Create Wallet"},a.printContent=function(){var e=a.props.blockchain;switch(a.state.activeMenu){case"Create Wallet":return i.a.createElement(L,null);case"Balance":return i.a.createElement(N,{blockchain:e});case"Make Transaction":return i.a.createElement(U,{blockchain:e});default:throw new Error("No branch selected in switcht statement.")}},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.activeMenu;return i.a.createElement(n.Fragment,null,i.a.createElement("div",{className:t.flexBox},i.a.createElement(S.a,{className:t.rightMargin,onClick:function(){e.setState({activeMenu:"Create Wallet"})},variant:"Create Wallet"===a?"outlined":"text",color:"primary"},"Create Wallet"),i.a.createElement(S.a,{className:t.rightMargin,onClick:function(){e.setState({activeMenu:"Balance"})},variant:"Balance"===a?"outlined":"text",color:"primary"},"Balance"),i.a.createElement(S.a,{variant:"Make Transaction"===a?"outlined":"text",onClick:function(){e.setState({activeMenu:"Make Transaction"})},color:"primary"},"Make Transaction")),i.a.createElement("div",{className:t.contentWrapper},this.printContent()))}}]),t}(n.PureComponent),q=Object(T.a)((function(e){return{flexBox:{display:"flex"},rightMargin:{marginRight:e.spacing(1)},contentWrapper:{marginTop:e.spacing(3)}}}),{withTheme:!0})(X),$=a(308),Q=a(148),Z=a.n(Q),_=a(309);var ee=z()((function(e){return{bordered:{border:"2px solid rgba(0, 0, 0, 0.13)",overflowX:"hidden",padding:e.spacing(1)}}}),{withTheme:!0})((function(e){var t=e.hash,a=e.prevHash,n=e.transactions,r=e.index,s=e.nonce,c=e.classes,o=e.timestamp,l=e.theme;return i.a.createElement("div",{className:c.bordered},i.a.createElement(x.a,{variant:"body1"},i.a.createElement("b",null,"Index:")," ",r),i.a.createElement(x.a,{variant:"body1"},i.a.createElement("b",null,"Previous hash:")," ",a),i.a.createElement(x.a,{variant:"body1"},i.a.createElement("b",null,"Hash:")," ",t),i.a.createElement(x.a,{variant:"body1"},i.a.createElement("b",null,"Nonce:")," ",s),i.a.createElement(x.a,{variant:"body1"},i.a.createElement("b",null,"Timestamp:")," ",o),i.a.createElement(x.a,{variant:"body1",style:{marginBottom:n.length>=1?l.spacing(1):0}},i.a.createElement("b",null,"Transactions:")),n.map((function(e,t){return i.a.createElement("div",{className:c.bordered,key:t},i.a.createElement(x.a,null,i.a.createElement("b",null,"From address:")," ",e.fromAddress?e.fromAddress:"Mining reward"),i.a.createElement(x.a,null,i.a.createElement("b",null,"To address:")," ",e.toAddress),i.a.createElement(x.a,null,i.a.createElement("b",null,"Signature:")," ",e.signature?e.signature:"Mining reward"),i.a.createElement(x.a,null,i.a.createElement("b",null,"Coins:")," ",e.amount),i.a.createElement(x.a,null,i.a.createElement("b",null,"Timestamp:")," ",e.timestamp))})))})),te=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(i)))).state={page:1},a.pageSize=10,a.onPaginationChange=function(e,t){a.setState({page:t})},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.chain,a=e.classes,n=this.state.page,r=Object(g.a)(t).reverse().slice((n-1)*this.pageSize,n*this.pageSize),s=Math.ceil(t.length/this.pageSize);return i.a.createElement(O.a,{className:a.paper},i.a.createElement(x.a,{paragraph:!0,variant:"h6"},"The blockchain"),r.map((function(e,t){return i.a.createElement($.a,{mb:t!==r.length-1?1:0,key:e.index},i.a.createElement(ee,{index:e.index,prevHash:e.previousHash,hash:e.hash,nonce:e.nonce,timestamp:e.timestamp,transactions:e.transactions}),t!==r.length-1&&i.a.createElement($.a,{mt:1,display:"flex",justifyContent:"center"},i.a.createElement(Z.a,null)))})),i.a.createElement($.a,{mt:2},i.a.createElement(_.a,{disabled:1===s,count:s,defaultPage:1,page:n,onChange:this.onPaginationChange})))}}]),t}(n.PureComponent),ae=Object(T.a)((function(e){return{paper:{padding:e.spacing(2),marginBottom:e.spacing(4)}}}))(te),ne=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(i)))).state={pk:"",hash:"",mining:!1,transactions:[]},a.startMining=Object(f.a)(p.a.mark((function e(){var t,n,i,r,s,c,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.props,n=t.blockchain,i=t.validateChain,r=a.state,s=r.pk,c=r.mining,!n.minePendingTransactions(s)){e.next=6;break}return e.next=6,i();case 6:o=n.curBlock,a.setState({index:o.index,prevHash:o.previousHash,hash:o.hash,nonce:o.nonce,timestamp:o.timestamp,transactions:o.transactions}),c&&window.setTimeout(a.startMining,10);case 9:case"end":return e.stop()}}),e)}))),a.initMiningLoop=function(){a.setState({mining:!0},a.startMining)},a.stopMiningLoop=function(){a.setState({mining:!1})},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,r=t.theme,s=this.state,c=s.pk,o=s.mining,l=s.index,u=s.prevHash,h=s.hash,m=s.nonce,d=s.timestamp,p=s.transactions;return i.a.createElement(n.Fragment,null,i.a.createElement(x.a,{paragraph:!0,variant:"h6"},"Mine blocks to get coins"),i.a.createElement(B.a,{value:c,onChange:function(t){e.setState({pk:t.target.value})},fullWidth:!0,variant:"outlined",margin:"normal",multiline:!0,label:"Public key of wallet to reward"}),o&&i.a.createElement(n.Fragment,null,i.a.createElement(x.a,{variant:"h6",style:{marginTop:r.spacing(1)},paragraph:!0},"Current block"),i.a.createElement("div",{className:a.curBlockPaper},i.a.createElement(ee,{index:l,hash:h,prevHash:u,nonce:m,timestamp:d,transactions:p}))),i.a.createElement(S.a,{fullWidth:!0,onClick:o?this.stopMiningLoop:this.initMiningLoop,color:"primary",variant:"contained",className:a.button,disabled:!c},o?"Stop Mining":"Start Mining"))}}]),t}(n.PureComponent),ie=Object(T.a)((function(e){return{button:{marginTop:e.spacing(4)},curBlockPaper:{marginTop:e.spacing(1)}}}),{withTheme:!0})(ne),re=function(){function e(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;Object(v.a)(this,e),this.previousHash=n,this.timestamp=t,this.transactions=a,this.nonce=0,this.index=i,this.hash=this.calculateHash()}return Object(b.a)(e,[{key:"calculateHash",value:function(){return F()(this.previousHash+this.timestamp+JSON.stringify(this.transactions)+this.nonce+this.index).toString()}},{key:"mineBlock",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=0;this.hash.substring(0,e)!==Array(e+1).join("0");){if(t&&a>t)return!1;this.nonce++,a++,this.hash=this.calculateHash()}return!0}},{key:"hasValidTransactions",value:function(){var e=!0,t=!1,a=void 0;try{for(var n,i=this.transactions[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){if(!n.value.isValid())return!1}}catch(r){t=!0,a=r}finally{try{e||null==i.return||i.return()}finally{if(t)throw a}}return!0}}]),e}(),se=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Object(v.a)(this,e),this.needsNewBlock=!0,this.updateChain=a,this.isServer=n;var i=this.createGenesisBlock();this.updateChain&&this.updateChain([i]),this.chain=[i],this.difficulty=t,this.pendingTransactions=[],this.miningReward=1e3}return Object(b.a)(e,[{key:"createGenesisBlock",value:function(){return new re(Date.now(),[],"",0)}},{key:"getLatestBlock",value:function(){return this.chain[this.chain.length-1]}},{key:"minePendingTransactions",value:function(e){var t=new V(null,e,this.miningReward);if(this.needsNewBlock||this.pendingTransactions.length>0){for(var a=[],n=0;n<this.pendingTransactions.length;n++){var i=this.pendingTransactions[n];i.isValid()&&this.hasEnoughCoins(i)&&a.push(i)}a.push(t),this.curBlock=new re(Date.now(),a,this.getLatestBlock().hash,this.getLatestBlock().index+1),this.pendingTransactions=[],this.needsNewBlock=!1}return!!this.curBlock.mineBlock(this.difficulty,150)&&(this.chain.push(this.curBlock),this.updateChain&&this.updateChain(this.chain),this.pendingTransactions=[],this.needsNewBlock=!0,!0)}},{key:"hasEnoughCoins",value:function(e){return!(e.amount>this.getBalanceOfAddress(e.fromAddress))}},{key:"addTransaction",value:function(e){if(!e.fromAddress||!e.toAddress)throw new Error("Transaction must include from and to address");if(!e.isValid())throw new Error("Cannot add invalid transaction to chain");if(e.amount<=0)throw new Error("Transaction amount should be higher than 0");this.pendingTransactions.push(e)}},{key:"getBalanceOfAddress",value:function(e){var t=0,a=!0,n=!1,i=void 0;try{for(var r,s=this.chain[Symbol.iterator]();!(a=(r=s.next()).done);a=!0){var c=r.value,o=!0,l=!1,u=void 0;try{for(var h,m=c.transactions[Symbol.iterator]();!(o=(h=m.next()).done);o=!0){var d=h.value;d.fromAddress===e&&(t-=d.amount),d.toAddress===e&&(t+=d.amount)}}catch(p){l=!0,u=p}finally{try{o||null==m.return||m.return()}finally{if(l)throw u}}}}catch(p){n=!0,i=p}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}return t}},{key:"getAllTransactionsForWallet",value:function(e){var t=[],a=!0,n=!1,i=void 0;try{for(var r,s=this.chain[Symbol.iterator]();!(a=(r=s.next()).done);a=!0){var c=r.value,o=!0,l=!1,u=void 0;try{for(var h,m=c.transactions[Symbol.iterator]();!(o=(h=m.next()).done);o=!0){var d=h.value;d.fromAddress!==e&&d.toAddress!==e||t.push(d)}}catch(p){l=!0,u=p}finally{try{o||null==m.return||m.return()}finally{if(l)throw u}}}}catch(p){n=!0,i=p}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}return t}},{key:"isChainValid",value:function(){if(JSON.stringify(this.createGenesisBlock())!==JSON.stringify(this.chain[0]))return!1;for(var e=1;e<this.chain.length;e++){var t=this.chain[e];if(!t.hasValidTransactions())return!1;if(t.hash!==t.calculateHash())return!1}return!0}}]),e}(),ce=function(e){function t(){var e,a;Object(v.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(k.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).state={blockchain:null,chain:[],selectedTab:"Wallet"},a.updateChain=function(e){var t=Object(g.a)(e);a.setState({chain:t})},a.validateChain=Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var n=a.state.chain,i=new XMLHttpRequest,r=new FormData;console.log(n),r.append("blockchain","Hallo Welt!"),i.open("POST","https://h2867975.stratoserver.net/centralia-coin/add-block"),i.onload=function(){console.log(i.responseText),e()},i.onerror=function(){t()},i.send(r)})));case 1:case"end":return e.stop()}}),e)}))),a.printContent=function(){var e=a.state,t=e.selectedTab,n=e.blockchain;switch(t){case"Wallet":return i.a.createElement(q,{blockchain:n});case"Mine":return i.a.createElement(ie,{blockchain:n,validateChain:a.validateChain});default:throw new Error("No branch selected in switch statement")}},a.switchTab=function(e){a.setState({selectedTab:e})},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.setState({blockchain:new se(4,this.updateChain)})}},{key:"render",value:function(){var e=this.props.classes,t=this.state.chain;return i.a.createElement(n.Fragment,null,i.a.createElement(W,{switchTab:this.switchTab}),i.a.createElement("div",{className:e.flexBox},i.a.createElement("div",{className:e.contentWrapper},i.a.createElement(E.a,{container:!0,justify:"space-between"},i.a.createElement(E.a,{item:!0,xs:12,md:7},i.a.createElement(O.a,{className:e.paperPaddingLeft},this.printContent())),i.a.createElement(E.a,{item:!0,xs:12,md:4},i.a.createElement(ae,{chain:t}))))))}}]),t}(n.PureComponent),oe=Object(T.a)((function(e){return{contentWrapper:{maxWidth:1400,width:"100%",marginLeft:e.spacing(1),marginRiht:e.spacing(1)},flexBox:{marginTop:e.spacing(8),display:"flex",justifyContent:"center"},fullWidth:{width:"100%"},paperPaddingLeft:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2),paddingLeft:e.spacing(3),paddingRight:e.spacing(3),width:"100%"}}}),{withTheme:!0})(ce);s.a.render(i.a.createElement(l.a,{theme:m},i.a.createElement(u.a,null),i.a.createElement(oe,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/centralia-coin",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/centralia-coin","/service-worker.js");c?(!function(e,t){fetch(e).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):o(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):o(t,e)}))}}()}},[[161,1,2]]]);
//# sourceMappingURL=main.63f67faf.chunk.js.map