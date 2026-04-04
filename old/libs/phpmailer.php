<?php
email::$services['phpmailer'] = function ($email) {

	require_once __DIR__ . '/vendor/phpmailer/PHPMailerAutoload.php';

	ini_set('display_errors', '1');

	$mail = new PHPMailer();
	//	print_r($email);

	$mail->SMTPDebug = 2;

	$mail->isSMTP();                                      // Set mailer to use SMTP
	//	$mail->SMTPAuth = true;                               // Enable SMTP authentication

	$mail->Host = $email->options['host'];  // Specify main and backup SMTP servers
	$mail->Username = $email->options['username'];  // SMTP username
	$mail->Password = $email->options['password'];  // SMTP password


	if (isset($email->options['protocol']) && $email->options['protocol'] != '') {
		// Enable TLS encryption, `ssl` also accepted
		$mail->SMTPSecure = $email->options['protocol'];
	} else {
		// Enable TLS encryption, `ssl` also accepted}
		$mail->SMTPSecure = 'ssl';
	}

	if (isset($email->options['port']) && $email->options['port'] != '') {
		// Enable TLS encryption, `ssl` also accepted
		$mail->Port = $email->options['port'];
	} else {
		// TCP port to connect to
		$mail->Port = 465;
	}


	if (isset($email->options['smptoptions']) && $email->options['smptoptions'] != '') {
		$mail->SMTPOptions = $email->options['smptoptions']; // Enable TLS encryption, `ssl` also accepted
	} else {
		$mail->SMTPOptions = [
			'ssl' => [
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			]
		];
	}


	//	$mail->CharSet = 'UTF-8';
	//	$mail->IsHTML(true);
	$mail->setFrom($email->from); //$email->fromName);
	//	$this->From = $email->from;
	$mail->addReplyTo($email->replyTo);
	$mail->addAddress($email->to);


	//	foreach ($email->cc as $recipient) {
	//		$mail->addCC($recipient);
	//	}

	//	foreach ($email->bcc as $recipient) {
	//		$mail->addBCC($recipient);
	//	}

	//	foreach ($email->attachments as $attachment) {
	//		if (is_array($attachment)) {
	//			$mail->addAttachment($attachment[0], $attachment[1]);
	//		} else {
	//			$mail->addAttachment($attachment);
	//		}
	//	}
	//	print_r($mail->Port);

	$mail->Subject = $email->subject;
	$mail->Body = $email->body;

	if (!$mail->send()) {
		print_r($mail->ErrorInfo);
		throw new Exception('PHPMailer error: ' . $mail->ErrorInfo);
	}

	//	try {
	//		$mail->send();
	//	} catch (phpmailerException $e) {
	//		throw new Exception($e->getMessage());
	//	} catch (Exception $e) {
	//		throw new Exception($e->getMessage());
	//	}
};