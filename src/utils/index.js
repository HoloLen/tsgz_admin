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