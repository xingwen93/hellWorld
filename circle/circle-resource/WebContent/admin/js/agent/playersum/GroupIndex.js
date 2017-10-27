/**
 * 玩家统计
 * Created by black on 2017/2/16.
 */
define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({

        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");
            $('.help-popover').popover();
            this.bindClick();
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            $('.help-popover').popover();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
        },

        /**
         * 导出按钮导出事件
         */
        bindClick: function () {

            //先解绑绑定的事件
            $("#export").unbind();
            var isHidden = $(".tab-detail").length;
            if (isHidden <= 0) {
                //弹窗提示
                $("#export").click(function(e){
                    page.showPopover(e, {}, 'warning', '暂无数据，无法导出', true);
                });
            } else {
                //数据导出
                $("#export").click(function(){
                    var url = root + '/playerSummery/getAllAgentExportData.html';
                    var form = document.getElementById("command");
                    form.action = url;
                    form.submit();
                    form.action = root + '/playerSummery/allAgentList.html';
                });
            }
        },

        /**
         * 执行查询
         * @param event         事件对象
         */
        query: function (event,option) {

            var _this = this;
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var $result=$(".search-list-container",$form);
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock();
                        _this.bindClick();
                    },
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(window.top.message.common["server.error"]);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        }
    });
});