<?php
require 'config.php';
$_pass = sha1($_POST['login_pass']);
$query = mysql_query("SELECT user,pass FROM regist WHERE user='{$_POST['login_user']}' AND pass='{$_pass}'") or die(SQL语句错误！);
if(mysql_fetch_array($query,MYSQL_ASSOC)){
	echo 'true';
	}else{
	echo 'false';
		}
  mysql_close();


?>