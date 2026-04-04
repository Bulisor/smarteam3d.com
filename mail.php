<?php 
	function check_email($email){
		//if(!@preg_match("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email)){
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			return false;
		} else {
			return true;
		}
	}

	if(isset($_POST['name']) and isset($_POST['mail']) and isset($_POST['comment']) and isset($_POST['subject'])){
		$name 	 = $_POST['name'];
		$mail 	 = $_POST['mail'];
		$comment = $_POST['comment'];
		$title   = $_POST['subject'];
		$to 	 = "contact@smarteam3d.com";
	
		if($name == '') {
			echo json_encode(array('info' => 'error', 'msg' => "Please enter your name."));
			exit();
		} else if($mail == '' or check_email($mail) == false){
			echo json_encode(array('info' => 'error', 'msg' => "Please enter valid e-mail."));
			exit();
		} else if($comment == ''){
			echo json_encode(array('info' => 'error', 'msg' => "Please enter your message."));
			exit();
		} else if($title == ''){
			echo json_encode(array('info' => 'error', 'msg' => "Please fill subject field."));
			exit();
		} else {
			send_mail($mail, $name, $to, $title, $comment);
		}
	} else { 
		echo json_encode(array('info' => 'error', 'msg' => "Please fill out all fields"));
	}
	
	function send_mail($from, $name, $to, $subject, $message)
	{
		date_default_timezone_set('Europe/Bucharest');
		require_once __DIR__ . '/libs/vendor/phpmailer/PHPMailerAutoload.php';
		
		$mail = new PHPMailer;
			
		// Set PHPMailer to use the sendmail transport
		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		//Set the hostname of the mail server
		$mail->Host = 'smtp.zoho.eu';
		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = 587;
		//Set the encryption system to use - ssl (deprecated) or tls
		$mail->SMTPSecure = 'tls';
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		//Username to use for SMTP authentication - use full email address for gmail
		$mail->Username = "smarteam3d@gmail.com";
		//Password to use for SMTP authentication
		$mail->Password = "marian10gaje";                                 
		// TCP port to connect to
		//Set who the message is to be sent from
		$mail->setFrom($to, "SmarTeam3D");
		//Set who the message is to be sent to
		$mail->addAddress($to, "SmarTeam3D");
		//Set an alternative reply-to address
		$mail->addReplyTo($from, $name);
		//Set the subject line
		$mail->Subject = $subject;
		//Replace the plain text body with one created manually
		$mail->Body = $message;
		//Attach an image file
		$mail->IsHTML(false); 
	 
		//send the message, check for errors
		if (!$mail->send()) {
			echo json_encode(array('info' => 'error', 'msg' => $mail->ErrorInfo));
		} else {
			echo json_encode(array('info' => 'success', 'msg' => "Your message has been sent. Thank you!"));
		}
	}
?>