<?php
require 'config.php';
$query = mysql_query("SELECT user FROM regist WHERE user='{$_POST['user']}'");
if(mysql_fetch_array($query,MYSQL_ASSOC)){
	echo 'false';
	}else{
    echo 'true';
		}
mysql_close();


?>