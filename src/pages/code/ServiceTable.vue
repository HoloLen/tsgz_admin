<template>
    <div class="page ServiceTable" ref="serviceTableContainer">
        <div class="header">
            <el-form v-model="labelData" label-position="right" label-width="90px" class="ServiceTableForm">
                <el-form-item label="表名：">
                    <el-input v-model="labelData.formName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="labelData.dis" size="small"></el-input>
                </el-form-item>
                <el-form-item label="父表表名：">
                    <el-input v-model="labelData.fatherFormName" size="small"></el-input>
                </el-form-item>
                <el-button type="primary" size="small" class="btn1" @click="search">
                    查询
                </el-button>
                <el-button type="primary" size="small" class="btn1" @click="add">
                    新增
                </el-button>
            </el-form>
        </div>
        <el-table
                :data="BusinessTableList.data"
                :max-height="tableHeight"
                border
                style="width:100%"
                >
            <el-table-column
                    label="表名"
                    >
                <template scope="scope">
                    <span >{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="说明"
                    >
                <template scope="scope">
                    <p>{{ scope.row.comments }}</p>
                </template>
            </el-table-column>
            <el-table-column label="类名"
            >
                <template scope="scope">
                    <p>{{ scope.row.className }}</p>
                </template>
            </el-table-column>
            <el-table-column label="父名"

            >
                <template scope="scope">
                    <span>{{scope.row.parentTable}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"

            >
                <template scope="scope">
                    <el-button
                            size="small"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button
                            size="small"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
            <div class="left">
                <span style="padding-left:10px;">选择页数：</span>
                <el-select v-model="pageSize"  placeholder="选择页数" class="pageSize" size="small" @change="changePageSize">
                    <el-option
                            v-for="item in pageSizeOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-pagination class="button" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="BusinessTableList.count" style="padding-right:20px;">
            </el-pagination>
        </el-col>
        <el-dialog
                title="选择新增表名"
                :visible.sync="addFormDialog"
                size="tiny"
                >
            <el-select v-model="formValue" filterable placeholder="请选择新增表名" >
                <el-option
                        v-for="item in formList.tableList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitAddFormList">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                labelData:{
                    formName:'',
                    dis:'',
                    fatherFormName:''
                },
                formValue:'',//用户新增的表名
                total: 0, //总页数
                page: 1, //当前页数
                pageSize:15,
                pageSizeOptions:[15,20,25],
                tableHeight:0,//表格容器的高度
                addFormDialog:false
            }
        },
        computed:{
            ...mapState(['BusinessTableList','formList']),
        },
        created(){
            this.handleBusinessTableList({
                pageSize:this.pageSize,
                pageNo:this.page
            })

        },
        mounted(){
            let _this =this;
            this.tableHeight=this.$refs.serviceTableContainer.offsetHeight-140;
            $(window).resize(function(){
                _this.tableHeight=$(window).height()-230;
            })
        },
        methods:{
            ...mapActions(['handleBusinessTableList','handleSearchBusinessTableList','handleDelectBusinessTableList','handleFormList']),
            handleCurrentChange(page){
                this.page = page;
                this.handleBusinessTableList({
                    pageSize:this.pageSize,
                    pageNo:page
                })

            },
            changePageSize(){
                this.handleBusinessTableList({
                    pageSize:this.pageSize,
                    pageNo:this.page
                })
            },
            search(){
                let dat =this.labelData
                this.handleSearchBusinessTableList(dat);
            },
            //删除
            handleDelete(index,scope){
                let _this = this;
                let dat = Object.assign(scope,{
                    pageSize:this.pageSize,
                    pageNo:this.page
                });
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.handleDelectBusinessTableList(dat);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //修改
            handleEdit(index,scope){
                let _this = this;
                this.$confirm('此操作将编辑此操作表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({
                        path:'/code/addServiceTable',
                        query:{
                            id:scope.id,
                            name:scope.name
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //新增
            add(){
                this.handleFormList();
                this.addFormDialog=true;
            },
            submitAddFormList(){
                let _this = this;
                AJAX.get('website/gen/isExist',{name:_this.formValue},(res)=>{
                    if(res.message==='成功'){
                        this.addFormDialog=false;
                        this.$router.push({
                            path:'/code/addServiceTable',
                            query:{
                                id:'',
                                name:this.formValue
                            }
                        })
                        this.formValue='';
                    }
                    if(res.message!=='成功'){
                        this.$message.error(res.message);
                    }
                })
            },
            routerToAdd(){
                if(this.$route.path=='/code/ServiceTable'){
                    if(this.addFormListMsg.message==='成功'){
                        this.addFormDialog=false;
                        this.$router.push({
                            path:'/code/addServiceTable',
                            query:{
                                id:'',
                                name:this.formValue
                            }
                        })
                        this.formValue='';
                    }
                    if(this.addFormListMsg.message!=='成功'){
                        this.$message.error(this.addFormListMsg.message);
                    }
                }

            }
        },

    };
</script>

<style lang="scss">
    .ServiceTable{
        display: flex;
        flex-flow: column;
        position:relative;
       .header{
           width:100%;
           height:50px;
           line-height: 50px;
           .ServiceTableForm{
               position: relative;
               top:6px;
               display: flex;
               line-height: 50px;
               .el-form-item{
                   position:relative;
                   left:-20px;
                   &:nth-child(2){
                       left:-40px;
                   }
                   &:nth-child(3){
                       left:-30px;
                   }
               }
               .el-input{
                   width:130px;
               }
               .el-form-item__label{
                   width:50px;
               }
               .btn1{
                   margin-top:4px;
                   width:50px;
                   height:30px;
               }
           }
       }
       .toolbar{
           position: absolute;
           bottom:45px;
           height:45px;
       overflow-x: hidden;
           display: flex;
           justify-content: space-between;
           align-items: center;
           .left{
               width:240px;
               overflow: hidden;
               .pageSize{
                   width:70px;
                   li{
                       width:50px;
                   }
               }
           }


        }
    }
</style>
