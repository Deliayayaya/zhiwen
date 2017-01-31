<?php
sleep(3);
require'config.php';//引入该文件
$query = "INSERT INTO regist(user,pass,email,sex,birthday,date) VALUES ('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['email']}','{$_POST['sex']}','{$_POST['birth']}',NOW())";//执行sql语句
mysql_query($query) or die('新增失败！'.mysql_error());
echo mysql_affected_rows();
mysql_close();
?>