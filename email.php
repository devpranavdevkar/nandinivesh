<?php

$to_email = "pranvadevkar.neuromonk@gmail.com";
$subject = "Simple Email Test via PHP";
$name = $_POST['name'];
$email = $_POST['email'];
$phoneNo = $_POST['phoneNo'];
$position = $_POST['position'];
$message = $_POST['message'];

$body = "$name  $email  $phoneNo  $position $message ";
$headers = "From: pranvadevkar.neuromonk@gmail.com";

if (mail($to_email, $subject, $body, $headers)) {
    echo "Email successfully sent to $to_email...";
} else {
    echo "Email sending failed...";
}
