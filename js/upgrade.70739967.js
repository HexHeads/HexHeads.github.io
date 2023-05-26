"use strict";(self["webpackChunkouter_circle"]=self["webpackChunkouter_circle"]||[]).push([[808],{2989:function(e,t,r){r.d(t,{Z:function(){return n}});var a=r(8579);class n{static async mint(e){return a.Z.send({contractName:"operator",methodName:"mint",needWait:!0,needReceipt:!0,params:[e]})}static async upgrade(e,t){return a.Z.send({contractName:"operator",methodName:"upgrade",needWait:!0,needReceipt:!0,params:[e,t]})}}},2832:function(e,t,r){r.d(t,{Z:function(){return E}});r(1703);var a=r(6482),n=r(8737),s=r(675),i=r(2043);const l=new n.Yd(s.i),o={},u=i.O$.from(0),m=i.O$.from(-1);function d(e,t,r,a){const s={fault:t,operation:r};return void 0!==a&&(s.value=a),l.throwError(e,n.Yd.errors.NUMERIC_FAULT,s)}let c="0";while(c.length<256)c+=c;function f(e){if("number"!==typeof e)try{e=i.O$.from(e).toNumber()}catch(t){}return"number"===typeof e&&e>=0&&e<=256&&!(e%1)?"1"+c.substring(0,e):l.throwArgumentError("invalid decimal size","decimals",e)}function h(e,t){null==t&&(t=0);const r=f(t);e=i.O$.from(e);const a=e.lt(u);a&&(e=e.mul(m));let n=e.mod(r).toString();while(n.length<r.length-1)n="0"+n;n=n.match(/^([0-9]*[1-9]|0)(0*)/)[1];const s=e.div(r).toString();return e=1===r.length?s:s+"."+n,a&&(e="-"+e),e}function v(e,t){null==t&&(t=0);const r=f(t);"string"===typeof e&&e.match(/^-?[0-9.]+$/)||l.throwArgumentError("invalid decimal value","value",e);const a="-"===e.substring(0,1);a&&(e=e.substring(1)),"."===e&&l.throwArgumentError("missing value","value",e);const n=e.split(".");n.length>2&&l.throwArgumentError("too many decimal points","value",e);let s=n[0],o=n[1];s||(s="0"),o||(o="0");while("0"===o[o.length-1])o=o.substring(0,o.length-1);o.length>r.length-1&&d("fractional component exceeds decimals","underflow","parseFixed"),""===o&&(o="0");while(o.length<r.length-1)o+="0";const u=i.O$.from(s),c=i.O$.from(o);let h=u.mul(r).add(c);return a&&(h=h.mul(m)),h}class g{constructor(e,t,r,a){e!==o&&l.throwError("cannot use FixedFormat constructor; use FixedFormat.from",n.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"}),this.signed=t,this.width=r,this.decimals=a,this.name=(t?"":"u")+"fixed"+String(r)+"x"+String(a),this._multiplier=f(a),Object.freeze(this)}static from(e){if(e instanceof g)return e;"number"===typeof e&&(e=`fixed128x${e}`);let t=!0,r=128,a=18;if("string"===typeof e)if("fixed"===e);else if("ufixed"===e)t=!1;else{const n=e.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);n||l.throwArgumentError("invalid fixed format","format",e),t="u"!==n[1],r=parseInt(n[2]),a=parseInt(n[3])}else if(e){const n=(t,r,a)=>null==e[t]?a:(typeof e[t]!==r&&l.throwArgumentError("invalid fixed format ("+t+" not "+r+")","format."+t,e[t]),e[t]);t=n("signed","boolean",t),r=n("width","number",r),a=n("decimals","number",a)}return r%8&&l.throwArgumentError("invalid fixed format width (not byte aligned)","format.width",r),a>80&&l.throwArgumentError("invalid fixed format (decimals too large)","format.decimals",a),new g(o,t,r,a)}}class p{constructor(e,t,r,a){e!==o&&l.throwError("cannot use FixedNumber constructor; use FixedNumber.from",n.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"}),this.format=a,this._hex=t,this._value=r,this._isFixedNumber=!0,Object.freeze(this)}_checkFormat(e){this.format.name!==e.format.name&&l.throwArgumentError("incompatible format; use fixedNumber.toFormat","other",e)}addUnsafe(e){this._checkFormat(e);const t=v(this._value,this.format.decimals),r=v(e._value,e.format.decimals);return p.fromValue(t.add(r),this.format.decimals,this.format)}subUnsafe(e){this._checkFormat(e);const t=v(this._value,this.format.decimals),r=v(e._value,e.format.decimals);return p.fromValue(t.sub(r),this.format.decimals,this.format)}mulUnsafe(e){this._checkFormat(e);const t=v(this._value,this.format.decimals),r=v(e._value,e.format.decimals);return p.fromValue(t.mul(r).div(this.format._multiplier),this.format.decimals,this.format)}divUnsafe(e){this._checkFormat(e);const t=v(this._value,this.format.decimals),r=v(e._value,e.format.decimals);return p.fromValue(t.mul(this.format._multiplier).div(r),this.format.decimals,this.format)}floor(){const e=this.toString().split(".");1===e.length&&e.push("0");let t=p.from(e[0],this.format);const r=!e[1].match(/^(0*)$/);return this.isNegative()&&r&&(t=t.subUnsafe(w.toFormat(t.format))),t}ceiling(){const e=this.toString().split(".");1===e.length&&e.push("0");let t=p.from(e[0],this.format);const r=!e[1].match(/^(0*)$/);return!this.isNegative()&&r&&(t=t.addUnsafe(w.toFormat(t.format))),t}round(e){null==e&&(e=0);const t=this.toString().split(".");if(1===t.length&&t.push("0"),(e<0||e>80||e%1)&&l.throwArgumentError("invalid decimal count","decimals",e),t[1].length<=e)return this;const r=p.from("1"+c.substring(0,e),this.format),a=_.toFormat(this.format);return this.mulUnsafe(r).addUnsafe(a).floor().divUnsafe(r)}isZero(){return"0.0"===this._value||"0"===this._value}isNegative(){return"-"===this._value[0]}toString(){return this._value}toHexString(e){if(null==e)return this._hex;e%8&&l.throwArgumentError("invalid byte width","width",e);const t=i.O$.from(this._hex).fromTwos(this.format.width).toTwos(e).toHexString();return(0,a.$m)(t,e/8)}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(e){return p.fromString(this._value,e)}static fromValue(e,t,r){return null!=r||null==t||(0,i.Zm)(t)||(r=t,t=null),null==t&&(t=0),null==r&&(r="fixed"),p.fromString(h(e,t),g.from(r))}static fromString(e,t){null==t&&(t="fixed");const r=g.from(t),n=v(e,r.decimals);!r.signed&&n.lt(u)&&d("unsigned value cannot be negative","overflow","value",e);let s=null;r.signed?s=n.toTwos(r.width).toHexString():(s=n.toHexString(),s=(0,a.$m)(s,r.width/8));const i=h(n,r.decimals);return new p(o,s,i,r)}static fromBytes(e,t){null==t&&(t="fixed");const r=g.from(t);if((0,a.lE)(e).length>r.width/8)throw new Error("overflow");let n=i.O$.from(e);r.signed&&(n=n.fromTwos(r.width));const s=n.toTwos((r.signed?0:1)+r.width).toHexString(),l=h(n,r.decimals);return new p(o,s,l,r)}static from(e,t){if("string"===typeof e)return p.fromString(e,t);if((0,a._t)(e))return p.fromBytes(e,t);try{return p.fromValue(e,0,t)}catch(r){if(r.code!==n.Yd.errors.INVALID_ARGUMENT)throw r}return l.throwArgumentError("invalid FixedNumber value","value",e)}static isFixedNumber(e){return!(!e||!e._isFixedNumber)}}const w=p.from(1),_=p.from("0.5"),x="units/5.7.0",b=new n.Yd(x),U=["wei","kwei","mwei","gwei","szabo","finney","ether"];function y(e,t){if("string"===typeof t){const e=U.indexOf(t);-1!==e&&(t=3*e)}return h(e,null!=t?t:18)}function S(e,t){if("string"!==typeof e&&b.throwArgumentError("value must be a string","value",e),"string"===typeof t){const e=U.indexOf(t);-1!==e&&(t=3*e)}return v(e,null!=t?t:18)}function k(e){return y(e,18)}function F(e){return S(e,18)}var N=r(8579);class E{static async getPrice(){let[e,t]=await N.Z.getVar({contractName:"upgrade",varName:"price"});return[e&&k(e),t]}static async getPriceStep(){let[e,t]=await N.Z.getVar({contractName:"upgrade",varName:"priceStep"});return[e&&k(e),t]}static async mint(e,t,r){let[a,n]=await N.Z.send({contractName:"upgrade",methodName:"mint",needWait:!0,params:[e,t,{value:F(r.toFixed(6))}]});return[a,n]}static async getUserUpgrades(e){let[t,r]=await N.Z.getVar({contractName:"upgrade",varName:"balanceOf",params:[e,1]});return[t,r]}}},8671:function(e,t,r){r.r(t),r.d(t,{default:function(){return q}});var a=r(3396),n=r(4870),s=r(7139),i=r(2483),l=r(5655),o=(r(2073),r(6517)),u=r(9057),m=r(28),d=r(3407),c=(r(2989),r(2832)),f=r(3536),h=r(9518);const v={class:"flex -mt-12 -mx-12 mb-[71px]"},g={class:"px-12 mt-12"},p={class:"drop-shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]"},w={class:"flex flex-col px-12 mt-12"},_={class:"mb-3 flex items-center justify-between"},x=(0,a._)("div",{class:"text-xl"}," Buy upgrades ",-1),b={class:"text-md my-auto"},U=(0,a.Uk)(" Choose Prime Level of your HexHead and a name. "),y=(0,a._)("br",null,null,-1),S={class:"flex justify-between items-end"},k={class:"flex-grow mr-4"},F=(0,a._)("div",{class:"text-xxl mb-8"}," HexHeads are faces of Ethereum community! ",-1),N={class:"text-md"},E=(0,a.Uk)(" HexHeads are supported by several Web3 projects to render users' avatars in their apps, but there's more... "),H=(0,a._)("br",null,null,-1),O=(0,a._)("br",null,null,-1),Z=(0,a.Uk)(" Since these NFTs are owned by everyone, HexHeads is "),A=(0,a._)("span",{class:"text-primary-500"},"the largest Web3 community",-1),P=(0,a.Uk)(" and a DAO. "),T=(0,a._)("br",null,null,-1),V=(0,a.Uk)(" There are two roles: Observer and Prime. "),W=(0,a._)("br",null,null,-1),$=(0,a._)("br",null,null,-1),j=(0,a.Uk)(" Fell free to claim your NFT for free, join our "),z=(0,a.Uk)("Discord"),D=(0,a.Uk)(" and become an Observer. "),C=(0,a._)("br",null,null,-1),I=(0,a.Uk)(" If you wish to access our private server, take a part in DAO voting and get all benefits, chase for the Prime role. ");var R={__name:"buy",setup(e){const{query:t}=(0,i.yj)(),[r,R,Y]=(0,f.Z)({amount:{value:"",required:"Empty field"}}),q=(0,a.Fl)((()=>h.h.state.wallet.address)),L=(0,n.iH)(!0),M=(0,n.iH)(null),B=(0,n.iH)(null),G=(0,a.Fl)((()=>r.value.amount*B.value));(0,a.wF)((async()=>{const[e]=await c.Z.getPriceStep(),[t]=await c.Z.getPrice();M.value=e,B.value=t,L.value=!1}));const Q=(0,n.iH)(!1);async function J(){const[e,a]=await c.Z.mint(t.address,r.value.amount,G.value);Q.value=!1}return(e,t)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",v,[(0,a._)("div",g,[(0,a._)("div",p,[(0,a.Wm)((0,n.SU)(o.Z),{address:(0,n.SU)(q),size:"xl"},null,8,["address"])])]),(0,a._)("div",w,[(0,a._)("div",_,[x,(0,a.Wm)((0,n.SU)(l.Z),null,{default:(0,a.w5)((()=>[(0,a.Uk)((0,s.zw)(M.value),1)])),_:1})]),(0,a._)("div",b,[U,y,(0,a.Uk)(" Current price per level is "+(0,s.zw)(M.value)+" Eth. ",1)]),(0,a._)("div",S,[(0,a._)("div",k,[(0,a.Wm)((0,n.SU)(d.Z),{modelValue:(0,n.SU)(r).amount,"onUpdate:modelValue":t[0]||(t[0]=e=>(0,n.SU)(r).amount=e),title:"Amount",view:"default",mask:"N",placeholder:"1",error:(0,n.SU)(R).amount},null,8,["modelValue","error"])]),(0,a._)("div",null,[(0,a.Wm)((0,n.SU)(u.Z),{class:"w-full",size:"xl",loading:Q.value,onClick:J},{default:(0,a.w5)((()=>[(0,a.Uk)(" Upgrade for "+(0,s.zw)((0,n.SU)(G))+" Eth ",1)])),_:1},8,["loading"])])])])]),(0,a._)("div",null,[F,(0,a._)("div",N,[E,H,O,Z,A,P,T,V,W,$,j,(0,a.Wm)((0,n.SU)(m.Z),{theme:"secondary",href:"https://discord.gg/xMRhYCMbQ7",target:"_blank"},{default:(0,a.w5)((()=>[z])),_:1}),D,C,I])])]))}};const Y=R;var q=Y},5144:function(e,t,r){r.r(t),r.d(t,{default:function(){return M}});var a=r(3396),n=r(4870),s=r(5655),i=(r(2073),r(6517)),l=r(9057),o=r(28),u=r(3407),m=r(2989),d=r(2832),c=r(8579);class f{static async getPrimes(e){let[t,r]=await c.Z.getVar({contractName:"prime",varName:"balanceOf",params:[e]});return[t,r]}}var h=r(3536),v=r(9518),g=r(2483);const p={class:"flex -mt-12 -mx-12 mb-[71px]"},w={class:"px-12 mt-12"},_={class:"drop-shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]"},x={class:"flex flex-col px-12 mt-12"},b={class:"mb-3 flex items-center justify-between"},U=(0,a._)("div",{class:"text-xl"}," Upgrade your HexHead! ",-1),y=(0,a.Uk)(" Free "),S=(0,a._)("div",{class:"text-md my-auto"},[(0,a.Uk)(" Choose Prime Level of your HexHead and a name. "),(0,a._)("br"),(0,a.Uk)(" Current price per level is 0.1 Eth. ")],-1),k={class:"flex justify-between items-end"},F={class:"flex-grow mr-4"},N=(0,a.Uk)(" Upgrade "),E=(0,a._)("div",{class:"text-xxl mb-8"}," HexHeads are faces of Ethereum community! ",-1),H={class:"text-md"},O=(0,a.Uk)(" HexHeads are supported by several Web3 projects to render users' avatars in their apps, but there's more... "),Z=(0,a._)("br",null,null,-1),A=(0,a._)("br",null,null,-1),P=(0,a.Uk)(" Since these NFTs are owned by everyone, HexHeads is "),T=(0,a._)("span",{class:"text-primary-500"},"the largest Web3 community",-1),V=(0,a.Uk)(" and a DAO. "),W=(0,a._)("br",null,null,-1),$=(0,a.Uk)(" There are two roles: Observer and Prime. "),j=(0,a._)("br",null,null,-1),z=(0,a._)("br",null,null,-1),D=(0,a.Uk)(" Fell free to claim your NFT for free, join our "),C=(0,a.Uk)("Discord"),I=(0,a.Uk)(" and become an Observer. "),R=(0,a._)("br",null,null,-1),Y=(0,a.Uk)(" If you wish to access our private server, take a part in DAO voting and get all benefits, chase for the Prime role. ");var q={__name:"index",setup(e){const{query:t}=(0,g.yj)(),[r,c,q]=(0,h.Z)({amount:{value:"",required:"Empty field"}}),L=(0,n.iH)(!1);async function M(){const[e,a]=await m.Z.upgrade(t.address,r.value.amount);L.value=!1}const B=(0,a.Fl)((()=>v.h.state.wallet.address)),G=(0,n.iH)(0);return(0,a.wF)((async()=>{const[e]=await d.Z.getUserUpgrades(t.address),[r]=await f.getPrimes(t.address);G.value=+e})),(e,t)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",p,[(0,a._)("div",w,[(0,a._)("div",_,[(0,a.Wm)((0,n.SU)(i.Z),{address:(0,n.SU)(B),size:"xl"},null,8,["address"])])]),(0,a._)("div",x,[(0,a._)("div",b,[U,(0,a.Wm)((0,n.SU)(s.Z),null,{default:(0,a.w5)((()=>[y])),_:1})]),S,(0,a._)("div",k,[(0,a._)("div",F,[(0,a.Wm)((0,n.SU)(u.Z),{modelValue:(0,n.SU)(r).amount,"onUpdate:modelValue":t[0]||(t[0]=e=>(0,n.SU)(r).amount=e),title:"Amount",view:"default",mask:"N",placeholder:"1",max:G.value,error:(0,n.SU)(c).amount},null,8,["modelValue","max","error"])]),(0,a._)("div",null,[(0,a.Wm)((0,n.SU)(l.Z),{class:"w-full",size:"xl",loading:L.value,onClick:M},{default:(0,a.w5)((()=>[N])),_:1},8,["loading"])])])])]),(0,a._)("div",null,[E,(0,a._)("div",H,[O,Z,A,P,T,V,W,$,j,z,D,(0,a.Wm)((0,n.SU)(o.Z),{theme:"secondary"},{default:(0,a.w5)((()=>[C])),_:1}),I,R,Y])])]))}};const L=q;var M=L}}]);
//# sourceMappingURL=upgrade.70739967.js.map