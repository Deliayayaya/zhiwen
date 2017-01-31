// JavaScript Document
// JavaScript Document
$(function(){
$('#buttonsearch').button();//添加搜索按钮的格式
$("#buttonsearch").button({
	icons:{primary:'ui-icon-search'},
	})
$('#reg').buttonset();
$('#reg').dialog({
		 title:'会员注册',
		 buttons:{'提交':function(){alert('正在提交')},
		          '取消':function(){$(this).dialog('close')},
		       },
	     //show:'puff',
		 //hide:'puff',
		 autoOpen:true,
		 width:320,
		 height:400,
		 modal:true,
		 resizable:false,
		 });
$('#data').datepicker({
	                           <!--日历控件的属性（国际标准）-->
	dateFormat:'yy-mm-dd',//日期显示格式
	//dayNames:[],//内部写长格式的内容,本项目无作用
	//dayNamesShort:[],//缩写格式，本项目无作
	dayNamesMin:['一','二','三','四','五','六','日'],
	monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//显示中文的月份
	monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//短格式的显示方式,中文中长短格式都一样
	//altField:'#a',//给一个input绑定日期显示
	//altFormat:'yy/mm/dd',//改变绑定input中的日期显示格式
	//appendText:'添加',//日期显示框后添加文字
	showWeek:true,//显示第几周
	weekHeader:'周',//周显示格式
	firstDay:0,//从周几开始显示
                              <!--日历外观属性-->
	//disabled:true,//不显示日历
	//numberOfMonths:3,//显示日历个数
	//numberOfMonths:[4,2],//以数组的形式显示日历个数
	//showOtherMonths:true,
	//selectOtherMonths:true,
	changeMonth:true,//改变月份显示方式
	changeYear:true,//改变年份显示方式
	//isRTL:true,//从右往左显示
	//autoSize:true,//如果没有做css,该属性可根据输入框内容自动改变输入框的大小
	//showOn:'button',//通过点击按钮显示日历
	showOn:'both',//通过点击输入框以及按钮显示日历均可
	//buttonText:'日历',
	buttonImage:'img/calander.png',//引入图片
	buttonImageOnly:true,//只显示图标
	showButtonPanel:true,//开启日历面板
	closeText:'关闭',//将面板上的按钮文字改为中文
	currentText:'今天dd',//将面板上的按钮文字改为
	nextText:'下个月mm',
	prevText:'上个月mm',//将鼠标移动到日历中的小箭头就可显示
	navigationAsDateFormat:true,//是否按照日期格式显示
	//yearSuffix:'年',//在年份的文本后边添加文字
	showMonthAfterYear:true,//是否将年份放在月份前面
	                          <!--日期选择的属性-->
	//minDate:-8000,//日历可以选择的最小日期
	maxDate:0,//当前时间的后多少天
	yearRange:'1950:2020',//年份的优先级没有maxDate高
	hideIfNoPrevNext:true,//如果当天后的日期没有了则隐藏下个月的箭头
	//defaultDate:0,//设定好一个默认日期                        
	//showAnim:false,//直接显示，没有动画效果
	//duration:'drop',//动画效果
	                       <!--日历事件选项-->
	//beforeShow:function(){
	//	alert('打开日历前触发');}
	/*beforeShowDay:function(date){
		if(date.getDate() == 1){
			return [false,'a','不能选择'];//a是其类选择器，通过在css改变其样式
		}else{
			return [true];
				}
				
		},*/
      onChangeMonthYear:function(year,month,inst){
		  alert(year);
		  alert(month);
		  },
	//onClose:function(dateText,inst){//inst是一个对象，可以通过她调用属性获取其值
	//	alert(dateText);
	//	alert(inst.id);
	//	},
		//onSelect:function(dateText,ins){//与onClose的区别是当关闭时onselect不再alert
		//	alert(dateText);
		//	alert(ins.id);
		//	},
});
  <!--通过datepicker()外部使用的方法-->
//alert($('#data').datepicker('getDate').getFullYear());//获取显示的日期
//$('#data').datepicker('setDate','1992-6-21')//设置日期


  $('#reg input[title]').tooltip({
	 position:{my:'left+5 center',//以目标点左下角为基准
			   at:'right center'//at以my为基准
		   },
	 //show:'drop',//从左边显示，有透明度变化
                    
	  })

                      <!--自动补全功能autocomplete-->

 var host = ['aa','a','bb','bbb'];
 $('#email').autocomplete({
	  delay:0,
	  autoFocus:true,
	 source:function(request,response){
		 //alert(request.term);//获取输入框的内容
		 //response(['a','aa','aaa','bb']);//显示自动补全结果，但是会将整体显示，不会根据输入内容过滤无关数据
		 var hosts = (['163.com','sina.com.cn','qq.com']);
		 term = request.term;//获取用户输入信息
		 //response(hosts);//提示用户信息
		 name = term;//邮箱的用户名
		 host = '';//邮箱的域名
		 ix = term.indexOf('@');//将@的位置获取出来
		 result = [];//用一个数组呈现最终的列表
		 //如果@之后有内容，将用户名和域名分开；如果只输入了@之前的内容，则补全@以及后边的域名
		
		 result.push(term);
		 if(ix > -1){
			 name = term.slice(0,ix);
			 host = term.slice(ix+1);
		 }
			if(name){//输入了用户名
			 var findHost = (host?$.grep(hosts,function(value,index){
					  			return value.indexOf(host)>-1;
					  		}):hosts)
		       var findResult = $.map(findHost,function(value,index){
				      
				         return name+'@'+value;//map是将一个数组转换成其他数组
						 });
				
				result = result.concat(findResult);

			}
			response(result);
  	 
		 },
	

   });
  
  });
                                  <!--validate校验-->
$('#reg1').validate({
	rules:{
	   user:{
		   required:true,
		   minlength:2,
		   },
	}
	})



  