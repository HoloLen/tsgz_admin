<template>
    <div class="page">
        <div class="header">
            <el-form ref="form" :model="form" label-width="80px" class="title">
                <el-form-item label="业务包名" style="display: inline-block">
                    <el-input v-model="form.name" size="small" style="width:200px"></el-input>
                </el-form-item>
                <el-select v-model="form.value" filterable placeholder="请选择"
                           @change="choseVal"
                           size="small" class="select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </el-form>
        </div>
        <div class="dabeList">
            <span v-for="item in list" :key="item.id" :title="item.tableNames" class="span" @click="handleTips(item)">
                <img src="./img/download.png" alt="" style="" />
                {{item.tableNames}}
            </span>
        </div>
        <el-dialog  :visible.sync="dialogTableVisible" size="middle" :show-close="false" class="mymodel">
            <div class="dialogHeader">
                <p class="title">表数据设置</p>
                <el-button type="primary" size="small" @click="preWatch">表预览</el-button>
            </div>
            <!--定位用-->
            <div class="pos">参与分析</div>
            <!--定位用,注意ref是全局的方法，一定不能重复-->
            <el-table :data="dabeList"  border :max-height="250"  row-key="id"
                      @select-all="selectedAll"  @select="select" ref="select_table"
            >
                <el-table-column label="原字段名" width="150" >
                    <template scope="scope">
                        <p @click="modalColumn(scope.row,scope.$index)">{{ scope.row.columnName }}</p>
                    </template>
                </el-table-column>
                <el-table-column property="columnType" label="类型" width="150"></el-table-column>
                <el-table-column label="转义名" width="100">
                    <template scope="scope">
                        <el-input v-model="scope.row.comments" size="small" class="noBorderInput"> </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="关联表" width="100">
                    <template scope="scope">
                        <span :title="scope.row.relationTables">{{scope.row.relationTables==='none'?'':scope.row.relationTables}}</span>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="150" header-align="left"  align="center"
                                 :reserve-selection="true"
                >
                </el-table-column>
            </el-table>
            <div class="dialogFooter">
                <el-button type="default" size="small" @click="dialogTableVisible=false">关闭</el-button>
                <el-button type="danger" size="small" @click="saveDate">保存</el-button>
                <el-button type="primary" size="small" @click="deletePack">移除业务包</el-button>
            </div>
        </el-dialog>
        <!--表预览弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible1" size="middle" title="表预览">
            <div style="overflow-x: auto; overflow-y: auto; max-height: 200px; width:600px;">
                <table  class="table table-bordered" style="table-layout:fixed;border-collapse:collapse;">
                    <thead>
                    <tr>
                        <th v-for="item in preTable.list" :title="item" style="width:150px;border-bottom-width: 1px;">
                            {{item.split("-")[0]}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in preTable.alllist">
                        <td v-for="item1 in item">{{item1}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </el-dialog>
        <!--ID关联信息弹窗-->
        <el-dialog  :visible.sync="dialogTableVisible2" size="middle" title="表预览">
            <div class="relate_con">
                <div class="box box1">
                    <div class="text" id="texttable">{{tabNames}}</div>
                    <div class="text" id="textid">{{columnName}}</div>
                </div>
                <div class="box2">
                    <div :class="activeTabs==='0'?'item active':'item'" @click="cho_item('0')" >1:1</div>
                    <div :class="activeTabs==='1'?'item active':'item'" @click="cho_item('1')" >1:N</div>
                    <div :class="activeTabs==='2'?'item active':'item'" @click="cho_item('2')" >N:1</div>
                </div>
                <div class="box box3">
                    <div class="text" id="oppositetable">{{realtables}}</div>
                    <div class="text" id="oppositeid">{{realcolumn}}</div>
                </div>
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="close" @click="removeDabe">&times;</div>
            </div>
            <div class="relateDabeButton">
                <el-button type="primary" @click="contactTable">+ 关联到其他表</el-button>
            </div>
            <div class="tablist" v-if="step===1">
                <span v-for="item,key in columnDataList" :key="key"  :class="color===key?'span active':'span'" @click="choItem(item,key)">
                <img src="./img/download.png" alt="" style="" />
                {{item.tabName}}
            </span>
            </div>
            <div class="tablist" v-if="step===2">
                <span v-for="item,key in columnDataList" :key="key"  :class="color2===key?'span active':'span'" @click="choItem2(item,key)">
                <img src="./img/download.png" alt="" style="" />
                {{item}}
            </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
               form:{
                   name:'',
                   value:''
               },
                list:[],//展示包里面的表
                dabeList:[],//弹窗，表里面的相关信息
                dialogTableVisible: false, //模态框初始关闭状态
                dialogTableVisible1:false,//表预览弹窗
                dialogTableVisible2:false,//Id关联信息
                options: [{
                    value: '1',
                    label: '添加表'
                }, {
                    value: '2',
                    label: '添加库/业务包'
                }, {
                    value: '3',
                    label: 'ETL'
                }, {
                    value: '4',
                    label: 'SQL'
                }, {
                    value: '5',
                    label: 'EXCELL'
                }],
                tabNames:'', //表名
                preTable:'', //表预览 表名
                activeTabs:'0',//初始关联表
                columnName:'',//字段名
                columnDataList:[],//关联其他的表
                columnIndex:0,//点击表字段索引
                color:'',
                color2:'',
                step:1,
                realcolumn:'',
                realtables:''
            }

        },
        computed:{


        },
        created(){
            let _this = this;
           this.form.name=this.$route.query.name;
            AJAX.get('website/pack/updatesource',{id:this.$route.query.id},function(res){
                _this.list = res.data.list;
            })
        },
        mounted(){

        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            handleFinish(){
                if(this.form.name===''){
                    return this.$message.error('你还没给包命名哦');
                }
                this.$router.push('/groupList')
            },
            handleIconClick(){
                alert("执行搜索")
            },
            handleTips(item){
                let _this = this;
                _this.dialogTableVisible=true;
                _this.tabNames=item.tableNames;
                AJAX.get("website/pack/getColumn",{
                    id:this.$route.query.id,
                    tablename:item.tableNames
                },function(res){
                    let cho=[];
                    res.data.list.map(function(item,index){
                        if(!item.relationTables) item.relationTables='none';
                    })
                    _this.dabeList=res.data.list;
                    //设置初始选中项
                    _this.dabeList.map(function(item,key){
                        if(item.isJoin==='1'){
                           return  _this.$refs.select_table.toggleRowSelection(item,true);
                        }
                    });
                    //设置初始选中项结束

                })
            },
            select(selection,row){
                if(row.isJoin==='1'){
                    row.isJoin='2'
                }else{
                    row.isJoin='1'
                }
            },
            selectedAll(option){
                option.map((row)=>{
                    if(row.isJoin==='1'){
                        row.isJoin='2'
                    }else{
                        row.isJoin='1'
                    }
                })
            },
            saveDate(){
                console.log(this.dabeList);
                let _this = this;
                AJAX.post("website/pack/updateDataById",{
                    dabeList:JSON.stringify(this.dabeList),
                },function(res){
                        _this.dialogTableVisible = false;
                })
            },
            deletePack(){
                let _this = this;
                this.$confirm('此操作将永久删除该业务包, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    AJAX.post("website/pack/deletePag",{
                        id:_this.$route.query.id,
                        tablename:_this.tabNames
                    },function(res){
                            _this.dialogTableVisible=false;
                            _this.list.map((item,key)=>{
                                if(item.tableNames===_this.tabNames){
                                    _this.list.splice(key,1);
                                }
                            })
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //表预览
            preWatch(){
                let _this = this;
                /*_this.dialogTableVisible=false;*/

                AJAX.get("website/pack/findData",{
                    id:_this.$route.query.id,
                    name:_this.tabNames
                },function(res){
                    if(res.data.getStatus=='0'){
                        return _this.$message.error('Excel导入的表不能表预览');
                    }else{
                        _this.dialogTableVisible1=true;
                        _this.preTable=res.data.mapData;
                    }
                    //console.log(res);

                })
            },
            modalColumn(row,index){
                //console.log(row)
                this.columnDataList = '';
                this.step=1;
                this.color='';
                this.columnIndex=index;
                this.activeTabs='0';
                this.realtables = row.relationTables==='none'?'':row.relationTables;
                this.realcolumn = row.relationColumn;
                if(row.correspondence){
                    this.activeTabs = row.correspondence;
                }

                this.columnName=row.columnName;
                this.dialogTableVisible2=true;
            },
            cho_item(num){
                this.activeTabs=num;
            },
            removeDabe(){
                this.realtables = '';
                this.realcolumn = '';
                this.dabeList[this.columnIndex].relationTables='none';
                this.dabeList[this.columnIndex].relationColumn='';
            },
            //关联到其他表
            contactTable(){
                let _this = this;
                AJAX.get("website/pack/getDataTable",{
                    mainId:this.$route.query.id,
                    tablename:this.tabNames
                },function(res){
                    if(res.data.getStatus=='0'){
                        return _this.$message.error('Excel导入的表没有表连接不能关联');
                    }else{
                        _this.columnDataList = res.list;
                    }

                })
            },
            //将数据保存store
            addTabList(){
                //将数据放入全局变量中
                let data={
                    name:this.form.name,
                    id:this.$route.query.id,
                    list:this.list
                }
                this.$store.commit('addChooseTableList',data);
            },
            //选择项
            choseVal(){
               // console.log(this.form.value);
                switch (this.form.value){
                    case '添加库/业务包' :{
                        this.addTabList();
                        this.$router.push({
                            path:'/pack/listAdd/:id'
                        });
                        break;
                    }
                    case 'SQL' :{
                        this.$router.push({path:'/pack/packSQL/',
                            query:{
                                id:this.$route.query.id,
                                name:this.form.name
                            }
                        });
                        break;
                    }
                    case 'EXCELL' :{
                        this.$router.push({path:'/pack/packEXCELL/',
                            query:{
                                id:this.$route.query.id,
                                name:this.form.name
                            }
                        });
                        break;
                    }
                    case 'ETL' :{
                        this.$router.push({path:'/pack/packETL/',
                            query:{
                                id:this.$route.query.id,
                                name:this.form.name
                            }
                        });
                        //this.$router.push('/pack/packETL');
                        break;
                    }
                }
            },
            choItem(item,key){
                this.color=key;
                let _this = this;
                //console.log(item.tabName)
                AJAX.get("website/pack/getTableColumn",{
                    mainId:this.$route.query.id,
                    tablename:this.tabNames,
                    classname:item.tabName
                },function(res){
                    //console.log(res.list);
                    _this.columnDataList = res.data.list;
                    _this.realtables = item.data.tabName;
                    _this.realcolumn = '';
                    _this.step = 2;
                })
            },
            choItem2(item,key){
                this.color2=key;
                this.realcolumn = item;
                this.dabeList[this.columnIndex].relationTables=this.realtables;
                this.dabeList[this.columnIndex].relationColumn=item;
                this.dabeList[this.columnIndex].correspondence=this.activeTabs;
                this.columnDataList = '';
                this.init();
            },
            init(){
                this.columnDataList = '';
                this.step = 1;
                this.color='';
                this.color2=''
            }
        }


    };
</script>

<style lang="scss" scoped>
    .page{
        position:relative;
    }
    .header{
        height:40px;
        margin-top:5px;
        line-height: 40px;
        border-bottom:1px solid #eee;
        .header_input{
            margin:0.1rem 0.2rem;
            width:300px;
        }
        .title{
            display: flex;
            flex-wrap: nowrap;
        }
        .select{
            position: relative;
            top:-1px;
            left:10px;
        }
    }
    .dabeList{
        height:450px;
        width:95%;
        overflow-y: auto;
        padding: 0.2rem;
        .span{
            cursor: pointer;
            border:1px solid #ddd;
            margin-right:1.9%;
            margin-top:5px;
            display: inline-block;
            width:10.1%;
            padding-right:0.02rem;
            height:25px;
            line-height: 25px;
            overflow-x: hidden;
            text-overflow:ellipsis;
            overflow-y: hidden;
            white-space: nowrap;
            &.active{
                background:#65cea7;
                color:#fff;
            }
            img{
                width:16px;
                height:16px;
                vertical-align: middle ;
                margin:0 4px;
            }

        }
        .el-table{

        }
    }
    .dialogHeader{
        .title{
            color: #317eac;
            font-weight:bold;
        }
        height:50px;
        align-items: center;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .dialogFooter {
        height:50px;
        align-items: center;
        display: flex;
        flex-direction: row-reverse;
        .el-button{
            margin-left:10px;
        }
    }
    .pos{
        position: absolute;
        top:59px;
        color: #1f2d3d;
        font-weight: bold;
        z-index:100;
        right:70px;
    }
    /* 第二个模态框样式 */
    .relate_con{
        width:770px;
        height:150px;
        position:relative;
    }
    .relate_con .box1{
        position:absolute;
        border:1px solid #ddd;
        background:#eee;
        width:180px;
        height:90px;
        top:30px;
        left:0;
        overflow:hidden
    }
    .relate_con .box .text{
        width:100%;
        height:45px;
        line-height:45px;
        text-align:center;
    }
    .relate_con .box .text:nth-child(1){
        border-bottom:1px solid #ddd;
    }
    .relate_con .line1{
        position:absolute;

        background:#bbb;
        width:70px;
        height:1px;
        top:74.5px;
        left:180px;
        overflow:hidden
    }
    .relate_con .box2{
        position:absolute;
        border:1px solid #ddd;
        background:#eee;
        width:140px;
        height:130px;
        top:10px;
        left:250px;
        overflow:hidden
    }
    .relate_con .box2 .item{
        margin:8px 10px 0;
        background:#fff;
        width:120px;
        text-align:center;
        height:33px;
        line-height:33px;
    }
    .relate_con .box2 .item.active{
        background:#2fa4e7;
        color:#fff;
    }
    .relate_con .line2{
        position:absolute;

        background:#bbb;
        width:70px;
        height:1px;
        top:74.5px;
        left:390px;
        overflow:hidden
    }
    .relate_con .box3{
        position:absolute;
        border:1px solid #ddd;
        background:#eee;
        width:180px;
        height:90px;
        top:30px;
        left:460px;
        overflow:hidden
    }
    .relate_con .close{
        position:absolute;
        width:20px;
        height:20px;
        top:65px;
        right:40px;
    }
    .relateDabeButton{
        width:100%;
        height:40px;
        text-align:right;
        padding-right:10px;
    }
    .relateDabeButton button{
        width:120px;
        height:32px;
        border:none;
        background:#2fa4e7;
        color:#fff;
        border-radius:4px;

    }
</style>
