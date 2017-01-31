// JavaScript Document
$(function(){
	$('#button_search').button();//添加搜索按钮的格式
	$("#button_search").button({
		icons:{primary:'ui-icon-search'},//图标
});
/*搜素框补全实现*/		
 var websits = ['Alipay','Csdn','Baidu','Google','Taobao','Souhu','Sina','Yahoo'];
 $('.header_search').autocomplete({
	delay:0,
	autoFocus:true,//自动获取焦点
	source:function(request,response){
		response(websits);
	},
})
/*提问按钮*/
$('#button_question').button({
	icons:{primary:'ui-icon-lightbulb'},
	}).click(function(){
	if($.cookie('user')){//如果已经登录或者注册了，可以进行提问
		$('#question').dialog('open');
	}else{//没有登录的弹出‘请登录后再提问’，再弹出登录对话框
    	$('#error').dialog({
			autoOpen:false,
			closeOnEscape:false,//禁止关闭按钮使用
			modal:true,//灰色遮罩
			resizable:false,
			width:150,
			height:40,
			}).parent().find('.ui-widget-header').hide();	
		$('#error').dialog('open').html('请登录后再操作');
		setTimeout(function(){//1秒后关闭登录提示框，弹出登录框
			$('#error').dialog('close');
			$('#login').dialog('open');
			},1000);
	}
});
	
	
	
//var Fresh = function(){
	//显示发表的提问及详细描述
	$.ajax({
		url:'show_content.php',
		type:'POST',
		success:function(response,status,xhr){
			var json = $.parseJSON(response);
			var html = '';
			var arr = [];
			var summary = [];  
			$.each(json,function(index,value){
				html = '<h4>'+value.user+'发表于'+value.date+'</h4>'+'<h3>'+value.title+'</h3>'+'<div class="editor">'+value.content+'</div>'+'<div class="bottom"><span class="comment" date-id="'+value.id +'">'+value.count+'条评论</span><span class="down">收起</span></div>'+'<hr noshade="noshade" size="1"/>'+'<div class="comment_list"></div>';
				$('#content').append(html);
			})
			$.each($('.editor'),function(index,value){
				arr[index] = $(value).html();//获取每个文本,存放在数组中
				summary[index] = arr[index].substr(0,200);//截取前两百个字符
				if(summar
				[index].substring(199,200)=='<'){
					summary[index] = replacePos(summary[index],200,'')
					}
				if(summary[index].substring(198,200)=='</'){
					summary[index] = replacePos(summary[index],200,'')
					summary[index] = replacePos(summary[index],199,'')
					}
				if(arr[index].length>200){//如果字符的长度超过200，则只显示前200个字符   
					summary[index] += "...<span class='up'>显示全部</span>"; 
					$(value).html(summary[index]); 
					}
				$('.bottom .down').hide();//隐藏‘收起‘
			})
			$.each($('.editor'),function(index,value){ 
				$(this).on('click','.up',function(){
					$('.editor').eq(index).html(arr[index]);//当点击‘显示全部’时，将所有内容都显示出来
					$(this).hide();//隐藏'显示全部'字样
					$('.bottom .down').eq(index).show();//显示'收起'字样 
					});
				});
			$.each($('.bottom'),function(index,value){ 
				$(this).on('click','.down',function(){
					$('.editor').eq(index).html(summary[index]);
					$(this).hide();
					$('.editor .up').eq(index).show();
					});
				});
			$.each($('.bottom'),function(index,value){
				$(this).on('click','.comment',function(){//点击‘发表’，当用户登录，评论框不为空时，进行校验
				var comment_this =this;
				if($.cookie('user')){
					//当表为0时则显示评论框
					if(!$('.comment_list').eq(index).has('form').length){
				  		$.ajax({//校验
					 	url:'show_comment.php',
						type:'POST',
						data:{'titleid':$(comment_this).attr('date-id')},
			  			beforeSend:function(jqXHR,settings){
				 			$('.comment_list').eq(index).append('<dl><dd class="comment_load">加载评论中</dd></dl>');
						},
						success:function(response,status){
						//加载成功后执行，隐藏beforeSend中的内容，显示评论框

							$('.comment_list').eq(index).find('.comment_load').hide();
							//将表单中的内容封装为json
							var json_comment = $.parseJSON(response);
							var count = 0;
							//遍历每条评论显示出来
							$.each(json_comment,function(index2,value){
								count = value.count;
								$('.comment_list').eq(index).append('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="comment_date">'+value.date+'</dd></dl>');
  });
                 				$('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载更多评论</span></dd></dl>');
				 				var page = 2;
		       					if(page>count){
									$('.comment_list').eq(index).find('.load_more').hide();
									$('.comment_list').eq(index).find('.load_more').off();
			     }
								$('.comment_list').eq(index).find('.load_more').button().on('click',function(){
								$('.comment_list').eq(index).find('.load_more').button('disable');//点击加载后禁用该按钮
				$.ajax({
				    url:'show_comment.php',
					type:'POST',
					data:{'titleid':$(comment_this).attr("date-id"),
					      'page':page,
						 },
					beforeSend:function(jqXHR,settings){	
					 $('.comment_list').eq(index).find('.load_more').html('<img src="img/comment_load.gif"></img>')
						},
					success:function(response,status){
				      var json_comment_more = $.parseJSON(response);
				      $.each(json_comment_more,function(index3,value){	  
				      $('.comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="comment_date">'+value.date+'</dd></dl>');	  
  });
        $('.comment_list').eq(index).find('.load_more').button('enable');
		$('.comment_list').eq(index).find('.load_more').html('加载更多评论');
      page++;	
      if(page>count){
	$('.comment_list').eq(index).find('.load_more').hide();
		$('.comment_list').eq(index).find('.load_more').off();
			}
		}	
	});
});				
	  $('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea id="comment_text" name="comment" class="comment_text"></textarea></dt><dd><input type="hidden" name="titleid" value="'+$(comment_this).attr("date-id")+'"/><input type="hidden" name="user" value="'+$.cookie('user') +'"/><input class="comment_button" type="button" value="发表"/></dd></dl></form>');
	  $('.comment_list').eq(index).find('input[type=button]').click(function(){//当点击发表按钮时进行表单校验
			var _this = this;
			$('.comment_list').eq(index).find('form').ajaxSubmit({
				url:'add_comment.php',
				type:'POST',
				beforeSubmit:function(formData,jqForm,options){
		             $('_this').button('disable');
					 $('#loading').dialog('open').html('数据交互中...'); 
					},
                 success:function(response,status){//表单校验成功后，显示所有评论表单和评论框
					 if(response){
						 $('_this').button('enable');
						 $('#loading').css('background','url(img/success.png) no-repeat 14px center').html('&nbsp;&nbsp;评论成功！');	
						 }	 
				setTimeout(function(){
					$('#loading').dialog('close');
				//提交评论，自动显示
				  var date = new Date();
					$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>'+$.cookie('user')+'</dt><dd>'+ $('.comment_list').eq(index).find('.comment_text').val()+'</dd><dd class="comment_date">'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</dd><dl/>');
					$('.comment_list').eq(index).find('form').resetForm();
					$('#loading').css('background','url(img/loading.gif) no-repeat 20px center');          
					$('#member').html($.cookie('user')); 
							 },1000)
					 },
				});				
			  });
		   },
					 
		});
	}

			    if($('.comment_list').eq(index).is(':hidden')){
				   $('.comment_list').eq(index).show(); 
			    }else{
				   $('.comment_list').eq(index).hide();
				  }
			     }else{
			   $('#error').dialog({
				autoOpen:false,
				closeOnEscape:false,//禁止关闭按钮使用
				modal:true,//灰色遮罩
				resizable:false,
				width:150,
				height:40,
				}).parent().find('.ui-widget-header').hide();	
				$('#error').dialog('open').html('请登录后再操作');
				   setTimeout(function(){
					$('#error').dialog('close');
					$('#login').dialog('open');
					},1000);
				}
	     	});
		})
	 },
	});
//}
	
	
$('#question').dialog({
		 autoOpen:false,
		 width:580,
		 height:400,
		 modal:true,
	     resizable:false,
		 buttons:{'发布':function(){$(this).ajaxSubmit({
			 url:'add_content.php',
			type:'POST',
		    data:{'user':$.cookie('user'),
			 },
    beforeSubmit:function(formData,jqForm,options){
		   $('#question').dialog('widget').find('button').eq(1).button('disable');
		   $('#loading').dialog('open').html('数据发布中...'); 
		   },
		 success:function(respseText,statusText){
			if(responseText){
			  $('#question').dialog('widget').find('button').eq(1).button('enable'); 
			  $('#loading').css('background','url(img/success.png) no-repeat 14px center').html('&nbsp;&nbsp;发布成功！');		
			   setTimeout(function(){
				   
					$('#loading').dialog('close');
					$('#question').dialog('close');
					$('#question').resetForm();
					$('#loading').css('background','url(img/loading.gif) no-repeat 20px center');          
					$('#member,#regout').show();
					$('#reg_a,#login_a').hide();
					$('#member').html($.cookie('user')); 
					//Fresh();
				                   },5000)};					  
			         }
			      })
			    },
		      },
		 });

	
$('#reg_a').click(function(){
    $('#reg').dialog('open');
	});
   $('#member,#regout').hide();//中间加逗号！！！
    if($.cookie('user')){
		$('#member,#regout').show();
		$('#reg_a,#login_a').hide();
		$('#member').html($.cookie('user'));
	}else{
	    $('#reg_a,#login_a').show();
		$('#member,#regout').hide();	
	};
	$('#regout').click(function(){
		$.removeCookie('user');//点击退出按钮，将当前cookie移除
		window.location.href = '/zhiwen/';//刷新页面
		});
   $('#loading').dialog({
	autoOpen:false,
	closeOnEscape:false,//禁止关闭按钮使用
	modal:true,//灰色遮罩
	resizable:false,
	width:150,
	height:40,
	}).parent().find('.ui-widget-header').hide();
/*会员注册*/
$('#reg').dialog({
		 title:'会员注册',
		 buttons:{'提交':function(){$(this).submit();
},
		       },
	     //show:'puff',
		 //hide:'puff',
		 autoOpen:false,
		 width:320,
		 height:400,
		 modal:true,
		 resizable:false,
		 }).buttonset()//将input设置为按钮样式
		 .validate({
		//注册表单校验
	  	 submitHandler:function(form){
		   $(form).ajaxSubmit({
			   url:'add.php',
			   type:'POST',			    
			   data:{				  
				    'birth':function(){return $('#birth').val();},
			   		'user':	$('#user').val(),
					'pass':	$('#pass').val(),
					'email': $('#email').val(),
					'sex': function(){return $('input[name=sex]:checked').val()}
			},
			   beforeSubmit:function(formData,jqForm,options){
				   $('#reg').dialog('widget').find('button').eq(1).button('disable');
				   $('#loading').dialog('open').html('数据交互中...'); 
				   },
			   success:function(responseText,statusText){
				  if(responseText){
					$('#reg').dialog('widget').find('button').eq(1).button('enable'); 
					$('#loading').css('background','url(img/success.png) no-repeat 14px center').html('&nbsp;&nbsp;注册成功！');
			$.cookie('user',$('#user').val());//从输入的用户名账号中获取内容放在cookie中
					
			   setTimeout(function(){
				    $('#loading').dialog('close');
					$('#reg').dialog('close');
					$('#reg span.spa').html('*').removeClass('succ');
				    $('#reg').resetForm();
					$('#loading').css('background','url(img/loading.gif) no-repeat 20px center');          
					$('#member,#regout').show();
					$('#reg_a,#login_a').hide();
					$('#member').html($.cookie('user')); 
  				   },1000);
					  };
				   },
			   
			   });
		   },
        showErrors:function(errorMap,errorList){
			var errors = this.numberOfInvalids();
			if(errors>0){
				$('#reg').dialog('option','height',errors*20+400);
				}else{
				$('#reg').dialog('option','height',400);
					}
			this.defaultShowErrors();
			},
		highlight:function(element,errorClass){
			$(element).css('border','1px solid brown');
			$('#reg input .spa').html('*').removeClass('succ');
			
			},
		unhighlight:function(element,errorClass){
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;&nbsp;').addClass('succ');
			},
			
		
		 errorLabelContainer:'ol.reg_error',//显示错误信息的容器，可根据校验结果显示或者隐藏错误容器
			 wrapper:'li',//显示错误信息的外层标签名称
			 rules:{
				user:{
					required:true,
					minlength:2,
					remote:{
					  url:'is_user.php',
					  type:'POST'					  
						}
					},
				pass:{
					required:true,
					minlength:6
					},
				email:{
					required:true,
					email:true
					}			
				},
			 messages:{
				 user:{
					 required:'用户名不得为空！',
					 minlength:'用户名长度不小于{0}位',
					 remote:'账号被占用！',
					 },
				 pass:{
					 required:'密码不能为空！',
					 minlength:'密码长度至少为{0}位',
					 },
				email:{
					 required:'邮箱不能为空！',
					 email:'请输入正确的邮箱格式',
					},

				 },
			 });
	
$('#birth').datepicker({
	                           <!--日历控件的属性（国际标准）-->
	dateFormat:'yy-mm-dd',//日期显示格式
	//dayNames:[],//内部写长格式的内容,本项目无作用
	//dayNamesShort:[],//缩写格式，本项目无作
	dayNamesMin:['一','二','三','四','五','六','日'],
	monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//显示中文的月份
	monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//短格式的显示方式,中文中长短格式都一样
	//showWeek:true,//显示第几周
	//weekHeader:'周',//周显示格式
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
   //$.cookie('user','bnbbs',{
	 //  expires:7,//七天后过期
	  // path:'/',
	   //secure:true,
	   //});//创建一个cookie
   
  //$.cookie('thc','王丽雅',{
	//  secure:true,
	 // });
  //alert( $.cookie('thc'));//自动获取,如果加密则undefined
  //alert($.cookie().wangliya);//获取所有的cookie
  //$.removeCookie('user')
  //$.removeCookie('1');
  
                                       /*会员登录*/
  $('#login_a').click(function(){
    $('#login').dialog('open');
  });
		
$('#login').dialog({
		 title:'会员登录',
		 buttons:{'登录':function(){

			 $(this).submit()},
		       },
	     //show:'puff',
		 //hide:'puff',
		 autoOpen:false,
		 width:330,
		 height:280,
		 modal:true,
		 resizable:false,
		 }).validate({
	   submitHandler:function(form){
		   $(form).ajaxSubmit({
			   url:'login.php',
			   type:'POST',
			   beforeSubmit:function(formData,jqForm,options){
				   $('#login').dialog('widget').find('button').eq(1).button('disable');
				   $('#loading').dialog('open').html('数据交互中...'); 
				   },
			   success:function(responseText,statusText){
				  if(responseText){
					$('#login').dialog('widget').find('button').eq(1).button('enable'); 
					$('#loading').css('background','url(img/success.png) no-repeat 14px center').html('&nbsp;&nbsp;登录成功！');
					/*过期时间*/
					if($('#expires').is(':checked')){
					$.cookie('user',$('#login_user').val(),{
						expires:7,});
						}else{
			        $.cookie('user',$('#login_user').val());}//从输入的用户名账号中获取内容放在cookie中
			   setTimeout(function(){
				    $('#loading').dialog('close');
					$('#login').dialog('close');
					$('#login span.spa').html('*').removeClass('succ');
				    $('#login').resetForm();
					$('#loading').css('background','url(img/loading.gif) no-repeat 20px center');          
					$('#member,#regout').show();
					$('#reg_a,#login_a').hide();
					$('#member').html($.cookie('user')); 
  				   },1000);
					  };
				   },
			   
			   });
		   },
        showErrors:function(errorMap,errorList){
			var errors = this.numberOfInvalids();
			if(errors>0){
				$('#login').dialog('option','height',errors*20+280);
				}else{
				$('#login').dialog('option','height',280);
					}
			this.defaultShowErrors();
			},
		highlight:function(element,errorClass){
			$(element).css('border','1px solid brown');
			$('#login input .spa').html('*').removeClass('succ');
			
			},
		unhighlight:function(element,errorClass){
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;&nbsp;').addClass('succ');
			},
		 errorLabelContainer:'ol.login_error',//显示错误信息的容器，可根据校验结果显示或者隐藏错误容器
			 wrapper:'li',//显示错误信息的外层标签名称
			 rules:{
				login_user:{
					required:true,
					minlength:2,
				
					},
				login_pass:{
					required:true,
					minlength:6,
					remote:{
					  url:'login.php',
					  type:'POST',	
					  data:{
						  login_user:function(){
							  return $('#login_user').val();
							  },
						  },
						},
					},
				},
			 messages:{
				login_user:{
					 required:'用户名不得为空！',
					 minlength:'用户名长度不小于{0}位',
					// remote:'账号被占用！',
					 },
			    login_pass:{
					 required:'密码不能为空！',
					 minlength:'密码长度至少为{0}位',
					 remote:'用户名或者密码不正确！',
					 },
				 },
		 });
		 
$('#tabs').tabs({
      collapsible:true,//折叠选项卡
	  //disabled:[0,1],//以数组的方式禁用选项卡
　　 　//disabled:true,//禁用所有选项卡
      //event:'mouseover',//改变事件方法,通过点击或鼠标移动等
	  //active:0,//默认的显示数组下标是0的tab
	  //active:true,//默认是否折叠
	  heightStyle:'content',//根据文章自动更改
	  //heightStyle:'auto',//所有tab都按照最大的高度规定好
	  //show:true,//有淡入淡出的效果
	  //hide:true,
	  //create:function(event,ui){//创建一个tab时触发,两个属性tab和panel
		  //alert('创建tab时触发！')
		  //alert(event);//[object Object]
		  //alert($(ui.tab.get()).html());//头标签
		  //alert($(ui.panel.get()).html());//头标签tab1-content下的内容
		 // },
	/* activate:function(event,ui){//切换到另一个选项卡时触发,四个属性
	       //alert('切换到另一个选项卡时');
		 alert($(ui.oldTab.get()).html());
		 alert($(ui.newTab.get()).html());
		 alert($(ui.oldPanel.get()).html());
		 alert($(ui.newPanel.get()).html());
		 },*/
	 /*beforeActivate:function(event,ui){
		 alert('切换到另一个活动之前触发');
		 alert($(ui.oldTab.get()).html());
		 alert($(ui.newTab.get()).html());
		 alert($(ui.oldPanel.get()).html());
		 alert($(ui.newPanel.get()).html());
		  },
		  */
	 /*load:function(event,ui){
		 alert('远程加载文档后触发');
		 alert($(ui.tab.get()).html());
		 alert($(ui.panel.get()).html());
		 },
		 */
	//beforeLoad:function(event,ui){
		 //alert('远程加载文档前触发');
		 //alert($(ui.tab.get()).html());
		//alert($(ui.panel.get()).html());//为空，是因为将文档加载前触发，只后期了加载前的选项卡标签
         //ui.jqXHR.success(function(responseText){//可以获取到加载文档触发前
		//	   alert(responseText);});
	   //ui.ajaxSettings.url='tab1.html';
		// },
	});
		/*$('#button').click(function(){//实现局部刷新功能
			$('#tabs').tabs('load');
			});*/
	/*	$('#tabs').on('tabsload',function(event,ui){
			 alert('ajax加载后触发');
			});
		$('#tabs').on('tabsbeforeload',function(event,ui){
			 alert('ajax加载前触发');
			});
		$('#tabs').on('tabsactivate',function(event,ui){
			 alert('选项卡切换时触发');
			});
		$('#tabs').on('tabsbeforeactivate',function(event,ui){
			 alert('选项卡切换前触发');
			});*/
	$('#accordion').accordion({
		 //collapsible:true,
		 //active:2,//默认显示菜单3
		  //active:true,//和collapsible配合使用，折叠菜单
		 //disabled:true,//全部禁用
		 //heightStyle:'fill',
		 // heightStyel:'content',
		 //event:'mouseover',
		  header:'h3',
		  icons:{'header':'ui-icon-plus',//将标题小图标改为+和-
		          'activeHeader':'ui-icon-minus',
		   },
		  create:function(event,ui){
			  //alert('创建时触发');
		      //alert($(ui.header.get()).html());
			 // alert($(ui.panel.get()).html());
			   },
		  /* activate:function(event,ui){
			   alert($(ui.oldHeader.get()).html());
			   alert($(ui.oldPanel.get()).html());
			   alert($(ui.newHeader.get()).html());
			   alert($(ui.newPanel.get()).html());
			   },
			 beforeActivate:function(event,ui){
			   alert($(ui.oldHeader.get()).html());
			   alert($(ui.oldPanel.get()).html());
			   alert($(ui.newHeader.get()).html());
			   alert($(ui.newPanel.get()).html());
				 },*/
		});
	//$('#accordion').accordion('disable');
	//$('#accordion').accordion('enable');
	//$('#accordion').accordion('option','active',1);
	//$('#accordion').accordion('option','active');	
	/*$('#accordion').on('accordionactivate',function(){
		 alert('菜单切换时触发');
		});
	$('#accordion').on('accordionbeforeactivate',function(){
		 alert('菜单切换前触发');
		});*/
  });
function replacePos(strObj,pos,replaceText){
	return strObj.substr(0,pos-1)+replaceText+strObj.substring(pos,strObj.length);
}



  