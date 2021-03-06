/**
 * Created by Administrator on 2017/7/19 0019.
 */
//改变主题的方法
 export function changeTheme(element,themeClass){
    if (!element || !themeClass) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(themeClass);
    if (nameIndex === -1) {
        classString = themeClass;
    } else {
        classString =null;
    }
    element.className = classString;
}
//获取用户的ip地址
export function IPAddress(){
   return returnCitySN
}

//将对象结构转换为树形结构

export function tranlateDataTree(old_arr){
    let temp_arr=[];
    old_arr.map((item,key)=>{
        if(item.parentId==1){
            item.rank=1;
            temp_arr.push(item);
        }
    });
    temp_arr.map((item)=>{
        translate(old_arr,item)
    })
    function translate(old_arr,temp_i){
        temp_i.children=[];
        let temp_rank=temp_i.rank;
        old_arr.map((item,key)=>{
            if(item.parentId== temp_i.id){
                item.rank=temp_rank+1;
                temp_i.children.push(item)
            }
        })
        if(!temp_i.children.length){return true}
        else{
            temp_i.children.map((item_arr)=>{
                translate(old_arr,item_arr)
            })
        }
    }
    return temp_arr;
}
export function tranlateDataTreeTable(old_arr){
  let temp_arr=[];
  old_arr.map((item,key)=>{
    if(item.type==1){
      item.rank=1;
      temp_arr.push(item);
    }
  });
  temp_arr.map((item)=>{
    translate(old_arr,item)
  })
  function translate(old_arr,temp_i){
    temp_i.children=[];
    let temp_rank=temp_i.rank;
    old_arr.map((item,key)=>{
      if(item.parentId== temp_i.id){
        item.rank=temp_rank+1;
        temp_i.children.push(item)
      }
    })
    if(!temp_i.children.length){return true}
    else{
      temp_i.children.map((item_arr)=>{
        translate(old_arr,item_arr)
      })
    }
  }
  return temp_arr;
}
//将对象结构转换为树形结构
export function tranlateDataTreeManagement(old_arr,mark){
    let temp_arr=[];
    let pId=0;
    if(mark) pId=mark;
    old_arr.map((item,key)=>{
        if(item.pId==pId){
            item.rank=1;
            temp_arr.push(item);
        }
    });
    temp_arr.map((item)=>{
        translate(old_arr,item)
    })
    function translate(old_arr,temp_i){
        temp_i.children=[];
        let temp_rank=temp_i.rank;
        old_arr.map((item,key)=>{
            if(item.pId== temp_i.id){
                item.rank=temp_rank+1;
                temp_i.children.push(item)
            }
        })
        if(!temp_i.children.length){return true}
        else{
            temp_i.children.map((item_arr)=>{
                translate(old_arr,item_arr)
            })
        }
    }
    return temp_arr;



}

//判断是否有重复
export function isRepeat(arr){

    var hash = {};

    for(var i in arr) {
        if(arr[i]==='') return 2;
        if(hash[arr[i]]) return 1;
        hash[arr[i]] = true;
    }
    return 0;
}
