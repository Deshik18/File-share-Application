<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["file"])) {
    $target_dir = "share/";
    $random_folder_name = bin2hex(random_bytes(7));
    $target_dir .= $random_folder_name . '/';
    
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $match_file = "share/match.txt";
        $timestamp = date('Y-m-d H:i:s');
        $data = $random_folder_name . "\t" . $timestamp . "\n";
        
        file_put_contents($match_file, $data, FILE_APPEND);
        
        // Send the name of the folder created to final.html
        header("Location: final.html?folder=$random_folder_name");
        exit;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
