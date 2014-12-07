<?php
    $mashape_key = 'dvb705DeAomshJYj7vjwDwPgzYesp1vgNjEjsnvJYJa2sygFsm';
    $voicerrs_key = '7d8473256c7c4ce9bb0697a79e7a6fd6';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $headers = array('X-Mashape-Key: '.$mashape_key);

    curl_setopt($ch, CURLOPT_URL, 'https://voicerss-text-to-speech.p.mashape.com/?key='.$voicerrs_key.'&c=mp3&f=8khz_8bit_mono&hl='.$_GET['lang'].'&r=0&src='.urlencode($_GET['text'])); # URL to post to
    header("Content-Type: audio/mpeg");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 
    echo curl_exec( $ch ); 
    var_dump($header);
    curl_close($ch);
?>