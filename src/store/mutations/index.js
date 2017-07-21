/**
 * Created by 86wh2 on 2017/7/8.
 */
 const  mutations ={
       //控制sidebar开启和关闭
        toggleSidebar:(state)=>{
            state.sidebar.opened=!state.sidebar.opened;
        },
        //控制用户修改密码的安全等级
        safelyLevel:(state,level)=>{
            state.level =level;
        },
        //获取所有用户的信息列表
        user:(state,data)=>{
            state.userList=data.user;
        },
        //获取用户的登录信息
        userLoginMsg:(state,data)=>{
            state.user_msg=data;
        },
        //用户修改登录信息
        editUserINfo:(state,userinfo)=>{
            state.loginMsg=Object.assign({},userinfo)
        },
        //包管理列表
        handlePackList:(state,pack)=>{
           pack.map((item,key)=>{
               if(key===0) item.cho=true;
               else item.cho=false;
               if(item.groBusPackagesList)
               item.groBusPackagesList.map((item1,key1)=>{
                   item1.edit=false;
               })
           })
           state.packList=pack;
        },
        //商品管理列表
        handleGoodsList:(state,goods)=>{
            let temp_arr=[];
            goods.map((item,key)=>{
                if(item.parentId==1){
                    temp_arr.push(item)
                }
            });
            function translate(old_arr,temp_i){
                temp_i.child=[];
                old_arr.map((item,key)=>{
                    if(item.parentId== temp_i.id){
                        temp_i.child.push(item)
                    }
                })
                if(!temp_i.child.length){return true}
                else{
                    temp_i.child.map((item_arr)=>{
                        translate(old_arr,item_arr)
                    })
                }
            }
            temp_arr.map((item)=>{
                translate(goods,item)
            })
            console.log(temp_arr);
           state.goodsList=temp_arr
        }
}
export  default mutations;