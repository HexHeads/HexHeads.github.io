"use strict";(self["webpackChunkouter_circle"]=self["webpackChunkouter_circle"]||[]).push([[573,284],{573:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var l=n(3396),s=n(7139),i=n(4870),o=n(1169),c=n(9057),r=n(2284),a=n(1585);const u=["innerHTML"],d=["innerHTML"];var f=(0,l.aZ)({__name:"AlertLayer",props:{id:null,title:null,text:null,cancelButtonText:{default:"Cancel"},closeOnClickOutside:{type:Boolean,default:!0},buttonText:null,status:null,callback:null},setup(e){const t=e,{close:n}=(0,o.ZP)(),f=(0,a.Z)((()=>({root:()=>["p-8 sm:p-6"],rootContainer:"p-[54px] w-[534px] flex flex-col base-animation-layer rounded-[4px] text-center md:p-6",preloader:"-preloader",icon:"mb-11 flex justify-center",title:"title-h4 mb-3",text:()=>["text-400 mb-11"],buttons:"flex justify-center space-x-4"}))),p=(0,l.Fl)((()=>f({}))),k=((0,l.Fl)((()=>{switch(t.status){case"success":return"alert-success";case"error":return"alert-error";case"unknown":return"alert-unknown"}return""})),(0,i.iH)(!1));async function x(){if(t.callback){k.value=!0;try{await t.callback()}catch(e){console.log(e)}k.value=!1}n(t.id,!0)}return(o,a)=>((0,l.wg)(),(0,l.j4)(r["default"],{class:(0,s.C_)((0,i.SU)(p).root),id:e.id,"close-on-click-outside":e.closeOnClickOutside,"theme-settings":{container:(0,i.SU)(p).rootContainer}},{default:(0,l.w5)((()=>[k.value?((0,l.wg)(),(0,l.iD)("div",{key:0,class:(0,s.C_)((0,i.SU)(p).preloader)},null,2)):(0,l.kq)("",!0),(0,l._)("p",{class:(0,s.C_)((0,i.SU)(p).title),innerHTML:e.title},null,10,u),(0,l._)("p",{class:(0,s.C_)((0,i.SU)(p).text),innerHTML:e.text},null,10,d),(0,l._)("div",{class:(0,s.C_)((0,i.SU)(p).buttons)},[e.cancelButtonText?((0,l.wg)(),(0,l.j4)(c.Z,{key:0,theme:"surface",onClick:a[0]||(a[0]=e=>{(0,i.SU)(n)(t.id,!1)})},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.cancelButtonText),1)])),_:1})):(0,l.kq)("",!0),(0,l.Wm)(c.Z,{"theme-settings":{size:"px-3 pt-1 pb-2"},onClick:x},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.buttonText),1)])),_:1})],2)])),_:1},8,["class","id","close-on-click-outside","theme-settings"]))}});const p=f;var k=p},2284:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var l=n(3396),s=n(7139),i=n(4870),o=n(9242),c=n(1169),r=n(1585);const a=["onClick"];var u={__name:"BaseLayer",props:{id:{type:Number},containerStyles:{type:String},position:{type:String,default:"center"},closeOnClickOutside:{type:Boolean,default:!0},themeSettings:{type:Object}},setup(e){const t=e,{close:n}=(0,c.ZP)(),u=(0,r.Z)((()=>({root:()=>["fixed inset-0 min-h-screen z-[9998] overflow-x-hidden overflow-y-auto"],wrapper:({position:e})=>["min-h-screen",{"flex items-center justify-center":"center"===e,"flex justify-end":"right"===e,"flex justify-start":"left"===e}],container:({themeSettings:e})=>[[e?.container,"bg-white relative"]]}))),d=(0,l.Fl)((()=>u({position:t.position,themeSettings:t.themeSettings}))),f=(0,i.iH)(!1);function p(){t.closeOnClickOutside&&f.value&&n(t.id)}return(t,n)=>((0,l.wg)(),(0,l.iD)("div",{class:(0,s.C_)((0,i.SU)(d).root)},[(0,l._)("div",{class:(0,s.C_)((0,i.SU)(d).wrapper),onClick:(0,o.iM)(p,["self"]),onMousedown:n[1]||(n[1]=(0,o.iM)((e=>f.value=!0),["self"]))},[(0,l._)("div",{class:(0,s.C_)([e.containerStyles,(0,i.SU)(d).container]),onClick:n[0]||(n[0]=e=>f.value=!1)},[(0,l.WI)(t.$slots,"default")],2)],42,a)],2))}};const d=u;var f=d}}]);
//# sourceMappingURL=573.01bf8655.js.map