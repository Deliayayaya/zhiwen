// JavaScript Document
// JavaScript Document
$(function(){
/*                           <!--validate-->
$.validator.setDefaults({//禁止多个表单提交
	 debug:true,
	})
*/	 
$('#reg1').validate({
	//debug:true,

   
	//ignore:'#pass',//绑定的id不用进行校验就可提交
	/*focusInvalid:false,
	errorPlacement:function(error,element){//错误信息提示，
		//alert(error);
		//alert(element[0]);
		$.each(error,function(index,value){
			//alert(index+''+$(value).html());
           $('.myerror').html($('.myerror').html()+$(value).html());//输出用户不能为空，密码不能为空
			});
		},
		*/
		//这种方式清晰，建议使用
/*	groups:{
		user_error:'user',
		pass_error:'pass',
		},	
	errorPlacement:function(error,element){//将错误信息指定存放到一个统一的位置
		error.appendTo('.myerror');
		},
		*/

    submitHandler:function(form){
		//alert(form);//成功提交后才触发，取代了默认提交，进行ajax校验
	$('.myerror').hide();//当输入合格后，将错误提示信息隐藏
	  alert('校验成功，准备提交');
		},
/*
	highlight:function(element,errorClass){//改变错误框的边框
		$(element).css('border','1px solid red');
		},
*/
/* invalidHandler:function(event,validator){
      //alert(validator.numberOfInvalids());//提示错误信息的条数
		var error = validator.numberOfInvalids();
		if(error){
			$('.myerror').html('错误信息有'+error+'条');
			}
		},
*/
		//errorClass:'wang',//更改错误提示的类名
		//errorElement:'p',//更改标签类型
		//success:function(label){//输入成功时显示ok
		//	label.addClass('1123').text('ok');
		//	},
	
	showErrors:function(errorMap,errorList){
		//alert(errorMap);
		//$.each(errorMap,function(index,value){
		//	alert(index+''+value);//user不能为空！;pass密码不能为空！
		//	})
		//alert(errorList);
		//alert(errorList[0].element);//[object HTMLInputElement]
		//alert(errorList[0].message)//不能为空！
		
		var error = this.numberOfInvalids();
		//alert(this.numberOfInvalids())//错误条数
		if(error){
			$('.myerror').html('错误信息'+error+'条');
			}else{
			$('.myerror').hide();	
			}
		},
	rules:{//规格
	  user:{
		 required:true,
		 //minlength:4,
		 rangelength:[5,10],
		 remove:{
			 url:'test.php',
			 
			 },
		 },
	  pass:{
		
		 required:true,
		 minlength:6,
		 remove:{
			 url:'test.php'
			 },
		
		 },	
	
	
	/*	 
	email:{//提示输入正确的邮箱格式
	 //required:true,
	 email:true,
	 },	
	data:{//data是id,date为true提示输入正确的日期格式
    //required:true,
    date:true,
	  },
	dateISO:{//只验证格式，不验证有效性
     dateISO:true,
	  },  
	url:{//提示输入正确的网址
	url:true,
		 },
	number:{//提示输入数字
	  number:true, 	
		},
	digits:{//输入正整数
	   digits:true,
		 },
    surepass:{//确认两次输入密码是否一致
		equalTo:'#pass',
		},
    creditcard:{//信用卡输入提示,不起作用
		creditcard:true,
      },
	  min:{//不能小于2
		  min:2,
		  }
		  */
		 
	},
	messages:{//可以修改相应的提示信息
		user:{
		required:'不能为空！',
		//minlength:'必须输入不小于{0}位',
		rangelength:'必须输在{0}-{1}之间',
		remove:{
			 url:'该用户已经注册', 
		 },
		},
	  pass:{
		 required:'密码不能为空！',
		 minlength:'必须输入不少于{0}位',

		 },	
	}
	
	})

})