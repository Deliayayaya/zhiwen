// JavaScript Document
$(function(){ 
/*$('#reg1').ajaxForm(function(){//相当于success:function(){},自动阻止了默认提交,校验成功后
	alert('校验成功，准备提交');
	});
*/
/*
$('#reg1').submit(function(){
	$(this).ajaxSubmit({
		url:'123.php',
		type:'post',
		target:'#div1',
		//data:{email:'haha'},//向服务器端发送额外的数据
		dataType:null,
	    clearForm:true,//成功提交后清空表单
		//resetForm:true,//重置表单
		//beforeSubmit:function(formData,jqForm,options){
			//alert(options.url);//获取它的url
			//alert(jqForm.html());//获取整个form表单，作为jquery对象
			//alert(formData[0].value);//获取表单中的name和value
			//},
		success:function(responseText,statusText){
			alert(responseText+statusText);//提交成功的文本内容，提交状态（失败或成功）
			//alert('校验成功');
			},
		error:function(event,errorText,errorType){
				alert(errorText+errorType);//返回错误的文本和类型
				},
		});
    return false;
		});//只有使用了submit的情况下，才使用ajaxSubmit,submit不能阻止默认提交
	*/


//alert($('#reg1').formSerialize());//表单序列化,获取表单键值对的name和value
//alert($('#reg1 #user').fieldSerialize());//获取局部序列化
//alert($('#reg1 #user').fieldValue());//获取局部value
//alert($('#reg1').resetForm());//重置表单
//alert($('#reg1 #user').clearFields());//清空某个字段














// $('#reg1').validate({
	 //onsubmit:false,//导致不会进行校验
	 //onfocusout:false,//光标离开，不触发提示
	 //ignoreTitle:true,//禁止使用input中的title作为提示信息
//    submitHandler:function(form){
  //     alert('校验成功，准备提交');
	// },
/*
	rules:{//规格
	  user:{
		 required:true,
		 minlength:4,
		// rangelength:[5,10],
		 //remote:'user.php',

		 },
	  pass:{
		 required:true,
		 minlength:6,
		 remote:{//校验
			 url:'user.php',
			 data:{
				 user:function(){return $('#user').val()},
				 },
			 type:'GET',
			 },
			 
		 },	
		
	},
	messages:{//可以修改相应的提示信息
		user:{
		required:'不能为空！',
		minlength:'必须输入不小于{0}位',
		//rangelength:'必须输在{0}-{1}之间',
		//remote:'该用户名已被注册',
		
		},
	  pass:{
		 required:'密码不能为空！',
		 minlength:'必须输入不少于{0}位',
        // remote:'用户名或者密码不正确',
		 },
       }
	//alert($('#reg1').valid());//可以返回页面校验结果，true和false
	*/
//	});
/*添加id的校验
	$('#user').rules('add',{
		required:true,
		minlength:4,
		messages:{
			required:'不能为空',
			minlength:'至少为四位'
			},

		});
*/
	//移除id的校验	
//$('#user').rules('remove');//移除所有校验属性
//$('#user').rules('remove','minlength required');//移除一个属性
/*$('#yb').rules('add',{
		required:true,
		code:4,
		messages:{
			required:'邮编不能为空',
			},
		});
     $.validator.addMethod('code',function(value,element){
			var tel = /^[0-9]{6}$/;
			return this.optional(element)||(tel.test(value));
			},'请输入正确的邮政编码')
			*/
});